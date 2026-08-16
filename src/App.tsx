import { useEffect, useRef, useState } from 'react'

type Scene = { url: string; label: string }
const scenes: Scene[] = [
  { url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_f6vx1bf6vx1bf6vx-judkou0Y64NjBmWtUbRb4az2I4mRsY.png', label: 'Rohtak Road' },
  { url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/deluxe-salon-wcUtyQ4T2QhrJxx2wiMJXtvylOkM9q.png', label: 'Red City Stories' },
  { url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_gzw17ogzw17ogzw1-l93IQxHihIZZChyzvpEmN4JSZCNyBt.png', label: 'Chai at Dusk' },
]
const audioFile = '/Hindi_Sadabahar_Geet___Old_Is_Gold_Songs___Audio_Jukebox___Alka_Yagnik,_Udit_Narayan,_Kumar_Sanu(128k).m4a'

function Player() {
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false), [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0), [duration, setDuration] = useState(0)
  const toggle = () => { if (!audio.current) return; playing ? audio.current.pause() : audio.current.play(); setPlaying(!playing) }
  const format = (n: number) => `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, '0')}`
  useEffect(() => { const key = (e: KeyboardEvent) => { if (e.code === 'Space' && e.target === document.body) { e.preventDefault(); toggle() } }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key) })
  return <section className="player" aria-label="Music player"><audio ref={audio} src={audioFile} onLoadedMetadata={e => setDuration(e.currentTarget.duration)} onTimeUpdate={e => setProgress(e.currentTarget.currentTime)} onEnded={() => setPlaying(false)} />
    <div className="record"><span>♫</span></div><div className="track"><b>Sadabahar Geet</b><small>Alka Yagnik · Udit Narayan · Kumar Sanu</small><input aria-label="Seek song" type="range" min="0" max={duration || 0} value={progress} onChange={e => { const n = Number(e.target.value); setProgress(n); if (audio.current) audio.current.currentTime = n }} /><div className="time"><span>{format(progress)}</span><span>{format(duration)}</span></div></div>
    <div className="controls"><button onClick={() => { if (audio.current) audio.current.currentTime = 0 }} aria-label="Restart">↺</button><button className="play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>{playing ? 'Ⅱ' : '▶'}</button><button onClick={() => { setMuted(!muted); if (audio.current) audio.current.muted = !muted }} aria-label="Mute">{muted ? '◌' : '◉'}</button></div>
  </section>
}

export default function App() {
  const [scene, setScene] = useState(0)
  useEffect(() => { const id = window.setInterval(() => setScene(v => (v + 1) % scenes.length), 30000); return () => window.clearInterval(id) }, [])
  return <main className="site" style={{ '--scene': `url(${scenes[scene].url})` } as React.CSSProperties}>
    <div className="backdrop" /><div className="wash" />
    <nav><a className="brand" href="#top"><span>र</span> ROADside <em>RANG</em></a><div className="links"><a href="#music">Music</a><a href="#about">About</a><a href="#contact">Contact</a></div><a className="listen" href="#music">Listen now <span>↗</span></a></nav>
    <header id="top" className="hero"><p className="eyebrow">THE SOUND OF THE OPEN ROAD</p><h1>Stories in <i>red.</i><br />Songs for the <i>ride.</i></h1><p className="intro">A living archive of the music, people, and places that make every Indian road feel like home.</p><div className="hero-actions"><a className="primary" href="#music">Start listening <span>→</span></a><a className="secondary" href="#about">Discover the story</a></div><div className="scene-note"><span className="pulse" /> Now showing <b>{scenes[scene].label}</b><div className="dots">{scenes.map((item, i) => <button key={item.label} className={i === scene ? 'active' : ''} onClick={() => setScene(i)} aria-label={`Show ${item.label}`} />)}</div></div></header>
    <section id="music" className="music"><div><p className="eyebrow">01 / THE COLLECTION</p><h2>Old songs.<br /><i>New journeys.</i></h2></div><Player /></section>
    <section id="about" className="about"><p className="eyebrow">02 / OUR STORY</p><div><h2>Every road has<br /><i>a rhythm.</i></h2><p>Roadside Rang is a love letter to the melodies that travel with us — from the first chai stop to the last light home.</p></div></section>
    <footer id="contact"><span>© 2024 Roadside Rang</span><span>Made for the long way home.</span></footer>
  </main>
}
