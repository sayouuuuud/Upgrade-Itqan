import { auth } from "@/lib/better-auth-config"
import { toNextJsHandler } from "better-auth/next-js"

/**
 * Better Auth API Routes
 * Catch-all handler for all authentication requests: login, signup, logout, etc.
 */

export const { GET, POST } = toNextJsHandler(auth)
