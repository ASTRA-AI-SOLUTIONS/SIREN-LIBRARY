import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useStore } from "./hooks/useStore";
import { HomeView } from "./components/HomeView";
import { WritingView } from "./components/WritingView";
import { AdminPanel } from "./components/AdminPanel";
import { MusicPlayer } from "./components/MusicPlayer";
import { Writing, ViewState } from "./types";
import { Lock, Volume2, VolumeX } from "lucide-react";

export default function App() {
  const {
    writings,
    settings,
    isAdminAuth,
    setIsAdminAuth,
    addWriting,
    updateWriting,
    deleteWriting,
    updateSettings,
  } = useStore();

  const [view, setView] = useState<ViewState>("home");
  const [activeWriting, setActiveWriting] = useState<Writing | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === "admin" && pass === "Sneha") {
      setIsAdminAuth(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSelectWriting = (w: Writing) => {
    setActiveWriting(w);
    setView("writing");
  };

  return (
    <>
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            key="entry"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center text-white cursor-pointer bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "linear-gradient(to bottom, rgba(10,10,10,0.5), rgba(10,10,10,0.9)), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop')"
            }}
            onClick={() => setHasEntered(true)}
          >
            <h1 className="text-5xl md:text-6xl font-serif tracking-widest mb-8 z-10 text-center px-4 drop-shadow-2xl">Sneha's Library</h1>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] animate-pulse text-white/90 border border-white/20 px-8 py-3 z-10 backdrop-blur-sm bg-black/30">
              Click to Enter
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full min-h-screen bg-[#0a0a0a] text-[#d1d1d1] font-sans flex flex-col md:flex-row overflow-hidden relative">
        {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-white/5 flex flex-col p-8 md:p-10 bg-[#0c0c0c] shrink-0 md:h-screen md:overflow-y-auto">
        <div
          className="mb-8 md:mb-12 cursor-pointer"
          onClick={() => {
            setActiveWriting(null);
            setView("home");
          }}
        >
          <h1 className="text-white text-3xl font-serif tracking-tight">
            {settings.siteTitle}.
          </h1>
          <p className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.2em] mt-2">
            Selected Fragments
          </p>
        </div>

        <nav className="flex-1 space-y-8 hidden md:block">
          <div className="space-y-4">
            <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
              Archives
            </p>
            <ul className="space-y-3">
              {writings.map((w) => (
                <li
                  key={w.id}
                  onClick={() => handleSelectWriting(w)}
                  className={`flex items-center group cursor-pointer transition-colors ${activeWriting?.id === w.id && view === "writing" ? "text-white" : "text-white/40 hover:text-white"}`}
                >
                  {activeWriting?.id === w.id && view === "writing" && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>
                  )}
                  <span
                    className={`text-sm ${activeWriting?.id === w.id && view === "writing" ? "border-b border-white/40 pb-0.5" : ""}`}
                  >
                    {w.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Admin Panel Control */}
        <div className="mt-auto pt-6 md:pt-8 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${isAdminAuth ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-neutral-700"}`}
              ></div>
              <span className="text-[10px] uppercase tracking-tighter text-white/40 font-mono">
                Admin: {isAdminAuth ? "Sneha" : "Locked"}
              </span>
            </div>
            <button
              onClick={() => setView("admin")}
              className="p-1.5 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors text-white/60"
            >
              <Lock size={12} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative md:h-screen md:overflow-y-auto bg-[#0a0a0a]">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <HomeView
              key="home"
              writings={writings}
              onSelect={handleSelectWriting}
            />
          )}

          {view === "writing" && activeWriting && (
            <WritingView
              key="writing"
              writing={activeWriting}
              onClose={() => {
                setActiveWriting(null);
                setView("home");
              }}
            />
          )}

          {view === "admin" && !isAdminAuth && (
            <div
              key="login"
              className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto relative z-10 my-auto h-full min-h-[50vh]"
            >
              <h2 className="text-3xl font-serif text-white mb-8">
                Authentication
              </h2>
              <form
                onSubmit={handleLogin}
                className="w-full space-y-6 bg-[#0c0c0c] border border-white/5 p-8 rounded-none shadow-2xl"
              >
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">
                    Username
                  </label>
                  <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-white/30 text-white font-serif transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">
                    Password
                  </label>
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-white/30 text-white font-serif transition-colors"
                  />
                </div>
                {loginError && (
                  <p className="text-red-400/80 text-xs tracking-wide text-center">
                    Invalid credentials
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-white/10 text-white border border-white/10 py-3 font-serif hover:bg-white text-sm hover:text-black transition-colors mt-8"
                >
                  Enter Archive
                </button>
              </form>
            </div>
          )}

          {view === "admin" && isAdminAuth && (
            <div
              key="admin"
              className="flex-1 w-full max-w-5xl mx-auto relative z-10 pb-20"
            >
              <AdminPanel
                writings={writings}
                settings={settings}
                onAdd={addWriting}
                onUpdate={updateWriting}
                onDelete={deleteWriting}
                onUpdateSettings={updateSettings}
                onLogout={() => {
                  setIsAdminAuth(false);
                  setView("home");
                }}
              />
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative text */}
      <div className="absolute bottom-0 right-0 p-4 pointer-events-none hidden lg:block z-50">
        <span
          className="text-[8px] font-mono text-white/5 uppercase tracking-[0.5em]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          EST. 2026 / ALL RIGHTS RESERVED
        </span>
      </div>

      {/* Mute Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-8 right-8 z-50 text-white/30 hover:text-white transition-colors p-2 hidden md:block"
        title={isMuted ? "Play Music" : "Mute Music"}
      >
        {isMuted ? <VolumeX size={18} strokeWidth={1} /> : <Volume2 size={18} strokeWidth={1} />}
      </button>
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-6 right-6 z-50 bg-[#0c0c0c] hover:bg-[#1a1a1a] shadow-xl border border-white/10 p-2 rounded-none text-white/50 hover:text-white transition-all duration-300 md:hidden"
        title={isMuted ? "Play Music" : "Mute Music"}
      >
        {isMuted ? <VolumeX size={14} strokeWidth={1} /> : <Volume2 size={14} strokeWidth={1} />}
      </button>

      {hasEntered && (
        <MusicPlayer 
          isMuted={isMuted}
          embedCode={
            (view === "writing" && activeWriting?.musicEmbedCode) 
              ? activeWriting.musicEmbedCode 
              : settings.musicEmbedCode
          } 
        />
      )}
    </div>
    </>
  );
}
