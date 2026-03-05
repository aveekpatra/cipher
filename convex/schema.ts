import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  content: defineTable({
    en: v.any(),
    fr: v.any(),
    es: v.any(),
  }),

  images: defineTable({
    key: v.string(),
    storageId: v.optional(v.id("_storage")),
    url: v.string(),
    alt: v.string(),
  }).index("by_key", ["key"]),
});
