import { useState } from 'react'
import Header from './components/Header/header'
import './App.css'

function App() {
  const [entered, setEntered] = useState(false)

  if (!entered) {
    return (
      <div className="splash-screen">
        <h1 className="splash-title">Our Planet Needs You</h1>
        <p className="splash-subtitle">See how the world is rapidly changing.</p>

        <button className="splash-button" onClick={() => setEntered(true)}>
          Enter Inside
        </button>
      </div>
    )
  }

  return (
    <div className="black-screen">
      <div className="aurora-bg"></div>
      
      {/* Background Video */}
      <div className="video-container">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="earth-video"
        >
          <source src="/BlackMarble_2016_rotate_2160p.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <Header />
    </div>
  )
}

export default App
