// Funcție pentru a optimiza încărcarea imaginilor
export function getOptimizedImageUrl(url: string, width = 0, quality = 80): string {
  // Verifică dacă URL-ul este valid
  if (!url || !url.startsWith("http")) {
    return url
  }

  // Verifică dacă URL-ul este deja optimizat
  if (url.includes("?w=") || url.includes("&w=")) {
    return url
  }

  // Adaugă parametri pentru optimizare
  const separator = url.includes("?") ? "&" : "?"
  let optimizedUrl = url

  // Adaugă width dacă este specificat
  if (width > 0) {
    optimizedUrl += `${separator}w=${width}`
  }

  // Adaugă quality
  optimizedUrl += `${optimizedUrl.includes("?") ? "&" : "?"}q=${quality}`

  return optimizedUrl
}

// Funcție pentru a încărca imaginile lazy
export function lazyLoadImage(imgElement: HTMLImageElement): void {
  if ("loading" in HTMLImageElement.prototype) {
    // Browser suportă lazy loading nativ
    imgElement.loading = "lazy"
  } else {
    // Fallback pentru browsere care nu suportă lazy loading nativ
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ""
          observer.unobserve(img)
        }
      })
    })

    observer.observe(imgElement)
  }
}
