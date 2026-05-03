const SectionTitle = ({ subtitle, title }) => {
  return (
    <div className="text-center mb-8">
      <p className="text-prieska-terracotta text-sm font-semibold tracking-wider mb-2">{subtitle}</p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
        {title}
      </h2>
      <div className="h-0.5 w-16 bg-prieska-terracotta mx-auto mt-2"></div>
    </div>
  );
};

export default SectionTitle;