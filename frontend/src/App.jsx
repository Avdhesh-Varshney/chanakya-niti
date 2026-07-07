import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Tilt from "react-parallax-tilt";
import { Toaster, toast } from "react-hot-toast";
import { transliterate } from "transliteration";
import Fuse from "fuse.js";

const STORAGE_KEY = "episode";

function App() {

  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [mobileView, setMobileView] = useState("list");
  const [audioLoading, setAudioLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isCurrentRowVisible, setIsCurrentRowVisible] = useState(true);
  const [nowPlayingDirection, setNowPlayingDirection] = useState("down");

  const rowRefs = useRef(new Map());
  const playerRef = useRef(null);
  const listContainerRef = useRef(null);

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
          setMobileView("player");
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
    if (row) row.scrollIntoView({ block: "center" });
  }, [currentId, mobileView]);

  useEffect(() => {
    setAudioLoading(true);
    setIsBuffering(false);
    hasStartedRef.current = false;

    const audioEl = playerRef.current?.audio?.current;
    if (audioEl) audioEl.setAttribute("controlsList", "nodownload");
  }, [currentId]);

  const isNumericSearch = search.trim().length > 0 && /^\d+$/.test(search.trim());

  const searchableEpisodes = useMemo(() => {
    return episodes.map(ep => ({ ...ep, translit: transliterate(ep.title).toLowerCase() }));
  }, [episodes]);

  const fuse = useMemo(() => {
    return new Fuse(searchableEpisodes, { keys: ["title", "translit"], threshold: 0.4 });
  }, [searchableEpisodes]);

  const filteredEpisodes = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term || isNumericSearch) return episodes;
    return fuse.search(term).map(result => result.item);
  }, [episodes, search, isNumericSearch, fuse]);

  const jumpTargetId = isNumericSearch ? parseInt(search.trim()) : null;

  useEffect(() => {
    if (jumpTargetId === null) return;
    const row = rowRefs.current.get(jumpTargetId);
    if (row) row.scrollIntoView({ block: "center" });
  }, [jumpTargetId]);

  useEffect(() => {
    if (currentId === null) {
      setIsCurrentRowVisible(true);
      return;
    }

    const container = listContainerRef.current;
    if (!container) {
      setIsCurrentRowVisible(false);
      return;
    }

    const checkVisibility = () => {
      const row = rowRefs.current.get(currentId);
      if (!row) {
        setIsCurrentRowVisible(false);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const rowRect = row.getBoundingClientRect();
      const visible = rowRect.bottom > containerRect.top && rowRect.top < containerRect.bottom;

      setIsCurrentRowVisible(visible);
      if (!visible) {
        setNowPlayingDirection(rowRect.top < containerRect.top ? "up" : "down");
      }
    };

    checkVisibility();
    const intervalId = setInterval(checkVisibility, 300);

    return () => clearInterval(intervalId);
  }, [currentId, filteredEpisodes, mobileView]);

  const jumpToNowPlaying = () => {
    const row = rowRefs.current.get(currentId);
    if (row) row.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const currentEpisode = episodes.find(ep => ep.id === currentId) || null;
  const playURL = currentEpisode?.url || "";

  const selectEpisode = useCallback((id) => {
    setCurrentId(id);
    setMobileView("player");
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
    <div className="flex flex-col md:flex-row h-dvh bg-[#f4eecb]">
      <Toaster />

      <aside
        className={
          (mobileView === "list" ? "flex flex-1 min-h-0" : "hidden") +
          " md:flex md:flex-none w-full md:w-[320px] shrink-0 flex-col border-r border-[#d8cf9e] bg-[#ece2b6]"
        }
      >
        <div className="sticky top-0 z-10 bg-[#ece2b6]">
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
        </div>

        <div className="relative flex-1 min-h-0 overflow-hidden">
          <div ref={listContainerRef} className="h-full overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center gap-2 p-6 text-sm text-gray-600">
                <span className="w-4 h-4 border-2 border-gray-400 border-t-[#bfae64] rounded-full animate-spin" />
                Loading episodes...
              </div>
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

          {currentId !== null && !search.trim() && !isCurrentRowVisible && (
            <button
              onClick={jumpToNowPlaying}
              className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#bfae64] bg-[#ece2b6] text-sm font-medium text-gray-800 shadow-md hover:bg-[#f4eacb] transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
              </svg>
              Now Playing {nowPlayingDirection === "up" ? "↑" : "↓"}
            </button>
          )}
        </div>
      </aside>

      <main
        className={
          (mobileView === "player" ? "flex" : "hidden") +
          " md:flex flex-1 flex-col p-4 md:p-8"
        }
      >
        <style>{`
          @keyframes moveUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-moveUpDown {
            animation: moveUpDown 2.5s infinite;
          }
        `}</style>

        <button
          onClick={() => setMobileView("list")}
          className="md:hidden self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#bfae64] text-sm text-gray-700 hover:bg-[#f4eacb] transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
          </svg>
          Back to episodes
        </button>

        <div className="flex-1 flex flex-col items-center justify-center gap-6">
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

              <div className="relative w-full">
                {audioLoading && (
                  <div className="flex items-center justify-center gap-2 py-4 text-sm text-gray-600">
                    <span className="w-4 h-4 border-2 border-gray-400 border-t-[#bfae64] rounded-full animate-spin" />
                    Loading audio...
                  </div>
                )}

                {isBuffering && !audioLoading && (
                  <div className="absolute top-1 right-1 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#ece2b6] text-xs text-gray-600 shadow">
                    <span className="w-3 h-3 border-2 border-gray-400 border-t-[#bfae64] rounded-full animate-spin" />
                    Buffering...
                  </div>
                )}

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
                  onCanPlay={() => setAudioLoading(false)}
                  onPlaying={() => {
                    setAudioLoading(false);
                    setIsBuffering(false);
                    hasStartedRef.current = true;
                  }}
                  onWaiting={() => {
                    if (hasStartedRef.current) {
                      setIsBuffering(true);
                    } else {
                      setAudioLoading(true);
                    }
                  }}
                  className={"niti-player" + (audioLoading ? " niti-player-hidden" : "")}
                />
              </div>
            </div>
          ) : (
            <p className="text-lg text-gray-600">
              Select an episode from the list to begin listening.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
