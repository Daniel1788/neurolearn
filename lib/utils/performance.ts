// Funcție pentru a măsura performanța paginii
export function measurePagePerformance() {
  if (typeof window !== "undefined" && "performance" in window) {
    window.addEventListener("load", () => {
      // Măsurăm timpul de încărcare a paginii
      const pageLoadTime = performance.now()
      console.log(`Pagina s-a încărcat în ${Math.round(pageLoadTime)}ms`)

      // Măsurăm metrici de performanță
      setTimeout(() => {
        if ("performance" in window && "getEntriesByType" in performance) {
          const paintMetrics = performance.getEntriesByType("paint")
          const navigationTiming = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

          if (paintMetrics.length > 0) {
            const fpEntry = paintMetrics.find((entry) => entry.name === "first-paint")
            const fcpEntry = paintMetrics.find((entry) => entry.name === "first-contentful-paint")

            if (fpEntry) {
              console.log(`First Paint: ${Math.round(fpEntry.startTime)}ms`)
            }

            if (fcpEntry) {
              console.log(`First Contentful Paint: ${Math.round(fcpEntry.startTime)}ms`)
            }
          }

          if (navigationTiming) {
            console.log(`DOM Content Loaded: ${Math.round(navigationTiming.domContentLoadedEventEnd)}ms`)
            console.log(`DOM Complete: ${Math.round(navigationTiming.domComplete)}ms`)
          }
        }
      }, 0)
    })
  }
}

// Funcție pentru a optimiza încărcarea resurselor
export function optimizeResourceLoading() {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    // Încărcăm scripturile non-critice în timpul idle
    const loadNonCriticalScripts = () => {
      const nonCriticalScripts = [
        // Adaugă aici scripturile non-critice
      ]

      nonCriticalScripts.forEach((scriptSrc) => {
        const script = document.createElement("script")
        script.src = scriptSrc
        script.async = true
        document.body.appendChild(script)
      })
    }

    // @ts-ignore - requestIdleCallback nu este în TypeScript standard
    window.requestIdleCallback(loadNonCriticalScripts)
  }
}
