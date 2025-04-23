
import React from 'react';
import { Sparkles } from 'lucide-react';

interface CosmicHeaderProps {
  title: string;
  subtitle?: string;
}

const CosmicHeader: React.FC<CosmicHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center py-8 relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-40 h-40 rounded-full bg-cosmic-gold/20 filter blur-xl animate-pulse"></div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-white relative z-10 mb-2 tracking-wide">
        <span className="inline-flex items-center">
          <Sparkles className="text-cosmic-gold w-8 h-8 mr-2 animate-glow" />
          {title}
          <Sparkles className="text-cosmic-gold w-8 h-8 ml-2 animate-glow" />
        </span>
      </h1>
      
      {subtitle && (
        <p className="text-lg text-cosmic-gold/80 font-serif italic">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default CosmicHeader;
