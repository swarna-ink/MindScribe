import React, { useState } from 'react';

export default function App() {
  // বিখ্যাত গ্রিক দার্শনিকদের উক্তি সম্বলিত ডিফল্ট ডেটা
  const [notes, setNotes] = useState([
    {
      _id: '1',
      title: 'Socrates on Wisdom',
      content: 'The only true wisdom is in knowing you know nothing. An unexamined life is not worth living.',
      category: 'Philosophy',
      isPinned: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      title: 'Aristotle on Excellence',
      content: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit. Knowing yourself is the beginning of all wisdom.',
      category: 'Philosophy',
      isPinned: false,
      createdAt: new Date().toISOString()
    },
    {
      _id: '3',
      title: 'Plato on Mind and Soul',
      content: 'Thinking is the talking of the soul with itself. Wise men talk because they have something to say; fools, because they have to say something.',
      category: 'Classical',
      isPinned: false,
      createdAt: new Date().toISOString()
    }
  ]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewNote, setViewNote] = useState(null);
  const [editNote, setEditNote] = useState(null);

  const [formData, setFormData] = useState({ title: '', content: '', category: 'Philosophy', isPinned: false });

  // নোট তৈরি ও সম্পাদনা করার লজিক
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert('Title and Content are required!');

    if (editNote) {
      setNotes(notes.map(n => n._id === editNote._id ? { ...n, ...formData } : n));
      setEditNote(null);
    } else {
      const newNote = {
        _id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      setNotes([newNote, ...notes]);
      setIsCreateOpen(false);
    }
    setFormData({ title: '', content: '', category: 'Philosophy', isPinned: false });
  };

  const handleStartEdit = (note) => {
    setEditNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category,
      isPinned: note.isPinned
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(n => n._id !== id));
      if (viewNote && viewNote._id === id) setViewNote(null);
    }
  };

  // 🔍 লাইভ সার্চ ও ক্যাটাগরি ফিল্টারিং লজিক (যা তাৎক্ষণিকভাবে কাজ করবে)
  const filteredNotes = notes.filter(note => {
    const query = search.trim().toLowerCase();
    const matchesSearch = query === '' || 
                          note.title.toLowerCase().includes(query) || 
                          note.content.toLowerCase().includes(query);
    const matchesCategory = category === 'All' || note.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen relative bg-[#F4EBE1] text-slate-900 font-sans selection:bg-amber-300">
      
      {/* ☕ Coffee Stain & Parchment Watermarks (চারপাশে লতাপাতার ভিন্টেজ ওয়াটারমার্ক) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-15">
        {/* Top Left Watermark */}
        <svg className="absolute -top-10 -left-10 w-80 h-80 text-[#5C3D1E]" viewBox="0 0 100 100" fill="currentColor">
          <path d="M10 10 C 20 50, 50 20, 90 90 C 50 80, 20 50, 10 10 Z" />
          <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Top Right Botanical Watermark */}
        <svg className="absolute -top-12 -right-12 w-96 h-96 text-[#6B4423]" viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 0 C120 40, 160 60, 200 100 C160 140, 120 160, 100 200 C80 160, 40 140, 0 100 C40 60, 80 40, 100 0 Z" />
        </svg>

        {/* Bottom Center Coffee Ring Watermark */}
        <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full border-8 border-[#5C3D1E] opacity-20 blur-sm"></div>
      </div>

      {/* 👑 Royal Navbar */}
      <header className="sticky top-0 z-40 bg-[#1E1848] text-white border-b border-amber-500/40 shadow-2xl py-3.5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-100 flex items-center justify-center font-serif text-[#1E1848] font-bold text-xl shadow-lg ring-2 ring-amber-400/50">
              M
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-wider text-amber-200">MINDSCRIBE</h1>
              <p className="text-[10px] tracking-widest text-amber-400/80 uppercase">Royal Parchment Workspace</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <nav className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={() => { setFormData({ title: '', content: '', category: 'Philosophy', isPinned: false }); setIsCreateOpen(true); }}
              className="bg-amber-400 hover:bg-amber-500 text-[#1E1848] font-bold px-4 py-2 rounded-lg text-sm shadow transition"
            >
              + Create Note
            </button>
            <button 
              onClick={() => document.getElementById('searchInput')?.focus()}
              className="bg-white/10 hover:bg-white/20 text-amber-100 px-3 py-2 rounded-lg text-xs font-medium border border-amber-400/20 transition"
            >
              🔍 Search Notes
            </button>
            <button 
              onClick={() => notes.length > 0 && setViewNote(notes[0])}
              className="bg-white/10 hover:bg-white/20 text-amber-100 px-3 py-2 rounded-lg text-xs font-medium border border-amber-400/20 transition"
            >
              👁️ View Individual Note
            </button>
            <button 
              onClick={() => notes.length > 0 && handleStartEdit(notes[0])}
              className="bg-white/10 hover:bg-white/20 text-amber-100 px-3 py-2 rounded-lg text-xs font-medium border border-amber-400/20 transition"
            >
              ✏️ Edit Note
            </button>
            <button 
              onClick={() => notes.length > 0 && handleDelete(notes[0]._id)}
              className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 px-3 py-2 rounded-lg text-xs font-medium border border-rose-400/30 transition"
            >
              🗑️ Delete Note
            </button>
          </nav>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* Search & Category Filter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#FAF3EA]/90 backdrop-blur-md p-4 rounded-xl border border-amber-300/80 shadow-md">
          <div className="relative w-full md:w-96">
            <input
              id="searchInput"
              type="text"
              placeholder="Search quotes by philosopher or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-white/90 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm placeholder-slate-400 font-medium shadow-inner"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {['All', 'Philosophy', 'Classical', 'General'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition ${
                  category === cat
                    ? 'bg-[#1E1848] text-amber-300 border-[#1E1848] shadow'
                    : 'bg-amber-100/50 text-slate-800 border-amber-200 hover:bg-amber-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Status Notice */}
        {search && (
          <div className="mb-4 text-xs font-semibold text-amber-900 bg-amber-200/60 px-3 py-1.5 rounded-md inline-block">
            Showing results for: "{search}" ({filteredNotes.length} found)
          </div>
        )}

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-amber-300 rounded-2xl bg-[#FAF3EA]/70">
            <h3 className="font-serif text-xl font-bold text-slate-800">No Quotes Found</h3>
            <p className="text-sm text-slate-600 mt-1">Try typing a different keyword like "wisdom", "soul", or "Socrates".</p>
            <button 
              onClick={() => setSearch('')}
              className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold shadow hover:bg-amber-700"
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div 
                key={note._id}
                className="bg-[#FFFDF9] rounded-2xl p-6 border-2 border-amber-300/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                style={{
                  backgroundImage: 'linear-gradient(rgba(140, 90, 40, 0.04) 1px, transparent 1px)',
                  backgroundSize: '100% 1.8rem'
                }}
              >
                {/* Vintage Card Watermark Icon */}
                <div className="absolute top-2 right-2 opacity-10 text-amber-900 pointer-events-none font-serif text-4xl italic">
                  ❞
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-amber-200 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      {note.category}
                    </span>
                    {note.isPinned && <span className="text-amber-700 font-bold text-xs">📌 Pinned</span>}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-slate-900 mb-2.5">{note.title}</h3>
                  <p className="font-serif italic text-slate-800 text-sm leading-relaxed mb-6">
                    "{note.content}"
                  </p>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-amber-200/80 text-xs text-slate-500">
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setViewNote(note)} className="p-1.5 hover:bg-amber-100 rounded text-amber-900" title="View Note">👁️</button>
                    <button onClick={() => handleStartEdit(note)} className="p-1.5 hover:bg-amber-100 rounded text-slate-700" title="Edit Note">✏️</button>
                    <button onClick={() => handleDelete(note._id)} className="p-1.5 hover:bg-rose-100 rounded text-rose-600" title="Delete Note">🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal for Create/Edit */}
      {(isCreateOpen || editNote) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF3EA] w-full max-w-lg rounded-2xl border-2 border-amber-400 p-6 shadow-2xl relative">
            <button onClick={() => { setIsCreateOpen(false); setEditNote(null); }} className="absolute top-4 right-4 text-slate-700 font-bold">✕</button>
            <h3 className="font-serif text-xl font-bold text-[#1E1848] mb-4">{editNote ? 'Edit Quote Note' : 'Create New Quote Note'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-amber-300 text-sm"
                  placeholder="e.g. Socrates on Truth"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-amber-300 text-sm"
                >
                  <option value="Philosophy">Philosophy</option>
                  <option value="Classical">Classical</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Quote Content</label>
                <textarea
                  rows="4"
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-amber-300 text-sm"
                  placeholder="Write famous philosopher quote..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-amber-200">
                <button type="button" onClick={() => { setIsCreateOpen(false); setEditNote(null); }} className="px-4 py-2 text-sm text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-sm font-bold bg-[#1E1848] text-amber-300 rounded-lg">{editNote ? 'Save Changes' : 'Create Note'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for View Note */}
      {viewNote && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] w-full max-w-xl rounded-2xl border-2 border-amber-400 p-6 shadow-2xl relative">
            <button onClick={() => setViewNote(null)} className="absolute top-4 right-4 text-slate-700 font-bold">✕</button>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-1 rounded">Dynamic Route: /api/notes/{viewNote._id}</span>
            <h2 className="font-serif text-xl font-bold text-[#1E1848] mt-3 mb-2">{viewNote.title}</h2>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm font-serif italic mb-4">"{viewNote.content}"</div>
            <button onClick={() => setViewNote(null)} className="px-4 py-2 bg-[#1E1848] text-amber-300 rounded-lg text-sm font-bold">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}