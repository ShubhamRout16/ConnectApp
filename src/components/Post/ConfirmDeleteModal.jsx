import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { Trash2, X } from "lucide-react";

export default function ConfirmDeleteModal({ open , onClose , onConfirm , deleting }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="relative z-50 max-w-sm w-full px-4"
      >
        <GlassCard className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Delete Post</h3>
              <p className="mt-1 text-sm text-slate-400">This action cannot be undone.</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white">
              <X className="w-5 h-5"/>
            </button>
          </div>

          <div className="mt-6 flex gap-3 justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-slate-400 hover:text-white">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={deleting}
              className={`px-4 py-2 rounded-xl font-bold ${deleting ? "bg-slate-800 text-slate-500" : "bg-red-500 text-white hover:bg-red-600"}`}
            >
              {deleting ? "Deleting..." : (<span className="flex items-center gap-2"><Trash2 className="w-4 h-4" /> Delete</span>)}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}