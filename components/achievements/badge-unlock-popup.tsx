"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Award, Star, Share2, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react"
import confetti from "canvas-confetti"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { createClientSupabaseClient } from "@/lib/supabase/client"

interface BadgeInfo {
  id: string
  name: string
  description: string
  color: string
  icon: React.ReactNode
  shareText: string
  xp_reward?: number
}

interface BadgeUnlockPopupProps {
  // Support both the old and new API
  badgeId?: string
  badge?: BadgeInfo | null
  open?: boolean
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
}

export function BadgeUnlockPopup({
  badgeId,
  badge: propsBadge,
  open,
  isOpen,
  onOpenChange,
  onClose,
}: BadgeUnlockPopupProps) {
  const [badge, setBadge] = useState<BadgeInfo | null>(propsBadge || null)
  const [copied, setCopied] = useState(false)
  const supabase = createClientSupabaseClient()

  // Determine if the dialog should be open
  const dialogOpen = open !== undefined ? open : isOpen !== undefined ? isOpen : false

  // Handle dialog close
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) onOpenChange(newOpen)
    if (!newOpen && onClose) onClose()
  }

  useEffect(() => {
    // If we have a badge from props, use it
    if (propsBadge) {
      setBadge(propsBadge)
      return
    }

    // If we have a badgeId, fetch or create the badge info
    if (badgeId && dialogOpen) {
      // First try to fetch from database
      const fetchBadge = async () => {
        const { data } = await supabase.from("badges").select("*").eq("id", badgeId).single()

        if (data) {
          setBadge({
            id: data.id,
            name: data.name,
            description: data.description,
            color: data.color || "bg-primary",
            icon: <Award className="h-6 w-6" />,
            shareText: `Am deblocat insigna "${data.name}" în aplicația de învățare! ${data.xp_reward || 0} XP câștigați! 🎉`,
            xp_reward: data.xp_reward,
          })
        } else {
          // Fallback to hardcoded badges
          setBadge(getBadgeInfo(badgeId))
        }
      }

      fetchBadge()

      // Trigger confetti when the dialog opens
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [badgeId, dialogOpen, propsBadge, supabase])

  const getBadgeInfo = (id: string): BadgeInfo => {
    // This would ideally come from a database or a more comprehensive mapping
    const badges: Record<string, BadgeInfo> = {
      first_lesson: {
        id: "first_lesson",
        name: "Prima lecție",
        description: "Ai finalizat prima ta lecție",
        color: "bg-green-500",
        icon: <Award className="h-6 w-6" />,
        shareText: "Tocmai am finalizat prima mea lecție pe NeuroLearn! 🎓 #NeuroLearn #ÎnvățarePersonalizată",
      },
      pomodoro_master: {
        id: "pomodoro_master",
        name: "Maestru Pomodoro",
        description: "Ai folosit tehnica Pomodoro de 10 ori",
        color: "bg-red-400",
        icon: <Award className="h-6 w-6" />,
        shareText:
          "Am devenit Maestru Pomodoro pe NeuroLearn după 10 sesiuni de studiu eficiente! ⏱️ #NeuroLearn #Pomodoro",
      },
      task_master: {
        id: "task_master",
        name: "Organizator Eficient",
        description: "Ai finalizat 10 sarcini",
        color: "bg-blue-500",
        icon: <Award className="h-6 w-6" />,
        shareText:
          "Am primit insigna de Organizator Eficient pe NeuroLearn după ce am finalizat 10 sarcini! ✅ #NeuroLearn #Productivitate",
      },
      // Add more badges as needed
    }

    return (
      badges[id] || {
        id,
        name: "Insignă nouă",
        description: "Ai deblocat o nouă insignă!",
        color: "bg-accent",
        icon: <Star className="h-6 w-6" />,
        shareText: "Am deblocat o nouă insignă pe NeuroLearn! 🏆 #NeuroLearn",
      }
    )
  }

  const handleShare = (platform: "twitter" | "facebook" | "linkedin") => {
    if (!badge) return

    const text = encodeURIComponent(badge.shareText)
    const url = encodeURIComponent(window.location.origin)

    let shareUrl = ""
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`
        break
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  const copyToClipboard = () => {
    if (!badge) return

    navigator.clipboard.writeText(badge.shareText).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast({
          title: "Copiat!",
          description: "Textul a fost copiat în clipboard.",
        })
      },
      (err) => {
        console.error("Nu s-a putut copia textul: ", err)
      },
    )
  }

  // Don't render anything if we don't have a badge
  if (!badge) return null

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Insignă deblocată!</DialogTitle>
          <DialogDescription className="text-center">
            Felicitări! Ai deblocat o nouă insignă pentru progresul tău.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className={`w-24 h-24 rounded-full ${badge.color} flex items-center justify-center mb-4`}
          >
            {badge.icon}
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
            <p className="text-muted-foreground">{badge.description}</p>
            {badge.xp_reward && (
              <div className="mt-2 inline-block bg-primary/10 text-primary font-medium rounded-full px-3 py-1">
                +{badge.xp_reward} XP
              </div>
            )}
          </motion.div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Share2 className="mr-2 h-4 w-4" />
                Distribuie
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleShare("twitter")}>
                <Twitter className="mr-2 h-4 w-4" />
                <span>Twitter</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("facebook")}>
                <Facebook className="mr-2 h-4 w-4" />
                <span>Facebook</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                <Linkedin className="mr-2 h-4 w-4" />
                <span>LinkedIn</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={copyToClipboard}>
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                <span>Copiază text</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => handleOpenChange(false)} className="w-full sm:w-auto">
            Continuă
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
