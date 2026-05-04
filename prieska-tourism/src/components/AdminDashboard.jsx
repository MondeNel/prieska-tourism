// src/components/AdminDashboard.jsx (with image support)
import { useState, useEffect } from 'react';
import { getExperiences, updateExperience, deleteExperience, addExperience, getAccommodations, updateAccommodation, deleteAccommodation, addAccommodation } from '../services/dataService';

const AdminDashboard = ({ user, onLogout, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('experiences');
  const [experiences, setExperiences] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({});

  useEffect(() => {
    if (isOpen) loadData();
  }, [isOpen]);

  const loadData = () => {
    setExperiences(getExperiences());
    setAccommodations(getAccommodations());
  };

  const handleEdit = (item, type) => {
    setEditingId(item.id);
    // For guesthouses, convert images array to comma string for editing
    if (type === 'accommodations') {
      setEditForm({ ...item, imagesInput: item.images ? item.images.join(', ') : '' });
    } else {
      setEditForm({ ...item });
    }
    setIsAdding(false);
  };

  const handleSave = (type) => {
    let updated = { ...editForm };
    if (type === 'accommodations') {
      // convert imagesInput back to array
      if (updated.imagesInput) {
        updated.images = updated.imagesInput.split(',').map(s => s.trim());
        delete updated.imagesInput;
      }
      updateAccommodation(editingId, updated);
    } else {
      // extract numeric price from string (e.g., "ZAR 1,250" -> 1250)
      const priceMatch = updated.price?.match(/\d+([\d,.]*)/);
      if (priceMatch) {
        updated.priceValue = parseInt(priceMatch[0].replace(/,/g, ''));
      }
      updateExperience(editingId, updated);
    }
    setEditingId(null);
    loadData();
    window.dispatchEvent(new Event('storage'));
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure?')) {
      type === 'experiences' ? deleteExperience(id) : deleteAccommodation(id);
      loadData();
      window.dispatchEvent(new Event('storage'));
    }
  };

  const startAdd = (type) => {
    setIsAdding(true);
    setEditingId(null);
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm(prev => ({ ...prev, [name]: value }));
  };

  const renderField = (label, name, type = 'text', value, onChange, placeholder = '') => (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#B87333] outline-none" rows={2} value={value || ''} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#B87333] outline-none" type={type} value={value || ''} onChange={onChange} placeholder={placeholder} name={name} />
      )}
    </div>
  );

  const renderExperiences = () => (
    <div className="space-y-3">
      <button onClick={() => startAdd('experiences')} className="w-full flex items-center justify-center gap-2 bg-[#B87333] hover:bg-[#B87333]/80 text-white text-sm font-semibold py-2.5 rounded-xl shadow-md mb-4"><i className="fas fa-plus"></i> Add Experience</button>
      {isAdding && activeTab === 'experiences' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
          <h4 className="font-semibold text-[#2C3E2F] mb-3">New Experience</h4>
          {renderField('Title *', 'title', 'text', addForm.title, handleAddChange, 'Hot Air Balloon')}
          {renderField('Price', 'price', 'text', addForm.price, handleAddChange, 'ZAR 1,000')}
          {renderField('Description *', 'desc', 'textarea', addForm.desc, handleAddChange, 'Describe...')}
          {renderField('Duration', 'duration', 'text', addForm.duration, handleAddChange, '2-3 hrs')}
          {renderField('Category', 'category', 'text', addForm.category, handleAddChange, 'wildlife, adventure, culture, heritage, nature')}
          {renderField('Image URL', 'image', 'text', addForm.image, handleAddChange, '/path/to/image.jpg')}
          <div className="flex gap-2 pt-2">
            <button onClick={() => submitAdd('experiences')} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700">Create</button>
            <button onClick={cancelAdd} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-400">Cancel</button>
          </div>
        </div>
      )}
      {experiences.map(exp => (
        <div key={exp.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          {editingId === exp.id ? (
            <div className="space-y-3">
              {renderField('Title', 'title', 'text', editForm.title, handleEditChange)}
              {renderField('Price', 'price', 'text', editForm.price, handleEditChange)}
              {renderField('Description', 'desc', 'textarea', editForm.desc, handleEditChange)}
              {renderField('Duration', 'duration', 'text', editForm.duration, handleEditChange)}
              {renderField('Category', 'category', 'text', editForm.category, handleEditChange)}
              {renderField('Image URL', 'image', 'text', editForm.image, handleEditChange)}
              <div className="flex gap-2 pt-2">
                <button onClick={() => handleSave('experiences')} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Save</button>
                <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-300 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div><h4 className="font-serif font-bold text-[#2C3E2F]">{exp.title}</h4><p className="text-[#B87333] text-sm">{exp.price}</p><p className="text-gray-400 text-xs">{exp.duration}</p></div>
              <div className="flex gap-2"><button onClick={() => handleEdit(exp, 'experiences')} className="text-blue-600 text-sm"><i className="fas fa-edit"></i> Edit</button><button onClick={() => handleDelete(exp.id, 'experiences')} className="text-red-600 text-sm"><i className="fas fa-trash"></i> Delete</button></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderAccommodations = () => (
    <div className="space-y-3">
      <button onClick={() => startAdd('accommodations')} className="w-full flex items-center justify-center gap-2 bg-[#B87333] hover:bg-[#B87333]/80 text-white text-sm font-semibold py-2.5 rounded-xl shadow-md mb-4"><i className="fas fa-plus"></i> Add Guesthouse</button>
      {isAdding && activeTab === 'accommodations' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
          <h4 className="font-semibold text-[#2C3E2F] mb-3">New Guesthouse</h4>
          {renderField('Name *', 'name', 'text', addForm.name, handleAddChange, 'Sunshine Lodge')}
          {renderField('Price Range', 'priceRange', 'text', addForm.priceRange, handleAddChange, 'R500 - R1000')}
          {renderField('Description *', 'description', 'textarea', addForm.description, handleAddChange)}
          {renderField('Address', 'address', 'text', addForm.address, handleAddChange)}
          {renderField('Phone', 'contact', 'text', addForm.contact, handleAddChange)}
          {renderField('Image URLs (comma separated)', 'imagesInput', 'text', addForm.imagesInput, handleAddChange, '/img1.jpg, /img2.jpg')}
          <div className="flex gap-2 pt-2"><button onClick={() => submitAdd('accommodations')} className="flex-1 bg-green-600 text-white py-2 rounded-lg">Create</button><button onClick={cancelAdd} className="flex-1 bg-gray-300 py-2 rounded-lg">Cancel</button></div>
        </div>
      )}
      {accommodations.map(acc => (
        <div key={acc.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          {editingId === acc.id ? (
            <div className="space-y-3">
              {renderField('Name', 'name', 'text', editForm.name, handleEditChange)}
              {renderField('Price Range', 'priceRange', 'text', editForm.priceRange, handleEditChange)}
              {renderField('Description', 'description', 'textarea', editForm.description, handleEditChange)}
              {renderField('Address', 'address', 'text', editForm.address, handleEditChange)}
              {renderField('Phone', 'contact', 'text', editForm.contact, handleEditChange)}
              {renderField('Image URLs (comma separated)', 'imagesInput', 'text', editForm.imagesInput || (editForm.images ? editForm.images.join(', ') : ''), handleEditChange)}
              <div className="flex gap-2 pt-2"><button onClick={() => handleSave('accommodations')} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Save</button><button onClick={() => setEditingId(null)} className="flex-1 bg-gray-300 py-2 rounded-lg">Cancel</button></div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div><h4 className="font-serif font-bold">{acc.name}</h4><p className="text-[#B87333] text-sm">{acc.priceRange}</p><p className="text-gray-400 text-xs">{acc.address}</p></div>
              <div className="flex gap-2"><button onClick={() => handleEdit(acc, 'accommodations')} className="text-blue-600 text-sm">Edit</button><button onClick={() => handleDelete(acc.id, 'accommodations')} className="text-red-600 text-sm">Delete</button></div>
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
          <div><h2 className="text-2xl font-serif font-bold text-white"><i className="fas fa-user-shield mr-2"></i>Admin Dashboard</h2><p className="text-amber-100 text-sm">Welcome, {user.name || user.email}</p></div>
          <button onClick={onClose} className="text-white hover:text-amber-200"><i className="fas fa-times text-xl"></i></button>
        </div>
        <div className="flex border-b px-6 pt-2">
          <button className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === 'experiences' ? 'text-[#B87333] border-b-2 border-[#B87333] bg-amber-50' : 'text-gray-500'}`} onClick={() => { setActiveTab('experiences'); setIsAdding(false); setEditingId(null); }}><i className="fas fa-compass mr-2"></i>Experiences</button>
          <button className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === 'accommodations' ? 'text-[#B87333] border-b-2 border-[#B87333] bg-amber-50' : 'text-gray-500'}`} onClick={() => { setActiveTab('accommodations'); setIsAdding(false); setEditingId(null); }}><i className="fas fa-bed mr-2"></i>Guesthouses</button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">{activeTab === 'experiences' ? renderExperiences() : renderAccommodations()}</div>
        <div className="p-4 border-t bg-gray-50 flex justify-between"><span className="text-xs text-gray-400"><i className="fas fa-save mr-1"></i>Changes saved automatically</span><button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm"><i className="fas fa-sign-out-alt mr-2"></i>Logout</button></div>
      </div>
      <style jsx>{`.custom-scrollbar::-webkit-scrollbar{width:6px}.custom-scrollbar::-webkit-scrollbar-track{background:#f1f1f1}.custom-scrollbar::-webkit-scrollbar-thumb{background:#B87333;border-radius:10px}`}</style>
    </div>
  );
};

export default AdminDashboard;