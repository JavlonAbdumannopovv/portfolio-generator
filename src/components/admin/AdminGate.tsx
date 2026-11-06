import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Terminal, Lock, Eye, EyeOff, ArrowRight, X } from 'lucide-react';

interface AdminGateProps {
  onClose: () => void;
}

export const AdminGate: React.FC<AdminGateProps> = ({ onClose }) => {
  const { loginAdmin } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      {/* Background glow halos */}
      <div className="absolute -top-12 -left-12 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -right-8 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-surface-container-high/95 backdrop-blur-2xl rounded-2xl p-7 sm:p-8 shadow-2xl border border-white/10 flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          title="Yopish"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-surface-container-highest/80 flex items-center justify-center mb-5 shadow-inner border border-white/5">
          <Terminal className="w-8 h-8 text-primary-container" />
        </div>

        <span className="font-mono text-xs text-primary-fixed-dim uppercase tracking-wider mb-1 font-semibold">
          Xavfsiz Tizim
        </span>
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-2 tracking-tight">
          Admin Konsoliga Kirish
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mb-6">
          Javlon Abdumannopov boshqaruv paneliga kirish uchun xavfsizlik parolini kiriting.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative w-full text-left">
            <label className="font-mono text-[11px] text-on-surface-variant block mb-1.5 uppercase font-medium">
              Maxfiy Kalit / Parol
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Parolni kiriting..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-mono text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                title={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <span className="font-mono text-xs text-rose-400 mt-2 block animate-shake">
                ⚠️ Parol noto'g'ri! Iltimos qaytadan urinib ko'ring.
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-primary-container text-on-primary font-headline text-sm font-bold flex items-center justify-center gap-2 hover:shadow-neon hover:opacity-95 active:scale-[0.99] transition-all shadow-md mt-1"
          >
            <span>Boshqaruvga Kirish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
