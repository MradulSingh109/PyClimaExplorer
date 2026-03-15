import { useState } from 'react'
import Header from './components/Header/header'
import ClimateCards from './components/Cards/ClimateCards'
import TimelineSection from './components/Timeline/Timeline'
import NewsSection from './components/News/NewsSection'
import Footer from './components/Footer/Footer'
import VideoSection from './components/VideoSection/VideoSection'
import ChartsSection from './components/ChartsSection/ChartsSection'
import './App.css'

function App() {
  const [entered, setEntered] = useState(false)
  const [searchedCity, setSearchedCity] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleSearch = (city) => {
    setSearchedCity(city);
    setSearchTrigger(Date.now());
  };

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
      
      <div className="hero-section" id="home">
        
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

        <ClimateCards />
      </div>

      <TimelineSection />

      <VideoSection />

      <ChartsSection onSearch={handleSearch} />

      <NewsSection searchedCity={searchedCity} searchTrigger={searchTrigger} />

      <Footer />

      <Header />
    </div>
  )
}

export default App
