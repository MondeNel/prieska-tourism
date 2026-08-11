import { useMemo, useState } from 'react';
import { businesses, categories } from '../data/businesses';

// ---------------------------------------------------------------------
// Design tokens for this component (River Dusk / Tiger's Eye system)
//   base:      #0B1620  deep river-dusk navy
//   surface:   #142530  card surface
//   surface-2: #1B2E3D  hover / raised surface
//   amber:     #C9862E  tiger's-eye — premium accent, ratings, CTAs
//   amber-lt:  #E8B968  hover state on amber
//   rust:      #8B3A1F  platinum accent, pulled from the Koppie Fort brick
//   sandstone: #E8DCC8  primary light text
//   muted:     #8FA3B0  secondary text on dark
// ---------------------------------------------------------------------

const TIER_CONFIG = {
  platinum: {
    label: 'Platinum',
    ring: 'ring-1 ring-[#C9862E]/50',
    badgeBg: 'bg-gradient-to-r from-[#8B3A1F] to-[#C9862E]',
    order: 0,
  },
  premium: {
    label: 'Premium',
    ring: 'ring-1 ring-[#C9862E]/25',
    badgeBg: 'bg-[#C9862E]',
    order: 1,
  },
  standard: {
    label: null,
    ring: 'ring-1 ring-white/5',
    badgeBg: '',
    order: 2,
  },
};

// Tiger's-eye banded strip used only on Platinum cards — the signature element
const BandedStrip = () => (
  <div
    className="h-[3px] w-full"
    style={{
      backgroundImage:
        'repeating-linear-gradient(100deg, #8B3A1F 0px, #C9862E 6px, #8B3A1F 12px, #E8B968 18px, #8B3A1F 24px)',
    }}
  />
);

const StarRating = ({ rating, reviewCount }) => (
  <div className="flex items-center gap-1.5 text-xs">
    <div className="flex items-center gap-0.5 text-[#C9862E]">
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`fas fa-star ${i < Math.round(rating) ? '' : 'opacity-20'}`}
          style={{ fontSize: '10px' }}
        />
      ))}
    </div>
    <span className="text-[#8FA3B0] font-medium">
      {rating} <span className="opacity-60">({reviewCount})</span>
    </span>
  </div>
);

const BusinessCard = ({ business }) => {
  const tier = TIER_CONFIG[business.tier];

  return (
    <div
      className={`group rounded-xl overflow-hidden bg-[#142530] ${tier.ring} hover:ring-[#C9862E]/60 transition-all duration-300 hover:-translate-y-0.5`}
    >
      {business.tier === 'platinum' && <BandedStrip />}

      {/* Image placeholder area */}
      <div className="relative h-40 bg-gradient-to-br from-[#1B2E3D] to-[#0B1620] flex items-center justify-center">
        <i className={`fas ${business.icon} text-3xl text-[#C9862E]/40`} />

        {tier.label && (
          <span
            className={`absolute top-3 left-3 ${tier.badgeBg} text-[#0B1620] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded`}
          >
            {tier.label}
          </span>
        )}

        <span className="absolute top-3 right-3 bg-[#0B1620]/70 backdrop-blur-sm text-[#E8DCC8] text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded">
          {business.subcategory}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-lg font-bold text-[#E8DCC8] leading-tight">
            {business.name}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#C9862E] font-semibold uppercase tracking-wider mb-2">
          <i className="fas fa-location-dot text-[10px]" />
          {business.location}
        </div>

        <p className="text-sm text-[#8FA3B0] leading-relaxed mb-3 line-clamp-2">
          {business.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {business.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-[#8FA3B0] bg-white/5 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <StarRating rating={business.rating} reviewCount={business.reviewCount} />
          <span className="text-xs font-bold text-[#E8DCC8]">{business.priceRange}</span>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <a
            href={`tel:${business.phone}`}
            className="flex-1 text-center text-xs font-bold uppercase tracking-wider py-2 rounded-lg bg-white/5 text-[#E8DCC8] hover:bg-white/10 transition"
          >
            <i className="fas fa-phone mr-1.5" />
            Call
          </a>
          {business.whatsapp && (
            <a
              href="#"
              className="flex-1 text-center text-xs font-bold uppercase tracking-wider py-2 rounded-lg bg-[#C9862E] text-[#0B1620] hover:bg-[#E8B968] transition"
            >
              <i className="fab fa-whatsapp mr-1.5" />
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const BusinessDirectory = ({ onListClick }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return businesses
      .filter((b) => activeCategory === 'All' || b.category === activeCategory)
      .filter((b) =>
        search.trim() === ''
          ? true
          : `${b.name} ${b.description} ${b.location}`
              .toLowerCase()
              .includes(search.toLowerCase())
      )
      .sort((a, b) => TIER_CONFIG[a.tier].order - TIER_CONFIG[b.tier].order);
  }, [search, activeCategory]);

  return (
    <div className="bg-[#0B1620] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="text-[#C9862E] text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Local Business Directory
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8DCC8]">
              Find & Book in Siyathemba
            </h2>
          </div>

          <button
            onClick={onListClick}
            className="self-start md:self-auto text-xs font-bold uppercase tracking-wider text-[#0B1620] bg-[#C9862E] hover:bg-[#E8B968] transition px-5 py-3 rounded-lg whitespace-nowrap"
          >
            <i className="fas fa-plus mr-2" />
            List Your Business
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-[#8FA3B0] text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lodges, restaurants, tours, venues..."
            className="w-full bg-[#142530] text-[#E8DCC8] placeholder:text-[#8FA3B0]/60 rounded-lg pl-11 pr-4 py-3.5 text-sm ring-1 ring-white/10 focus:ring-[#C9862E]/60 focus:outline-none transition"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition ${
                activeCategory === cat
                  ? 'bg-[#C9862E] text-[#0B1620]'
                  : 'bg-white/5 text-[#8FA3B0] hover:bg-white/10 hover:text-[#E8DCC8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-xs text-[#8FA3B0] font-medium mb-5">
          {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[#8FA3B0]">
            <i className="fas fa-compass text-3xl mb-3 opacity-40" />
            <p className="text-sm">No listings match that search yet — try a different term or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDirectory;