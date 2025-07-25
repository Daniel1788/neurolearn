"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { LoadingSplash } from "./loading-splash"

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Fix hydration issues by only rendering client-side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isMounted && isLoading && <LoadingSplash />}
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
