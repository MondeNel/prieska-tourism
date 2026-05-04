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
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea className="w-full border p-2 rounded" value={editForm[name] || ''} onChange={e => setEditForm({...editForm, [name]: e.target.value})} rows={3} />
      ) : (
        <input className="w-full border p-2 rounded" type={type} value={editForm[name] || ''} onChange={e => setEditForm({...editForm, [name]: e.target.value})} />
      )}
    </div>
  );

  const renderExperiences = () => (
    <div className="space-y-4">
      <button onClick={() => handleAdd('experiences')} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">+ Add Experience</button>
      {experiences.map(exp => (
        <div key={exp.id} className="border rounded-lg p-4 bg-white shadow-sm">
          {editingId === exp.id ? (
            <div className="space-y-3">
              {renderField('Title', 'title')}
              {renderField('Price (display)', 'price')}
              {renderField('Description', 'desc', 'textarea')}
              {renderField('Duration', 'duration')}
              {renderField('Category', 'category')}
              <div className="flex gap-2 pt-2">
                <button onClick={() => handleSave('experiences')} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-lg">{exp.title}</div>
                <div className="text-sm text-gray-600">{exp.price}</div>
                <div className="text-xs text-gray-400 mt-1">{exp.duration}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(exp, 'experiences')} className="text-blue-600 hover:underline text-sm">Edit</button>
                <button onClick={() => handleDelete(exp.id, 'experiences')} className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderAccommodations = () => (
    <div className="space-y-4">
      <button onClick={() => handleAdd('accommodations')} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">+ Add Guesthouse</button>
      {accommodations.map(acc => (
        <div key={acc.id} className="border rounded-lg p-4 bg-white shadow-sm">
          {editingId === acc.id ? (
            <div className="space-y-3">
              {renderField('Name', 'name')}
              {renderField('Price Range', 'priceRange')}
              {renderField('Description', 'description', 'textarea')}
              {renderField('Address', 'address')}
              {renderField('Contact Phone', 'contact')}
              <div className="flex gap-2 pt-2">
                <button onClick={() => handleSave('accommodations')} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-lg">{acc.name}</div>
                <div className="text-sm text-gray-600">{acc.priceRange}</div>
                <div className="text-xs text-gray-400 mt-1">{acc.address}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(acc, 'accommodations')} className="text-blue-600 hover:underline text-sm">Edit</button>
                <button onClick={() => handleDelete(acc.id, 'accommodations')} className="text-red-600 hover:underline text-sm">Delete</button>
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
      <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white">Admin Dashboard</h2>
            <p className="text-amber-100 text-sm">Welcome, {user.name || user.email}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-amber-200 transition"><i className="fas fa-times text-xl"></i></button>
        </div>
        <div className="flex border-b">
          <button className={`px-4 py-2 ${activeTab === 'experiences' ? 'border-b-2 border-amber-500 text-amber-600 font-medium' : 'text-gray-600'}`} onClick={() => setActiveTab('experiences')}>Experiences</button>
          <button className={`px-4 py-2 ${activeTab === 'accommodations' ? 'border-b-2 border-amber-500 text-amber-600 font-medium' : 'text-gray-600'}`} onClick={() => setActiveTab('accommodations')}>Guesthouses</button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'experiences' ? renderExperiences() : renderAccommodations()}
        </div>
        <button onClick={onLogout} className="m-4 mx-auto bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition w-32">Logout</button>
        <div className="text-center text-xs text-gray-400 pb-4">Changes are saved automatically to your browser</div>
      </div>
    </div>
  );
};

export default AdminDashboard;