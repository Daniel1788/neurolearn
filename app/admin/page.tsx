import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin/admin-dashboard"
import Layout from "@/components/layout"

export default async function AdminPage() {
  const supabase = createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 space-y-8">
        <AdminDashboard />
      </div>
    </Layout>
  )
}
