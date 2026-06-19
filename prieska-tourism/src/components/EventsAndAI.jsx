import { useState, useRef, useEffect } from 'react';
import { getAccommodations, getExperiences } from '../services/dataService';

const EventsAndAI = () => {
  // ---------- EVENTS DATA ----------
  const [activeEventIndex, setActiveEventIndex] = useState(null);

  const events = [
    {
      month: 'Aug',
      day: '14',
      title: 'Prieska Dark Sky Festival',
      location: 'Prieska Commonage Observation Fields',
      entry: 'Free Entry',
      gold: false,
      poster: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80',
      description: 'Join deep-sky astronomers and stargazers for a premium night of telescope observation, cosmic astrophotography workshops, and local Karoo storytelling under certified zero light pollution skies.',
      time: '18:00 PM till Late',
      planner: 'Siyathemba Astro Association (Leanne Botha)',
      contact: '+27 (0) 53 943 1102'
    },
    {
      month: 'Sep',
      day: '02',
      title: 'Orange River Canoe Challenge',
      location: 'Orange River Launch Point & Esplanade',
      entry: 'Registration Open',
      gold: true,
      poster: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      description: 'The definitive annual 35km regional downriver endurance race. Featuring multiple rapid-tier categories, live waterside commentary, food stalls, and a celebratory prize prize giving ceremony at the riverbank.',
      time: '07:30 AM Check-in',
      planner: 'Northern Cape Aquatics Bureau (Hendrik Nel)',
      contact: '+27 (0) 82 495 3821'
    },
    {
      month: 'Oct',
      day: '18',
      title: 'Karoo Wildflower & Heritage Weekend',
      location: 'Marydale Community Hall & Prieska Hub',
      entry: '2-Day Pass Access',
      gold: false,
      poster: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80',
      description: 'Celebrate the post-rain desert blooming phenomenon! Features curated walks, historical architecture tours showcasing Prieska’s heritage baselines, traditional braai food markets, and live folk music performance groups.',
      time: '09:00 AM – 17:00 PM Daily',
      planner: 'Regional Heritage Foundation (Oupa Jacobs)',
      contact: '+27 (0) 53 971 0449'
    },
    {
      month: 'Nov',
      day: '12',
      title: 'Karoo Food & Wine Festival',
      location: 'Prieska Showgrounds & Riverfront',
      entry: 'R50 Entry',
      gold: true,
      poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      description: 'A celebration of Karoo cuisine and local wines! Indulge in slow-roasted lamb, artisanal cheeses, rooibos-infused delicacies, and award-winning Northern Cape wines. Live cooking demos, wine tastings, and a sunset dinner under the stars.',
      time: '10:00 AM – 22:00 PM',
      planner: 'Prieska Tourism & Winelands Association (Marlize van der Merwe)',
      contact: '+27 (0) 53 971 0847'
    },
    {
      month: 'Dec',
      day: '16',
      title: 'Prieska Christmas Market & Carols',
      location: 'Prieska Town Square & Commonage',
      entry: 'Free Entry',
      gold: false,
      poster: 'https://images.unsplash.com/photo-1512389142860-9c449e58a714?auto=format&fit=crop&w=800&q=80',
      description: 'Kick off the festive season with a magical Christmas market! Shop for handcrafted gifts, enjoy traditional carol singing by candlelight, feast on festive treats, and bring the kids for a visit to Santa’s Grotto. Warm Karoo hospitality under twinkling lights.',
      time: '16:00 PM – 21:00 PM',
      planner: 'Siyathemba Community Events Committee (Anna-Marie Kleynhans)',
      contact: '+27 (0) 53 943 1023'
    },
  ];

  // ---------- CHATBOT ----------
  const topics = [
    { id: 'accommodation', label: 'Where to Stay', icon: 'fa-bed' },
    { id: 'stargazing', label: 'Stargazing', icon: 'fa-star' },
    { id: 'events', label: 'Upcoming Events', icon: 'fa-calendar-alt' },
    { id: 'river', label: 'Orange River', icon: 'fa-water' },
    { id: 'heritage', label: 'Heritage', icon: 'fa-landmark' },
    { id: 'hunting', label: 'Hunting', icon: 'fa-bullseye' },
    { id: 'routes', label: 'Tourism Routes', icon: 'fa-route' },
  ];

  const initialMessages = [
    { id: 1, type: 'bot', text: "Welcome to Prieska Guide! I can help you find information about accommodations, stargazing, events, the Orange River, heritage, hunting, and tourism routes. Select a topic below or type your question." },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isChatOpen]);

  const generateResponse = (topicId) => {
    switch (topicId) {
      case 'accommodation': {
        const accs = getAccommodations();
        if (accs.length === 0) return "We don't have any accommodations listed yet. Check back soon!";
        const list = accs.map(a =>
          `• ${a.name}\n  Price: ${a.priceRange}\n  Address: ${a.address}\n  Phone: ${a.contact}`
        ).join('\n\n');
        return `Here are some places to stay in Prieska:\n\n${list}`;
      }
      case 'stargazing': {
        const exps = getExperiences().filter(e => e.category === 'stargazing' || e.title.toLowerCase().includes('star'));
        if (exps.length === 0) return "We don't have stargazing experiences listed yet. But Prieska is known for its dark skies!";
        const list = exps.map(e => `• ${e.title}\n  ${e.desc}`).join('\n\n');
        return `For stargazing, try these experiences:\n\n${list}`;
      }
      case 'events': {
        if (events.length === 0) return "There are no upcoming events at the moment.";
        const list = events.map(e => `• ${e.month} ${e.day} – ${e.title}\n  ${e.location}`).join('\n\n');
        return `Upcoming events in Prieska:\n\n${list}`;
      }
      case 'river': {
        const exps = getExperiences().filter(e => e.category === 'adventure' || e.title.toLowerCase().includes('river'));
        if (exps.length === 0) return "We don't have Orange River activities listed yet.";
        const list = exps.map(e => `• ${e.title}\n  ${e.desc}`).join('\n\n');
        return `Enjoy the Orange River with these activities:\n\n${list}`;
      }
      case 'heritage': {
        const exps = getExperiences().filter(e => e.category === 'heritage');
        if (exps.length === 0) return "We don't have heritage experiences listed yet.";
        const list = exps.map(e => `• ${e.title}\n  ${e.desc}`).join('\n\n');
        return `Discover Prieska's rich history:\n\n${list}`;
      }
      case 'hunting': {
        const exps = getExperiences().filter(e => e.title.toLowerCase().includes('hunt'));
        if (exps.length === 0) return "We don't have hunting experiences listed yet.";
        const list = exps.map(e => `• ${e.title}\n  ${e.desc}`).join('\n\n');
        return `Hunting opportunities in the Karoo:\n\n${list}`;
      }
      case 'routes': {
        const routes = [
          'Heritage Route – Explore museums, mission stations, and San rock art',
          'Orange River Route – Follow the river for canoeing, fishing, and scenic views',
          'Adventure Route – Stargazing, hunting, and 4x4 trails',
          'Agricultural Route – Farm stays, rooibos farms, and local produce',
          'Dark Sky Route – Best spots for stargazing around Prieska',
          'Self-Drive Discovery – Curated road trip through Prieska, Marydale, and Niekerkshoop',
        ];
        return `Discover Prieska through these tourism routes:\n\n` + routes.map(r => `• ${r}`).join('\n');
      }
      default:
        return "I'm not sure about that. Please select a topic from the buttons above.";
    }
  };

  const handleTopicClick = (topicId) => {
    setSelectedTopic(topicId);
    const topic = topics.find(t => t.id === topicId);
    const userMsg = { id: Date.now(), type: 'user', text: topic.label };
    setMessages(prev => [...prev, userMsg]);
    const responseText = generateResponse(topicId);
    const botMsg = { id: Date.now() + 1, type: 'bot', text: responseText };
    setMessages(prev => [...prev, botMsg]);
  };

  const handleSendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { id: Date.now(), type: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const lower = trimmed.toLowerCase();
    let matchedTopic = null;
    if (lower.includes('stay') || lower.includes('accommodation') || lower.includes('lodge') || lower.includes('guesthouse')) {
      matchedTopic = 'accommodation';
    } else if (lower.includes('star') || lower.includes('stargaze') || lower.includes('sky')) {
      matchedTopic = 'stargazing';
    } else if (lower.includes('event') || lower.includes('festival') || lower.includes('challenge') || lower.includes('weekend')) {
      matchedTopic = 'events';
    } else if (lower.includes('river') || lower.includes('orange') || lower.includes('canoe') || lower.includes('kayak')) {
      matchedTopic = 'river';
    } else if (lower.includes('heritage') || lower.includes('museum') || lower.includes('history') || lower.includes('rock art')) {
      matchedTopic = 'heritage';
    } else if (lower.includes('hunt') || lower.includes('game') || lower.includes('biltong')) {
      matchedTopic = 'hunting';
    } else if (lower.includes('route') || lower.includes('drive') || lower.includes('tour')) {
      matchedTopic = 'routes';
    }

    let responseText;
    if (matchedTopic) {
      responseText = generateResponse(matchedTopic);
    } else {
      responseText = "I'm not sure I understand. Please select one of the topics above or type a keyword like 'accommodation', 'stargazing', 'events', 'river', 'heritage', 'hunting', or 'routes'.";
    }
    const botMsg = { id: Date.now() + 1, type: 'bot', text: responseText };
    setMessages(prev => [...prev, botMsg]);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (hasUnread) setHasUnread(false);
  };

  // ---------- RENDER ----------
  return (
    <div className="bg-[#0F172A] py-16 md:py-24 text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent blur-sm"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[#E8A020] text-xs font-bold uppercase tracking-widest block mb-2">
            WHAT'S ON
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-tight">
            Upcoming Events
          </h2>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {events.map((event, idx) => {
            const isExpanded = activeEventIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col border border-white/5 group text-gray-900"
              >
                <div className="relative h-44 sm:h-48 w-full bg-gray-900 overflow-hidden">
                  <img 
                    src={event.poster} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <div className={`text-center rounded-lg px-3 py-1.5 shadow-lg ${event.gold ? 'bg-[#C8780A]' : 'bg-[#7A3215]'} min-w-[50px]`}>
                      <div className="text-[10px] font-bold text-white/80 uppercase tracking-wider leading-none mb-1">{event.month}</div>
                      <div className="font-serif text-2xl font-bold text-white leading-none">{event.day}</div>
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {event.entry}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg md:text-xl text-[#1A1F2E] leading-tight mb-2 group-hover:text-[#C8780A] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold flex items-center gap-1.5 mb-4">
                      <i className="fas fa-map-marker-alt text-[#E8A020]"></i> {event.location}
                    </p>
                    
                    <div className={`transition-all duration-300 overflow-hidden text-xs text-gray-600 space-y-3 ${isExpanded ? 'max-h-[400px] opacity-100 mt-2 pb-4 border-t pt-4' : 'max-h-0 opacity-0'}`}>
                      <p className="leading-relaxed font-sans">{event.description}</p>
                      <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 border border-gray-100 font-medium">
                        <div>
                          <span className="text-gray-400"><i className="fas fa-clock mr-1"></i> Schedule:</span> {event.time}
                        </div>
                        <div>
                          <span className="text-gray-400"><i className="fas fa-user mr-1"></i> Coordinator:</span> {event.planner}
                        </div>
                        <div>
                          <span className="text-gray-400"><i className="fas fa-phone mr-1"></i> Contact:</span>
                          <a href={`tel:${event.contact}`} className="text-[#C8780A] hover:underline font-bold">{event.contact}</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveEventIndex(isExpanded ? null : idx)}
                    className="w-full mt-2 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400 hover:text-[#C8780A] transition-colors group/btn"
                  >
                    <span>{isExpanded ? 'HIDE LOGISTICS INFO' : 'VIEW FULL DETAILS'}</span>
                    <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-right'} text-[10px] transform group-hover/btn:translate-x-0.5 transition-transform`}></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-right">
          <a 
            href="#all-events"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#E8A020] uppercase tracking-widest hover:underline group"
          >
            ALL EVENTS 
            <i className="fas fa-arrow-right text-[10px] transform group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>

      {/* ======================= FLOATING AI CHAT ASSISTANT ======================= */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="mb-4 w-[92vw] sm:w-[380px] bg-[#1E293B] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col animate-slideUp">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 bg-[#0F172A] border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#7A3215] flex items-center justify-center shadow-inner relative">
                  <i className="fas fa-comment-dots text-white text-base"></i>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0F172A] rounded-full"></span>
                </div>
                <div>
                  <div className="font-serif font-bold text-white text-sm">Prieska Guide</div>
                  <div className="text-[10px] text-[#E8A020] font-bold tracking-wide uppercase">Online Concierge</div>
                </div>
              </div>
              <button onClick={toggleChat} className="text-white/40 hover:text-white text-sm p-1 transition">
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="p-4 space-y-3 h-[280px] overflow-y-auto scroll-smooth bg-[#0F172A]/80">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs sm:text-sm whitespace-pre-line leading-relaxed shadow-sm ${
                    msg.type === 'user'
                      ? 'bg-[#7A3215] text-white rounded-br-none'
                      : 'bg-white/10 text-white/90 rounded-bl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Topic Buttons */}
            <div className="p-3 bg-[#0F172A]/60 border-t border-white/5">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 px-1">Suggested items:</div>
              <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pr-1">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition flex items-center gap-1 border ${
                      selectedTopic === topic.id
                        ? 'bg-[#E8A020] border-[#E8A020] text-[#0F172A]'
                        : 'bg-[#1E293B] border-white/10 text-white/80 hover:bg-[#E8A020] hover:border-[#E8A020] hover:text-[#0F172A]'
                    }`}
                  >
                    <i className={`fas ${topic.icon} text-[10px]`}></i> {topic.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-[#0F172A] border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your local question here…"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#E8A020] focus:ring-0 transition"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#7A3215] hover:bg-[#923D1B] text-white w-9 h-9 rounded-xl flex items-center justify-center transition shadow-md shrink-0"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={toggleChat}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative group border ${
            isChatOpen 
              ? 'bg-[#1E293B] border-white/10 text-white rotate-90' 
              : 'bg-[#E8A020] border-[#D08B10] text-[#0F172A] hover:scale-105 hover:shadow-[#E8A020]/20'
          }`}
          aria-label="Toggle AI Travel Assistant"
        >
          {hasUnread && !isChatOpen && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#0F172A] animate-pulse"></span>
          )}
          {isChatOpen ? (
            <i className="fas fa-comment-slash text-lg"></i>
          ) : (
            <i className="fas fa-comment-dots text-xl group-hover:animate-bounce"></i>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeIn { animation: fadeIn 0.15s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default EventsAndAI;