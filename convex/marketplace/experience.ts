import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";

const workValidator = v.object({
  _id: v.id("workExperience"),
  _creationTime: v.number(),
  userId: v.id("users"),
  tenantId: v.id("tenants"),
  company: v.string(),
  title: v.string(),
  startDate: v.number(),
  endDate: v.optional(v.number()),
  isCurrent: v.optional(v.boolean()),
  description: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const educationValidator = v.object({
  _id: v.id("education"),
  _creationTime: v.number(),
  userId: v.id("users"),
  tenantId: v.id("tenants"),
  school: v.string(),
  degree: v.optional(v.string()),
  field: v.optional(v.string()),
  startYear: v.optional(v.number()),
  endYear: v.optional(v.number()),
  description: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const certificationValidator = v.object({
  _id: v.id("userCertifications"),
  _creationTime: v.number(),
  userId: v.id("users"),
  tenantId: v.id("tenants"),
  name: v.string(),
  issuer: v.optional(v.string()),
  year: v.optional(v.number()),
  url: v.optional(v.string()),
  createdAt: v.number(),
});

function validateText(value: string | undefined, label: string, max = 200) {
  if (value === undefined) return;
  const length = value.trim().length;
  if (length < 2 || length > max) throw new Error(`${label} must be between 2 and ${max} characters.`);
}

function validateDescription(value?: string) {
  if (value && value.length > 3000) throw new Error("Description is too long.");
}

export const getWorkExperience = query({
  args: { userId: v.id("users") },
  returns: v.array(workValidator),
  handler: async (ctx, args) =>
    ctx.db.query("workExperience").withIndex("by_user", (q) => q.eq("userId", args.userId)).order("desc").take(100),
});

export const addWorkExperience = mutation({
  args: {
    company: v.string(),
    title: v.string(),
    startDate: v.number(),
    endDate: v.optional(v.number()),
    isCurrent: v.optional(v.boolean()),
    description: v.optional(v.string()),
  },
  returns: v.id("workExperience"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    validateText(args.company, "Company");
    validateText(args.title, "Title");
    validateDescription(args.description);
    if (args.endDate && args.endDate < args.startDate) throw new Error("End date cannot precede start date.");
    const now = Date.now();
    return ctx.db.insert("workExperience", {
      ...args,
      company: args.company.trim(),
      title: args.title.trim(),
      description: args.description?.trim(),
      userId: user._id,
      tenantId: user.tenantId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateWorkExperience = mutation({
  args: {
    id: v.id("workExperience"),
    company: v.optional(v.string()),
    title: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    isCurrent: v.optional(v.boolean()),
    description: v.optional(v.string()),
  },
  returns: v.id("workExperience"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const { id, ...fields } = args;
    const record = await ctx.db.get(id);
    if (!record) throw new Error("Work experience not found.");
    if (record.userId !== user._id) throw new Error("Unauthorized.");
    validateText(fields.company, "Company");
    validateText(fields.title, "Title");
    validateDescription(fields.description);
    const startDate = fields.startDate ?? record.startDate;
    const endDate = fields.endDate ?? record.endDate;
    if (endDate && endDate < startDate) throw new Error("End date cannot precede start date.");
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    if (fields.company !== undefined) patch.company = fields.company.trim();
    if (fields.title !== undefined) patch.title = fields.title.trim();
    if (fields.startDate !== undefined) patch.startDate = fields.startDate;
    if (fields.endDate !== undefined) patch.endDate = fields.endDate;
    if (fields.isCurrent !== undefined) patch.isCurrent = fields.isCurrent;
    if (fields.description !== undefined) patch.description = fields.description.trim();
    await ctx.db.patch(id, patch);
    return id;
  },
});

export const removeWorkExperience = mutation({
  args: { id: v.id("workExperience") },
  returns: v.id("workExperience"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const record = await ctx.db.get(args.id);
    if (!record) throw new Error("Work experience not found.");
    if (record.userId !== user._id) throw new Error("Unauthorized.");
    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const getEducation = query({
  args: { userId: v.id("users") },
  returns: v.array(educationValidator),
  handler: async (ctx, args) =>
    ctx.db.query("education").withIndex("by_user", (q) => q.eq("userId", args.userId)).order("desc").take(100),
});

export const addEducation = mutation({
  args: {
    school: v.string(),
    degree: v.optional(v.string()),
    field: v.optional(v.string()),
    startYear: v.optional(v.number()),
    endYear: v.optional(v.number()),
    description: v.optional(v.string()),
  },
  returns: v.id("education"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    validateText(args.school, "School");
    validateText(args.degree, "Degree");
    validateText(args.field, "Field");
    validateDescription(args.description);
    if (args.startYear && args.endYear && args.endYear < args.startYear) throw new Error("End year cannot precede start year.");
    const now = Date.now();
    return ctx.db.insert("education", {
      ...args,
      school: args.school.trim(),
      degree: args.degree?.trim(),
      field: args.field?.trim(),
      description: args.description?.trim(),
      userId: user._id,
      tenantId: user.tenantId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateEducation = mutation({
  args: {
    id: v.id("education"),
    school: v.optional(v.string()),
    degree: v.optional(v.string()),
    field: v.optional(v.string()),
    startYear: v.optional(v.number()),
    endYear: v.optional(v.number()),
    description: v.optional(v.string()),
  },
  returns: v.id("education"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const { id, ...fields } = args;
    const record = await ctx.db.get(id);
    if (!record) throw new Error("Education not found.");
    if (record.userId !== user._id) throw new Error("Unauthorized.");
    validateText(fields.school, "School");
    validateText(fields.degree, "Degree");
    validateText(fields.field, "Field");
    validateDescription(fields.description);
    const startYear = fields.startYear ?? record.startYear;
    const endYear = fields.endYear ?? record.endYear;
    if (startYear && endYear && endYear < startYear) throw new Error("End year cannot precede start year.");
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    if (fields.school !== undefined) patch.school = fields.school.trim();
    if (fields.degree !== undefined) patch.degree = fields.degree.trim();
    if (fields.field !== undefined) patch.field = fields.field.trim();
    if (fields.startYear !== undefined) patch.startYear = fields.startYear;
    if (fields.endYear !== undefined) patch.endYear = fields.endYear;
    if (fields.description !== undefined) patch.description = fields.description.trim();
    await ctx.db.patch(id, patch);
    return id;
  },
});

export const removeEducation = mutation({
  args: { id: v.id("education") },
  returns: v.id("education"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const record = await ctx.db.get(args.id);
    if (!record) throw new Error("Education not found.");
    if (record.userId !== user._id) throw new Error("Unauthorized.");
    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const getCertifications = query({
  args: { userId: v.id("users") },
  returns: v.array(certificationValidator),
  handler: async (ctx, args) =>
    ctx.db.query("userCertifications").withIndex("by_user", (q) => q.eq("userId", args.userId)).order("desc").take(100),
});

export const addCertification = mutation({
  args: {
    name: v.string(),
    issuer: v.optional(v.string()),
    year: v.optional(v.number()),
    url: v.optional(v.string()),
  },
  returns: v.id("userCertifications"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    validateText(args.name, "Certification");
    validateText(args.issuer, "Issuer");
    if (args.url && args.url.length > 500) throw new Error("Certification URL is too long.");
    return ctx.db.insert("userCertifications", {
      ...args,
      name: args.name.trim(),
      issuer: args.issuer?.trim(),
      url: args.url?.trim(),
      userId: user._id,
      tenantId: user.tenantId,
      createdAt: Date.now(),
    });
  },
});

export const removeCertification = mutation({
  args: { id: v.id("userCertifications") },
  returns: v.id("userCertifications"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const record = await ctx.db.get(args.id);
    if (!record) throw new Error("Certification not found.");
    if (record.userId !== user._id) throw new Error("Unauthorized.");
    await ctx.db.delete(args.id);
    return args.id;
  },
});
