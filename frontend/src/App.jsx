import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Tilt from "react-parallax-tilt";
import { Toaster, toast } from "react-hot-toast";

const STORAGE_KEY = "episode";

function App() {

  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(null);

  const rowRefs = useRef(new Map());
  const playerRef = useRef(null);

  useEffect(() => {
    if (window.location.pathname !== "/") {
      window.history.replaceState(null, "", "/");
    }
  }, []);

  useEffect(() => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/api/audio/eps")
      .then(({ data }) => {
        setEpisodes(data);

        const stored = parseInt(localStorage.getItem(STORAGE_KEY));
        if (!isNaN(stored) && data.some(ep => ep.id === stored)) {
          setCurrentId(stored);
        }
      })
      .catch(() => {
        setLoadError("Could not load episodes. Please refresh and try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (currentId === null) return;
    const row = rowRefs.current.get(currentId);
    if (row) row.scrollIntoView({ block: "nearest" });
  }, [currentId]);

  const isNumericSearch = search.trim().length > 0 && /^\d+$/.test(search.trim());

  const filteredEpisodes = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term || isNumericSearch) return episodes;
    return episodes.filter(ep => ep.title.toLowerCase().includes(term));
  }, [episodes, search, isNumericSearch]);

  const jumpTargetId = isNumericSearch ? parseInt(search.trim()) : null;

  useEffect(() => {
    if (jumpTargetId === null) return;
    const row = rowRefs.current.get(jumpTargetId);
    if (row) row.scrollIntoView({ block: "center" });
  }, [jumpTargetId]);

  const currentEpisode = episodes.find(ep => ep.id === currentId) || null;
  const playURL = currentEpisode?.url || "";

  const selectEpisode = useCallback((id) => {
    setCurrentId(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key !== "Enter" || jumpTargetId === null) return;

    const target = episodes.find(ep => ep.id === jumpTargetId);
    if (!target) {
      toast.error(`Episode ${jumpTargetId} doesn't exist`);
      return;
    }
    selectEpisode(target.id);
  };

  const goToOffset = useCallback((offset) => {
    if (currentId === null || episodes.length === 0) return;
    const index = episodes.findIndex(ep => ep.id === currentId);
    const nextIndex = index + offset;
    if (nextIndex < 0 || nextIndex >= episodes.length) return;
    selectEpisode(episodes[nextIndex].id);
  }, [currentId, episodes, selectEpisode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const active = document.activeElement;
      const isTyping = active && (
        active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.isContentEditable
      );
      if (isTyping) return;

      const audioEl = playerRef.current?.audio?.current;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          if (!audioEl) return;
          if (audioEl.paused) audioEl.play();
          else audioEl.pause();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToOffset(-1);
          break;
        case "ArrowRight":
          e.preventDefault();
          goToOffset(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          if (audioEl) audioEl.volume = Math.min(1, audioEl.volume + 0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          if (audioEl) audioEl.volume = Math.max(0, audioEl.volume - 0.1);
          break;
        default:
          return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToOffset]);

  return (
    <div className="flex h-screen bg-[#f4eecb]">
      <Toaster />

      <aside className="w-[320px] shrink-0 flex flex-col border-r border-[#d8cf9e] bg-[#ece2b6]">
        <div className="px-4 pt-4 pb-3 border-b border-[#d8cf9e]">
          <div className="flex items-center gap-2">
            <img src="logo.webp" alt="Chanakya Niti logo" className="w-8 h-8" />
            <span className="text-xl font-bold">चाणक्य नीति</span>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-[#d8cf9e]">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search title or jump to Ep #..."
              className="input-box text-sm"
            />
            <svg
              className="input-icon w-4 h-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && (
            <p className="p-4 text-sm text-gray-600">Loading episodes...</p>
          )}

          {loadError && (
            <p className="p-4 text-sm text-red-600">{loadError}</p>
          )}

          {!loading && !loadError && filteredEpisodes.length === 0 && (
            <p className="p-4 text-sm text-gray-600">No episodes match your search.</p>
          )}

          {filteredEpisodes.map((ep) => (
            <button
              key={ep.id}
              ref={(el) => {
                if (el) rowRefs.current.set(ep.id, el);
                else rowRefs.current.delete(ep.id);
              }}
              onClick={() => selectEpisode(ep.id)}
              className={
                "w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm border-b border-[#e4dbae] hover:bg-[#dfd6a3] transition " +
                (ep.id === currentId ? "bg-[#d8cf9e] font-semibold" : "") +
                (ep.id === jumpTargetId ? " ring-2 ring-inset ring-[#bfae64]" : "")
              }
            >
              <span className="text-gray-500 tabular-nums w-8 shrink-0">
                {String(ep.id).padStart(2, "0")}
              </span>
              <span className="truncate">{ep.title}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
        <style>{`
          @keyframes moveUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-moveUpDown {
            animation: moveUpDown 2.5s infinite;
          }
        `}</style>

        <Tilt>
          <img
            src="/home1.png"
            alt="Chanakya"
            className="w-64 h-64 animate-moveUpDown"
          />
        </Tilt>

        {currentEpisode ? (
          <div className="w-full max-w-xl flex flex-col gap-4">
            <p className="text-center text-xl font-semibold text-gray-800">
              Ep {currentEpisode.id} · {currentEpisode.title}
            </p>

            <AudioPlayer
              ref={playerRef}
              src={playURL}
              autoPlayAfterSrcChange
              showSkipControls
              showJumpControls={false}
              hasDefaultKeyBindings={false}
              onClickPrevious={() => goToOffset(-1)}
              onClickNext={() => goToOffset(1)}
              onEnded={() => goToOffset(1)}
              className="niti-player"
            />
          </div>
        ) : (
          <p className="text-lg text-gray-600">
            Select an episode from the list to begin listening.
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
