import { useState, useRef, useEffect } from 'react';
import { getAccommodations, getExperiences } from '../services/dataService';

const EventsAndAI = () => {
  const events = [
    { month: 'Aug', day: '14', title: 'Prieska Dark Sky Festival', location: 'Prieska Commonage · Free Entry', gold: false },
    { month: 'Sep', day: '02', title: 'Orange River Canoe Challenge', location: 'Orange River Launch Point · Registration Open', gold: true },
    { month: 'Oct', day: '18', title: 'Karoo Wildflower & Heritage Weekend', location: 'Marydale & Prieska · 2 Days', gold: false },
  ];

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

  // Ref for auto-scrolling
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
                <div key={idx} className="flex items-center gap-4 bg-white rounded-lg p-3 md:p-4 cursor-pointer hover:shadow-md transition">
                  <div className={`min-w-[44px] text-center rounded px-2 py-1 ${event.gold ? 'bg-[#C8780A]' : 'bg-[#7A3215]'}`}>
                    <div className="text-[9px] font-bold text-white/70 uppercase tracking-wider">{event.month}</div>
                    <div className="font-serif text-xl font-bold text-white leading-none">{event.day}</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-serif font-bold text-sm md:text-base text-[#1A1F2E]">{event.title}</div>
                    <div className="text-xs text-[#5A4A3A] font-bold"><i className="fas fa-map-pin mr-1"></i> {event.location}</div>
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
            <div className="text-[#E8A020] text-xs font-bold uppercase tracking-widest">Smart Travel Assistant</div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">Ask Prieska Guide</h2>

            <div className="bg-[#252C3F] rounded-xl p-4 md:p-5">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-9 h-9 rounded-full bg-[#7A3215] flex items-center justify-center">
                  <i className="fas fa-robot text-white text-lg"></i>
                </div>
                <div>
                  <div className="font-serif font-bold text-white text-sm">Prieska Guide</div>
                  <div className="text-xs text-[#E8A020] font-bold"><i className="fas fa-circle text-[8px] mr-1"></i> Online 24/7</div>
                </div>
              </div>

              {/* Chat messages container with auto-scroll */}
              <div
                ref={chatContainerRef}
                className="space-y-3 py-4 max-h-[300px] overflow-y-auto scroll-smooth"
              >
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                      msg.type === 'user'
                        ? 'bg-[#7A3215] text-white rounded-br-none'
                        : 'bg-white/10 text-white/85 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Reply Buttons */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                      selectedTopic === topic.id
                        ? 'bg-[#E8A020] text-[#1A1F2E]'
                        : 'bg-[#1A1F2E] border border-[#E8A020]/40 text-white/80 hover:bg-[#E8A020] hover:text-[#1A1F2E]'
                    }`}
                  >
                    <i className={`fas ${topic.icon}`}></i> {topic.label}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
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