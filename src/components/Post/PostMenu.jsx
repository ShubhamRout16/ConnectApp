// import React from "react";
import { Menu, MoreHorizontal, Edit2, Trash2 } from "lucide-react";

export default function PostMenu({ onEdit , onDelete , className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* simple accessible menu */}
      <details className="relative">
        <summary className="list-none p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer">
          <MoreHorizontal className="w-5 h-5" />
        </summary>

        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-[#071018]/80 border border-white/6 backdrop-blur-lg shadow-lg z-50 overflow-hidden">
          <button 
            onClick={() => {
              onEdit();
              // close details by blurring the summary
              document.activeElement?.blur();
            }}
            className="w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-white/3 transition-colors"
          >
            <Edit2 className="w-4 h-4 text-neon-purple"/> Edit
          </button>

          <button
            onClick={() => {
              onDelete();
              document.activeElement?.blur();
            }}
            className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-400 hover:bg-red-500/6 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </details>
    </div>
  );
}