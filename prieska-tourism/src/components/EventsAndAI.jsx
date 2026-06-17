import { useState } from 'react';

const EventsAndAI = () => {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', text: "👋 Hi! I'm your Prieska travel guide. Ask me about accommodation, adventures, stargazing spots, or I can plan your whole trip!" },
    { id: 2, type: 'user', text: "Best time to visit for stargazing?" },
    { id: 3, type: 'bot', text: "🌟 May to August is ideal — clear, dry Karoo nights with no summer heat haze. New moon weekends are spectacular. I can suggest 3 stargazing sites and nearby overnight stays!" },
  ]);
  const [chatInput, setChatInput] = useState('');

  const events = [
    {
      month: 'Aug',
      day: '14',
      title: 'Prieska Dark Sky Festival',
      location: 'Prieska Commonage · Free Entry',
      gold: false,
    },
    {
      month: 'Sep',
      day: '02',
      title: 'Orange River Canoe Challenge',
      location: 'Orange River Launch Point · Registration Open',
      gold: true,
    },
    {
      month: 'Oct',
      day: '18',
      title: 'Karoo Wildflower & Heritage Weekend',
      location: 'Marydale & Prieska · 2 Days',
      gold: false,
    },
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate bot response (in production, you'd call an API)
    setTimeout(() => {
      const responses = [
        "That's a great question! Prieska has amazing experiences for every traveler. Would you like me to suggest some specific activities?",
        "The Orange River is a must-see! You can enjoy canoeing, fishing, or sunset cruises. Would you like more details?",
        "Dark sky stargazing is one of our top attractions. The best spots are just outside town where there's no light pollution.",
        "For accommodation, I recommend checking out the featured guesthouses in the Stay section. They offer great Karoo hospitality.",
        "Prieska is rich in history! The heritage sites tell fascinating stories of the region's diamond mining and San rock art.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: randomResponse }]);
    }, 1000);
  };

  return (
    <div className="bg-[#1A1F2E] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Events Column */}
          <div>
            <div className="text-[#E8A020] text-xs font-bold uppercase tracking-widest">What's On</div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">Upcoming Events</h2>
            
            <div className="space-y-3">
              {events.map((event, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white rounded-lg p-3 md:p-4 cursor-pointer hover:shadow-md transition"
                >
                  <div
                    className={`min-w-[44px] text-center rounded px-2 py-1 ${
                      event.gold ? 'bg-[#C8780A]' : 'bg-[#7A3215]'
                    }`}
                  >
                    <div className="text-[9px] font-bold text-white/70 uppercase tracking-wider">{event.month}</div>
                    <div className="font-serif text-xl font-bold text-white leading-none">{event.day}</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-serif font-bold text-sm md:text-base text-[#1A1F2E]">{event.title}</div>
                    <div className="text-xs text-[#5A4A3A] font-bold">
                      <i className="fas fa-map-pin mr-1"></i> {event.location}
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-[#5A4A3A] text-sm"></i>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <span className="text-xs font-bold text-[#E8A020] uppercase tracking-wider cursor-pointer hover:underline flex items-center gap-1">
                All events <i className="fas fa-arrow-right"></i>
              </span>
            </div>
          </div>

          {/* AI Assistant Column */}
          <div>
            <div className="text-[#E8A020] text-xs font-bold uppercase tracking-widest">AI Travel Assistant</div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">Ask Prieska Guide</h2>

            <div className="bg-[#252C3F] rounded-xl p-4 md:p-5">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-9 h-9 rounded-full bg-[#7A3215] flex items-center justify-center">
                  <i className="fas fa-robot text-white text-lg"></i>
                </div>
                <div>
                  <div className="font-serif font-bold text-white text-sm">Prieska Guide</div>
                  <div className="text-xs text-[#E8A020] font-bold">● Online 24/7</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 py-4 max-h-[260px] overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                        msg.type === 'user'
                          ? 'bg-[#7A3215] text-white rounded-br-none'
                          : 'bg-white/10 text-white/85 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about Prieska…"
                  className="flex-1 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#E8A020]"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[#7A3215] text-white px-4 py-2 rounded-lg hover:bg-[#7A3215]/80 transition"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsAndAI;