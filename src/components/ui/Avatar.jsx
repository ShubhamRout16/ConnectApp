import React from "react"

const Avatar = ({
  src,
  alt,
  size = "md",
  className = "",
  isVerified = false,
  hasStory = false
}) => {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-14 h-14",
    xl: "w-20 h-20"
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`
          relative rounded-full p-0.5
          ${
            hasStory
              ? "bg-linear-to-tr from-neon-purple via-neon-fuchsia to-neon-cyan"
              : "bg-transparent"
          }
        `}
      >
        <img
          src={src}
          alt={alt}
          className={`
            ${sizeClasses[size]} 
            rounded-full object-cover 
            border-2 border-[#0a0a0a]
            bg-slate-800
            transition-transform duration-300 hover:scale-105
          `}
        />
      </div>
      {isVerified && (
        <div className="absolute bottom-0 right-0 bg-neon-purple text-white rounded-full p-0.5 border-2 border-[#0a0a0a]">
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default Avatar
