import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const requestData = await request.json()
    const { userId } = requestData

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get the current user to verify they're deleting their own account
    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify the user is deleting their own account
    if (user.id !== userId) {
      return NextResponse.json({ error: "You can only delete your own account" }, { status: 403 })
    }

    // Create a new Supabase client with the service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing environment variables:", {
        hasUrl: !!supabaseUrl,
        hasServiceKey: !!serviceRoleKey,
      })
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Create a direct Supabase client with the service role key
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Delete the user from auth.users
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) {
      console.error("Error deleting auth user:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error in delete-user route:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
