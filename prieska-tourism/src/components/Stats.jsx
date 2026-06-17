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
    { value: 47, label: "LISTED BUSINESSES", suffix: "+" },
    { value: 12, label: "TOURISM ROUTES", suffix: "" },
    { value: 320, label: "KM OF ORANGE RIVER", suffix: "+" },
    { value: 3, label: "TOWNS TO EXPLORE", suffix: "" }
  ];

  return (
    <div id="stats-section" className="bg-[#7A3215] py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="group">
              <div className="text-2xl md:text-4xl font-bold text-white">
                <CountUpNumber end={stat.value} suffix={stat.suffix} startCounting={startCounting} />
              </div>
              <div className="text-[10px] md:text-xs text-white/70 font-bold uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;