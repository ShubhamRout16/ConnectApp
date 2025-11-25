/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react"
import { UploadCloud } from "lucide-react"
import { motion } from "framer-motion"

const FileUploadArea = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = e => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = e => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0])
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        relative group cursor-pointer
        rounded-2xl border-2 border-dashed
        transition-all duration-300 ease-out
        flex flex-col items-center justify-center
        h-40 w-full mt-4
        ${
          isDragging
            ? "border-neon-purple bg-neon-purple/10"
            : "border-white/10 hover:border-neon-purple/50 hover:bg-white/2"
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="flex flex-col items-center text-center p-4">
        <div
          className={`
            p-3 rounded-full mb-3 transition-colors duration-300
            ${
              isDragging
                ? "bg-neon-purple/20 text-neon-purple"
                : "bg-white/5 text-slate-400 group-hover:text-neon-purple group-hover:bg-neon-purple/10"
            }
          `}
        >
          <UploadCloud className="w-8 h-8" />
        </div>
        <p className="text-sm font-medium text-slate-200">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-slate-500 mt-1 font-mono">
          SVG, PNG, JPG or GIF (max. 5MB)
        </p>
      </div>
    </motion.div>
  )
}

export default FileUploadArea
