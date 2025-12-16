import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Bio from './components/Bio';
import Gallery from './components/Gallery';
import ChatInterface from './components/ChatInterface';
import { CatProfile, GalleryItem } from './types';
import { Copyright } from 'lucide-react';

// Mock Data
const WHISKERS_PROFILE: CatProfile = {
  name: "Barnaby",
  tagline: "Professional nap taker, amateur bug hunter, and lord of the living room.",
  age: 4,
  breed: "Ginger Tabby",
  likes: ["Tuna Soufflé", "Sunbeams at 2PM", "Cardboard Boxes", "Judging Guests"],
  dislikes: ["The Vacuum Monster", "Closed Doors", "Diet Kibble", "Baths"],
  avatarUrl: "https://picsum.photos/id/40/800/800" // Placeholder cat image
};

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, url: "https://picsum.photos/id/219/600/800", caption: "Hunting the elusive red dot." },
  { id: 2, url: "https://picsum.photos/id/237/600/800", caption: "I didn't do it. The dog did." },
  { id: 3, url: "https://picsum.photos/id/433/600/800", caption: "Contemplating the meaning of treats." },
  { id: 4, url: "https://picsum.photos/id/582/600/800", caption: "King of the castle (sofa)." },
  { id: 5, url: "https://picsum.photos/id/593/600/800", caption: "Caught mid-sneeze." },
  { id: 6, url: "https://picsum.photos/id/659/600/800", caption: "Is that... ham?" },
];

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span className="text-xl font-bold text-stone-800 tracking-tight">
            {WHISKERS_PROFILE.name}<span className="text-orange-500">.cat</span>
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
            <a href="#gallery" className="hover:text-orange-500 transition-colors">Gallery</a>
          </div>
          <button 
            onClick={() => setIsChatOpen(true)}
            className={`px-5 py-2 rounded-full font-semibold transition-all shadow-sm ${scrolled ? 'bg-stone-900 text-white hover:bg-stone-700' : 'bg-white text-stone-900 hover:bg-stone-50'}`}
          >
            Chat
          </button>
        </div>
      </nav>

      <main>
        <Hero 
          profile={WHISKERS_PROFILE} 
          onChatClick={() => setIsChatOpen(true)}
        />
        <Bio profile={WHISKERS_PROFILE} />
        <Gallery items={GALLERY_ITEMS} />
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Copyright className="w-4 h-4" />
            <span>{new Date().getFullYear()} Barnaby Enterprises. All rights reserved.</span>
          </div>
          <p className="text-stone-600 text-sm">
            Powered by Tuna, Naps, and Gemini API.
          </p>
        </div>
      </footer>

      <ChatInterface 
        profile={WHISKERS_PROFILE} 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
}

export default App;
