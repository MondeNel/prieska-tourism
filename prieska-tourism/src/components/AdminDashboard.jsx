import { useState, useEffect, memo } from 'react';
import { getExperiences, updateExperience, deleteExperience, addExperience, getAccommodations, updateAccommodation, deleteAccommodation, addAccommodation } from '../services/dataService';
import EditItemModal from './EditItemModal';
import ConfirmModal from './ConfirmModal';

// Predefined options
const durationOptions = ["2-3 hrs", "3-4 hrs", "Full day", "Flexible", "Evening", "Seasonal"];
const categoryOptions = ["wildlife", "adventure", "culture", "heritage", "nature"];
const guesthouseTypes = ["Lodge", "Boutique Guesthouse", "Country Lodge", "Bed & Breakfast", "Riverside Lodge"];
const timeSlotOptions = ["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"];

// Helper: renders a conversational question-styled form field with improved text readability
const renderQuestionField = (question, description, label, name, type = 'text', value, onChange, placeholder = '', options = []) => {
  return (
    <div className="mb-5 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
      {/* Increased question text size to text-sm/base for clarity */}
      <h5 className="text-sm sm:text-base font-semibold text-[#2C3E2F] mb-1 leading-snug">{question}</h5>
      {description && <p className="text-xs sm:text-sm text-gray-400 mb-3.5 leading-relaxed">{description}</p>}
      
      {type === 'select' && (
        <select
          className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-none bg-gray-50/50 cursor-pointer"
          value={value || ''}
          onChange={onChange}
          name={name}
        >
          <option value="">Select an option...</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )}

      {type === 'file' && (
        <div>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-[#B87333] hover:file:bg-amber-100 cursor-pointer"
            onChange={onChange}
            name={name}
          />
          {value && typeof value === 'string' && value.startsWith('data:image') && (
            <div className="mt-3 relative inline-block">
              <img src={value} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-sm" />
            </div>
          )}
        </div>
      )}

      {type === 'textarea' && (
        <textarea
          name={name}
          className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-none bg-gray-50/50 leading-relaxed"
          rows={4}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}

      {type === 'text' && (
        <input
          className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-none bg-gray-50/50"
          type={type}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
        />
      )}
    </div>
  );
};

// Conversational Progressive Multi-Step Questionnaire Form
const AddForm = memo(({ activeTab, onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(
    activeTab === 'experiences'
      ? { title: '', price: 'ZAR 0', desc: '', duration: '3-4 hrs', category: 'wildlife', image: '', timeSlots: '09:00 AM' }
      : { name: '', type: 'Lodge', priceRange: 'R0 - R0', description: '', address: '', contact: '', imagesInput: '' }
  );
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('ZAR')) val = 'ZAR ' + val.replace(/^ZAR\s*/, '');
    setFormData(prev => ({ ...prev, price: val }));
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, [fieldName]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    if (val === '__custom__') {
      setIsCustomCategory(true);
      setFormData(prev => ({ ...prev, category: '' }));
    } else {
      setIsCustomCategory(false);
      setFormData(prev => ({ ...prev, category: val }));
    }
  };

  const handleCustomCategoryInput = (e) => {
    const val = e.target.value;
    setCustomCategory(val);
    setFormData(prev => ({ ...prev, category: val }));
  };

  const handleGuesthouseFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      let currentImages = formData.imagesInput ? formData.imagesInput.split(',').map(s => s.trim()) : [];
      currentImages.unshift(reader.result);
      setFormData(prev => ({ ...prev, imagesInput: currentImages.join(', ') }));
    };
    reader.readAsDataURL(file);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const totalSteps = 4;

  return (
    <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-6 shadow-inner">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <h4 className="font-serif font-bold text-[#2C3E2F] text-base sm:text-lg flex items-center gap-2">
            <i className="fas fa-clipboard-list text-[#B87333]"></i>
            New Listing Questionnaire: <span className="text-xs sm:text-sm font-sans font-medium text-gray-500 capitalize bg-white/80 border px-2 py-0.5 rounded-md">{activeTab === 'experiences' ? 'Local Experience' : 'Stay Accommodation'}</span>
          </h4>
          <span className="text-xs sm:text-sm bg-amber-100 text-[#B87333] px-3 py-1 rounded-full font-semibold whitespace-nowrap self-start sm:self-auto">
            Step {step} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-[#B87333] to-amber-500 h-full transition-all duration-300 ease-out" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
      </div>

      <div className="min-h-[260px]">
        {activeTab === 'experiences' ? (
          <>
            {step === 1 && (
              <div className="animate-fadeIn">
                {renderQuestionField(
                  "1. What is the signature name or title of your tour or experience?",
                  "Make it catchy and descriptive so travelers spot it instantly in search results.",
                  "Title *", 'title', 'text', formData.title, handleChange, 'e.g., Orange River Sunset Kayaking'
                )}
                <div className="mb-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h5 className="text-sm sm:text-base font-semibold text-[#2C3E2F] mb-1">2. Under which category block does this experience belong?</h5>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3">This routes your business entry to the specific filtered exploration grid buttons.</p>
                  <select
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-[#B87333] outline-none bg-gray-50/50 cursor-pointer"
                    value={!isCustomCategory ? formData.category : '__custom__'}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Choose standard category...</option>
                    {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    <option value="__custom__">+ Register a completely new customized category niche</option>
                  </select>
                  {isCustomCategory && (
                    <input
                      type="text"
                      className="w-full mt-3 border border-gray-200 rounded-lg p-3 text-sm focus:border-[#B87333]"
                      placeholder="Type your new custom category tags here..."
                      value={customCategory}
                      onChange={handleCustomCategoryInput}
                    />
                  )}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="animate-fadeIn">
                {renderQuestionField(
                  "3. Can you write a detailed description of what guests will do?",
                  "Describe the itinerary, landmarks visited, physical requirements, or safety gear provided.",
                  "Description *", 'desc', 'textarea', formData.desc, handleChange, 'Tell travelers your unique story here...'
                )}
              </div>
            )}
            {step === 3 && (
              <div className="animate-fadeIn">
                {renderQuestionField(
                  "4. What is the approximate duration from start to finish?",
                  "Helps domestic and international visitors schedule their itineraries properly.",
                  "Duration", 'duration', 'select', formData.duration, handleChange, '', durationOptions
                )}
                {renderQuestionField(
                  "5. What is the default or preferred morning/afternoon departure time?",
                  "Select the primary daily operational window slot for check-ins.",
                  "Preferred time", 'timeSlots', 'select', formData.timeSlots, handleChange, '', timeSlotOptions
                )}
              </div>
            )}
            {step === 4 && (
              <div className="animate-fadeIn">
                {renderQuestionField(
                  "6. How much do you charge per person (ZAR value)?",
                  "Include base prices. The prefix 'ZAR' maps automatic regional currency flags.",
                  "Price", 'price', 'text', formData.price, handlePriceChange, 'ZAR 1,250'
                )}
                {renderQuestionField(
                  "7. Upload a gorgeous hero banner landscape image of this experience:",
                  "First impressions matter! Upload clean imagery to drastically scale up conversion click ratios.",
                  "Image (upload)", 'image', 'file', formData.image, (e) => handleFileUpload(e, 'image'))}
              </div>
            )}
          </>
        ) : (
          <>
            {step === 1 && (
              <div className="animate-fadeIn">
                {renderQuestionField(
                  "1. What is the official legal name of your accommodation establishment?",
                  "This will be displayed in bold headings on the local guest lodging directories.",
                  "Name *", 'name', 'text', formData.name, handleChange, 'e.g., Riverside Karoo Retreat Oasis'
                )}
                {renderQuestionField(
                  "2. What style of architectural setup or hospitality type are you offering?",
                  "Helps holidaymakers sort by amenities or rustic country environments.",
                  "Type", 'type', 'select', formData.type, handleChange, '', guesthouseTypes
                )}
              </div>
            )}
            {step === 2 && (
              <div className="animate-fadeIn">
                {renderQuestionField(
                  "3. Write an evocative description of your lodgings and room amenities:",
                  "Detail standard offerings like air conditioning, braai facilities, Wi-Fi connectivity, secure parking, or pool features.",
                  "Description *", 'description', 'textarea', formData.description, handleChange, 'Describe your hospitality vibe...'
                )}
              </div>
            )}
            {step === 3 && (
              <div className="animate-fadeIn">
                {renderQuestionField(
                  "4. What is your estimated lowest to highest average seasonal pricing bracket?",
                  "This frames target baseline budgets for overnight stays.",
                  "Price Range", 'priceRange', 'text', formData.priceRange, handleChange, 'R500 - R1,200 per night'
                )}
                {renderQuestionField(
                  "5. Provide a direct operational telephone or mobile number for reservations:",
                  "Ensure clients can dial direct links to finalize check-in booking payments.",
                  "Phone", 'contact', 'text', formData.contact, handleChange, 'e.g., +27 (0) 82 123 4567'
                )}
              </div>
            )}
            {step === 4 && (
              <div className="animate-fadeIn">
                {renderQuestionField(
                  "6. What is the exact physical street or farm location address?",
                  "Used to render standard map location pins on local navigation components.",
                  "Address", 'address', 'text', formData.address, handleChange, 'e.g., 42 River Crescent Road, Prieska'
                )}
                {renderQuestionField(
                  "7. Upload a high-resolution feature image of the property or rooms:",
                  "Upload directly from your device file cache system to form the display backdrop tile.",
                  "Main Image (upload)", 'uploadedImage', 'file', null, handleGuesthouseFileUpload
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-amber-200/40">
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-xs sm:text-sm font-medium transition">Back to Main Screen</button>
        <div className="flex gap-2.5">
          {step > 1 && (
            <button onClick={prevStep} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-50 flex items-center gap-1.5 transition">
              <i className="fas fa-arrow-left text-[11px]"></i> Back
            </button>
          )}
          {step < totalSteps ? (
            <button onClick={nextStep} className="bg-[#B87333] text-white px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#B87333]/90 flex items-center gap-1.5 transition">
              Continue <i className="fas fa-arrow-right text-[11px]"></i>
            </button>
          ) : (
            <button onClick={() => onSubmit(activeTab, formData)} className="bg-green-600 text-white px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-green-700 shadow-sm flex items-center gap-1.5 transition">
              <i className="fas fa-cloud-upload-alt"></i> Submit Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

const AdminDashboard = ({ user, onLogin, onLogout, isOpen, onClose }) => {
  const [flowMode, setFlowMode] = useState('welcome');
  const [activeTab, setActiveTab] = useState('experiences');
  const [experiences, setExperiences] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Admin states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFlowMode('dashboard');
        loadData();
      } else {
        setFlowMode('welcome');
      }
    }
  }, [isOpen, user]);

  const loadData = () => {
    setExperiences(getExperiences());
    setAccommodations(getAccommodations());
  };

  const handleAdminSignInSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert('Please fill in your admin credentials.');
      return;
    }
    onLogin(loginEmail, loginPassword);
  };

  const handlePublicSubmission = (type, formData) => {
    if (type === 'experiences') {
      if (!formData.title || !formData.desc) { alert('Please enter a title and description.'); return; }
      const priceMatch = formData.price?.match(/\d+([\d,.]*)/);
      const priceValue = priceMatch ? parseInt(priceMatch[0].replace(/,/g, '')) : 0;
      const finalImage = formData.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80';
      addExperience({ ...formData, priceValue, image: finalImage, fallback: finalImage, timeSlots: [formData.timeSlots] });
    } else {
      if (!formData.name || !formData.description) { alert('Please enter a business name and description.'); return; }
      let imagesArray = formData.imagesInput ? formData.imagesInput.split(',').map(s => s.trim()) : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'];
      addAccommodation({ ...formData, images: imagesArray.filter(Boolean) });
    }
    alert('Thank you! Your business registration has been securely listed.');
    setFlowMode('welcome');
    window.dispatchEvent(new Event('storage'));
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setEditingType(type);
    setEditModalOpen(true);
  };

  const handleSaveFromModal = (updatedItem) => {
    if (editingType === 'experiences') updateExperience(editingItem.id, updatedItem);
    else updateAccommodation(editingItem.id, updatedItem);
    loadData();
    window.dispatchEvent(new Event('storage'));
    setEditModalOpen(false);
  };

  const handleDelete = (id, type) => {
    setPendingDelete({ id, type });
    setConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (pendingDelete) {
      if (pendingDelete.type === 'experiences') deleteExperience(pendingDelete.id);
      else deleteAccommodation(pendingDelete.id);
      loadData();
      window.dispatchEvent(new Event('storage'));
      setPendingDelete(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header - Increased title and description size */}
        <div className="bg-gradient-to-r from-[#2C3E2F] to-[#3d5641] px-6 py-5 flex justify-between items-center border-b border-white/10">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <i className="fas fa-store text-amber-400"></i> Tourism Directory Exchange
            </h2>
            <p className="text-gray-200 text-xs sm:text-sm mt-1">List your venue or manage existing entries on the platform canvas.</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition"><i className="fas fa-times text-xl"></i></button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar bg-gray-50/50">
          
          {/* FLOW STEP 1: WELCOME LANDING HUB */}
          {flowMode === 'welcome' && (
            <div className="max-w-xl mx-auto text-center py-8 animate-fadeIn">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-amber-200">
                <i className="fas fa-map-marked-alt text-2xl text-[#B87333]"></i>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#2C3E2F] mb-3">Get Discovered by Thousands of Travelers</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
                Add your business to our official regional platform directory maps. Submitting a new listing is simple and free.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg mx-auto">
                <button 
                  onClick={() => { setFlowMode('register_listing'); setActiveTab('experiences'); }}
                  className="bg-gradient-to-br from-[#B87333] to-amber-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-left flex flex-col justify-between border border-[#A05A2C] group"
                >
                  <div className="bg-white/20 w-9 h-9 rounded-lg flex items-center justify-center mb-5 text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-base mb-1.5 flex items-center gap-1.5">
                      Register For Your Listing <i className="fas fa-arrow-right text-xs opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all"></i>
                    </h4>
                    <p className="text-xs text-amber-50 text-left leading-relaxed">Fill out our descriptive question onboarding wizard to deploy your business card.</p>
                  </div>
                </button>

                <button 
                  onClick={() => setFlowMode('admin_login')}
                  className="bg-white border border-gray-200 hover:border-amber-300 text-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition text-left flex flex-col justify-between group"
                >
                  <div className="bg-gray-100 text-[#2C3E2F] w-9 h-9 rounded-lg flex items-center justify-center mb-5 text-sm"><i className="fas fa-user-lock text-sm"></i></div>
                  <div>
                    <h4 className="font-bold text-base text-[#2C3E2F] mb-1.5 group-hover:text-[#B87333] transition">Admin Log In</h4>
                    <p className="text-xs text-gray-400 text-left leading-relaxed">Already registered? Log in to your control dashboard panel to modify live details instantly.</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* FLOW STEP 2: MULTI-STEP QUESTIONNAIRE */}
          {flowMode === 'register_listing' && (
            <div className="max-w-2xl mx-auto animate-fadeIn">
              {/* Tab Selector Buttons text size bumped to text-sm */}
              <div className="flex bg-white border border-gray-200 p-1.5 rounded-xl mb-5 max-w-xs mx-auto gap-1 shadow-sm">
                <button 
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'experiences' ? 'bg-[#2C3E2F] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  onClick={() => setActiveTab('experiences')}
                >
                  <i className="fas fa-compass mr-1.5"></i> Experience
                </button>
                <button 
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'accommodations' ? 'bg-[#2C3E2F] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  onClick={() => setActiveTab('accommodations')}
                >
                  <i className="fas fa-bed mr-1.5"></i> Guesthouse
                </button>
              </div>

              <AddForm 
                activeTab={activeTab} 
                onSubmit={handlePublicSubmission} 
                onCancel={() => setFlowMode('welcome')} 
              />
            </div>
          )}

          {/* FLOW STEP 3: ADMIN LOGIN */}
          {flowMode === 'admin_login' && (
            <div className="max-w-md mx-auto py-6 animate-fadeIn">
              <form onSubmit={handleAdminSignInSubmit} className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-[#2C3E2F] mb-1">Secure Admin Portal</h3>
                <p className="text-xs text-gray-400 mb-5">Provide authorization tokens to edit listings.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input 
                      type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-[#B87333] outline-none bg-gray-50/50" 
                      placeholder="admin@townportal.co.za"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Access Password</label>
                    <input 
                      type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-[#B87333] outline-none bg-gray-50/50" 
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full mt-6 bg-[#2C3E2F] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#2C3E2F]/90 shadow transition">
                  Authorize Credentials
                </button>
                <button type="button" onClick={() => setFlowMode('welcome')} className="w-full mt-3 text-gray-400 hover:text-gray-600 text-sm transition text-center py-1 font-medium">
                  Cancel and Return
                </button>
              </form>
            </div>
          )}

          {/* FLOW STEP 4: MANAGEMENT TILES */}
          {flowMode === 'dashboard' && (
            <div className="animate-fadeIn">
              <div className="flex border-b pb-3 mb-4 justify-between items-center">
                <div className="flex gap-1 bg-white p-1.5 border rounded-xl shadow-sm">
                  <button className={`px-4 py-2 text-sm font-semibold rounded-lg ${activeTab === 'experiences' ? 'bg-amber-50 text-[#B87333]' : 'text-gray-500'}`} onClick={() => setActiveTab('experiences')}>Experiences</button>
                  <button className={`px-4 py-2 text-sm font-semibold rounded-lg ${activeTab === 'accommodations' ? 'bg-amber-50 text-[#B87333]' : 'text-gray-500'}`} onClick={() => setActiveTab('accommodations')}>Guesthouses</button>
                </div>
                <button onClick={() => setFlowMode('register_listing')} className="bg-[#B87333] text-white text-sm px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-[#B87333]/90 transition">
                  <i className="fas fa-plus mr-1.5"></i> Register New Entry
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {activeTab === 'experiences' ? (
                  experiences.map(exp => (
                    <div key={exp.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group">
                      <div className="relative h-28 bg-gray-100"><img src={exp.image || '/fallback.jpg'} alt={exp.title} className="w-full h-full object-cover" /></div>
                      <div className="p-3">
                        <h4 className="font-serif font-bold text-sm text-[#2C3E2F] truncate">{exp.title}</h4>
                        <p className="text-[#B87333] text-xs font-bold mt-0.5">{exp.price}</p>
                        <div className="flex justify-end gap-3 mt-3 pt-2 border-t border-gray-50 text-sm">
                          <button onClick={() => handleEdit(exp, 'experiences')} className="text-blue-600 hover:text-blue-800"><i className="fas fa-edit"></i></button>
                          <button onClick={() => handleDelete(exp.id, 'experiences')} className="text-red-600 hover:text-red-800"><i className="fas fa-trash-alt"></i></button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  accommodations.map(acc => (
                    <div key={acc.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group">
                      <div className="relative h-28 bg-gray-100"><img src={acc.images?.[0] || '/fallback.jpg'} alt={acc.name} className="w-full h-full object-cover" /></div>
                      <div className="p-3">
                        <h4 className="font-serif font-bold text-sm text-[#2C3E2F] truncate">{acc.name}</h4>
                        <p className="text-[#B87333] text-xs font-bold mt-0.5">{acc.priceRange}</p>
                        <div className="flex justify-end gap-3 mt-3 pt-2 border-t border-gray-50 text-sm">
                          <button onClick={() => handleEdit(acc, 'accommodations')} className="text-blue-600 hover:text-blue-800"><i className="fas fa-edit"></i></button>
                          <button onClick={() => handleDelete(acc.id, 'accommodations')} className="text-red-600 hover:text-red-800"><i className="fas fa-trash-alt"></i></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer Status Bar text scale updates */}
        <div className="p-4 border-t bg-gray-50 flex justify-between items-center text-xs text-gray-500 px-6">
          {flowMode === 'dashboard' ? (
            <>
              <span>Logged into database console securely as: <strong className="text-gray-700 font-semibold">{user?.email}</strong></span>
              <button onClick={() => { onLogout(); setFlowMode('welcome'); }} className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md text-xs font-semibold transition"><i className="fas fa-sign-out-alt mr-1"></i>Logout</button>
            </>
          ) : (
            <>
              <span className="leading-normal"><i className="fas fa-shield-alt mr-1 text-[#2C3E2F]"></i> Public submissions undergo verification filtering prior to live synchronization updates.</span>
              {flowMode !== 'welcome' && <button onClick={() => setFlowMode('welcome')} className="text-[#B87333] hover:underline font-semibold ml-4 whitespace-nowrap">Return to Main Hub</button>}
            </>
          )}
        </div>

      </div>

      <EditItemModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} item={editingItem} type={editingType} onSave={handleSaveFromModal} />
      <ConfirmModal isOpen={confirmModalOpen} onClose={() => setConfirmModalOpen(false)} onConfirm={confirmDelete} title="Confirm Deletion" message="Delete permanently? This action cannot be undone." />
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #B87333; border-radius: 10px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;