import { useState, useEffect, useRef } from 'react'
import './index.css'

function App() {
  const [hearts, setHearts] = useState([])
  const [visibleLetters, setVisibleLetters] = useState([])
  const letterRefs = useRef([])

  useEffect(() => {
    const interval = setInterval(() => {
      createHeart()
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observers = letterRefs.current.map((letter, index) => {
      if (!letter) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleLetters((prev) => [...prev, index])
              }, index * 300)
            }
          })
        },
        { threshold: 0.2 }
      )

      observer.observe(letter)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const createHeart = () => {
    setHearts((prevHearts) => {
      if (prevHearts.length >= 15) {
        return prevHearts
      }

      const id = Date.now()
      const newHeart = {
        id,
        x: Math.random() * window.innerWidth,
        y: 0,
        scale: 0.5 + Math.random() * 1,
        opacity: 1,
        rotation: Math.random() * 360,
      }

      // Start animation
      setTimeout(() => {
        setHearts((hearts) =>
          hearts.map((h) =>
            h.id === id ? { ...h, y: 100, opacity: 0 } : h
          )
        )
      }, 50)

      // Remove heart after animation
      setTimeout(() => {
        setHearts((hearts) => hearts.filter((h) => h.id !== id))
      }, 3000)

      return [...prevHearts, newHeart]
    })
  }

  const generateRoseKey = (index, section) =>
    `rose-${section}-${index}-${Math.random()}`

  return (
    <div className="w-screen min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen w-screen bg-gradient-to-b from-pink-50 to-red-100 relative overflow-hidden flex items-center justify-center">
        <div className="text-center z-10 transform scale-50 md:scale-100 transition-transform duration-300">
          <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4 font-serif animate-heartbeat">
            Happy Valentine's Day
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-pink-500 font-serif">
            I love you Ama
          </h2>
        </div>

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute transition-all duration-[3000ms] ease-linear"
              style={{
                left: `${heart.x}px`,
                bottom: `${heart.y}%`,
                transform: `scale(${heart.scale}) rotate(${heart.rotation}deg)`,
                opacity: heart.opacity,
              }}
            >
              <span className="text-red-500" style={{ fontSize: '2rem' }}>
                ❤️
              </span>
            </div>
          ))}
        </div>

        {/* Background roses animation */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={generateRoseKey(i, 'hero')}
            className="absolute rose-animation"
            style={{
              animation: `roseFloatPath 6s infinite ${i * 1.5}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <img
              src="/images/rose.png"
              alt="Rose"
              width="64"
              height="64"
              style={{ transition: 'all 3s ease-out' }}
            />
          </div>
        ))}
      </section>

      {/* Love Letters Section */}
      <section className="min-h-screen w-full bg-white relative overflow-hidden flex flex-col items-center px-0 pb-24">
        {/* Background roses animation */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={generateRoseKey(i, 'letters')}
            className="absolute rose-animation"
            style={{
              animation: `roseFloatPath 6s infinite ${i * 1.5}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <img
              src="/images/rose.png"
              alt="Rose"
              width="64"
              height="64"
              style={{ transition: 'all 3s ease-out' }}
            />
          </div>
        ))}

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute transition-all duration-[3000ms] ease-linear"
              style={{
                left: `${heart.x}px`,
                bottom: `${heart.y}%`,
                transform: `scale(${heart.scale}) rotate(${heart.rotation}deg)`,
                opacity: heart.opacity,
              }}
            >
              <span className="text-red-500" style={{ fontSize: '2rem' }}>
                ❤️
              </span>
            </div>
          ))}
        </div>

        <div className="max-w-2xl w-full space-y-8 relative z-10 py-20">
          {[
            "Your love is like a beautiful rose that blooms eternally in my heart...",
            "And I cannot imagine a moment where we are apart...",
            "So I made this wonderful piece of art...",
            "Just to say..."
          ].map((text, index) => (
            <div
              key={index}
              ref={(el) => (letterRefs.current[index] = el)}
              className={`p-6 ${index === 0 ? 'bg-pink-50/80' : 'bg-red-50/80'} backdrop-blur rounded-lg shadow-sm transition-all duration-1000 text-center ${
                visibleLetters.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <p className="text-lg text-red-800 italic">
                "{text}"
              </p>
            </div>
          ))}
        </div>

        {/* Audio Player */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-4 bg-pink-100 rounded-lg shadow-md border border-pink-300">
          <audio id="audio-player" controls className="w-64">
            <source src="/audios/val.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </section>

      {/* Footer */}
      <section className="w-screen py-8 bg-gradient-to-t from-red-100 to-pink-50 text-center relative">
        {/* Background roses animation */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={generateRoseKey(i, 'footer')}
            className="absolute rose-animation"
            style={{
              animation: `roseFloatPath 6s infinite ${i * 1.5}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <img
              src="/images/rose.png"
              alt="Rose"
              width="64"
              height="64"
              style={{ transition: 'all 3s ease-out' }}
            />
          </div>
        ))}

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute transition-all duration-[3000ms] ease-linear"
              style={{
                left: `${heart.x}px`,
                bottom: `${heart.y}%`,
                transform: `scale(${heart.scale}) rotate(${heart.rotation}deg)`,
                opacity: heart.opacity,
              }}
            >
              <span className="text-red-500" style={{ fontSize: '2rem' }}>
                ❤️
              </span>
            </div>
          ))}
        </div>

        <p className="text-xl text-red-600 font-serif italic transition-all duration-1000 relative z-10">
          I love you to the moon and back... ❤️
        </p>
      </section>
    </div>
  )
}

export default App
