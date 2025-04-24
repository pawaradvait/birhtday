import React, { useEffect, useState } from "react";

function App() {
  const [partyStarted, setPartyStarted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Initialize components when component mounts
    createDiscoFloor();
    createLasers();
    createSpotlights();
    animateSoundBars();
    flashBackground();

    // Initialize audio
    const audioElement = new Audio("/path-to-your-music.mp3");
    audioElement.loop = true;
    setAudio(audioElement);

    // Cleanup function to prevent memory leaks
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      // Clear any intervals
      clearAllIntervals();
    };
  }, []);

  // Function to clear all intervals
  const clearAllIntervals = () => {
    // Get a copy of all intervals
    const intervalsCopy = window.intervals ? [...window.intervals] : [];

    // Clear each interval
    intervalsCopy.forEach((intervalId) => {
      clearInterval(intervalId);
    });

    // Reset intervals array
    window.intervals = [];
  };

  // Helper function to safely set intervals
  const safeSetInterval = (callback, delay) => {
    if (!window.intervals) window.intervals = [];
    const intervalId = setInterval(callback, delay);
    window.intervals.push(intervalId);
    return intervalId;
  };

  // Create disco floor with responsive grid
  const createDiscoFloor = () => {
    const discoFloor = document.getElementById("discoFloor");
    if (!discoFloor) return;

    // Clear existing tiles
    discoFloor.innerHTML = "";

    // Determine number of tiles based on screen size
    const width = window.innerWidth;
    const rows = width < 768 ? 10 : 20;
    const cols = width < 768 ? 10 : 20;

    for (let i = 0; i < rows * cols; i++) {
      const tile = document.createElement("div");
      tile.className = "disco-tile";
      discoFloor.appendChild(tile);
    }

    // Update grid template in CSS
    discoFloor.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    discoFloor.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    animateDiscoFloor();
  };

  // Animate disco floor with performance optimizations
  const animateDiscoFloor = () => {
    const tiles = document.querySelectorAll(".disco-tile");
    const colors = [
      "#ff0099",
      "#00ffff",
      "#ffff00",
      "#ff00ff",
      "#00ff00",
      "#9900ff",
    ];

    safeSetInterval(() => {
      // Only animate a subset of tiles for better performance
      const animateCount = Math.min(tiles.length / 4, 20);

      for (let i = 0; i < animateCount; i++) {
        const randomIndex = Math.floor(Math.random() * tiles.length);
        const tile = tiles[randomIndex];

        tile.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        setTimeout(() => {
          tile.style.backgroundColor = "transparent";
        }, 500);
      }
    }, 200);
  };

  // Create confetti with device-appropriate amount
  const createConfetti = () => {
    const colors = [
      "#ff0099",
      "#00ffff",
      "#ffff00",
      "#ff00ff",
      "#00ff00",
      "#9900ff",
    ];

    // Determine number of confetti pieces based on screen size
    const width = window.innerWidth;
    const count = width < 768 ? 50 : 100;

    // Clean up any existing confetti
    const existingConfetti = document.querySelectorAll(".confetti");
    existingConfetti.forEach((el) => el.remove());

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `-10px`;
      confetti.style.animationDelay = `${Math.random() * 5}s`;
      document.body.appendChild(confetti);

      // Remove confetti after animation to prevent memory issues
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 6000);
    }
  };

  // Create laser beams with responsive number
  const createLasers = () => {
    const laserContainer = document.getElementById("laserContainer");
    if (!laserContainer) return;

    // Clear existing lasers
    laserContainer.innerHTML = "";

    const colors = [
      "#ff0099",
      "#00ffff",
      "#ffff00",
      "#ff00ff",
      "#00ff00",
      "#9900ff",
    ];

    // Adjust number of lasers based on screen size
    const width = window.innerWidth;
    const count = width < 768 ? 6 : 12;

    for (let i = 0; i < count; i++) {
      const laser = document.createElement("div");
      laser.className = "laser";
      laser.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      laser.style.animationDelay = `${Math.random() * 2}s`;
      laserContainer.appendChild(laser);
    }
  };

  // Create spotlights with responsive number
  const createSpotlights = () => {
    const spotlightContainer = document.getElementById("spotlightContainer");
    if (!spotlightContainer) return;

    // Clear existing spotlights
    spotlightContainer.innerHTML = "";

    const colors = [
      "#ff0099",
      "#00ffff",
      "#ffff00",
      "#ff00ff",
      "#00ff00",
      "#9900ff",
    ];

    // Adjust number of spotlights based on screen size
    const width = window.innerWidth;
    const count = width < 768 ? 3 : 5;

    for (let i = 0; i < count; i++) {
      const spotlight = document.createElement("div");
      spotlight.className = "spot-light";
      spotlight.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      spotlight.style.left = `${Math.random() * 100}%`;
      spotlight.style.top = `${Math.random() * 100}%`;
      spotlight.style.animationDelay = `${Math.random() * 3}s`;
      spotlightContainer.appendChild(spotlight);
    }
  };

  // Animate sound bars
  const animateSoundBars = () => {
    const soundBars = document.querySelectorAll(".sound-bar");

    soundBars.forEach((bar, index) => {
      bar.style.animationDelay = `${index * 0.05}s`;
      bar.style.animationDuration = `${0.3 + Math.random() * 0.7}s`;
    });
  };

  // Flash background with reduced intensity for accessibility
  const flashBackground = () => {
    const colors = [
      "rgba(255, 0, 153, 0.3)",
      "rgba(0, 255, 255, 0.3)",
      "rgba(255, 255, 0, 0.3)",
      "rgba(255, 0, 255, 0.3)",
      "rgba(0, 255, 0, 0.3)",
      "rgba(153, 0, 255, 0.3)",
    ];

    safeSetInterval(() => {
      if (Math.random() > 0.9) {
        document.body.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        setTimeout(() => {
          document.body.style.backgroundColor = "#000";
        }, 100);
      }
    }, 500);
  };

  // Handle audio playback with user interaction
  const toggleAudio = () => {
    if (!audio) return;

    if (audioPlaying) {
      audio.pause();
    } else {
      audio.play().catch((e) => {
        console.log("Audio playback error:", e);
        // Provide visual feedback that audio couldn't play
        const audioButton = document.getElementById("audioButton");
        if (audioButton) {
          audioButton.classList.add("error");
          setTimeout(() => audioButton.classList.remove("error"), 1000);
        }
      });
    }

    setAudioPlaying(!audioPlaying);
  };

  // Start the party with accessibility considerations
  const handleStartParty = () => {
    setPartyStarted(true);
    createConfetti();

    // Add more lasers and spotlights
    createLasers();
    createSpotlights();

    // Intensify animations but keep it accessible
    document.body.style.animation = "pulse 0.5s infinite";
  };

  // Handle window resize to make components responsive
  useEffect(() => {
    const handleResize = () => {
      createDiscoFloor();
      createLasers();
      createSpotlights();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Generate sound wave bars
  const renderSoundBars = () => {
    // Determine number of bars based on screen size
    const width = window.innerWidth;
    const count = width < 768 ? 5 : 10;

    const bars = [];
    for (let i = 0; i < count; i++) {
      bars.push(<div key={i} className="sound-bar"></div>);
    }
    return bars;
  };

  return (
    <div className="app-container">
      <div className="container">
        <h1 className="title">Happy Birthday Rohit!</h1>
        <div className="message neon-text">Let's Boogie All Night Long!</div>

        <div className="disco-ball-container">
          <div className="string"></div>
          <div className="disco-ball"></div>
        </div>

        <div className="controls">
          <button
            className="btn"
            onClick={handleStartParty}
            disabled={partyStarted}
            aria-label="Start the party"
          >
            {partyStarted ? "Party Started!" : "Start The Party!"}
          </button>

          <button
            id="audioButton"
            className={`btn audio-btn ${audioPlaying ? "playing" : ""}`}
            onClick={toggleAudio}
            aria-label={audioPlaying ? "Pause music" : "Play music"}
          >
            {audioPlaying ? "Pause Music" : "Play Music"}
          </button>
        </div>

        <div className="sound-wave">{renderSoundBars()}</div>
      </div>

      <div className="disco-floor" id="discoFloor"></div>
      <div className="laser-container" id="laserContainer"></div>
      <div className="spotlight-container" id="spotlightContainer"></div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app-container {
          font-family: "Arial", sans-serif;
          background-color: #000;
          color: #fff;
          overflow: hidden;
          height: 100vh;
          width: 100vw;
          position: relative;
        }

        .container {
          text-align: center;
          z-index: 10;
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 1rem;
        }

        .disco-floor {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30vh;
          display: grid;
          z-index: 1;
          perspective: 800px;
          transform: rotateX(60deg);
        }

        .disco-tile {
          height: 100%;
          width: 100%;
          transition: background-color 0.5s;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .title {
          font-size: clamp(2.5rem, 10vw, 6rem);
          margin-bottom: 1rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 3px;
          animation: disco-text 5s linear infinite;
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor,
            0 0 40px currentColor;
        }

        .message {
          font-size: clamp(1rem, 5vw, 2rem);
          margin-bottom: 2.5rem;
          font-weight: bold;
          text-shadow: 0 0 10px #fff;
          animation: pulse 2s infinite;
        }

        .disco-ball-container {
          position: relative;
          width: clamp(100px, 30vw, 200px);
          height: clamp(150px, 30vh, 300px);
          margin: 0 auto clamp(20px, 5vh, 40px);
          animation: swing 5s ease-in-out infinite;
          transform-origin: top center;
        }

        .disco-ball {
          width: 100%;
          height: calc(100% - 50px);
          background: radial-gradient(
            circle at 50% 50%,
            #fff 0%,
            #ccc 30%,
            #999 60%,
            #666 100%
          );
          border-radius: 50%;
          position: absolute;
          bottom: 0;
          overflow: hidden;
          box-shadow: 0 0 25px #fff, 0 0 50px #fff;
          animation: rotate 10s linear infinite;
        }

        .disco-ball:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.2) 25%,
              transparent 25%,
              transparent 50%,
              rgba(255, 255, 255, 0.2) 50%,
              rgba(255, 255, 255, 0.2) 75%,
              transparent 75%,
              transparent
            ),
            linear-gradient(
              -45deg,
              rgba(255, 255, 255, 0.2) 25%,
              transparent 25%,
              transparent 50%,
              rgba(255, 255, 255, 0.2) 50%,
              rgba(255, 255, 255, 0.2) 75%,
              transparent 75%,
              transparent
            );
          background-size: 20px 20px;
          border-radius: 50%;
        }

        .string {
          width: 2px;
          height: 50px;
          background: #888;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
          width: clamp(250px, 80%, 400px);
        }

        @media (min-width: 768px) {
          .controls {
            flex-direction: row;
            justify-content: center;
          }
        }

        .btn {
          background: linear-gradient(45deg, #ff00cc, #3333ff);
          border: none;
          border-radius: 50px;
          color: white;
          padding: clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem);
          font-size: clamp(1rem, 3vw, 1.5rem);
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
          box-shadow: 0 0 15px rgba(255, 0, 204, 0.5);
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          overflow: hidden;
          z-index: 10;
          flex: 1;
        }

        .btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(255, 0, 204, 0.8);
        }

        .btn:active {
          transform: scale(0.95);
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: default;
          transform: scale(1);
        }

        .btn.error {
          animation: shake 0.5s linear;
          background: linear-gradient(45deg, #ff0000, #ff6b6b);
        }

        .audio-btn.playing {
          background: linear-gradient(45deg, #00ccff, #3333ff);
        }

        .btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: 0.5s;
        }

        .btn:hover:not(:disabled)::before {
          left: 100%;
        }

        .laser-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
          opacity: 0.5;
        }

        .laser {
          position: absolute;
          height: 2px;
          width: 100%;
          transform-origin: 0 0;
          animation: laser-sweep 8s infinite;
          opacity: 0.7;
        }

        .spot-light {
          position: absolute;
          width: clamp(50px, 10vw, 100px);
          height: clamp(50px, 10vw, 100px);
          border-radius: 50%;
          filter: blur(8px);
          animation: move-light 5s infinite;
          opacity: 0.7;
        }

        .confetti {
          position: absolute;
          width: clamp(5px, 1vw, 10px);
          height: clamp(10px, 2vw, 20px);
          opacity: 0.8;
          animation: confetti-fall 5s linear forwards;
        }

        .sound-wave {
          position: absolute;
          bottom: 50px;
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }

        .sound-bar {
          width: clamp(5px, 1.5vw, 10px);
          background: linear-gradient(to top, #ff00cc, #3333ff);
          border-radius: 5px;
          animation: sound-bar-dance 0.5s infinite alternate;
        }

        .neon-text {
          text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ff, 0 0 20px #0ff,
            0 0 25px #0ff;
          font-weight: bold;
        }

        .spotlight-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        @keyframes disco-text {
          0%,
          100% {
            color: #ff0099;
          }
          25% {
            color: #00ffff;
          }
          50% {
            color: #ffff00;
          }
          75% {
            color: #ff00ff;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        @keyframes swing {
          0%,
          100% {
            transform: rotate(3deg);
          }
          50% {
            transform: rotate(-3deg);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes move-light {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(100px, 100px);
          }
          50% {
            transform: translate(0, 200px);
          }
          75% {
            transform: translate(-100px, 100px);
          }
        }

        @keyframes laser-sweep {
          0% {
            transform: rotate(0deg);
            opacity: 0.3;
          }
          30% {
            opacity: 0.7;
          }
          50% {
            transform: rotate(180deg);
            opacity: 0.3;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: rotate(360deg);
            opacity: 0.3;
          }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes sound-bar-dance {
          0% {
            height: 5px;
          }
          100% {
            height: clamp(15px, 4vw, 30px);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20%,
          60% {
            transform: translateX(-5px);
          }
          40%,
          80% {
            transform: translateX(5px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .disco-ball,
          .laser,
          .spot-light,
          .confetti,
          .sound-bar,
          h1,
          .message,
          .disco-ball-container {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
