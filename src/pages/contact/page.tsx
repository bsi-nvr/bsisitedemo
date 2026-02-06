import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, FormEvent, useEffect } from 'react';
import Orb from '../../components/base/Orb';
import MobileMenu from '../../components/feature/MobileMenu';

export default function Contact() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add recipient email
    formData.append('_to', 'info@brainsoftict.nl');

    try {
      const response = await fetch('https://readdy.ai/api/form/d5mh0h144v703eh914mg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contactForm" className="min-h-screen font-sans relative overflow-hidden lg:pb-20" style={{ backgroundImage: 'linear-gradient(to bottom right, #172029, #2f3f4f)', backgroundAttachment: 'fixed' }}>
      {/* Animated Orb Background - Desktop only */}
      <div className="hidden lg:block fixed inset-0 z-0 pointer-events-none">
        <Orb hue={270} hoverIntensity={0.1} rotateOnHover={true} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className={`w-full py-5 px-8 pointer-events-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} relative z-50`}>
          <div className="container mx-auto flex justify-center lg:justify-center items-center relative">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-full whitespace-nowrap hover:bg-white/20 transition-all cursor-pointer font-medium flex items-center gap-2"
              >
                <i className="ri-home-line text-lg"></i>
                {t('nav_home')}
              </button>
              <a
                href="https://helpdesk.brainsoftict.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-full whitespace-nowrap hover:bg-white/20 transition-all cursor-pointer font-medium"
              >
                Helpdesk
              </a>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-white text-gray-900 text-sm rounded-full whitespace-nowrap hover:bg-gray-100 transition-all cursor-pointer font-medium"
              >
                {t('get_early_access')}
              </button>
            </div>
            {/* Mobile Menu - positioned absolutely to the right to not affect centering */}
            <div className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2">
              <MobileMenu currentPage="contact" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-8 py-8 max-w-6xl flex-grow flex flex-col justify-center min-h-[calc(100vh-100px)]">
          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-col items-center justify-center max-w-4xl mx-auto w-full space-y-6">
            {/* Logo in Center */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <img
                src="https://static.readdy.ai/image/0ec445a4b634caf5dc0c9567553268c7/06cf333279b10c37e4ad93291b212fa4.png"
                alt="Brainsoft ICT"
                className="w-auto mx-auto h-24 object-contain"
              />
            </div>
            {/* Contact Header */}
            <div className={`text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-4xl md:text-[2.6rem] font-bold mb-2 text-white">
                {t('contact_title')}
              </h1>
              <p className="text-lg text-gray-300">
                {t('contact_subtitle')}
              </p>
            </div>

            <div id="contactInfo" className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

              {/* Contact Information */}
              <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h2 className="text-2xl font-bold text-white mb-6">Contactgegevens</h2>

                <div className="space-y-4">
                  {/* Visit Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <i className="ri-map-pin-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Bezoekadres</h3>
                      <p className="text-gray-300 text-sm">Marconistraat 5</p>
                      <p className="text-gray-300 text-sm">1821BX Alkmaar</p>
                    </div>
                  </div>

                  {/* Postal Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <i className="ri-mail-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Postadres</h3>
                      <p className="text-gray-300 text-sm">Postbus 500</p>
                      <p className="text-gray-300 text-sm">1800 AM Alkmaar, Nederland</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <i className="ri-phone-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Telefoon</h3>
                      <a href="tel:+31857010329" className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                        +31 (0)85 7010329
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <i className="ri-mail-send-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">E-mail</h3>
                      <a href="mailto:info@brainsoftict.nl" className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                        info@brainsoftict.nl
                      </a>
                    </div>
                  </div>

                  {/* KVK */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <i className="ri-building-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">KVK nummer</h3>
                      <p className="text-gray-300 text-sm">82383650</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h2 className="text-2xl font-bold text-white mb-6">Stuur ons een bericht</h2>

                <form id="contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-4">
                  <div className="transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      {t('form_name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm transition-all duration-300"
                      placeholder="Uw volledige naam"
                    />
                  </div>

                  <div className="transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      {t('form_email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm transition-all duration-300"
                      placeholder="uw.email@voorbeeld.nl"
                    />
                  </div>

                  <div className="transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      {t('form_phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm transition-all duration-300"
                      placeholder="+31 6 12345678"
                    />
                  </div>

                  <div className="transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      {t('form_message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      maxLength={500}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm resize-none transition-all duration-300"
                      placeholder="Vertel ons waarmee we u kunnen helpen..."
                    />
                    <p className="text-xs text-gray-400 mt-1">Maximum 500 karakters</p>
                  </div>

                  {formStatus === 'success' && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm animate-[fadeIn_0.5s_ease-in]">
                      {t('form_success')}
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm animate-[fadeIn_0.5s_ease-in]">
                      {t('form_error')}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-white text-gray-900 text-base font-semibold rounded-lg whitespace-nowrap hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Verzenden...' : t('form_submit')}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center">
            {/* Logo and Header - NO orb background */}
            <div className="w-full mb-8 px-4">
              {/* Logo */}
              <div className={`mt-6 mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <img
                  src="https://static.readdy.ai/image/0ec445a4b634caf5dc0c9567553268c7/06cf333279b10c37e4ad93291b212fa4.png"
                  alt="Brainsoft ICT"
                  className="w-auto mx-auto"
                  style={{ maxHeight: '8rem' }}
                />
              </div>

              {/* Contact Header */}
              <div className={`text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ marginTop: '-1.8rem' }}>
                <h1 className="text-3xl mb-4 text-white" style={{ fontWeight: 600, fontSize: '1.25rem' }}>
                  {t('contact_title')}
                </h1>
                <p className="text-gray-300" style={{ fontSize: '0.8rem' }}>
                  {t('contact_subtitle')}
                </p>
              </div>
            </div>

            {/* Form and Contact Info */}
            <div className="w-full max-w-lg px-4 space-y-4">
              {/* Contact Information */}
              <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h2 className="text-xl font-bold text-white mb-4">Contactgegevens</h2>

                <div className="space-y-4">
                  {/* Visit Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <i className="ri-map-pin-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Bezoekadres</h3>
                      <p className="text-gray-300 text-sm">Marconistraat 5</p>
                      <p className="text-gray-300 text-sm">1821BX Alkmaar</p>
                    </div>
                  </div>

                  {/* Postal Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <i className="ri-mail-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Postadres</h3>
                      <p className="text-gray-300 text-sm">Postbus 500</p>
                      <p className="text-gray-300 text-sm">1800 AM Alkmaar, Nederland</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <i className="ri-phone-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Telefoon</h3>
                      <a href="tel:+31857010329" className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                        +31 (0)85 7010329
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <i className="ri-mail-send-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">E-mail</h3>
                      <a href="mailto:info@brainsoftict.nl" className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                        info@brainsoftict.nl
                      </a>
                    </div>
                  </div>

                  {/* KVK */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <i className="ri-building-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">KVK nummer</h3>
                      <p className="text-gray-300 text-sm">82383650</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h2 className="text-xl font-bold text-white mb-4">Stuur ons een bericht</h2>

                <form id="contact-form-mobile" data-readdy-form onSubmit={handleSubmit} className="space-y-4">
                  <div className="transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="name-mobile" className="block text-sm font-medium text-white mb-2">
                      {t('form_name')} *
                    </label>
                    <input
                      type="text"
                      id="name-mobile"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm transition-all duration-300"
                      placeholder="Uw volledige naam"
                    />
                  </div>

                  <div className="transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="email-mobile" className="block text-sm font-medium text-white mb-2">
                      {t('form_email')} *
                    </label>
                    <input
                      type="email"
                      id="email-mobile"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm transition-all duration-300"
                      placeholder="uw.email@voorbeeld.nl"
                    />
                  </div>

                  <div className="transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="phone-mobile" className="block text-sm font-medium text-white mb-2">
                      {t('form_phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone-mobile"
                      name="phone"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm transition-all duration-300"
                      placeholder="+31 6 12345678"
                    />
                  </div>

                  <div className="transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="message-mobile" className="block text-sm font-medium text-white mb-2">
                      {t('form_message')} *
                    </label>
                    <textarea
                      id="message-mobile"
                      name="message"
                      required
                      maxLength={500}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm resize-none transition-all duration-300"
                      placeholder="Vertel ons waarmee we u kunnen helpen..."
                    />
                    <p className="text-xs text-gray-400 mt-1">Maximum 500 karakters</p>
                  </div>

                  {formStatus === 'success' && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm animate-[fadeIn_0.5s_ease-in]">
                      {t('form_success')}
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm animate-[fadeIn_0.5s_ease-in]">
                      {t('form_error')}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-white text-gray-900 text-base font-semibold rounded-lg whitespace-nowrap hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Verzenden...' : t('form_submit')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={`w-full py-6 px-8 pointer-events-auto mt-16 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="container mx-auto text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Brainsoft ICT. Alle rechten voorbehouden.
          </div>
        </footer>
      </div>

    </div>
  );
}