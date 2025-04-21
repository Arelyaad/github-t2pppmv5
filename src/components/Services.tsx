import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const slides = [
  {
    video: '/video-servicio-1.mp4',
    title: 'Asistentes Virtuales Inteligentes',
    description: 'Chatbots que entienden y responden como humanos, disponibles 24/7 para atender a tus clientes.',
  },
  {
    video: '/video-servicio-2.mp4',
    title: 'CRM con IA Predictiva',
    description: 'Sistema CRM personalizado que aprende de cada interacción y automatiza la gestión de clientes.',
  },
  {
    video: '/video-servicio-3.mp4',
    title: 'Marketing Impulsado por IA',
    description: 'Estrategias inteligentes que adaptan tus campañas en tiempo real para lograr mejores resultados.',
  },
  {
    video: '/video-servicio-4.mp4',
    title: 'Contenido Audiovisual Único',
    description: 'Videos, imágenes y animaciones generadas por IA que reflejan la identidad de tu marca.',
  },
];

const Services = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const duration = 8000;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleTransition((current + 1) % slides.length);
    }, duration);
  };

  useEffect(() => {
    resetTimeout();
    return () => clearTimeout(timeoutRef.current!);
  }, [current]);

  const handleTransition = (nextIndex: number) => {
    setFade(true);
    setVideoReady(false); // Reinicia la visibilidad del video
    setTimeout(() => {
      setCurrent(nextIndex);
      setFade(false);
    }, 600);
  };

  const nextSlide = () => handleTransition((current + 1) % slides.length);
  const prevSlide = () => handleTransition((current - 1 + slides.length) % slides.length);

  // Corrección suave del scroll automático
  useEffect(() => {
    let lastY = window.scrollY;

    const observer = new MutationObserver(() => {
      const delta = Math.abs(window.scrollY - lastY);

      if (delta > 100 && window.scrollY > 100) {
        window.scrollTo({ top: lastY, behavior: 'auto' });
      } else {
        lastY = window.scrollY;
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <section className="relative bg-gradient-to-b from-[#e3edf5] to-white py-20 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h2
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-athenia-400 mb-6"
          >
            Nuestros Servicios
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-athenia-300 text-lg mb-10 max-w-xl mx-auto"
          >
            <Typewriter
              words={['Soluciones de IA que transforman tu negocio de manera simple y efectiva']}
              loop={0}
              typeSpeed={40}
              deleteSpeed={0}
              delaySpeed={3000}
            />
          </motion.p>

          <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-xl bg-black">
            {/* Flechas */}
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/20 text-white p-2 rounded-full backdrop-blur-sm"
            >
              ←
            </motion.button>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/20 text-white p-2 rounded-full backdrop-blur-sm"
            >
              →
            </motion.button>

            {/* Overlay negro animado */}
            <motion.div
              animate={{ opacity: fade ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-black z-20 pointer-events-none"
            />

            {/* Placeholder + video con transición */}
            <div className="absolute inset-0 z-10 w-full h-full">
              {!videoReady && <div className="w-full h-full bg-black" />}
              <video
                ref={videoRef}
                src={slides[current].video}
                autoPlay
                muted
                loop
                playsInline
                tabIndex={-1}
                onCanPlay={() => setVideoReady(true)}
                className={`w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>

            {/* Filtro oscuro */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Texto */}
            <motion.div
              key={slides[current].title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-6 left-6 right-6 text-left z-30"
            >
              <h3 className="text-white text-xl md:text-2xl font-semibold">
                {slides[current].title}
              </h3>
              <p className="text-white/90 mt-2 text-sm md:text-base">
                {slides[current].description}
              </p>
            </motion.div>
          </div>

          {/* Progreso */}
          <div className="flex justify-center gap-3 mt-6">
            {slides.map((_, i) => (
              <div key={i} className="relative w-16 h-1 bg-athenia-100 rounded-full overflow-hidden">
                {i === current && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: duration / 1000, ease: 'linear' }}
                    className="absolute top-0 left-0 h-full bg-athenia-300"
                  />
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="inline-block px-6 py-3 bg-white text-athenia-400 border border-athenia-300 rounded-full"
              href="#cta"
            >
              Explorar soluciones inteligentes
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
