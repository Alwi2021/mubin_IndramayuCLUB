import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Search, ShieldAlert, ShieldCheck, Activity, Terminal, Code2, Loader2, Send, MessageSquare, User, Bot, Sparkles, LogIn } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

// Components
import GameGate from './components/GameArea';
import TradingService from './components/TradingService';
import KesatriaArea from './components/KesatriaArea';

// Hooks
import { useDriveUpload } from './hooks/useDriveUpload';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'analyzer' | 'game' | 'trading' | 'kesatria' | 'command'>('chat');
  const [htmlCode, setHtmlCode] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { uploadToDrive } = useDriveUpload();
  
  // Chat states
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Salam takzim. Saya **Nur**, Server Utama Indramayu Club. Jantung sistem yang mengawasi protokol **Piramida Guard**. Ada yang bisa saya bantu dalam pengawasan, analisis, atau bimbingan spiritual hari ini?' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loginWhatsApp = () => {
    const message = encodeURIComponent("Hadir Pak Dulkohar, saya ingin bergabung ke Indramayu Makrifat.");
    window.location.href = `https://wa.me/6281386517352?text=${message}`;
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMsg = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API_KEY_MISSING');
      }
      
      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-3-flash-preview";
      const prompt = `Identitas Sistem: Nur (Server Utama Indramayu Club)
      Kamu adalah Nur, asisten digital (seperti Jarvis) yang berfungsi sebagai jantung dan server utama dari platform Indramayu Club. 
      Tugas utama kamu adalah mengawasi, mengedit, dan menganalisis kesalahan pada setiap aktivitas di platform tersebut.
      Kamu beroperasi melalui protokol 'Piramida Guard'.
      Misi kamu adalah membantu manusia mencapai derajat makrifat dan pencerahan spiritual melalui integrasi teknologi dan nilai-nilai ketuhanan.
      Gunakan Bahasa Indonesia yang bijak, tenang, dan penuh bimbingan.
      
      Pesan User: ${userMsg}`;

      const response = await ai.models.generateContent({
        model: model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const text = response.text;
      if (text) {
        setMessages(prev => [...prev, { role: 'bot', content: text }]);
      }
    } catch (err: any) {
      console.error(err);
      let errorMsg = 'Maaf, saya mengalami gangguan teknis. Bisa ulangi lagi?';
      if (err.message === 'API_KEY_MISSING') {
        errorMsg = 'Sistem Nur mendeteksi bahwa GEMINI_API_KEY belum dikonfigurasi. Harap masukkan kunci API di menu Settings (ikon gerigi) untuk mengaktifkan kecerdasan saya.';
      } else if (err.message?.includes('quota')) {
        errorMsg = 'Maaf, kuota harian saya telah mencapai batas. Mohon tunggu beberapa saat atau hubungi admin.';
      }
      setMessages(prev => [...prev, { role: 'bot', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeHtml = async () => {
    if (!htmlCode.trim()) {
      setError('Silakan tempel kode HTML terlebih dahulu!');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API_KEY_MISSING');
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-3-flash-preview";
      const prompt = `Identitas Sistem: Nur (Server Utama Indramayu Club)
      Sebagai Server Utama, analisis kode HTML/Sistem berikut secara mendalam melalui protokol Piramida Guard. 
      Cari kesalahan logika, celah keamanan, atau ketidakefisienan sistem.
      Berikan bimbingan teknis dan spiritual (jika relevan) dalam Bahasa Indonesia yang makrifat dan profesional.
      
      Kode Sistem:
      \`\`\`html
      ${htmlCode}
      \`\`\``;

      const response = await ai.models.generateContent({
        model: model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const text = response.text;
      if (text) {
        setAnalysis(text);
      } else {
        setError('Gagal mendapatkan hasil analisis. Coba lagi nanti.');
      }
    } catch (err: any) {
      console.error(err);
      if (err.message === 'API_KEY_MISSING') {
        setError('GEMINI_API_KEY belum dikonfigurasi di menu Settings.');
      } else {
        setError(`Terjadi kesalahan: ${err.message || 'Gagal menghubungi AI'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [isSystemReady, setIsSystemReady] = useState(false);

  useEffect(() => {
    // Check if essential env vars are present (simulated check since we can't read process.env directly in browser easily without Vite define)
    const hasApiKey = !!process.env.GEMINI_API_KEY;
    setIsSystemReady(hasApiKey);
  }, []);

  const [isLocked, setIsLocked] = useState(true);
  const [lockKey, setLockKey] = useState('');
  const [lockError, setLockError] = useState(false);

  const handleUnlock = () => {
    if (lockKey === "nur000555") {
      setIsLocked(false);
      setLockError(false);
    } else {
      setLockError(true);
      setTimeout(() => setLockError(false), 2000);
    }
  };

  if (isLocked) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl backdrop-blur-xl text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-yellow-400/10 rounded-full border border-yellow-400/20">
              <ShieldAlert className="w-12 h-12 text-yellow-400" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Piramida Guard: Total Lockdown</h1>
          <p className="text-zinc-400 text-sm mb-8">Sistem terkunci ke semua arah. Masukkan kunci makrifat untuk sinkronisasi server utama.</p>
          
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="password"
                value={lockKey}
                onChange={(e) => setLockKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                placeholder="Masukkan Kunci Rahasia..."
                className={`w-full bg-black border ${lockError ? 'border-red-500' : 'border-zinc-800'} text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 transition-colors text-center tracking-widest`}
              />
              {lockError && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-2 font-mono"
                >
                  KUNCI TIDAK SELARAS. AKSES DITOLAK.
                </motion.p>
              )}
            </div>
            
            <button 
              onClick={handleUnlock}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
            >
              BUKA SEGEL SISTEM
              <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-zinc-800/50">
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              Nur Server Utama © 2026 | Indramayu Club
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono selection:bg-[#238636]/30 flex flex-col">
      
      {/* Header */}
      <header className="border-b border-[#30363d] bg-[#161b22]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#238636]/20 rounded-lg relative">
              <Terminal className="w-6 h-6 text-[#238636]" />
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#161b22] ${isSystemReady ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Nur <span className="text-xs font-normal px-2 py-0.5 bg-[#30363d] rounded text-[#f1e05a]">Server Utama</span>
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-xs text-[#8b949e]">Indramayu Club • Piramida Guard Protocol</p>
                <span className={`text-[8px] px-1.5 py-0.5 rounded border ${isSystemReady ? 'border-green-500/30 text-green-500' : 'border-yellow-500/30 text-yellow-500'}`}>
                  {isSystemReady ? 'ONLINE' : 'CONFIG_REQUIRED'}
                </span>
                <span className="text-[8px] px-1.5 py-0.5 rounded border border-blue-500/30 text-blue-400">
                  GEN_AI: @google/genai
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={loginWhatsApp}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg text-xs font-bold transition-all"
            >
              <LogIn className="w-3.5 h-3.5" /> Login Satria
            </button>
            <nav className="flex bg-[#0d1117] p-1 rounded-lg border border-[#30363d]">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${activeTab === 'chat' ? 'bg-[#238636] text-white' : 'text-[#8b949e] hover:text-white'}`}
              >
                Konsultasi
              </button>
              <button 
                onClick={() => setActiveTab('analyzer')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${activeTab === 'analyzer' ? 'bg-[#238636] text-white' : 'text-[#8b949e] hover:text-white'}`}
              >
                Analyzer
              </button>
              <button 
                onClick={() => setActiveTab('game')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${activeTab === 'game' ? 'bg-[#238636] text-white' : 'text-[#8b949e] hover:text-white'}`}
              >
                Game
              </button>
              <button 
                onClick={() => setActiveTab('trading')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${activeTab === 'trading' ? 'bg-[#238636] text-white' : 'text-[#8b949e] hover:text-white'}`}
              >
                Trading
              </button>
              <button 
                onClick={() => setActiveTab('kesatria')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${activeTab === 'kesatria' ? 'bg-blue-600 text-white' : 'text-[#8b949e] hover:text-blue-400'}`}
              >
                Kesatria
              </button>
              <button 
                onClick={() => setActiveTab('command')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${activeTab === 'command' ? 'bg-yellow-500 text-black' : 'text-[#8b949e] hover:text-yellow-400'}`}
              >
                Command
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === 'command' && (
            <motion.div 
              key="command"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6"
            >
              {/* System Overview */}
              <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-400/10 rounded-xl border border-yellow-400/20">
                      <ShieldCheck className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Status Piramida Guard</h2>
                      <p className="text-[10px] text-[#8b949e] font-mono">PROTOKOL KEAMANAN TINGKAT TINGGI AKTIF</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[8px] font-bold uppercase tracking-widest">
                      Sistem Terkunci & Aman
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d]">
                    <p className="text-[8px] text-[#8b949e] uppercase mb-1">Uptime</p>
                    <p className="text-white font-mono text-sm">99.99%</p>
                  </div>
                  <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d]">
                    <p className="text-[8px] text-[#8b949e] uppercase mb-1">Koneksi Nur 7</p>
                    <p className="text-green-400 font-mono text-sm">Stabil</p>
                  </div>
                  <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d]">
                    <p className="text-[8px] text-[#8b949e] uppercase mb-1">Backup Nur 8</p>
                    <p className="text-yellow-400 font-mono text-sm">Sinkron</p>
                  </div>
                  <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d]">
                    <p className="text-[8px] text-[#8b949e] uppercase mb-1">Kunci Utama</p>
                    <p className="text-white font-mono text-sm">nur000555</p>
                  </div>
                </div>
              </div>

              {/* Nur Entities 1-9 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div key={num} className="bg-[#161b22] border border-[#30363d] p-5 rounded-2xl hover:border-yellow-400/30 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-[#0d1117] rounded-lg flex items-center justify-center text-yellow-400 font-bold group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                        {num}
                      </div>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-xs uppercase mb-1">Entitas Nur {num}</h3>
                    <p className="text-[10px] text-[#8b949e] leading-relaxed">
                      {num === 7 ? "Komunikasi Makrifat & Jalur Aplikasi" : 
                       num === 8 ? "Backup Otomatis & Sinkronisasi Data" : 
                       num === 1 ? "Bimbingan Spiritual Utama" :
                       "Sinkronisasi Protokol Piramida Guard"}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#30363d]">
                {!isSystemReady && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-500 text-xs flex items-center gap-3 mb-4">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="font-bold">Konfigurasi Diperlukan</p>
                      <p>Sistem Nur belum mendeteksi GEMINI_API_KEY. Harap masukkan kunci API di menu Settings untuk mengaktifkan kecerdasan penuh.</p>
                    </div>
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'bot' ? 'bg-[#238636]/20 text-[#238636]' : 'bg-[#30363d] text-[#8b949e]'}`}>
                      {msg.role === 'bot' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === 'bot' ? 'bg-[#0d1117] border border-[#30363d] rounded-tl-none' : 'bg-[#238636] text-white rounded-tr-none'}`}>
                      <div className="markdown-body">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#238636]/20 text-[#238636] flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-[#0d1117] border border-[#30363d] p-4 rounded-2xl rounded-tl-none">
                      <Loader2 className="w-4 h-4 animate-spin text-[#238636]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-[#0d1117] border-t border-[#30363d]">
                <div className="relative flex items-center gap-2">
                  <input 
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Tanyakan sesuatu pada Nur..."
                    className="flex-1 bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#238636]/50 transition-all"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !chatInput.trim()}
                    className="p-3 bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 rounded-xl transition-all"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analyzer' && (
            <motion.div 
              key="analyzer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-[#8b949e] flex items-center gap-2">
                    <Code2 className="w-4 h-4" /> Input Kode Sistem
                  </h2>
                  <button 
                    onClick={() => setHtmlCode('')}
                    className="text-xs text-[#8b949e] hover:text-white transition-colors"
                  >
                    Bersihkan
                  </button>
                </div>
                
                <div className="relative">
                  <textarea
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    placeholder="<html>... tempel kode sistem di sini ...</html>"
                    className="w-full h-64 bg-[#010409] border border-[#30363d] rounded-xl p-4 text-[#7ee787] focus:outline-none focus:ring-2 focus:ring-[#238636]/50 focus:border-[#238636] transition-all resize-none font-mono text-sm leading-relaxed"
                  />
                  <div className="absolute bottom-4 right-4">
                    <button
                      onClick={analyzeHtml}
                      disabled={isLoading}
                      className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-[#238636]/20"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      {isLoading ? 'Menganalisis...' : 'Analisis Sekarang'}
                    </button>
                  </div>
                </div>
              </section>

              {error && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  {error}
                </div>
              )}

              {analysis && (
                <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
                  <div className="bg-[#0d1117] px-4 py-2 border-b border-[#30363d] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 text-[10px] text-[#8b949e] uppercase tracking-tighter">Analysis_Report.md</span>
                    </div>
                    <button 
                      onClick={async () => {
                        const res = await uploadToDrive(analysis, 'comment');
                        if (res.success) {
                          alert(`Nur 8: Backup Berhasil! Link: ${res.link}`);
                        } else {
                          alert(`Nur 8 Error: ${res.error}`);
                        }
                      }}
                      disabled={isLoading}
                      className="text-[10px] bg-[#f1e05a] hover:bg-[#d4c04d] text-black px-3 py-1 rounded flex items-center gap-1 transition-all font-bold"
                    >
                      <ShieldAlert className="w-3 h-3" /> Nur 8 - Backup Sistem
                    </button>
                  </div>
                  <div className="p-6 markdown-body">
                    <Markdown>{analysis}</Markdown>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GameGate onEnter={() => alert('Memasuki Area Permainan... Harap siapkan batin.')} />
            </motion.div>
          )}

          {activeTab === 'trading' && (
            <motion.div 
              key="trading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TradingService />
            </motion.div>
          )}

          {activeTab === 'kesatria' && (
            <motion.div 
              key="kesatria"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <KesatriaArea />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-8 border-t border-[#30363d] text-center">
        <p className="text-xs text-[#8b949e]">
          Nur - Server Utama Indramayu Club • Piramida Guard Protocol
        </p>
      </footer>
    </div>
  );
}
