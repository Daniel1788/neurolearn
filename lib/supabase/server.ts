import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { CookieOptions } from "@supabase/ssr"
import type { Database } from "@/types/supabase"

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}
