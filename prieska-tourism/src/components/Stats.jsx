import { useState, useEffect } from 'react';

const CountUpNumber = ({ end, suffix = '', startCounting }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (startCounting) {
      let start = 0;
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(increment * currentStep));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [startCounting, end]);
  
  const displayCount = typeof count === 'number' ? count.toFixed(end % 1 !== 0 ? 1 : 0) : count;
  
  return <>{displayCount}{suffix}</>;
};

const Stats = () => {
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setStartCounting(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: 340, label: "SUNNY DAYS", suffix: "+", icon: "fa-sun" },
    { value: 12, label: "EXPERIENCES", suffix: "", icon: "fa-compass" },
    { value: 4.9, label: "RATING", suffix: "", icon: "fa-star" },
    { value: 1864, label: "FOUNDED", suffix: "", icon: "fa-calendar-alt" }
  ];

  return (
    <div id="stats-section" className="container mx-auto px-4 pt-20 md:pt-28 pb-8 md:pb-16">
      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                <i className={`fas ${stat.icon} text-amber-600 text-sm md:text-base`}></i>
              </div>
            </div>
            <div className="text-xl md:text-3xl lg:text-4xl font-bold text-[#B87333]">
              <CountUpNumber end={stat.value} suffix={stat.suffix} startCounting={startCounting} />
            </div>
            <div className="text-[9px] md:text-xs text-gray-500 font-medium mt-1 uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;