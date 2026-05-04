import { useState, useEffect, memo } from 'react';
import { getExperiences, updateExperience, deleteExperience, addExperience, getAccommodations, updateAccommodation, deleteAccommodation, addAccommodation } from '../services/dataService';
import EditItemModal from './EditItemModal';

// Helper: renders a form field (outside component to keep it stable)
const renderField = (label, name, type = 'text', value, onChange, placeholder = '') => (
  <div>
    <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
    {type === 'textarea' ? (
      <textarea
        className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:border-[#B87333] outline-none"
        rows={2}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
      />
    ) : (
      <input
        className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:border-[#B87333] outline-none"
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    )}
  </div>
);

// Memoized AddForm to prevent unnecessary re-renders and input focus loss
const AddForm = memo(({ activeTab, addForm, handleAddChange, submitAdd, cancelAdd }) => (
  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
    <h4 className="font-semibold text-[#2C3E2F] text-sm mb-3 flex items-center gap-2">
      <i className="fas fa-plus-circle text-[#B87333]"></i>
      Add New {activeTab === 'experiences' ? 'Experience' : 'Guesthouse'}
    </h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {activeTab === 'experiences' ? (
        <>
          {renderField('Title *', 'title', 'text', addForm.title, handleAddChange)}
          {renderField('Price', 'price', 'text', addForm.price, handleAddChange)}
          {renderField('Description *', 'desc', 'textarea', addForm.desc, handleAddChange)}
          {renderField('Duration', 'duration', 'text', addForm.duration, handleAddChange)}
          {renderField('Category', 'category', 'text', addForm.category, handleAddChange)}
          {renderField('Image URL', 'image', 'text', addForm.image, handleAddChange)}
        </>
      ) : (
        <>
          {renderField('Name *', 'name', 'text', addForm.name, handleAddChange)}
          {renderField('Price Range', 'priceRange', 'text', addForm.priceRange, handleAddChange)}
          {renderField('Description *', 'description', 'textarea', addForm.description, handleAddChange)}
          {renderField('Address', 'address', 'text', addForm.address, handleAddChange)}
          {renderField('Phone', 'contact', 'text', addForm.contact, handleAddChange)}
          {renderField('Image URLs (comma)', 'imagesInput', 'text', addForm.imagesInput, handleAddChange)}
        </>
      )}
    </div>
    <div className="flex gap-3 mt-4">
      <button onClick={() => submitAdd(activeTab)} className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-700">Create</button>
      <button onClick={cancelAdd} className="bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-xs hover:bg-gray-400">Cancel</button>
    </div>
  </div>
));

const AdminDashboard = ({ user, onLogout, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('experiences');
  const [experiences, setExperiences] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(null);

  useEffect(() => {
    if (isOpen) loadData();
  }, [isOpen]);

  const loadData = () => {
    setExperiences(getExperiences());
    setAccommodations(getAccommodations());
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setEditingType(type);
    setEditModalOpen(true);
  };

  const handleSaveFromModal = (updatedItem) => {
    if (editingType === 'experiences') {
      updateExperience(editingItem.id, updatedItem);
    } else {
      updateAccommodation(editingItem.id, updatedItem);
    }
    loadData();
    window.dispatchEvent(new Event('storage'));
    setEditModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Delete permanently?')) {
      type === 'experiences' ? deleteExperience(id) : deleteAccommodation(id);
      loadData();
      window.dispatchEvent(new Event('storage'));
    }
  };

  const startAdd = (type) => {
    setIsAdding(true);
    if (type === 'experiences') {
      setAddForm({ title: '', category: 'wildlife', icon: 'fa-paw', desc: '', duration: '', price: 'ZAR 0', image: '/fallback.jpg', timeSlots: ['09:00 AM'] });
    } else {
      setAddForm({ name: '', type: 'Lodge', priceRange: 'R0 - R0', rating: 0, reviewCount: 0, description: '', address: '', features: [], contact: '', whatsapp: '', images: [], imagesInput: '' });
    }
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setAddForm({});
  };

  const submitAdd = (type) => {
    if (type === 'experiences') {
      if (!addForm.title || !addForm.desc) { alert('Please fill title and description'); return; }
      const priceMatch = addForm.price?.match(/\d+([\d,.]*)/);
      const priceValue = priceMatch ? parseInt(priceMatch[0].replace(/,/g, '')) : 0;
      const newExp = { ...addForm, priceValue, fallback: addForm.image };
      addExperience(newExp);
    } else {
      if (!addForm.name || !addForm.description) { alert('Please fill name and description'); return; }
      const imagesArray = addForm.imagesInput ? addForm.imagesInput.split(',').map(s => s.trim()) : ['/fallback.jpg'];
      const newAcc = { ...addForm, images: imagesArray };
      delete newAcc.imagesInput;
      addAccommodation(newAcc);
    }
    setIsAdding(false);
    loadData();
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm(prev => ({ ...prev, [name]: value }));
  };

  const renderExperienceCard = (exp) => (
    <div className="col-span-1 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group">
      <div className="relative h-28 bg-gray-100">
        <img src={exp.image || '/fallback.jpg'} alt={exp.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded-full">{exp.category}</div>
      </div>
      <div className="p-3">
        <h3 className="font-serif font-bold text-sm text-[#2C3E2F] truncate">{exp.title}</h3>
        <p className="text-[#B87333] font-semibold text-xs mt-0.5">{exp.price}</p>
        <p className="text-gray-400 text-[10px] mt-0.5">{exp.duration}</p>
        <div className="flex justify-end gap-3 mt-2 pt-2 border-t border-gray-100">
          <button onClick={() => handleEdit(exp, 'experiences')} className="text-blue-600 hover:text-blue-800 text-base" title="Edit">
            <i className="fas fa-edit"></i>
          </button>
          <button onClick={() => handleDelete(exp.id, 'experiences')} className="text-red-600 hover:text-red-800 text-base" title="Delete">
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAccommodationCard = (acc) => {
    const coverImage = acc.images?.[0] || '/fallback.jpg';
    return (
      <div className="col-span-1 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group">
        <div className="relative h-28 bg-gray-100">
          <img src={coverImage} alt={acc.name} className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 bg-amber-600 text-white text-[8px] px-1.5 py-0.5 rounded-full">{acc.type}</div>
        </div>
        <div className="p-3">
          <h3 className="font-serif font-bold text-sm text-[#2C3E2F] truncate">{acc.name}</h3>
          <p className="text-[#B87333] font-semibold text-xs">{acc.priceRange}</p>
          <p className="text-gray-400 text-[10px] truncate">{acc.address}</p>
          <div className="flex justify-end gap-3 mt-2 pt-2 border-t border-gray-100">
            <button onClick={() => handleEdit(acc, 'accommodations')} className="text-blue-600 hover:text-blue-800 text-base" title="Edit">
              <i className="fas fa-edit"></i>
            </button>
            <button onClick={() => handleDelete(acc.id, 'accommodations')} className="text-red-600 hover:text-red-800 text-base" title="Delete">
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-5 py-3 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2"><i className="fas fa-user-shield"></i>Admin Dashboard</h2>
            <p className="text-amber-100 text-xs">Welcome back, {user.name || user.email}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-amber-200"><i className="fas fa-times text-lg"></i></button>
        </div>
        <div className="flex border-b px-5 pt-1 gap-1">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === 'experiences' ? 'text-[#B87333] border-b-2 border-[#B87333] bg-amber-50' : 'text-gray-500'}`}
            onClick={() => { setActiveTab('experiences'); setIsAdding(false); }}
          >
            <i className="fas fa-compass mr-1"></i>Experiences
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === 'accommodations' ? 'text-[#B87333] border-b-2 border-[#B87333] bg-amber-50' : 'text-gray-500'}`}
            onClick={() => { setActiveTab('accommodations'); setIsAdding(false); }}
          >
            <i className="fas fa-bed mr-1"></i>Guesthouses
          </button>
        </div>
        <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
          <div className="flex justify-end mb-4">
            {!isAdding && (
              <button onClick={() => startAdd(activeTab)} className="bg-[#B87333] text-white text-xs px-3 py-1.5 rounded-full shadow hover:bg-[#B87333]/80 transition flex items-center gap-1">
                <i className="fas fa-plus"></i> Add New
              </button>
            )}
          </div>
          {isAdding && (
            <AddForm
              activeTab={activeTab}
              addForm={addForm}
              handleAddChange={handleAddChange}
              submitAdd={submitAdd}
              cancelAdd={cancelAdd}
            />
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {activeTab === 'experiences'
              ? experiences.map(exp => renderExperienceCard(exp))
              : accommodations.map(acc => renderAccommodationCard(acc))
            }
          </div>
        </div>
        <div className="p-3 border-t bg-gray-50 flex justify-between items-center text-[10px] text-gray-500">
          <span><i className="fas fa-save mr-1"></i>All changes are saved automatically</span>
          <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-xs">
            <i className="fas fa-sign-out-alt mr-1"></i>Logout
          </button>
        </div>
      </div>
      <EditItemModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        item={editingItem}
        type={editingType}
        onSave={handleSaveFromModal}
      />
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #B87333; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;