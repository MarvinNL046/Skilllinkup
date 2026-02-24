// server.js - Custom Node.js server wrapping Next.js with Socket.io
// Runs as CommonJS (no "type": "module" in package.json)
// Usage: node server.js (dev) or NODE_ENV=production node server.js (prod)

"use strict";

const { createServer } = require("node:http");

const next = require("next");
const { Server } = require("socket.io");
const { neon } = require("@neondatabase/serverless");

// Load env files for local development (no-op if already set by host)
require("dotenv").config({ path: ".env.local" });
require("dotenv").config({ path: ".env" });

// ─── Config ───────────────────────────────────────────────────────────────────

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

// ─── Database (separate from Next.js "server-only" lib/db.ts) ─────────────────

const dbUrl =
  process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || "";

const sql = dbUrl
  ? neon(dbUrl)
  : null;

if (!sql) {
  console.warn(
    "[server] WARNING: No DATABASE_URL found. Socket event handlers that touch the DB will be disabled."
  );
}

// ─── Stack Auth session verification ─────────────────────────────────────────
// Verifies Stack Auth access token by calling the Stack Auth API.

const STACK_PROJECT_ID = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
const STACK_SECRET_KEY = process.env.STACK_SECRET_SERVER_KEY;
const STACK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;

async function verifyStackAuthSession(accessToken) {
  if (!STACK_PROJECT_ID || !STACK_SECRET_KEY) {
    throw new Error("Stack Auth env vars not configured");
  }

  // Call Stack Auth API to get the current user from the access token
  const response = await fetch("https://api.stack-auth.com/api/v1/users/me", {
    headers: {
      "x-stack-project-id": STACK_PROJECT_ID,
      "x-stack-publishable-client-key": STACK_PUBLISHABLE_KEY || "",
      "x-stack-secret-server-key": STACK_SECRET_KEY,
      "x-stack-access-token": accessToken,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

// ─── Socket.io Auth middleware ────────────────────────────────────────────────

async function authenticateSocket(socket, next) {
  try {
    // Parse cookies from the upgrade request
    const cookieHeader = socket.handshake.headers.cookie || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const idx = c.indexOf("=");
        if (idx === -1) return [c.trim(), ""];
        const key = c.slice(0, idx).trim();
        const val = c.slice(idx + 1).trim();
        return [key, val];
      })
    );

    // Stack Auth stores access token in cookie
    const rawToken =
      cookies["stack-token-access-token__" + (STACK_PROJECT_ID || "")] ||
      cookies["stack-token-access-token"] ||
      // Also check handshake auth (client can pass token explicitly)
      socket.handshake.auth?.accessToken ||
      null;

    if (!rawToken) {
      return next(new Error("No Stack Auth session token in cookies"));
    }

    const token = decodeURIComponent(rawToken);
    const stackUser = await verifyStackAuthSession(token);

    if (!stackUser || !stackUser.primary_email) {
      return next(new Error("Invalid or expired Stack Auth session"));
    }

    // Look up local user by email
    if (!sql) {
      return next(new Error("Database not available"));
    }

    const localUsers = await sql`
      SELECT id, email, name, image, user_type, tenant_id
      FROM users WHERE email = ${stackUser.primary_email} LIMIT 1
    `;

    if (localUsers.length === 0) {
      return next(new Error("User not found in database. Please log in via the web app first."));
    }

    const localUser = localUsers[0];

    // Attach user data to socket for use in event handlers
    socket.data.userId = String(localUser.id);
    socket.data.email = localUser.email || null;
    socket.data.name = localUser.name || stackUser.display_name || null;
    socket.data.tenantId = localUser.tenant_id || null;
    socket.data.userType = localUser.user_type || null;

    return next();
  } catch (err) {
    console.error("[socket-auth] Unexpected error:", err.message);
    return next(new Error("Authentication failed"));
  }
}

// ─── Socket.io event handlers ─────────────────────────────────────────────────

function registerHandlers(io, socket) {
  const userId = socket.data.userId;
  const chatNs = io.of("/chat");

  // Join user's personal notification room
  socket.join(`user:${userId}`);

  // Update last_active_at on connect
  if (sql) {
    sql`UPDATE users SET last_active_at = NOW() WHERE id = ${userId}`.catch(
      (err) => console.error("[socket] last_active_at update error:", err.message)
    );
  }

  // ── conversation:join ──────────────────────────────────────────────────────
  // Client calls this after opening a conversation to start receiving real-time messages
  // and to mark existing messages as read.

  socket.on("conversation:join", async ({ conversationId }) => {
    if (!conversationId || !sql) return;

    try {
      const rows = await sql`
        SELECT participant_1, participant_2
        FROM conversations
        WHERE id = ${conversationId}
        LIMIT 1
      `;

      if (rows.length === 0) return;

      const conv = rows[0];
      const isParticipant =
        conv.participant_1 === userId || conv.participant_2 === userId;
      if (!isParticipant) {
        console.warn(`[socket] User ${userId} tried to join conversation ${conversationId} they're not part of`);
        return;
      }

      socket.join(`conversation:${conversationId}`);

      // Mark the other participant's messages as read
      const otherParticipant =
        conv.participant_1 === userId ? conv.participant_2 : conv.participant_1;

      await sql`
        UPDATE messages
        SET is_read = true
        WHERE conversation_id = ${conversationId}
          AND sender_id = ${otherParticipant}
          AND is_read = false
      `;

      // Reset this user's unread count
      if (conv.participant_1 === userId) {
        await sql`
          UPDATE conversations SET unread_count_1 = 0 WHERE id = ${conversationId}
        `;
      } else {
        await sql`
          UPDATE conversations SET unread_count_2 = 0 WHERE id = ${conversationId}
        `;
      }
    } catch (err) {
      console.error("[socket] conversation:join error:", err.message);
    }
  });

  // ── conversation:leave ────────────────────────────────────────────────────

  socket.on("conversation:leave", ({ conversationId }) => {
    if (conversationId) {
      socket.leave(`conversation:${conversationId}`);
    }
  });

  // ── message:send ──────────────────────────────────────────────────────────
  // Sends a message via WebSocket. Acknowledgement callback returns { ok, message } or { error }.

  socket.on("message:send", async (data, callback) => {
    const {
      conversationId,
      content,
      messageType = "text",
      fileUrl,
      fileName,
      fileSize,
    } = data || {};

    if (!conversationId || (!content && !fileUrl)) {
      if (typeof callback === "function") callback({ error: "Missing conversationId or message content" });
      return;
    }

    if (!sql) {
      if (typeof callback === "function") callback({ error: "Database not available" });
      return;
    }

    try {
      // Verify this user is a participant
      const convRows = await sql`
        SELECT participant_1, participant_2
        FROM conversations
        WHERE id = ${conversationId}
        LIMIT 1
      `;

      if (convRows.length === 0) {
        if (typeof callback === "function") callback({ error: "Conversation not found" });
        return;
      }

      const conv = convRows[0];
      const isP1 = conv.participant_1 === userId;
      const isP2 = conv.participant_2 === userId;

      if (!isP1 && !isP2) {
        if (typeof callback === "function") callback({ error: "Forbidden: not a participant" });
        return;
      }

      // Insert the message
      const msgRows = await sql`
        INSERT INTO messages (
          conversation_id, sender_id, content, message_type,
          file_url, file_name, file_size, is_read
        )
        VALUES (
          ${conversationId}, ${userId},
          ${content || null}, ${messageType},
          ${fileUrl || null}, ${fileName || null},
          ${fileSize || null}, false
        )
        RETURNING
          id, conversation_id, sender_id, content, message_type,
          file_url, file_name, file_size, is_read, created_at
      `;

      const msg = msgRows[0];

      // Build preview text for the conversation row
      const preview =
        messageType === "file"
          ? `[File] ${fileName || "attachment"}`
          : String(content || "").substring(0, 100);

      // Update conversation: bump the recipient's unread count
      if (isP1) {
        await sql`
          UPDATE conversations
          SET
            last_message_at = NOW(),
            last_message_preview = ${preview},
            unread_count_2 = unread_count_2 + 1,
            updated_at = NOW()
          WHERE id = ${conversationId}
        `;
      } else {
        await sql`
          UPDATE conversations
          SET
            last_message_at = NOW(),
            last_message_preview = ${preview},
            unread_count_1 = unread_count_1 + 1,
            updated_at = NOW()
          WHERE id = ${conversationId}
        `;
      }

      // Fetch sender info to include in the payload
      const senderRows = await sql`
        SELECT
          COALESCE(name, email, 'Unknown') AS display_name,
          image
        FROM users
        WHERE id = ${userId}
        LIMIT 1
      `;
      const senderName = String(senderRows[0]?.display_name || "Unknown");
      const senderImage = senderRows[0]?.image
        ? String(senderRows[0].image)
        : null;

      // Build the message payload for clients
      const messagePayload = {
        id: String(msg.id),
        conversationId: String(msg.conversation_id),
        senderId: String(msg.sender_id),
        content: msg.content != null ? String(msg.content) : null,
        messageType: String(msg.message_type || "text"),
        fileUrl: msg.file_url != null ? String(msg.file_url) : null,
        fileName: msg.file_name != null ? String(msg.file_name) : null,
        fileSize: msg.file_size != null ? Number(msg.file_size) : null,
        isRead: false,
        createdAt: new Date(msg.created_at).toISOString(),
        sender: {
          name: senderName,
          image: senderImage,
        },
      };

      // Broadcast to everyone currently in the conversation room
      chatNs.to(`conversation:${conversationId}`).emit("message:new", messagePayload);

      // Determine recipient and their current unread count
      const recipientId = isP1 ? conv.participant_2 : conv.participant_1;

      // Fetch updated unread count for recipient (we just incremented it above)
      let recipientUnread = 1;
      try {
        const unreadRows = await sql`
          SELECT unread_count_1, unread_count_2
          FROM conversations
          WHERE id = ${conversationId}
          LIMIT 1
        `;
        if (unreadRows[0]) {
          recipientUnread = isP1
            ? Number(unreadRows[0].unread_count_2 || 0)
            : Number(unreadRows[0].unread_count_1 || 0);
        }
      } catch {
        // Non-fatal - use 1 as fallback
      }

      // Notify recipient's personal room so their conversation list updates
      chatNs.to(`user:${recipientId}`).emit("conversation:updated", {
        conversationId,
        lastMessage: preview,
        lastMessageAt: messagePayload.createdAt,
        unreadCount: recipientUnread,
      });

      // Check if recipient has any active socket connections
      const recipientRoom = chatNs.adapter.rooms.get(`user:${recipientId}`);
      const recipientOnline = recipientRoom && recipientRoom.size > 0;

      if (!recipientOnline && sql) {
        // Recipient is offline. Check last_active_at to decide if we should log a
        // notification intent. Actual email sending is handled by the REST API route
        // (/api/messages/send) which has access to the React email templates.
        // Socket-sent messages bypass the REST route, so we log for observability.
        try {
          const statusRows = await sql`
            SELECT last_active_at FROM users WHERE id = ${recipientId} LIMIT 1
          `;
          const lastActive = statusRows[0]?.last_active_at;
          const recentlyActive =
            lastActive &&
            Date.now() - new Date(lastActive).getTime() < 5 * 60 * 1000;

          if (!recentlyActive) {
            console.log(
              `[socket] Recipient ${recipientId} is offline. ` +
                `Email notification should be triggered via REST /api/messages/send.`
            );
          }
        } catch {
          // Non-fatal
        }
      }

      if (typeof callback === "function") {
        callback({ ok: true, message: messagePayload });
      }
    } catch (err) {
      console.error("[socket] message:send error:", err.message);
      if (typeof callback === "function") {
        callback({ error: "Failed to send message" });
      }
    }
  });

  // ── message:typing ────────────────────────────────────────────────────────
  // Broadcasts typing indicator to all other participants in the room.

  socket.on("message:typing", ({ conversationId }) => {
    if (!conversationId) return;
    socket.to(`conversation:${conversationId}`).emit("message:typing", {
      userId,
      userName: socket.data.name || "Someone",
    });
  });

  // ── message:read ──────────────────────────────────────────────────────────
  // Called when a user opens/reads a conversation. Marks unread messages as read
  // and notifies the sender.

  socket.on("message:read", async ({ conversationId }) => {
    if (!conversationId || !sql) return;

    try {
      const convRows = await sql`
        SELECT participant_1, participant_2
        FROM conversations
        WHERE id = ${conversationId}
        LIMIT 1
      `;

      if (convRows.length === 0) return;

      const conv = convRows[0];
      if (conv.participant_1 !== userId && conv.participant_2 !== userId) return;

      const otherParticipant =
        conv.participant_1 === userId ? conv.participant_2 : conv.participant_1;

      // Mark the other user's messages as read
      await sql`
        UPDATE messages
        SET is_read = true
        WHERE conversation_id = ${conversationId}
          AND sender_id = ${otherParticipant}
          AND is_read = false
      `;

      // Reset this user's unread count
      if (conv.participant_1 === userId) {
        await sql`UPDATE conversations SET unread_count_1 = 0 WHERE id = ${conversationId}`;
      } else {
        await sql`UPDATE conversations SET unread_count_2 = 0 WHERE id = ${conversationId}`;
      }

      // Let the sender know their messages have been read
      socket.to(`conversation:${conversationId}`).emit("message:read", {
        conversationId,
        readBy: userId,
      });
    } catch (err) {
      console.error("[socket] message:read error:", err.message);
    }
  });

  // ── disconnect ────────────────────────────────────────────────────────────

  socket.on("disconnect", (reason) => {
    console.log(
      `[socket] User disconnected: ${userId} (${socket.data.name || socket.data.email || "unknown"}) - reason: ${reason}`
    );

    // Update last_active_at so polling-based online status picks this up
    if (sql) {
      sql`UPDATE users SET last_active_at = NOW() WHERE id = ${userId}`.catch(
        () => {}
      );
    }

    // Check if user still has other active connections before broadcasting offline
    // (user may have multiple browser tabs open)
    const userRoom = chatNs.adapter.rooms.get(`user:${userId}`);
    const stillConnected = userRoom && userRoom.size > 0;

    if (!stillConnected) {
      chatNs.emit("user:status", { userId, isOnline: false });
    }
  });
}

// ─── Main bootstrap ───────────────────────────────────────────────────────────

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    path: "/socket.io",
    cors: {
      origin: dev
        ? ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000"]
        : [
            process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com",
            "https://skilllinkup.com",
            "https://www.skilllinkup.com",
            "https://skilllinkup-production.up.railway.app",
          ],
      credentials: true,
    },
    // Prefer WebSocket but allow polling fallback
    transports: ["websocket", "polling"],
    // Increase ping timeout for reliability over slower connections
    pingTimeout: 30000,
    pingInterval: 10000,
  });

  // ── Redis adapter (optional, for multi-instance deployments) ────────────────
  const redisUrl = process.env.REDIS_URL;
  if (redisUrl) {
    try {
      const { createAdapter } = require("@socket.io/redis-adapter");
      const Redis = require("ioredis");

      const pubClient = new Redis(redisUrl, {
        // Enable TLS for rediss:// (Upstash requires TLS in production)
        tls: redisUrl.startsWith("rediss://") ? {} : undefined,
        lazyConnect: true,
        // Reconnect strategy: exponential backoff up to 30s
        retryStrategy: (times) => Math.min(times * 500, 30000),
      });
      const subClient = pubClient.duplicate();

      Promise.all([pubClient.connect(), subClient.connect()])
        .then(() => {
          io.adapter(createAdapter(pubClient, subClient));
          console.log("[server] Redis adapter connected (Upstash)");
        })
        .catch((err) => {
          console.warn(
            "[server] Redis adapter connection failed, falling back to in-memory adapter:",
            err.message
          );
        });

      pubClient.on("error", (err) =>
        console.error("[redis] pub error:", err.message)
      );
      subClient.on("error", (err) =>
        console.error("[redis] sub error:", err.message)
      );
    } catch (err) {
      console.warn(
        "[server] @socket.io/redis-adapter or ioredis not available:",
        err.message
      );
    }
  } else {
    console.log(
      "[server] No REDIS_URL configured - using in-memory adapter (single instance only)"
    );
  }

  // ── /chat namespace with authentication ─────────────────────────────────────

  const chatNs = io.of("/chat");
  chatNs.use(authenticateSocket);

  chatNs.on("connection", (socket) => {
    const { userId, name, email } = socket.data;
    console.log(
      `[socket] Connected: ${userId} (${name || email || "unknown"})`
    );

    // Broadcast online status to all connected clients
    chatNs.emit("user:status", { userId, isOnline: true });

    registerHandlers(io, socket);
  });

  // ── Periodic last_active_at heartbeat ────────────────────────────────────
  // Keeps last_active_at fresh for all currently connected users.
  // Used by the REST API for email throttling ("don't email if active in last 5 min").

  setInterval(() => {
    if (!sql) return;

    const activeSockets = chatNs.sockets;
    const activeUserIds = new Set();
    for (const [, socket] of activeSockets) {
      if (socket.data.userId) {
        activeUserIds.add(socket.data.userId);
      }
    }

    for (const uid of activeUserIds) {
      sql`UPDATE users SET last_active_at = NOW() WHERE id = ${uid}`.catch(
        () => {}
      );
    }
  }, 60_000); // Every 60 seconds

  // ── Start listening ──────────────────────────────────────────────────────

  httpServer.listen(port, hostname, () => {
    console.log("");
    console.log(`  SkillLinkup server ready`);
    console.log(`  URL:      http://${hostname === "0.0.0.0" ? "localhost" : hostname}:${port}`);
    console.log(`  Socket:   ws://localhost:${port}/chat  (namespace: /chat)`);
    console.log(`  Mode:     ${dev ? "development" : "production"}`);
    console.log(`  Database: ${dbUrl ? "connected" : "NOT configured"}`);
    console.log(`  Redis:    ${redisUrl ? redisUrl.replace(/:\/\/.*@/, "://***@") : "not configured (in-memory)"}`);
    console.log("");
  });
});
