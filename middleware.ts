import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  // Use getUser instead of getSession for better security
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // Check auth condition
  if (!user) {
    // If the user is not signed in and the current path is not / or doesn't start with /login or /register
    if (
      request.nextUrl.pathname !== "/" &&
      !request.nextUrl.pathname.startsWith("/login") &&
      !request.nextUrl.pathname.startsWith("/register")
    ) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  } else {
    // If user is signed in and the current path is /login or /register
    if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Skip quiz check for API routes and the quiz page itself
    if (request.nextUrl.pathname.startsWith("/api/") || request.nextUrl.pathname === "/quiz") {
      return response
    }

    // Only redirect to quiz if email is confirmed and learning_style is null
    if (user.email_confirmed_at) {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("learning_style")
          .eq("id", user.id)
          .single()

        // If there's no profile or learning_style is null/empty, redirect to quiz
        if (error || !profile || profile.learning_style === null) {
          // Only redirect if not already on the quiz page
          if (request.nextUrl.pathname !== "/quiz") {
            return NextResponse.redirect(new URL("/quiz", request.url))
          }
        }
      } catch (error) {
        console.error("Error checking profile:", error)
      }
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
}
