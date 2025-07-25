"use client"

import { useEffect } from "react"
import { measurePagePerformance, optimizeResourceLoading } from "@/lib/utils/performance"

export function PerformanceMonitor() {
  useEffect(() => {
    // Măsurăm performanța paginii
    measurePagePerformance()

    // Optimizăm încărcarea resurselor
    optimizeResourceLoading()

    // Prefetch pentru paginile importante
    if ("connection" in navigator && (navigator.connection as any)?.saveData !== true) {
      const pagesToPrefetch = ["/dashboard", "/lectii", "/agenda", "/todo"]

      pagesToPrefetch.forEach((page) => {
        const link = document.createElement("link")
        link.rel = "prefetch"
        link.href = page
        document.head.appendChild(link)
      })
    }
  }, [])

  return null
}
