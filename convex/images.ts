import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("images").collect();
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const updateImage = mutation({
  args: {
    key: v.string(),
    storageId: v.id("_storage"),
    alt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("images")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("Failed to get storage URL");

    if (existing) {
      if (existing.storageId) {
        await ctx.storage.delete(existing.storageId);
      }
      await ctx.db.patch(existing._id, {
        storageId: args.storageId,
        url,
        ...(args.alt !== undefined ? { alt: args.alt } : {}),
      });
    } else {
      await ctx.db.insert("images", {
        key: args.key,
        storageId: args.storageId,
        url,
        alt: args.alt ?? "",
      });
    }
  },
});
