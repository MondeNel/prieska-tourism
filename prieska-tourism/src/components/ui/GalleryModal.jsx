import { X } from 'lucide-react';

const GalleryModal = ({ isOpen, onClose, images, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-serif text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${title} ${idx + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;