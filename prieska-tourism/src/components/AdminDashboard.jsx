import { useState, useEffect } from 'react';
import { getExperiences, updateExperience, deleteExperience, addExperience, getAccommodations, updateAccommodation, deleteAccommodation, addAccommodation } from '../services/dataService';

const AdminDashboard = ({ user, onLogout, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('experiences');
  const [experiences, setExperiences] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  // Add mode state
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({});

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    setExperiences(getExperiences());
    setAccommodations(getAccommodations());
  };

  // Start editing
  const handleEdit = (item, type) => {
    setEditingId(item.id);
    setEditForm({ ...item });
    setIsAdding(false);
  };

  // Save edited item
  const handleSave = (type) => {
    if (type === 'experiences') {
      updateExperience(editingId, editForm);
    } else {
      updateAccommodation(editingId, editForm);
    }
    setEditingId(null);
    loadData();
    window.dispatchEvent(new Event('storage'));
  };

  // Delete item
  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'experiences') deleteExperience(id);
      else deleteAccommodation(id);
      loadData();
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Start adding new item
  const startAdd = (type) => {
    setIsAdding(true);
    setEditingId(null);
    if (type === 'experiences') {
      setAddForm({
        title: '',
        category: 'wildlife',
        icon: 'fa-paw',
        desc: '',
        duration: '',
        price: 'ZAR 0',
        priceValue: 0,
        image: '/fallback.jpg',
        timeSlots: ['09:00 AM']
      });
    } else {
      setAddForm({
        name: '',
        type: 'Lodge',
        priceRange: 'R0 - R0',
        rating: 0,
        reviewCount: 0,
        description: '',
        address: '',
        features: [],
        contact: '',
        whatsapp: '',
        images: ['/fallback.jpg']
      });
    }
  };

  // Cancel adding
  const cancelAdd = () => {
    setIsAdding(false);
    setAddForm({});
  };

  // Submit new item
  const submitAdd = (type) => {
    if (type === 'experiences') {
      if (!addForm.title || !addForm.desc) {
        alert('Please fill in at least title and description');
        return;
      }
      addExperience(addForm);
    } else {
      if (!addForm.name || !addForm.description) {
        alert('Please fill in at least name and description');
        return;
      }
      addAccommodation(addForm);
    }
    setIsAdding(false);
    loadData();
    window.dispatchEvent(new Event('storage'));
  };

  // Input change for edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Input change for add form
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm(prev => ({ ...prev, [name]: value }));
  };

  const renderField = (label, name, type = 'text', value, onChange, placeholder = '') => (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-none transition" value={value || ''} onChange={onChange} rows={2} placeholder={placeholder} />
      ) : (
        <input className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-none transition" type={type} value={value || ''} onChange={onChange} placeholder={placeholder} name={name} />
      )}
    </div>
  );

  const renderExperiences = () => (
    <div className="space-y-3">
      <button onClick={() => startAdd('experiences')} className="w-full flex items-center justify-center gap-2 bg-[#B87333] hover:bg-[#B87333]/80 text-white text-sm font-semibold py-2.5 rounded-xl transition shadow-md mb-4">
        <i className="fas fa-plus"></i> Add Experience
      </button>

      {/* Add experience form */}
      {isAdding && activeTab === 'experiences' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
          <h4 className="font-semibold text-[#2C3E2F] mb-3">New Experience</h4>
          {renderField('Title *', 'title', 'text', addForm.title, handleAddChange, 'e.g., Hot Air Balloon')}
          {renderField('Price (display)', 'price', 'text', addForm.price, handleAddChange, 'ZAR 1,000')}
          {renderField('Description *', 'desc', 'textarea', addForm.desc, handleAddChange, 'Describe the experience...')}
          {renderField('Duration', 'duration', 'text', addForm.duration, handleAddChange, '2-3 hrs')}
          {renderField('Category', 'category', 'text', addForm.category, handleAddChange, 'wildlife, adventure, culture, heritage, nature')}
          <div className="flex gap-2 pt-2">
            <button onClick={() => submitAdd('experiences')} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700 transition">Create</button>
            <button onClick={cancelAdd} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-400 transition">Cancel</button>
          </div>
        </div>
      )}

      {/* Existing experiences list */}
      {experiences.map(exp => (
        <div key={exp.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          {editingId === exp.id ? (
            <div className="space-y-3">
              {renderField('Title', 'title', 'text', editForm.title, handleEditChange)}
              {renderField('Price', 'price', 'text', editForm.price, handleEditChange)}
              {renderField('Description', 'desc', 'textarea', editForm.desc, handleEditChange)}
              {renderField('Duration', 'duration', 'text', editForm.duration, handleEditChange)}
              {renderField('Category', 'category', 'text', editForm.category, handleEditChange)}
              <div className="flex gap-2 pt-2">
                <button onClick={() => handleSave('experiences')} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">Save</button>
                <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-400 transition">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-serif font-bold text-[#2C3E2F] text-base">{exp.title}</h4>
                <p className="text-[#B87333] font-semibold text-sm mt-0.5">{exp.price}</p>
                <p className="text-gray-400 text-xs mt-1">{exp.duration}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(exp, 'experiences')} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"><i className="fas fa-edit text-xs"></i> Edit</button>
                <button onClick={() => handleDelete(exp.id, 'experiences')} className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"><i className="fas fa-trash-alt text-xs"></i> Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderAccommodations = () => (
    <div className="space-y-3">
      <button onClick={() => startAdd('accommodations')} className="w-full flex items-center justify-center gap-2 bg-[#B87333] hover:bg-[#B87333]/80 text-white text-sm font-semibold py-2.5 rounded-xl transition shadow-md mb-4">
        <i className="fas fa-plus"></i> Add Guesthouse
      </button>

      {/* Add guesthouse form */}
      {isAdding && activeTab === 'accommodations' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
          <h4 className="font-semibold text-[#2C3E2F] mb-3">New Guesthouse</h4>
          {renderField('Name *', 'name', 'text', addForm.name, handleAddChange, 'e.g., Sunshine Lodge')}
          {renderField('Price Range', 'priceRange', 'text', addForm.priceRange, handleAddChange, 'R500 - R1000')}
          {renderField('Description *', 'description', 'textarea', addForm.description, handleAddChange, 'Describe the guesthouse...')}
          {renderField('Address', 'address', 'text', addForm.address, handleAddChange, 'Street, Town')}
          {renderField('Phone', 'contact', 'text', addForm.contact, handleAddChange, '+27 00 000 0000')}
          <div className="flex gap-2 pt-2">
            <button onClick={() => submitAdd('accommodations')} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700 transition">Create</button>
            <button onClick={cancelAdd} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-400 transition">Cancel</button>
          </div>
        </div>
      )}

      {/* Existing guesthouses list */}
      {accommodations.map(acc => (
        <div key={acc.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          {editingId === acc.id ? (
            <div className="space-y-3">
              {renderField('Name', 'name', 'text', editForm.name, handleEditChange)}
              {renderField('Price Range', 'priceRange', 'text', editForm.priceRange, handleEditChange)}
              {renderField('Description', 'description', 'textarea', editForm.description, handleEditChange)}
              {renderField('Address', 'address', 'text', editForm.address, handleEditChange)}
              {renderField('Phone', 'contact', 'text', editForm.contact, handleEditChange)}
              <div className="flex gap-2 pt-2">
                <button onClick={() => handleSave('accommodations')} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">Save</button>
                <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-400 transition">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-serif font-bold text-[#2C3E2F] text-base">{acc.name}</h4>
                <p className="text-[#B87333] font-semibold text-sm mt-0.5">{acc.priceRange}</p>
                <p className="text-gray-400 text-xs mt-1">{acc.address}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(acc, 'accommodations')} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"><i className="fas fa-edit text-xs"></i> Edit</button>
                <button onClick={() => handleDelete(acc.id, 'accommodations')} className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"><i className="fas fa-trash-alt text-xs"></i> Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2"><i className="fas fa-user-shield"></i> Admin Dashboard</h2>
            <p className="text-amber-100 text-sm">Welcome, {user.name || user.email}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-amber-200 transition"><i className="fas fa-times text-xl"></i></button>
        </div>

        <div className="flex border-b border-gray-200 px-6 pt-2">
          <button className={`px-4 py-2 text-sm font-medium transition-all rounded-t-lg ${activeTab === 'experiences' ? 'text-[#B87333] border-b-2 border-[#B87333] bg-amber-50' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => { setActiveTab('experiences'); setIsAdding(false); setEditingId(null); }}><i className="fas fa-compass mr-2"></i> Experiences</button>
          <button className={`px-4 py-2 text-sm font-medium transition-all rounded-t-lg ${activeTab === 'accommodations' ? 'text-[#B87333] border-b-2 border-[#B87333] bg-amber-50' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => { setActiveTab('accommodations'); setIsAdding(false); setEditingId(null); }}><i className="fas fa-bed mr-2"></i> Guesthouses</button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {activeTab === 'experiences' ? renderExperiences() : renderAccommodations()}
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          <span className="text-xs text-gray-400"><i className="fas fa-save mr-1"></i> Changes saved automatically</span>
          <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"><i className="fas fa-sign-out-alt"></i> Logout</button>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #B87333; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;