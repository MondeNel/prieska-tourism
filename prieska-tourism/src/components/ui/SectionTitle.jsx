const SectionTitle = ({ subtitle, title }) => {
  return (
    <div className="text-center mb-8">
      <p className="text-[#B87333] text-[10px] md:text-xs tracking-[0.2em] font-semibold mb-2 uppercase">
        {subtitle}
      </p>
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#2C3E2F]">
        {title}
      </h2>
      <div className="h-0.5 w-16 bg-[#B87333] mx-auto mt-3"></div>
    </div>
  );
};

export default SectionTitle;