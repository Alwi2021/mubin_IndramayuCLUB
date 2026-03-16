import React from 'react';

const RunningText = () => (
  <div className="w-full bg-yellow-400 py-1 border-y border-yellow-600 overflow-hidden relative h-8">
    <div className="whitespace-nowrap absolute animate-marquee flex items-center h-full">
      <span className="text-black font-bold text-sm uppercase tracking-widest px-4">
        Nur 8: Sistem dalam mode perenungan... Aktivitas berhenti sejenak untuk backup adzan. Harap tenang dan kembali ke fitrah. | SISTEM DIBUNGKUS UNTUK ANALISIS TERMUX (NUR_MANIFEST.JSON) | PROTOKOL PIRAMIDA GUARD: SINKRON 100%
      </span>
      <span className="text-black font-bold text-sm uppercase tracking-widest px-4">
        Nur 8: Sistem dalam mode perenungan... Aktivitas berhenti sejenak untuk backup adzan. Harap tenang dan kembali ke fitrah. | SISTEM DIBUNGKUS UNTUK ANALISIS TERMUX (NUR_MANIFEST.JSON) | PROTOKOL PIRAMIDA GUARD: SINKRON 100%
      </span>
    </div>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 20s linear infinite;
      }
    `}</style>
  </div>
);

export default RunningText;
