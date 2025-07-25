"use client"
import { useState } from "react"
import Layout from "@/components/layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PomodoroTimer } from "@/components/tools/pomodoro-timer"
import { SoundGenerator } from "@/components/tools/sound-generator"
import { FeynmanTechnique } from "@/components/tools/feynman-technique"
import { SpacedRepetition } from "@/components/tools/spaced-repetition"
import { SQ3RMethod } from "@/components/tools/sq3r-method"
import { StudyCompletionPopup } from "@/components/ui/study-completion-popup"
import { motion } from "framer-motion"

export default function UneltePage() {
  const [showCompletionPopup, setShowCompletionPopup] = useState(false)
  const [completedMethod, setCompletedMethod] = useState("")

  const handleMethodComplete = (methodName: string) => {
    setCompletedMethod(methodName)
    setShowCompletionPopup(true)
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold">Unelte de studiu</h1>
          <p className="text-muted-foreground">
            Folosește aceste instrumente pentru a-ți îmbunătăți experiența de învățare
          </p>
        </div>

        {/* Bauhaus-inspired decorative elements */}
        <div className="fixed -z-10 top-40 left-20 w-40 h-40 bg-primary/10 rounded-full opacity-30 animate-pulse"></div>
        <div className="fixed -z-10 bottom-20 right-40 w-60 h-60 bg-accent/10 rounded-full opacity-30 animate-pulse"></div>
        <div className="fixed -z-10 top-1/3 right-1/4 w-20 h-20 bg-primary/10 rotate-45 opacity-30"></div>

        <Tabs defaultValue="pomodoro" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger
              value="pomodoro"
              className="transition-all hover:bg-accent/20 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Pomodoro
            </TabsTrigger>
            <TabsTrigger
              value="feynman"
              className="transition-all hover:bg-accent/20 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Feynman
            </TabsTrigger>
            <TabsTrigger
              value="spaced"
              className="transition-all hover:bg-accent/20 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Repetiție
            </TabsTrigger>
            <TabsTrigger
              value="sq3r"
              className="transition-all hover:bg-accent/20 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              SQ3R
            </TabsTrigger>
            <TabsTrigger
              value="sounds"
              className="transition-all hover:bg-accent/20 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Sunete
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pomodoro">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <PomodoroTimer onComplete={() => handleMethodComplete("Pomodoro Timer")} />
            </motion.div>
          </TabsContent>

          <TabsContent value="feynman">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <FeynmanTechnique onComplete={() => handleMethodComplete("Tehnica Feynman")} />
            </motion.div>
          </TabsContent>

          <TabsContent value="spaced">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <SpacedRepetition onComplete={() => handleMethodComplete("Repetiția Spațiată")} />
            </motion.div>
          </TabsContent>

          <TabsContent value="sq3r">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <SQ3RMethod onComplete={() => handleMethodComplete("Metoda SQ3R")} />
            </motion.div>
          </TabsContent>

          <TabsContent value="sounds">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <SoundGenerator />
            </motion.div>
          </TabsContent>
        </Tabs>

        <StudyCompletionPopup
          open={showCompletionPopup}
          onOpenChange={setShowCompletionPopup}
          methodName={completedMethod}
        />
      </div>
    </Layout>
  )
}
