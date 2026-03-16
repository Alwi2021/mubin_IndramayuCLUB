import React from 'react';
import { ShoppingBag, Wrench } from 'lucide-react';

const TradingService = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-2xl hover:border-[#238636] transition-all">
        <div className="flex items-center gap-4 mb-4">
          <ShoppingBag className="text-[#238636]" />
          <h4 className="font-bold text-white">Layanan Dagang</h4>
        </div>
        <p className="text-xs text-[#8b949e]">Pusat perdagangan berkah Indramayu Club. Transaksi jujur membawa makrifat.</p>
      </div>
      <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-2xl hover:border-[#238636] transition-all">
        <div className="flex items-center gap-4 mb-4">
          <Wrench className="text-[#238636]" />
          <h4 className="font-bold text-white">Layanan Servis</h4>
        </div>
        <p className="text-xs text-[#8b949e]">Perbaikan perangkat dan jiwa. Teknisi kami bekerja dengan dzikir.</p>
      </div>
    </div>
  );
};

export default TradingService;
