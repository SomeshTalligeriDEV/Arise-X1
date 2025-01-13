"use client"

import { useEffect, useRef, useState } from "react"
import { Zap } from "lucide-react"

export function LoadingScreen({ onReady }: { onReady: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showButton, setShowButton] = useState(false)
  const [exiting, setExiting]       = useState(false)

  /* Show the button after 1.8 s so the video has a moment to breathe */
  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 1800)
    return () => clearTimeout(t)
  }, [])

  /* Auto-play the video */
  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  function handleReady() {
    setExiting(true)
    setTimeout(onReady, 700)   /* wait for fade-out animation */
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* ── Full-screen video background ── */}
      <video
        ref={videoRef}
        src="/llo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ── Dark vignette overlay so button is always readable ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* ── Scanline texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
        {/* Logo / brand */}
        <div className="flex flex-col items-center gap-3">
          <h1
            className="text-5xl font-black uppercase tracking-widest md:text-7xl"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#39ff14",
              textShadow:
                "0 0 12px #39ff14, 0 0 32px #39ff14, 0 0 60px rgba(57,255,20,0.5)",
              letterSpacing: "0.15em",
            }}
          >
            ARISE<span style={{ color: "#ff1493", textShadow: "0 0 12px #ff1493, 0 0 32px #ff1493" }}>X1</span>
          </h1>

          <p
            className="text-sm uppercase tracking-[0.25em] opacity-80"
            style={{ fontFamily: "'VT323', monospace", fontSize: "1.25rem", color: "#ffa500" }}
          >
            ✦ AI Powered Food &amp; Health Tracker ✦
          </p>
        </div>

        {/* Loading Icon */}
        <div className="flex h-12 w-full items-center justify-center">
          <Zap
            className="size-10 animate-pulse"
            style={{
              color: "#39ff14",
              filter: "drop-shadow(0 0 12px #39ff14) drop-shadow(0 0 24px rgba(57,255,20,0.6))",
            }}
          />
        </div>

        {/* ── Ready Button ── */}
        <div
          className={`transition-all duration-700 ${
            showButton ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
          }`}
        >
          <button
            onClick={handleReady}
            className="group relative overflow-hidden px-10 py-4 font-black uppercase tracking-widest transition-all duration-200 active:scale-95"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.85rem",
              color: "#0f0a1e",
              background: "#39ff14",
              border: "3px solid #39ff14",
              borderRadius: "4px",
              boxShadow:
                "0 0 16px #39ff14, 0 0 40px rgba(57,255,20,0.45), inset 0 1px 0 rgba(255,255,255,0.3)",
              letterSpacing: "0.12em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = "#0f0a1e"
              el.style.color = "#39ff14"
              el.style.boxShadow =
                "0 0 24px #39ff14, 0 0 60px rgba(57,255,20,0.55)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = "#39ff14"
              el.style.color = "#0f0a1e"
              el.style.boxShadow =
                "0 0 16px #39ff14, 0 0 40px rgba(57,255,20,0.45), inset 0 1px 0 rgba(255,255,255,0.3)"
            }}
          >
            {/* Shimmer sweep */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              }}
            />
            ▶ &nbsp;I'M READY
          </button>

          <p
            className="mt-4 opacity-50"
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "1rem",
              color: "#ffffff",
              letterSpacing: "0.08em",
            }}
          >
            ✦ small choices, big changes ✦
          </p>
        </div>
      </div>


    </div>
  )
}
