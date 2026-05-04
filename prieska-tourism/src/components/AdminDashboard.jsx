import { useState, useEffect } from 'react';
import { getExperiences, updateExperience, deleteExperience, addExperience, getAccommodations, updateAccommodation, deleteAccommodation, addAccommodation } from '../services/dataService';

const AdminDashboard = ({ user, onLogout, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('experiences');
  const [experiences, setExperiences] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    setExperiences(getExperiences());
    setAccommodations(getAccommodations());
  };

  const handleEdit = (item, type) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

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

  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'experiences') deleteExperience(id);
      else deleteAccommodation(id);
      loadData();
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleAdd = (type) => {
    if (type === 'experiences') {
      const newExp = {
        title: 'New Experience',
        category: 'wildlife',
        icon: 'fa-paw',
        desc: 'Description here',
        duration: '2-3 hrs',
        price: 'ZAR 0',
        priceValue: 0,
        image: '/fallback.jpg',
        timeSlots: ['09:00 AM']
      };
      addExperience(newExp);
    } else {
      const newAcc = {
        name: 'New Guesthouse',
        type: 'Lodge',
        priceRange: 'R0 - R0',
        rating: 0,
        reviewCount: 0,
        description: 'Description here',
        address: 'Address',
        features: [],
        contact: '+27 00 000 0000',
        whatsapp: '+27000000000',
        images: ['/fallback.jpg']
      };
      addAccommodation(newAcc);
    }
    loadData();
  };

  const renderField = (label, name, type = 'text') => (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-none transition" value={editForm[name] || ''} onChange={e => setEditForm({...editForm, [name]: e.target.value})} rows={2} />
      ) : (
        <input className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-none transition" type={type} value={editForm[name] || ''} onChange={e => setEditForm({...editForm, [name]: e.target.value})} />
      )}
    </div>
  );

  const renderExperiences = () => (
    <div className="space-y-3">
      <button onClick={() => handleAdd('experiences')} className="w-full flex items-center justify-center gap-2 bg-[#B87333] hover:bg-[#B87333]/80 text-white text-sm font-semibold py-2.5 rounded-xl transition shadow-md mb-4">
        <i className="fas fa-plus"></i> Add Experience
      </button>
      {experiences.map(exp => (
        <div key={exp.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          {editingId === exp.id ? (
            <div className="space-y-3">
              {renderField('Title', 'title')}
              {renderField('Price', 'price')}
              {renderField('Description', 'desc', 'textarea')}
              {renderField('Duration', 'duration')}
              {renderField('Category', 'category')}
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
      <button onClick={() => handleAdd('accommodations')} className="w-full flex items-center justify-center gap-2 bg-[#B87333] hover:bg-[#B87333]/80 text-white text-sm font-semibold py-2.5 rounded-xl transition shadow-md mb-4">
        <i className="fas fa-plus"></i> Add Guesthouse
      </button>
      {accommodations.map(acc => (
        <div key={acc.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          {editingId === acc.id ? (
            <div className="space-y-3">
              {renderField('Name', 'name')}
              {renderField('Price Range', 'priceRange')}
              {renderField('Description', 'description', 'textarea')}
              {renderField('Address', 'address')}
              {renderField('Phone', 'contact')}
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
        {/* Header with gold gradient */}
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
              <i className="fas fa-user-shield"></i>
              Admin Dashboard
            </h2>
            <p className="text-amber-100 text-sm">Welcome, {user.name || user.email}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-amber-200 transition"><i className="fas fa-times text-xl"></i></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6 pt-2">
          <button
            className={`px-4 py-2 text-sm font-medium transition-all rounded-t-lg ${activeTab === 'experiences' ? 'text-[#B87333] border-b-2 border-[#B87333] bg-amber-50' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('experiences')}
          >
            <i className="fas fa-compass mr-2"></i> Experiences
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium transition-all rounded-t-lg ${activeTab === 'accommodations' ? 'text-[#B87333] border-b-2 border-[#B87333] bg-amber-50' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('accommodations')}
          >
            <i className="fas fa-bed mr-2"></i> Guesthouses
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {activeTab === 'experiences' ? renderExperiences() : renderAccommodations()}
        </div>

        {/* Logout button */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          <span className="text-xs text-gray-400"><i className="fas fa-save mr-1"></i> Changes saved automatically</span>
          <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
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