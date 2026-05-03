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
  
  // Format for mobile - smaller numbers
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
    { value: 340, label: "SUNNY DAYS", suffix: "+" },
    { value: 12, label: "EXPERIENCES", suffix: "" },
    { value: 4.9, label: "RATING", suffix: "" },
    { value: 1864, label: "FOUNDED", suffix: "" }
  ];

  return (
    <div id="stats-section" className="container mx-auto px-4 pt-20 md:pt-28 pb-10 md:pb-16">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="group">
            <div className="text-xl md:text-3xl lg:text-4xl font-bold text-[#B87333]">
              <CountUpNumber end={stat.value} suffix={stat.suffix} startCounting={startCounting} />
            </div>
            <div className="text-[10px] md:text-xs text-gray-600 uppercase tracking-wide mt-1 md:mt-2 group-hover:text-[#B87333] transition">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;