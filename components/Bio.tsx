import React from 'react';
import { CatProfile } from '../types';
import { Fish, Zap, Star, Coffee } from 'lucide-react';

interface BioProps {
  profile: CatProfile;
}

const Bio: React.FC<BioProps> = ({ profile }) => {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-orange-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Stats Card */}
            <div className="bg-stone-50 p-8 rounded-3xl border border-stone-100 shadow-sm space-y-8">
               <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                 <span className="text-stone-500 font-medium">Breed</span>
                 <span className="text-stone-800 font-bold text-lg">{profile.breed}</span>
               </div>
               <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                 <span className="text-stone-500 font-medium">Age</span>
                 <span className="text-stone-800 font-bold text-lg">{profile.age} Years (9 Lives pending)</span>
               </div>
               <div className="flex items-center justify-between pb-2">
                 <span className="text-stone-500 font-medium">Favorite Spot</span>
                 <span className="text-stone-800 font-bold text-lg">Top of the Fridge</span>
               </div>
            </div>

            {/* Likes & Dislikes */}
            <div className="space-y-8">
              <div>
                <h3 className="flex items-center gap-2 text-xl font-bold text-stone-800 mb-4">
                  <Fish className="text-green-500" /> Things I Love
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.likes.map((like, i) => (
                    <span key={i} className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">
                      {like}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-xl font-bold text-stone-800 mb-4">
                  <Zap className="text-red-500" /> Things I Hate
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.dislikes.map((dislike, i) => (
                    <span key={i} className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-100">
                      {dislike}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
          
          <div className="mt-16 p-8 bg-orange-50 rounded-3xl border border-orange-100 flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-orange-100 rounded-full text-orange-600">
              <Coffee className="w-8 h-8" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-stone-800 mb-2">My Daily Routine</h3>
              <p className="text-stone-600">
                Wake up human at 3AM • Morning patrol • Nap (5 hours) • Demand lunch • Nap (4 hours) • Zoomies • Stare at wall • Sleep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;
