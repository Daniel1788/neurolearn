import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

/**
 * POST /api/delete-account
 * Body: { userId: string }
 *
 * Uses the service-role key to:
 *   1. run delete_user_completely(p_user_id)
 *   2. remove the user from auth.users
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = (await req.json()) as { userId?: string }

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env
    if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Server mis-config" }, { status: 500 })
    }

    const admin = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    /* 1. Delete all user-generated data */
    const { error: rpcError } = await admin.rpc("delete_user_completely", {
      p_user_id: userId,
    })
    if (rpcError) {
      console.error("delete_user_completely:", rpcError)
      return NextResponse.json({ error: "Eroare la ștergerea datelor utilizatorului" }, { status: 500 })
    }

    /* 2. Remove user from auth.users */
    const { error: authError } = await admin.auth.admin.deleteUser(userId)
    if (authError) {
      console.error("auth deleteUser:", authError)
      return NextResponse.json({ error: "Eroare la ștergerea contului Auth" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("delete-account route:", e)
    // ALWAYS return JSON so the client never breaks on .json()
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}
