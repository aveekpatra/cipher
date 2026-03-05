import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("content").first();
  },
});

export const updateSection = mutation({
  args: {
    language: v.union(v.literal("en"), v.literal("fr"), v.literal("es")),
    section: v.string(),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const content = await ctx.db.query("content").first();
    if (!content) throw new Error("Content not found. Run seed first.");
    const langData = { ...content[args.language] };
    langData[args.section] = args.data;
    await ctx.db.patch(content._id, { [args.language]: langData });
  },
});
