import React from 'react';
import iconoCRM from '../assets/icono-crm.jpg';
import iconoChatbot from '../assets/icono-chatbot.jpg';
import iconoSoluciones from '../assets/icono-soluciones.jpg';
import iconoMarketing from '../assets/icono-marketing.jpg';

const services = [
  {
    title: 'Creamos soluciones que no solo automatizan procesos, sino que los perfeccionan continuamente.',
    video: '/video-servicio-1.mp4', // ✅ Ruta corregida
    icon: iconoCRM,
  },
  {
    title: 'Nuestra IA aprende de tus operaciones diarias, identifica áreas de mejora y aplica optimizaciones que hacen que cada tarea sea más ágil y eficiente.',
    video: '/video-servicio-2.mp4', // ✅ Ruta corregida
    icon: iconoChatbot,
  },
  {
    title: 'Soluciones Empresariales IA',
    video: '/video-servicio-3.mp4', // ✅ Ruta corregida
    icon: iconoSoluciones,
  },
  {
    title: 'Embudo de Ventas Automatizado',
    video: '/video-servicio-4.mp4', // ✅ Ruta corregida
    icon: iconoMarketing,
  },
];

const Solutions = () => {
  return (
    <section className="bg-athenia-50 py-20 px-4">
      <div className="max-w-[1300px] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-athenia-400 mb-10">
          ¿Qué puedes hacer con <span className="text-athenia-300">AthenIA</span>?
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full aspect-video overflow-hidden rounded-md mb-4">
                <video
                  src={service.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <img src={service.icon} alt={service.title} className="h-10 w-auto mb-3" />
              <h3 className="text-athenia-400 font-semibold text-sm text-center">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
