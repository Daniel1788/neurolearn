"use client"

import Image, { type ImageProps } from "next/image"
import { useState, useEffect } from "react"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackSrc?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallbackSrc = "/placeholder.svg",
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setImgSrc(typeof src === "string" ? src : fallbackSrc)
  }, [src, fallbackSrc])

  return (
    <div className={`relative ${isLoading ? "animate-pulse bg-muted" : ""}`} style={{ width, height }}>
      {imgSrc && (
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImgSrc(fallbackSrc)
            setIsLoading(false)
          }}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  )
}
