import { action } from "./_generated/server";
import { v } from "convex/values";

export const verifyPassword = action({
  args: { password: v.string() },
  handler: async (_ctx, args) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) throw new Error("ADMIN_PASSWORD not configured");
    return args.password === adminPassword;
  },
});
