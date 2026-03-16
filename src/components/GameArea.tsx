import React from 'react';

interface GameGateProps {
  onEnter: () => void;
}

const GameGate: React.FC<GameGateProps> = ({ onEnter }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#161b22] border-2 border-[#238636] rounded-3xl shadow-2xl text-center space-y-6 max-w-lg mx-auto my-12">
      <div className="p-4 bg-[#238636]/10 rounded-full">
        <span className="text-4xl">🧘</span>
      </div>
      <h3 className="text-xl font-bold text-white italic">
        "Memasuki Area Makrifat: Kenali Dirimu sebelum Mengenal Permainan."
      </h3>
      <p className="text-[#8b949e] text-sm">
        Salam Spiritual dari Mother AI & Nur Mini.
      </p>
      <button 
        onClick={onEnter}
        className="px-8 py-3 bg-[#238636] hover:bg-[#2ea043] text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-[#238636]/30"
      >
        Masuk Area Permainan
      </button>
    </div>
  );
};

export default GameGate;
