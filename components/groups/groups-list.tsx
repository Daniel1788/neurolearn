"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, ArrowRight, Lock, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Tables } from "@/types/supabase" // Import type for Supabase tables

interface Group extends Tables<"groups"> {
  memberCount?: number
  group_members?: { count: number }[] // Add this to match the Supabase select result
}

interface GroupsListProps {
  groups: Group[]
}

export function GroupsList({ groups }: GroupsListProps) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">Nu ești membru în niciun grup</h3>
        <p className="text-muted-foreground mb-6">
          Creează un grup nou, alătură-te unui grup existent folosind un cod de invitație sau descoperă grupuri publice.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group, index) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{group.name}</CardTitle>
                {group.is_private ? (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    Privat
                  </Badge>
                ) : (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    Public
                  </Badge>
                )}
              </div>
              <CardDescription className="line-clamp-2">{group.description || "Fără descriere"}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span>
                  {group.memberCount ?? 0} {group.memberCount === 1 ? "membru" : "membri"}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/grupuri/${group.id}`}>
                  <span className="mr-2">Vezi grupul</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
