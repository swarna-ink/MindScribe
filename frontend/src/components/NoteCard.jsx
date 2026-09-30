import React from 'react';
import { Edit2, Trash2, Pin, Eye } from 'lucide-react';

export default function NoteCard({ note, onView, onEdit, onDelete }) {
  return (
    <div className="group relative bg-[#FDFBF7] rounded-xl p-5 border border-amber-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between vintage-watermark-border notebook-ruled-bg overflow-hidden">
      
      {/* 🌿 কোণায় লতাপাতার মিনিমাল ওয়াটারমার্ক ডিজাইন (Watermark Foliage) */}
      <svg className="absolute -top-3 -right-3 w-16 h-16 opacity-10 text-amber-900 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 C60 20, 80 30, 100 50 C80 70, 60 80, 50 100 C40 80, 20 70, 0 50 C20 30, 40 20, 50 0 Z" />
      </svg>

      <div>
        {/* Header Badges & Pin */}
        <div className="flex items-center justify-between mb-3 border-b border-amber-200/40 pb-2">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100/70 text-amber-900 font-medium">
            {note.category}
          </span>
          {note.isPinned && <Pin className="w-4 h-4 text-amber-600 fill-amber-600" />}
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-lg text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
          {note.title}
        </h3>

        {/* Content Preview (নোটের লেখা সুন্দরভাবে গ্যাপিং বজায় রেখে প্রদর্শিত হবে) */}
        <p className="font-handwriting text-slate-800 text-lg leading-relaxed line-clamp-3 mb-4">
          {note.content}
        </p>
      </div>

      {/* Card Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-amber-200/40 mt-2 text-xs text-slate-500">
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => onView(note)} className="p-1.5 hover:bg-amber-100 rounded-md text-amber-800 transition" title="View Detail">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => onEdit(note)} className="p-1.5 hover:bg-amber-100 rounded-md text-slate-700 transition" title="Edit Note">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(note._id)} className="p-1.5 hover:bg-rose-100 rounded-md text-rose-600 transition" title="Delete Note">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}