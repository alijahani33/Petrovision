import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "سلام مدیر. من دستیار هوشمند شما هستم. چطور می‌توانم کمک کنم؟", sender: 'ai', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now(), text: inputValue, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI Logic
    setTimeout(() => {
      let responseText = "متوجه نشدم. لطفا سوال دقیق‌تری بپرسید.";
      const lowerInput = userMsg.text.toLowerCase();

      if (userMsg.text.includes("IT") || userMsg.text.includes("آی تی")) {
        responseText = "واحد IT دارای ۱۰ کارمند است:\n۱. رضا علوی (مدیر)\n۲. سارا محمدی\n۳. امید زند\n...";
      } else if (userMsg.text.includes("50%") || userMsg.text.includes("۵۰درصد") || userMsg.text.includes("پرداخت")) {
        responseText = "قراردادهای زیر بیش از ۵۰٪ مانده پرداخت دارند:\n- جوشکاری مخازن (جوش گستران شرق): ۸۳٪ باقیمانده\n- تامین قطعات (تکنو پارت): ۸۷٪ باقیمانده";
      } else if (userMsg.text.includes("Workshop B") || userMsg.text.includes("کارگاه B") || userMsg.text.includes("کارگاه فونداسیون")) {
        responseText = "وضعیت کارگاه B (فونداسیون):\nپیمانکار: گروه بتن ریزی اعتماد\nپیشرفت فیزیکی: ۴۵٪\nوضعیت فعلی: در حال بازبینی (مشکل تامین سیمان)";
      }

      const aiMsg: Message = { id: Date.now() + 1, text: responseText, sender: 'ai', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestions = [
    "تعداد پرسنل واحد IT؟",
    "کدام شرکت‌ها ۵۰٪ پرداخت مانده دارند؟",
    "وضعیت فعلی کارگاه B؟"
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 p-4 rounded-full bg-gradient-to-r from-cyberBlue to-purple-600 text-white shadow-[0_0_20px_rgba(88,166,255,0.4)] transition-transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-96 h-[600px] flex flex-col glass-panel rounded-2xl overflow-hidden shadow-2xl border border-cyberBlue/30 animate-[slideUp_0.3s_ease-out]">
          {/* Header */}
          <div className="bg-[#0D1117]/90 p-4 flex justify-between items-center border-b border-borderGray">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyberBlue/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-cyberBlue" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">دستیار هوشمند نابغه</h3>
                <span className="text-[10px] text-emeraldGreen flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emeraldGreen animate-pulse"></span>
                  آنلاین
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0D1117]/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-6 whitespace-pre-wrap ${
                  msg.sender === 'user' 
                    ? 'bg-cyberBlue/20 text-white rounded-br-none border border-cyberBlue/30' 
                    : 'bg-[#161B22] text-gray-200 rounded-bl-none border border-borderGray'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-[#161B22] p-3 rounded-2xl rounded-bl-none border border-borderGray flex gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
            {suggestions.map((s, i) => (
              <button 
                key={i} 
                onClick={() => { setInputValue(s); }}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-[#30363d] text-xs text-gray-300 hover:bg-cyberBlue hover:text-white transition-colors border border-gray-700"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-[#0D1117]/90 border-t border-borderGray flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="دستور خود را تایپ کنید..."
              className="flex-1 bg-[#161B22] border border-borderGray rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyberBlue transition-colors"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-cyberBlue text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-cyberBlue/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};