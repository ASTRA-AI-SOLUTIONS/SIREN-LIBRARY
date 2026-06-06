import React, { useState } from "react";
import { Writing, SiteSettings } from "../types";
import { motion } from "motion/react";
import {
  LogOut,
  Plus,
  Trash2,
  Edit2,
  PlayCircle,
  Settings,
} from "lucide-react";

interface AdminPanelProps {
  writings: Writing[];
  settings: SiteSettings;
  onAdd: (w: Omit<Writing, "id" | "createdAt">) => void;
  onUpdate: (id: string, w: Partial<Omit<Writing, "id" | "createdAt">>) => void;
  onDelete: (id: string) => void;
  onUpdateSettings: (s: Partial<SiteSettings>) => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  writings,
  settings,
  onAdd,
  onUpdate,
  onDelete,
  onUpdateSettings,
  onLogout,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    backgroundImageUrl: "",
    musicEmbedCode: "",
  });

  const handleEdit = (w: Writing) => {
    setEditingId(w.id);
    setFormData({
      title: w.title,
      content: w.content,
      backgroundImageUrl: w.backgroundImageUrl || "",
      musicEmbedCode: w.musicEmbedCode || "",
    });
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({ title: "", content: "", backgroundImageUrl: "", musicEmbedCode: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
    } else {
      onAdd(formData);
    }
    handleCreate();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 md:p-12 lg:p-16 w-full"
    >
      <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <h1 className="text-2xl font-serif text-white tracking-widest">
          Dashboard.
        </h1>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 text-white/40 hover:text-white transition-colors text-sm"
        >
          <LogOut size={14} />
          <span className="uppercase tracking-widest text-[10px]">Logout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Editor Form */}
        <div className="lg:col-span-7 space-y-8">
          <h2 className="text-[10px] uppercase tracking-widest text-white/50 font-bold border-l-2 border-white/20 pl-3">
            {editingId ? "Edit Fragment" : "New Fragment"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] text-white/40 mb-2 uppercase tracking-widest">
                Title
              </label>
              <input
                required
                className="w-full bg-[#0c0c0c] border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-white/30 font-serif text-lg text-white"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-[10px] text-white/40 mb-2 uppercase tracking-widest">
                Content
              </label>
              <textarea
                required
                rows={15}
                className="w-full bg-[#0c0c0c] border border-white/10 rounded-none px-4 py-4 focus:outline-none focus:border-white/30 font-serif text-base leading-relaxed resize-none text-white/80"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-[10px] text-white/40 mb-2 uppercase tracking-widest">
                Background Image URL (Optional)
              </label>
              <input
                className="w-full bg-[#0c0c0c] border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-white/30 font-mono text-xs text-white/60"
                value={formData.backgroundImageUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    backgroundImageUrl: e.target.value,
                  })
                }
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>
            <div>
              <label className="block text-[10px] text-white/40 mb-2 uppercase tracking-widest flex items-center space-x-2">
                <PlayCircle size={12} /> <span>YouTube Video Link (or Embed Code)</span>
              </label>
              <textarea
                rows={2}
                className="w-full bg-[#0c0c0c] border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-white/30 font-mono text-xs text-white/60 resize-none"
                value={formData.musicEmbedCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    musicEmbedCode: e.target.value,
                  })
                }
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-white/10 border border-white/10 hover:bg-white text-white hover:text-black py-3 rounded-none font-serif text-sm transition-colors uppercase tracking-widest"
              >
                {editingId ? "Update Writing" : "Publish"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="px-6 border border-white/10 rounded-none hover:bg-white/5 text-white/60 transition-colors text-xs uppercase tracking-widest font-serif"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Writings & Settings */}
        <div className="lg:col-span-5 space-y-12">
          {/* Settings */}
          <div>
            <h2 className="text-[10px] uppercase tracking-widest text-white/50 font-bold border-l-2 border-white/20 pl-3 mb-6">
              Global Settings
            </h2>
            <div className="bg-[#0c0c0c] border border-white/5 p-6 space-y-6">
              <div>
                <label className="block text-[10px] text-white/40 mb-2 uppercase tracking-widest flex items-center space-x-2">
                  <Settings size={12} /> <span>Site Title</span>
                </label>
                <input
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-none px-3 py-2 text-sm text-white focus:outline-none font-serif"
                  value={settings.siteTitle}
                  onChange={(e) =>
                    onUpdateSettings({ siteTitle: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-[10px] text-white/40 mb-2 uppercase tracking-widest flex items-center space-x-2">
                  <PlayCircle size={12} /> <span>YouTube Video Link (or Embed Code)</span>
                </label>
                <textarea
                  rows={2}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-none px-3 py-2 text-xs font-mono text-white/60 focus:outline-none resize-none"
                  value={settings.musicEmbedCode}
                  onChange={(e) =>
                    onUpdateSettings({ musicEmbedCode: e.target.value })
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </div>
          </div>

          {/* Library */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[10px] uppercase tracking-widest text-white/50 font-bold border-l-2 border-white/20 pl-3">
                Archives
              </h2>
              <button
                onClick={handleCreate}
                className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                + New
              </button>
            </div>
            <div className="space-y-3">
              {writings.map((w) => (
                <div
                  key={w.id}
                  className={`flex items-center justify-between p-4 border transition-colors ${editingId === w.id ? "bg-[#0c0c0c] border-white/20" : "bg-transparent border-white/5 hover:border-white/10"}`}
                >
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => handleEdit(w)}
                  >
                    <h3 className="font-serif text-base text-white/90 truncate">
                      {w.title}
                    </h3>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">
                      {new Date(w.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => onDelete(w.id)}
                    className="text-white/20 hover:text-red-400 p-2 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {writings.length === 0 && (
                <p className="text-white/30 text-xs italic">
                  No fragments recorded.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
