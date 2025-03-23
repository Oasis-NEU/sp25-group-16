import { useState, useEffect } from "react";
import "./App.css";
import confetti from "canvas-confetti";

// ✅ Import your visual effect components
import BlobWave from "./components/BlobWave";
import FloatingParticles from "./components/FloatingParticles";

const compliments = {
  normal: [
    "You're doing great, NAME!",
    "Keep shining, NAME!",
    "You make the world better just by being in it, NAME.",
  ],
  extra: [
    "OMG NAME!! The universe literally revolves around your amazingness!",
    "You’re the human version of sunshine wrapped in chocolate, NAME!",
    "You deserve a standing ovation every hour, NAME!",
  ],
  shakespearean: [
    "Thou art as radiant as the morning sun, NAME!",
    "NAME, thy grace outshines the moonlight on a cloudless eve.",
    "O NAME, thou art the muse of my dreams!",
  ],
  rizz: [
    "NAME, if being fine was a crime, you’d be doing life ",
    "Are you a magician, NAME? Because every time I look at you, everyone else disappears ",
    "Do you have a map, NAME? I just got lost in your eyes ",
    "NAME, if I could rearrange the alphabet, I’d put U and I together ",
    "You're not a snack, NAME. You’re the whole buffet ",
  ],
};

function App() {
  const [name, setName] = useState("");
  const [intensity, setIntensity] = useState("normal");
  const [compliment, setCompliment] = useState("");
  const [streak, setStreak] = useState(0);
  const [gif, setGif] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = speechSynthesis.getVoices();
      setVoices(allVoices);
      if (allVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(allVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const generateCompliment = () => {
    const list = compliments[intensity];
    const raw = list[Math.floor(Math.random() * list.length)];
    const personalized = raw.replace(/NAME/g, name || "friend");
    setCompliment(personalized);
    setStreak((prev) => prev + 1);
    speakCompliment(personalized);

    const emojis = ["🌟", "💥", "✨", "🔥", "💫", "🥳"];
    setGif(emojis[Math.floor(Math.random() * emojis.length)]);

    // Remove all mode classes
    document.body.classList.remove("normal", "extra", "shakespearean", "rizz");
    document.body.classList.add(intensity);

    // Change animation speed based on mode
    if (intensity === "rizz") {
      document.body.style.animationDuration = "6s";
    } else if (intensity === "shakespearean") {
      document.body.style.animationDuration = "12s";
    } else {
      document.body.style.animationDuration = "10s";
    }

    triggerConfetti();
    triggerEmojiBurst();
  };

  const speakCompliment = (text) => {
    if (isMuted) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const voiceObj = voices.find((v) => v.name === selectedVoice);
    if (voiceObj) {
      utterance.voice = voiceObj;
    }

    utterance.pitch = 1.1;
    utterance.rate = 1.1;
    utterance.volume = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const triggerEmojiBurst = () => {
    const el = document.getElementById("emojiBurst");
    const emojis = ["🎉", "💖", "✨", "🌈", "🦄"];
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = null;
  };

  const toggleDark = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <>
      {/* 🌪️ Blob Wave for Shakespearean */}
      {intensity === "shakespearean" && <BlobWave />}

      {/* ✨ Floating Sparkles for Extra */}
      {intensity === "extra" && <FloatingParticles />}

      <div className="container">
        <h1>Flatter Me</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="intensity">
          <label>
            <input
              type="radio"
              value="normal"
              checked={intensity === "normal"}
              onChange={() => setIntensity("normal")}
            />{" "}
            Normal
          </label>
          <label>
            <input
              type="radio"
              value="extra"
              checked={intensity === "extra"}
              onChange={() => setIntensity("extra")}
            />{" "}
            Over-the-Top
          </label>
          <label>
            <input
              type="radio"
              value="shakespearean"
              checked={intensity === "shakespearean"}
              onChange={() => setIntensity("shakespearean")}
            />{" "}
            Shakespearean
          </label>
          <label>
            <input
              type="radio"
              value="rizz"
              checked={intensity === "rizz"}
              onChange={() => setIntensity("rizz")}
            />{" "}
            Ultimate Rizz 💘
          </label>
        </div>

        <select
          onChange={(e) => setSelectedVoice(e.target.value)}
          value={selectedVoice}
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>

        <button onClick={generateCompliment}>Give me a compliment!</button>
        <p className="compliment">{compliment}</p>
        <p className="gif">{gif}</p>
        <p className="streak">Streak: {streak}</p>

        <div className="audio-controls">
          <button onClick={() => speakCompliment(compliment)}>Replay 🔁</button>
          <button onClick={() => speechSynthesis.cancel()}>Stop ⏹</button>
          <button onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? "Unmute 🔊" : "Mute 🔇"}
          </button>
        </div>

        <button onClick={toggleDark}>Toggle Dark Mode</button>
        <div id="emojiBurst" className="emoji-burst"></div>
      </div>
    </>
  );
}

export default App;
