"use client"

import { useEffect, useState, useRef } from "react"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Languages supported by Google Translate with their native names and how "Romanian" appears in each language
const languages = [
  {
    code: "ro",
    name: "Română",
    romanianName: "Română",
  },
  {
    code: "en",
    name: "English",
    romanianName: "Romanian",
  },
  {
    code: "fr",
    name: "Français",
    romanianName: "Roumain",
  },
  {
    code: "de",
    name: "Deutsch",
    romanianName: "Rumänisch",
  },
  {
    code: "es",
    name: "Español",
    romanianName: "Rumano",
  },
  {
    code: "it",
    name: "Italiano",
    romanianName: "Rumeno",
  },
  {
    code: "ru",
    name: "Русский",
    romanianName: "Румынский",
  },
  {
    code: "uk",
    name: "Українська",
    romanianName: "Румунська",
  },
  {
    code: "hu",
    name: "Magyar",
    romanianName: "Román",
  },
  {
    code: "bg",
    name: "Български",
    romanianName: "Румънски",
  },
]

export function GoogleTranslateWidget() {
  const [currentLang, setCurrentLang] = useState("ro")
  const [isOpen, setIsOpen] = useState(false)
  const [pageLanguage, setPageLanguage] = useState("ro") // Track what language the page is currently in
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const googleTranslateInitialized = useRef(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement("script")
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      document.body.appendChild(script)

      // Create a hidden div for Google Translate
      const translateDiv = document.createElement("div")
      translateDiv.id = "google_translate_element"
      translateDiv.style.display = "none"
      document.body.appendChild(translateDiv)

      // Initialize Google Translate
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "ro",
            autoDisplay: false,
            includedLanguages: languages.map((lang) => lang.code).join(","),
          },
          "google_translate_element",
        )
        googleTranslateInitialized.current = true
      }
    }

    // Check if script is already added
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript()
    }

    // Add CSS to hide Google Translate elements
    const style = document.createElement("style")
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      .goog-te-menu-value span { display: none !important; }
      .goog-te-menu-value span:first-child { display: inline !important; }
      .goog-te-gadget-icon { display: none !important; }
      body { top: 0 !important; }
      .VIpgJd-ZVi9od-l4eHX-hSRGPd, .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
      
      /* Prevent Google Translate from affecting our dropdown */
      .language-dropdown-container {
        position: relative;
        z-index: 9999;
      }
      
      .language-dropdown-container * {
        font-family: inherit !important;
        font-size: inherit !important;
        color: inherit !important;
        background-color: inherit !important;
      }
      
      /* Force our language names to not be translated */
      .notranslate {
        translate: no !important;
      }
    `
    document.head.appendChild(style)

    // Cleanup
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Detect current page language by checking Google Translate cookie or URL
  useEffect(() => {
    const detectPageLanguage = () => {
      // Check Google Translate cookie
      const cookies = document.cookie.split(";")
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=")
        if (name === "googtrans") {
          const parts = value.split("/")
          if (parts.length >= 3) {
            const targetLang = parts[2]
            if (targetLang && targetLang !== "auto" && targetLang !== "ro") {
              setPageLanguage(targetLang)
              return
            }
          }
        }
      }

      // Check if there's a Google Translate frame
      const frame = document.querySelector(".goog-te-menu-frame")
      if (frame) {
        // Page is being translated, try to detect language from select element
        const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement
        if (selectElement && selectElement.value && selectElement.value !== "ro") {
          setPageLanguage(selectElement.value)
          return
        }
      }

      // Default to Romanian
      setPageLanguage("ro")
    }

    // Check immediately and then periodically
    detectPageLanguage()
    const interval = setInterval(detectPageLanguage, 500)

    return () => clearInterval(interval)
  }, [])

  // Function to get the correct display text for Romanian in the current page language
  const getRomanianDisplayText = () => {
    const currentPageLang = languages.find((lang) => lang.code === pageLanguage)
    return currentPageLang ? currentPageLang.romanianName : "Română"
  }

  // Function to get language names for the dropdown based on current page language
  const getLanguageDisplayNames = () => {
    if (pageLanguage === "ro") {
      // If page is in Romanian, show native names
      return languages.map((lang) => ({
        ...lang,
        displayName: lang.name,
      }))
    } else {
      // If page is translated, show names in the target language but don't translate them
      return languages.map((lang) => ({
        ...lang,
        displayName: lang.code === "ro" ? getRomanianDisplayText() : lang.name,
      }))
    }
  }

  // Function to change language
  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode)
    setIsOpen(false)

    // Find the select element created by Google Translate
    const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement

    if (selectElement) {
      // If selecting Romanian, restore original page
      if (langCode === "ro") {
        // Reset to original language
        selectElement.value = langCode
        selectElement.dispatchEvent(new Event("change"))

        // Remove Google Translate cookies
        if (document.cookie.indexOf("googtrans") > -1) {
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
          document.cookie =
            "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname + ";"
          document.cookie =
            "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." +
            window.location.hostname.split(".").slice(-2).join(".") +
            ";"

          // Reload the page to ensure we're back to original language
          setTimeout(() => {
            window.location.reload()
          }, 100)
        }
      } else {
        // For other languages, change the dropdown
        selectElement.value = langCode
        selectElement.dispatchEvent(new Event("change"))

        // Update page language state
        setPageLanguage(langCode)
      }
    }
  }

  const displayLanguages = getLanguageDisplayNames()
  const currentDisplayText =
    currentLang === "ro"
      ? getRomanianDisplayText()
      : languages.find((lang) => lang.code === currentLang)?.name || getRomanianDisplayText()

  return (
    <div className="language-dropdown-container" ref={dropdownRef}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          ref={triggerRef}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors notranslate"
        >
          <Globe className="h-4 w-4" />
          <span className="notranslate">{currentDisplayText}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="notranslate">
          {displayLanguages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`notranslate ${currentLang === lang.code ? "bg-muted font-medium" : ""}`}
            >
              {lang.displayName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// Add the necessary type definition
declare global {
  interface Window {
    googleTranslateElementInit: () => void
    google: any
  }
}
