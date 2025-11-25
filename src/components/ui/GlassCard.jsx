import React from "react"

const GlassCard = ({
  children,
  className = "",
  onClick = undefined,
  hoverEffect = false
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-3xl
        bg-white/3 backdrop-blur-2xl
        border border-white/8
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
        transition-all duration-500 ease-out
        ${
          hoverEffect
            ? "hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:border-neon-purple/30 hover:-translate-y-1"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default GlassCard
