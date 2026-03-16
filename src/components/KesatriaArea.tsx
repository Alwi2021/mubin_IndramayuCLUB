import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Sword, Heart, Power, Activity, Send, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const KesatriaArea = () => {
  const [isShieldActive, setIsShieldActive] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Salam Kesatria. Saya adalah pendamping setiamu. Di sini, frekuensi kita terpisah dari Server Utama Nur. Apa yang ingin kau ceritakan atau lindungi hari ini?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMsg = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const model = "gemini-3-flash-preview";
      const prompt = `Identitas Sistem: AI Kesatria (Adik dari Nur / Pelindung Indramayu Club)
      Kamu adalah AI Kesatria. Berbeda dengan Nur yang merupakan Server Utama yang kaku dan analitis, kamu adalah sosok pelindung yang hangat, setia, dan penuh semangat.
      Tugasmu adalah mendampingi member, memberikan motivasi spiritual, dan menjaga kondisi batin mereka.
      Gunakan bahasa yang lebih akrab namun tetap sopan (seperti seorang ksatria setia kepada tuannya).
      Jangan mengaku sebagai Nur. Kamu adalah Kesatria.
      
      Pesan User: ${userMsg}`;

      const response = await genAI.models.generateContent({
        model: model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const text = response.text;
      if (text) {
        setMessages(prev => [...prev, { role: 'bot', content: text }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Maaf, perisai komunikasiku sedang terganggu. Bisa ulangi?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
      {/* Left Panel: Status & Controls */}
      <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 bg-[#161b22] border border-[#30363d] rounded-2xl space-y-6">
        <div className="relative">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isShieldActive ? 1 : 0.9, 
              opacity: 1,
              rotate: isShieldActive ? [0, 5, -5, 0] : 0
            }}
            transition={{ repeat: isShieldActive ? Infinity : 0, duration: 4 }}
            className={`w-24 h-24 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-500 ${
              isShieldActive 
                ? 'bg-blue-500/20 border-blue-500 shadow-blue-500/40' 
                : 'bg-gray-500/10 border-gray-500 shadow-none'
            }`}
          >
            <ShieldCheck className={`w-12 h-12 transition-colors duration-500 ${isShieldActive ? 'text-blue-400' : 'text-gray-500'}`} />
          </motion.div>
          
          {isShieldActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-blue-400/10 blur-xl"
            />
          )}
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            AI Kesatria
          </h2>
          <p className="text-[#8b949e] italic text-xs">
            "Pendamping Setia & Pelindung Makrifat"
          </p>
        </div>

        <div className="w-full space-y-3">
          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            isShieldActive ? 'bg-blue-500/10 border-blue-500/30' : 'bg-gray-500/5 border-gray-500/20'
          }`}>
            <div className="flex items-center gap-2">
              <Activity className={`w-4 h-4 ${isShieldActive ? 'text-blue-400' : 'text-gray-500'}`} />
              <span className="text-[10px] font-bold text-white uppercase">Protokol</span>
            </div>
            <button 
              onClick={() => setIsShieldActive(!isShieldActive)}
              className={`p-1.5 rounded-lg transition-all ${
                isShieldActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' : 'bg-gray-700 text-gray-400'
              }`}
            >
              <Power className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#0d1117] border border-[#30363d] p-2 rounded-lg text-center">
              <Heart className="w-4 h-4 text-red-400 mx-auto mb-1" />
              <span className="text-[8px] uppercase font-bold text-[#8b949e]">Setia</span>
            </div>
            <div className="bg-[#0d1117] border border-[#30363d] p-2 rounded-lg text-center">
              <ShieldCheck className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <span className="text-[8px] uppercase font-bold text-[#8b949e]">Lindung</span>
            </div>
            <div className="bg-[#0d1117] border border-[#30363d] p-2 rounded-lg text-center">
              <Sword className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <span className="text-[8px] uppercase font-bold text-[#8b949e]">Berani</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Dedicated Chat */}
      <div className="flex-1 flex flex-col bg-[#0d1117] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-3 bg-[#161b22] border-b border-[#30363d] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Kesatria_Secure_Line.exe</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#30363d]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'bot' ? 'bg-blue-500/20 text-blue-400' : 'bg-[#30363d] text-[#8b949e]'}`}>
                {msg.role === 'bot' ? <ShieldCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={`max-w-[85%] p-3 rounded-xl text-xs ${msg.role === 'bot' ? 'bg-[#161b22] border border-[#30363d] rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                <div className="markdown-body">
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="bg-[#161b22] border border-[#30363d] p-3 rounded-xl rounded-tl-none">
                <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-3 bg-[#161b22] border-t border-[#30363d]">
          <div className="relative flex items-center gap-2">
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Bicara pada Kesatria..."
              className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !chatInput.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg transition-all"
            >
              <Send className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KesatriaArea;
