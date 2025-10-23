# SkillLinkup Orchestration System

This directory contains the Claude Code Agent Orchestration System v2 for managing complex development tasks.

## 🎯 Quick Start

### Test the System

Try this simple task to see the orchestration in action:

```bash
# In your Claude Code session
"Add a loading spinner to the homepage"
```

Claude will automatically:
1. Create todos with `TodoWrite`
2. Delegate implementation to `@coder`
3. Verify with `@tester` using Playwright screenshots
4. Mark complete and move to next task

### Example: Complex Feature

```bash
"Build a comment system for blog posts with:
- Database schema for comments
- API endpoints (POST, GET, DELETE)
- Comment form component
- Nested replies
- Author avatars"
```

Claude will:
1. Break down into ~8-10 todos
2. Implement one at a time via @coder
3. Visually verify each via @tester
4. Ask you via @stuck if any issues arise

## 🤖 Available Agents

### Check Available Agents

```bash
/agents
```

You should see:
- ✅ **coder** - Implementation specialist
- ✅ **tester** - QA with Playwright
- ✅ **stuck** - Human escalation

### Invoke Agents Manually

```bash
# Delegate specific task to coder
@coder add pagination to the platform list page

# Test specific feature
@tester verify the contact form works on mobile

# Ask for human decision
@stuck I'm unsure about database migration strategy
```

## 📋 Todo Management

### View Current Todos

```bash
/todos
```

### How Todos Work

1. **Claude creates** - Using TodoWrite for any multi-step task
2. **Agents implement** - One todo at a time
3. **Tester verifies** - Visual + functional testing
4. **Claude marks complete** - After successful verification
5. **Move to next** - Rinse and repeat

Example todo list:
```
✅ Set up database schema
🔄 Create API endpoints (in_progress)
📋 Add frontend form (pending)
📋 Test submission flow (pending)
📋 Add error handling (pending)
```

## 🔥 Real-World Examples

### Example 1: Add Newsletter Popup

**You say:**
```
"Add a newsletter popup that appears after 30 seconds on the homepage"
```

**Orchestration flow:**
```
Claude creates todos:
  1. Create popup component with form
  2. Add timer logic (30s delay)
  3. Integrate with Resend API
  4. Add dismiss/close functionality
  5. Test popup timing and form submission

@coder implements todo #1
  → Creates NewsletterPopup.tsx
  → Reports completion

@tester verifies
  → Takes screenshot of popup
  → Tests form fields
  → Reports success ✓

Claude marks #1 complete, moves to #2

@coder implements todo #2
  → Adds useEffect with setTimeout
  → Reports completion

@tester verifies
  → Uses Playwright to wait 30s
  → Screenshots popup appearing
  → Reports success ✓

... continues through all todos
```

### Example 2: When Things Go Wrong

**You say:**
```
"Add Stripe payment integration"
```

**What happens:**
```
Claude creates todos:
  1. Install Stripe SDK
  2. Create checkout API
  3. Build payment form
  ...

@coder starts todo #1
  → Tries to install @stripe/stripe-js
  → Encounters: Need STRIPE_PUBLIC_KEY

@coder invokes @stuck:

🆘 ESCALATION NEEDED

Agent: @coder
Task: Install Stripe SDK

Problem: Need STRIPE_PUBLIC_KEY and STRIPE_SECRET_KEY

Options:
1. Get keys from Stripe Dashboard → Add to .env.local
2. Use Stripe test mode → Add test keys
3. Mock Stripe for now → Implement later
4. Other approach

What would you like to do?

You choose: "Option 2 - test mode"

@stuck returns decision to @coder

@coder proceeds with test keys
  → Continues implementation
  → Reports completion

@tester verifies
  → Tests payment flow
  → Screenshots checkout
  → Reports success ✓
```

## 🎨 Visual Testing with Playwright

The `@tester` agent uses Playwright MCP for visual verification:

### What Gets Tested

- ✅ Layout renders correctly
- ✅ Components load properly
- ✅ Forms submit successfully
- ✅ Navigation works
- ✅ Responsive on mobile
- ✅ No console errors

### Screenshot Examples

Screenshots are saved with descriptive names:
```
.playwright-mcp/
  ├── homepage-initial.png
  ├── newsletter-popup-visible.png
  ├── form-submitted-success.png
  └── mobile-responsive-test.png
```

## 🛡️ Safety Features

### No Fallbacks Rule

Every agent must invoke `@stuck` instead of:
- ❌ Guessing solutions
- ❌ Using workarounds
- ❌ Making assumptions
- ❌ Trying alternatives blindly

You stay in control of ALL decisions.

### Project-Specific Safety

The agents know about SkillLinkup's safety patterns:

```typescript
// ✅ They will use safe helpers
import { safeImage, safeText } from '../lib/safe';

// ✅ They will await params in Next.js 15
const { slug } = await params;

// ✅ They will add dynamic exports
export const dynamic = 'force-dynamic';
```

## 🎯 Best Practices

### 1. Start with Clear Requirements

❌ "Make it better"
✅ "Add filter dropdowns for category and difficulty on /platforms page"

### 2. Trust the Process

Let Claude create the todos. Don't micromanage - the orchestrator knows the flow.

### 3. Review Screenshots

When @tester reports success, check the screenshots to verify visually.

### 4. Make Decisions Quickly

When @stuck asks, choose an option. The agents are waiting.

### 5. Check Todo Progress

Use `/todos` anytime to see where you are in the project.

## 🔧 Troubleshooting

### "Agents not showing in /agents"

Restart Claude Code:
```bash
# Exit current session
exit

# Start fresh
cd /home/marvin/Documenten/skillLinkup
claude
```

### "Playwright not working"

Test the MCP server:
```bash
# Check if Playwright MCP is enabled
/mcp

# Should show "playwright" as enabled
```

If not, the `.mcp.json` configures it automatically on next restart.

### "Todos not persisting"

Todos are session-based. For long-running projects, use:
```bash
/task create "Build comment system"
```

This creates persistent cross-session tasks.

## 📚 Learn More

### Agent Files

Each agent has detailed instructions:
- `.claude/agents/coder.md` - Implementation patterns
- `.claude/agents/tester.md` - Testing strategies
- `.claude/agents/stuck.md` - Escalation examples

### Orchestrator Instructions

The main orchestrator instructions are in:
- `.claude/CLAUDE.md` - Complete workflow and examples

## 🎉 Example Session

Here's a complete example session:

```bash
$ claude

You: "Add category badges to platform cards with colors and hover effects"

Claude: "I'll create a todo list for this feature"

[TodoWrite creates 4 todos]

Todos created:
  1. Add category badges to platform card component
  2. Create color mapping for categories
  3. Add hover effects with Tailwind
  4. Test visual appearance on all platforms

Claude: "@coder implement todo #1: Add category badges..."

[Coder works in clean context]

Coder: "✅ Added badges to PlatformCard.tsx, ready for testing"

Claude: "@tester verify category badges appear on platform cards"

[Tester uses Playwright]

Tester: "✅ Verified - badges render correctly
  - Screenshot: platform-cards-with-badges.png
  - All categories showing
  - Layout intact"

Claude: "Todo #1 complete! Moving to #2..."

[Continues through all todos]

Claude: "All 4 todos completed ✓
  - Category badges added
  - Colors mapped
  - Hover effects working
  - Visually tested
  Project complete!"
```

## 🚀 Ready to Go!

Your orchestration system is ready. Start with a simple task:

```bash
"Add a dark mode toggle to the header"
```

Watch as Claude creates todos, delegates to @coder, verifies with @tester, and delivers a complete, tested feature.

**The future of development is orchestrated.** 🎭
