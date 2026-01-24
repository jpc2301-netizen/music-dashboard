import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";

const FAV_KEY = "music-dashboard-favs-v1";
const RECENT_KEY = "music-dashboard-recent-v1";

function load(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export default function App() {
    const [query, setQuery] = useState("Oasis");
    const [results, setResults] = useState([]);
    const [status, setStatus] = useState("Search for an artist or track.");
    const [loading, setLoading] = useState(false);

    const [favs, setFavs] = useState(() => load(FAV_KEY, []));
    const [recent, setRecent] = useState(() => load(RECENT_KEY, []));
    const [view, setView] = useState("search");

    const audioRef = useRef(null);
    const [playingUrl, setPlayingUrl] = useState(null);

    useEffect(() => save(FAV_KEY, favs), [favs]);
    useEffect(() => save(RECENT_KEY, recent), [recent]);

    useEffect(() => {
        runSearch("Oasis");
    }, []);

    async function runSearch(q) {
        const term = q.trim();
        if (!term) return;

        setLoading(true);
        setStatus("Searching...");
        stopAudio();

        try {
            const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
                term
            )}&entity=song&limit=30`;

            const res = await fetch(url);
            const data = await res.json();
            const items = data.results || [];

            setResults(items);
            setStatus(items.length ? `Results for "${term}".` : `No results.`);

            setRecent((prev) => {
                const next = [term, ...prev.filter((x) => x.toLowerCase() !== term.toLowerCase())];
                return next.slice(0, 8);
            });
        } catch {
            setStatus("Error fetching results.");
        } finally {
            setLoading(false);
        }
    }

    function toggleFav(item) {
        setFavs((prev) =>
            prev.some((f) => f.trackId === item.trackId)
                ? prev.filter((f) => f.trackId !== item.trackId)
                : [item, ...prev]
        );
    }

    function playPreview(url) {
        if (!url) return;
        if (playingUrl === url) {
            audioRef.current?.pause();
            setPlayingUrl(null);
            return;
        }
        if (!audioRef.current) {
            audioRef.current = new Audio(url);
            audioRef.current.addEventListener("ended", () => setPlayingUrl(null));
        } else {
            audioRef.current.pause();
            audioRef.current.src = url;
        }
        audioRef.current.play();
        setPlayingUrl(url);
    }

    function stopAudio() {
        audioRef.current?.pause();
        setPlayingUrl(null);
    }

    const topArtists = useMemo(() => {
        const map = {};
        favs.forEach((f) => (map[f.artistName] = (map[f.artistName] || 0) + 1));
        return Object.entries(map)
            .map(([artist, count]) => ({ artist, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8);
    }, [favs]);

    return (
        <div className="page">
            <aside className="side">
                <h2>Music Dashboard</h2>
                <button onClick={() => setView("search")}>Search</button>
                <button onClick={() => setView("favs")}>Favourites ({favs.length})</button>
                <button onClick={() => setView("stats")}>Stats</button>

                <h4>Recent</h4>
                {recent.map((r) => (
                    <button key={r} onClick={() => runSearch(r)}>{r}</button>
                ))}

                <button onClick={stopAudio}>Stop</button>
            </aside>

            <main className="main">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search music..."
                />
                <button onClick={() => runSearch(query)} disabled={loading}>
                    {loading ? "..." : "Search"}
                </button>

                <p>{status}</p>

                {view === "search" && (
                    <div className="grid">
                        {results.map((item) => (
                            <div key={item.trackId} className="card">
                                <img src={item.artworkUrl100} alt="" />
                                <div>{item.trackName}</div>
                                <div>{item.artistName}</div>
                                <button onClick={() => playPreview(item.previewUrl)}>Play</button>
                                <button onClick={() => toggleFav(item)}>
                                    {favs.some((f) => f.trackId === item.trackId) ? "★" : "☆"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {view === "favs" && (
                    <div className="grid">
                        {favs.map((item) => (
                            <div key={item.trackId} className="card">
                                <img src={item.artworkUrl100} alt="" />
                                <div>{item.trackName}</div>
                                <div>{item.artistName}</div>
                            </div>
                        ))}
                    </div>
                )}

                {view === "stats" && (
                    <div>
                        {topArtists.map((a) => (
                            <div key={a.artist}>
                                {a.artist} — {a.count}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}