// Service Worker pentru caching și funcționalitate offline
const CACHE_NAME = "neurolearn-cache-v2"
const OFFLINE_PAGE = "/offline.html"

// Resurse care vor fi cache-uite pentru funcționalitate offline
const urlsToCache = [
  "/",
  "/dashboard",
  "/lectii",
  "/agenda",
  "/todo",
  "/progres",
  "/setari",
  "/offline.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/favicon.ico",
  "/globals.css",
  "/documentatie",
]

// Instalare Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
  // Activare imediată fără a aștepta reîncărcarea paginii
  self.skipWaiting()
})

// Activare Service Worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              // Ștergere cache-uri vechi
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        // Preluare control imediat
        return self.clients.claim()
      }),
  )
})

// Strategia de cache: Network first, fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  // Skip browser extensions
  if (event.request.url.includes("/extension/")) {
    return
  }

  // Skip Chrome-specific files
  if (event.request.url.includes("chrome-extension")) {
    return
  }

  // Skip Supabase API calls
  if (event.request.url.includes("supabase.co")) {
    return
  }

  // Handle API requests differently - don't cache them
  if (event.request.url.includes("/api/")) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // Clone the response
        const responseToCache = response.clone()

        // Open the cache and store the response
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        // If network request fails, try to serve from cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          // If the request is for a page, serve the offline page
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_PAGE)
          }

          // Otherwise, return a simple error
          return new Response("Eroare de rețea. Verificați conexiunea la internet.", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          })
        })
      }),
  )
})

// Background sync for offline form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-forms") {
    event.waitUntil(syncForms())
  }
})

// Push notifications
self.addEventListener("push", (event) => {
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-96x96.png",
    vibrate: [100, 50, 100],
    data: {
      url: data.url || "/",
    },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(clients.openWindow(event.notification.data.url))
})

// Helper function for form sync
async function syncForms() {
  // Implementation for syncing stored form data when online
  const formDataList = await getStoredFormData()

  for (const formData of formDataList) {
    try {
      await fetch(formData.url, {
        method: formData.method,
        headers: formData.headers,
        body: formData.body,
        credentials: "same-origin",
      })

      // If successful, remove from storage
      await removeStoredFormData(formData.id)
    } catch (error) {
      console.error("Failed to sync form:", error)
      // Keep in storage to try again later
    }
  }
}

// These would be implemented with IndexedDB in a real app
async function getStoredFormData() {
  return []
}

async function removeStoredFormData(id) {
  // Implementation
}
