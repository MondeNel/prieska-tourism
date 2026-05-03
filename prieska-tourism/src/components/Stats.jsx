import { useState, useEffect } from 'react';

// Simple Counter Component
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
  
  return <>{count}{suffix}</>;
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
    { value: 340, label: "SUNNY DAYS/YEAR", suffix: "+" },
    { value: 12, label: "UNIQUE EXPERIENCES", suffix: "" },
    { value: 4.9, label: "AVG. GUEST RATING", suffix: "" },
    { value: 1864, label: "FOUNDED", suffix: "" }
  ];

  return (
    <div id="stats-section" className="container mx-auto px-6 pt-28 pb-16">
      <div className="bg-white rounded-3xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, idx) => (
          <div key={idx}>
            <div className="text-3xl md:text-4xl font-bold text-[#B87333]">
              <CountUpNumber end={stat.value} suffix={stat.suffix} startCounting={startCounting} />
            </div>
            <div className="text-gray-600 text-sm uppercase tracking-wide mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;