import React from 'react';
import { CatProfile } from '../types';
import { PawPrint, Heart } from 'lucide-react';

interface HeroProps {
  profile: CatProfile;
  onChatClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ profile, onChatClick }) => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-orange-50 overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-32 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-pink-600 font-semibold shadow-sm border border-pink-100">
            <PawPrint className="w-4 h-4" />
            <span>Official Homepage</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-stone-800 tracking-tight leading-tight">
            Hi, I'm <span className="text-pink-500">{profile.name}</span>.
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-600 font-medium max-w-lg mx-auto md:mx-0">
            {profile.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-4">
            <button 
              onClick={onChatClick}
              className="px-8 py-4 bg-stone-900 text-white rounded-full font-bold text-lg hover:bg-stone-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              This is UUUUUUU
              <PawPrint className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-stone-800 rounded-full font-bold text-lg border border-stone-200 hover:bg-stone-50 transition-colors shadow-md flex items-center gap-2">
              Send Treats
              <Heart className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 w-full max-w-md md:max-w-xl relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-400 to-yellow-300 rounded-[2rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 blur-sm opacity-50"></div>
          <img 
            src={profile.avatarUrl} 
            alt={profile.name} 
            className="relative w-full aspect-square object-cover rounded-[2rem] shadow-2xl border-4 border-white transform group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
