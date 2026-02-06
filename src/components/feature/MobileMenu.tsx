import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';

interface MobileMenuProps {
  currentPage: 'home' | 'contact';
}

export default function MobileMenu({ currentPage }: MobileMenuProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuContent = (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-[9990] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 min-h-screen w-screen shadow-xl z-[9999] transform transition-transform duration-300 bg-[#142230] ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full p-8">
          {/* Header with Close Button */}
          <div className="flex justify-end mb-12">
            <button
              onClick={() => setIsOpen(false)}
              className="p-4 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <i className="ri-close-line text-3xl"></i>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col items-center justify-center space-y-6 flex-1 -mt-20">
            <a
              href="https://helpdesk.brainsoftict.nl/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs px-8 py-4 bg-white/10 border border-white/20 text-white text-base rounded-2xl whitespace-nowrap hover:bg-white/20 transition-all cursor-pointer font-medium text-center backdrop-blur-sm"
              onClick={() => {
                navigate('https://helpdesk.brainsoftict.nl/');
                setIsOpen(false);
              }}
            >
              Helpdesk
            </a>
            {currentPage !== 'home' && (
              <button
                onClick={() => {
                  navigate('/');
                  setIsOpen(false);
                }}
                className="w-full max-w-xs px-8 py-4 bg-white text-gray-900 text-base rounded-2xl whitespace-nowrap hover:bg-gray-100 transition-all cursor-pointer font-medium text-center shadow-lg"
              >
                {t('nav_home')}
              </button>
            )}
            {currentPage !== 'contact' && (
              <button
                onClick={() => {
                  navigate('/contact');
                  setIsOpen(false);
                }}
                className="w-full max-w-xs px-8 py-4 bg-white text-gray-900 text-base rounded-2xl whitespace-nowrap hover:bg-gray-100 transition-all cursor-pointer font-medium text-center shadow-lg"
              >
                {t('nav_contact')}
              </button>
            )}
          </nav>
        </div>
      </div>
    </>
  );

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
        aria-label="Menu"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-menu-line text-white text-2xl"></i>
        </div>
      </button>

      {/* Render menu via Portal */}
      {mounted && createPortal(menuContent, document.body)}
    </div>
  );
}