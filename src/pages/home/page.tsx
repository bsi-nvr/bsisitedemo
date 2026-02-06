import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Orb from '../../components/base/Orb';
import MobileMenu from '../../components/feature/MobileMenu';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen font-sans relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(to bottom right, #172029, #2f3f4f)' }}>
      {/* Animated Orb Background */}
      <div className="absolute inset-0 z-0">
        <Orb hue={270} hoverIntensity={0.1} rotateOnHover={true} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen pointer-events-none">
        {/* Header */}
        <header className={`w-full py-5 px-8 pointer-events-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} relative z-50`}>
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              {/* Empty space for layout balance */}
            </div>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://helpdesk.brainsoftict.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-full whitespace-nowrap hover:bg-white/20 transition-all cursor-pointer font-medium"
              >
                Helpdesk
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-2 bg-white text-gray-900 text-sm rounded-full whitespace-nowrap hover:bg-gray-100 transition-all cursor-pointer font-medium"
              >
                {t('get_early_access')}
              </button>
            </div>
            {/* Mobile Menu */}
            <MobileMenu currentPage="home" />
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-8 lg:px-20 flex items-center min-h-[80vh] pointer-events-auto">
          <div className="flex flex-col items-center text-center max-w-xl mx-auto w-full px-8 lg:px-8">
            {/* Logo in Center */}
            <div className={`mb-3 transition-all duration-1000 delay-200 mt-8 lg:mt-20 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <img
                src="https://static.readdy.ai/image/0ec445a4b634caf5dc0c9567553268c7/06cf333279b10c37e4ad93291b212fa4.png"
                alt="Brainsoft ICT"
                className="w-auto mx-auto min-h-[8rem] max-h-[10rem] lg:min-h-[16rem] lg:max-h-[18rem]"
              />
            </div>

            {/* Hero Title */}
            <div id="orpText" className="mb-12 -mt-8 lg:mt-0">
              <div className={`hidden lg:inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="text-sm text-white font-medium">{t('coming_soon')}</span>
              </div>
              <h1 className={`text-base lg:text-xl font-bold mb-5 tracking-tight text-white transition-all duration-1000 delay-400 leading-tight ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {t('hero_title')}
              </h1>
              <button
                onClick={() => navigate('/contact')}
                className={`px-5 py-2 lg:px-6 lg:py-3 bg-white text-gray-900 text-sm lg:text-base rounded-full whitespace-nowrap hover:bg-gray-100 hover:scale-105 transition-all duration-300 cursor-pointer font-semibold shadow-lg delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {t('nav_contact')}
              </button>
              <style>{`
                @media (min-width: 1024px) {
                  #orpText {
                    margin-top: 0 !important;
                  }
                }
              `}</style>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={`absolute bottom-0 w-full py-6 px-8 pointer-events-auto transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="container mx-auto text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Brainsoft ICT. Alle rechten voorbehouden.
          </div>
        </footer>
      </div>
    </div>
  );
}
