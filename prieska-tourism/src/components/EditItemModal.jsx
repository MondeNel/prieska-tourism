import { useState, useEffect } from 'react';

const EditItemModal = ({ isOpen, onClose, item, type, onSave }) => {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (item) {
      if (type === 'accommodations') {
        const imagesInput = item.images ? item.images.join(', ') : '';
        setFormData({ ...item, imagesInput });
        setImagePreview(item.images?.[0] || '');
      } else {
        setFormData({ ...item });
        setImagePreview(item.image || '');
      }
    }
  }, [item, type]);

  if (!isOpen || !item) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData(prev => ({ ...prev, [field]: base64String }));
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    let updated = { ...formData };
    if (type === 'accommodations') {
      if (updated.imagesInput) {
        updated.images = updated.imagesInput.split(',').map(s => s.trim());
        delete updated.imagesInput;
      }
      // If a single image was uploaded, replace the first image
      if (formData.singleImageUpload && typeof formData.singleImageUpload === 'string') {
        if (!updated.images) updated.images = [];
        updated.images[0] = formData.singleImageUpload;
        delete updated.singleImageUpload;
      }
    } else {
      // For experiences, replace image with uploaded base64 if any
      if (formData.uploadedImage && typeof formData.uploadedImage === 'string') {
        updated.image = formData.uploadedImage;
        delete updated.uploadedImage;
      }
      const priceMatch = updated.price?.match(/\d+([\d,.]*)/);
      if (priceMatch) updated.priceValue = parseInt(priceMatch[0].replace(/,/g, ''));
    }
    onSave(updated);
    onClose();
  };

  const renderField = (label, name, type = 'text', rows = 2) => (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#B87333] outline-none"
          rows={rows}
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
        />
      ) : (
        <input
          className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#B87333] outline-none"
          type={type}
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-5 py-3 flex justify-between items-center">
          <h3 className="text-white font-serif font-bold">Edit {type === 'experiences' ? 'Experience' : 'Guesthouse'}</h3>
          <button onClick={onClose} className="text-white hover:text-amber-200"><i className="fas fa-times"></i></button>
        </div>
        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
          {type === 'experiences' ? (
            <>
              {renderField('Title', 'title')}
              {renderField('Price', 'price')}
              {renderField('Description', 'desc', 'textarea')}
              {renderField('Duration', 'duration')}
              {renderField('Category', 'category')}
              
              {/* Image upload */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Image</label>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg mb-2" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'uploadedImage')}
                  className="w-full text-xs border border-gray-200 rounded-lg p-2"
                />
                <p className="text-[10px] text-gray-400 mt-1">Or provide URL:</p>
                <input
                  type="text"
                  name="image"
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs mt-1"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image || ''}
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              {renderField('Name', 'name')}
              {renderField('Price Range', 'priceRange')}
              {renderField('Description', 'description', 'textarea')}
              {renderField('Address', 'address')}
              {renderField('Phone', 'contact')}
              
              {/* Image upload for guesthouse (first image) */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Main Image (upload)</label>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg mb-2" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'singleImageUpload')}
                  className="w-full text-xs border border-gray-200 rounded-lg p-2"
                />
                <p className="text-[10px] text-gray-400 mt-1">Or enter image URLs (comma separated):</p>
                <input
                  type="text"
                  name="imagesInput"
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs mt-1"
                  placeholder="/img1.jpg, /img2.jpg"
                  value={formData.imagesInput || ''}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>
        <div className="px-5 py-3 bg-gray-50 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1.5 bg-gray-300 text-gray-700 rounded-lg text-sm">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;