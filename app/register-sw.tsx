"use client"

import { useEffect } from "react"

export function RegisterServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        try {
          const registration = await navigator.serviceWorker.register("/service-worker.js", {
            scope: "/",
          })

          console.log("Service Worker înregistrat cu succes:", registration)

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
            console.log("Service Worker se actualizează...")

            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  console.log("Actualizare disponibilă! Reîncărcați pagina pentru a aplica actualizările.")
                  // Here you could show a notification to the user
                }
              })
            }
          })

          // Handle offline form submissions
          if ("SyncManager" in window) {
            navigator.serviceWorker.ready.then((registration) => {
              // Register a sync event
              // registration.sync.register("sync-forms")
              console.log("Background sync înregistrat")
            })
          }

          // Request notification permission
          if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                console.log("Permisiune pentru notificări acordată")
              }
            })
          }
        } catch (error) {
          console.error("Înregistrarea Service Worker a eșuat:", error)
        }
      })

      // Handle service worker updates
      let refreshing = false
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true
          window.location.reload()
        }
      })
    }
  }, [])

  return null
}
