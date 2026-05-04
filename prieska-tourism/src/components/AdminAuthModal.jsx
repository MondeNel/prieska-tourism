import { useState, useEffect } from 'react';

const AdminAuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFormData({ email: '', password: '', confirmPassword: '', name: '' });
      setError('');
      setIsLogin(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation: fields cannot be empty
    if (!formData.email || !formData.password) {
      setError('Please fill in email and password');
      return;
    }

    if (!isLogin && !formData.name) {
      setError('Please fill in your name');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Always succeed – just create a dummy user object
    const dummyUser = {
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
    };
    
    localStorage.setItem('admin_logged_in', JSON.stringify(dummyUser));
    
    // Also store in mock 'users' list (optional, for consistency)
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    if (!users.find(u => u.email === formData.email)) {
      users.push({ email: formData.email, name: dummyUser.name });
      localStorage.setItem('admin_users', JSON.stringify(users));
    }
    
    onLoginSuccess(dummyUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold text-[#2C3E2F]">{isLogin ? 'Admin Login' : 'Admin Sign Up'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#B87333] transition"><i className="fas fa-times text-xl"></i></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B87333]" placeholder="Admin Name" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B87333]" placeholder="any@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B87333]" placeholder="anything" />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B87333]" placeholder="anything" />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-[#B87333] text-white py-2 rounded-lg hover:bg-[#B87333]/80 transition font-semibold">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <p className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-[#B87333] font-medium hover:underline">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
          <p className="text-xs text-gray-400 text-center">Any credentials work (demo mode)</p>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthModal;