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

    if (!formData.email || !formData.password) {
      setError('Please provide a valid email and password.');
      return;
    }

    if (!isLogin && !formData.name) {
      setError('Please provide your administrator name.');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const dummyUser = {
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
    };
    
    localStorage.setItem('admin_logged_in', JSON.stringify(dummyUser));
    
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    if (!users.find(u => u.email === formData.email)) {
      users.push({ email: formData.email, name: dummyUser.name });
      localStorage.setItem('admin_users', JSON.stringify(users));
    }
    
    onLoginSuccess(dummyUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1A1F2E]/60 backdrop-blur-sm animate-fade-in">
      {/* Background overlay for click-away safety */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container: Full-width panel on mobile, elegant card on desktop */}
      <div className="relative max-w-md w-full bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] sm:max-h-initial overflow-y-auto transform transition-all duration-300">
        
        {/* Header Block */}
        <div className="bg-white border-b border-gray-100 px-6 py-5 flex justify-between items-center sticky top-0 z-10 bg-opacity-95 backdrop-blur-xs">
          <div>
            <span className="text-[#E8A020] text-[9px] font-black uppercase tracking-[0.2em] block mb-0.5">
              Secure Access
            </span>
            <h2 className="text-lg font-serif font-bold text-gray-900">
              {isLogin ? 'Operator Login' : 'Register Operator'}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close modal"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Input Interactive Fields */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {!isLogin && (
            <div className="animate-fade-in">
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium text-gray-900 focus:outline-hidden focus:border-[#E8A020] focus:bg-white transition-all placeholder-gray-400" 
                placeholder="e.g. Monde Nel" 
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium text-gray-900 focus:outline-hidden focus:border-[#E8A020] focus:bg-white transition-all placeholder-gray-400" 
              placeholder="operator@siyathemba.gov.za" 
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Security Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleInputChange} 
              required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium text-gray-900 focus:outline-hidden focus:border-[#E8A020] focus:bg-white transition-all placeholder-gray-400" 
              placeholder="••••••••" 
            />
          </div>

          {!isLogin && (
            <div className="animate-fade-in">
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleInputChange} 
                required 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium text-gray-900 focus:outline-hidden focus:border-[#E8A020] focus:bg-white transition-all placeholder-gray-400" 
                placeholder="••••••••" 
              />
            </div>
          )}

          {/* Feedback/Error Alerts Block */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-lg text-xs font-bold flex items-center gap-2 animate-shake">
              <i className="fas fa-circle-exclamation text-sm shrink-0"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Action Execution Layer */}
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-[#E8A020] hover:bg-[#1A1F2E] text-white py-3.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-sm"
            >
              {isLogin ? 'Verify Credentials' : 'Create Admin Profile'}
            </button>
          </div>

          {/* Toggle View Options */}
          <div className="text-center pt-2 space-y-3">
            <p className="text-xs text-gray-500 font-medium">
              {isLogin ? "Need console permissions? " : "Already registered? "}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-[#E8A020] font-bold hover:underline ml-0.5 tracking-wide"
              >
                {isLogin ? 'Request Access' : 'Authenticate Here'}
              </button>
            </p>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50/60 border border-amber-100 text-[9px] text-amber-800 font-bold uppercase tracking-wider mx-auto">
              <i className="fas fa-flask text-[10px]"></i> Environment: Demo Sandbox Mode
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminAuthModal;