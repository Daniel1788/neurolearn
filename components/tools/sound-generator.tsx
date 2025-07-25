"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Volume2, VolumeX, CloudRain, Wind, Waves } from "lucide-react"

type SoundType = "white" | "pink" | "brown" | "rain" | "waves" | "wind"

interface Sound {
  id: SoundType
  name: string
  icon: React.ElementType
  description: string
}

const sounds: Sound[] = [
  {
    id: "white",
    name: "White Noise",
    icon: Volume2,
    description: "Uniform noise that masks distracting sounds",
  },
  {
    id: "pink",
    name: "Pink Noise",
    icon: Volume2,
    description: "Balanced noise that sounds more natural",
  },
  {
    id: "brown",
    name: "Brown Noise",
    icon: Volume2,
    description: "Deep, low frequency noise for deep focus",
  },
  {
    id: "rain",
    name: "Rain Sounds",
    icon: CloudRain,
    description: "Gentle rainfall for relaxation",
  },
  {
    id: "waves",
    name: "Ocean Waves",
    icon: Waves,
    description: "Calming ocean waves",
  },
  {
    id: "wind",
    name: "Wind Sounds",
    icon: Wind,
    description: "Gentle wind through trees",
  },
]



export function SoundGenerator() {
  const [activeSound, setActiveSound] = useState<SoundType | null>(null)
  const [volume, setVolume] = useState(70)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

    const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Update volume when it changes
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

    useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const playSound = async (soundType: SoundType) => {
    setError(null)

    // If clicking the active sound, stop it
    if (activeSound === soundType) {
      stopSound()
      setActiveSound(null)
      return
    }

    // Stop current sound if playing
    stopSound()

    // Start loading new sound
    setIsLoading(true)

    try {
      // Create new audio element
      const audio = new Audio()
      audioRef.current = audio

      // Set up audio properties
      audio.loop = true
      audio.volume = volume / 100
      audio.crossOrigin = "anonymous"

      // Set up event listeners
      audio.addEventListener("loadstart", () => {
        setIsLoading(true)
      })

      audio.addEventListener("canplaythrough", () => {
        setIsLoading(false)
        setActiveSound(soundType)
      })

      audio.addEventListener("error", (e) => {
        console.error("Audio error:", e)
        setError(`Nu s-a putut încărca sunetul: ${soundType}`)
        setIsLoading(false)
        setActiveSound(null)
      })

      audio.addEventListener("ended", () => {
        // This shouldn't happen with loop=true, but just in case
        setActiveSound(null)
      })

      // Load and play the audio file
      audio.src = `/sounds/${soundType}.mp3`

      try {
        await audio.play()
      } catch (playError) {
        console.error("Play error:", playError)
        setError(`Nu s-a putut reda sunetul. Încearcă să interacționezi cu pagina mai întâi.`)
        setIsLoading(false)
        setActiveSound(null)
      }
    } catch (err) {
      console.error("Error setting up audio:", err)
      setError(`Eroare la configurarea audio: ${err instanceof Error ? err.message : "Eroare necunoscută"}`)
      setIsLoading(false)
      setActiveSound(null)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sunete ambientale</CardTitle>
          <CardDescription>
            Folosește sunete ambientale pentru a-ți îmbunătăți concentrarea și a reduce distragerile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="volume" className="mb-2 block">
              Volum: {volume}%
            </Label>
            <div className="flex items-center gap-2">
              <VolumeX className="h-4 w-4 text-muted-foreground" />
              <Slider
                id="volume"
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sounds.map((sound) => (
              <Button
                key={sound.id}
                variant={activeSound === sound.id ? "default" : "outline"}
                className={`h-auto flex-col items-center justify-center p-4 gap-2 ${
                  activeSound === sound.id ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => playSound(sound.id)}
                disabled={isLoading}
              >
                <sound.icon className={`h-8 w-8 mb-2`} />
                <div className={`font-medium text-muted-foreground`}>
                  {sound.name}
                </div>
                <p className={`text-xs text-center text-muted-foreground`}>
                  {sound.description}
                </p>
                {isLoading && activeSound === sound.id && (
                  <div className="text-xs text-teal-100 mt-1">Se încarcă...</div>
                )}
              </Button>
            ))}
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-center">
            💡 Tip: Dacă sunetele nu pornesc, încearcă să faci clic pe pagină mai întâi (restricție browser)
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
