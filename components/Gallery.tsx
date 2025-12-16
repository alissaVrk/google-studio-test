import React from 'react';
import { GalleryItem } from '../types';
import { Instagram } from 'lucide-react';

interface GalleryProps {
  items: GalleryItem[];
}

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  return (
    <section className="py-24 bg-stone-50" id="gallery">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Paw-tfolio</h2>
            <p className="text-stone-500 max-w-md">A collection of my most photogenic moments, unauthorized candid shots, and evidence of mischief.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-full font-semibold text-stone-700 hover:bg-stone-100 transition mt-4 md:mt-0 shadow-sm">
            <Instagram className="w-5 h-5" /> Insta-cat
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg bg-stone-200">
              <img 
                src={item.url} 
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center md:hidden">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-full font-semibold text-stone-700 hover:bg-stone-100 transition shadow-sm">
            <Instagram className="w-5 h-5" /> Follow on Insta-cat
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
