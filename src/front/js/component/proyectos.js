import React, { useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "../../styles/proyectos.css";
import Lottie from 'lottie-react';
import animacionProyecto from "../../../assets/iconos/animacionProyecto.json";
import { gsap } from "gsap";
import veteranos from "../../../front/img/valdovinoVeteranos.jpg";


export const Proyectos = () => {
  const refTitulo = useRef(null); // useRef para crear ese marcador (referencia) le dice a React: "Marca este lugar, pero al principio no lo necesitamos (null). Más adelante, lo usaremos cuando React dibuje la página."
  const refImagenes = useRef([]); // useRef para manejar múltiples imágenes (array de referencias)

  const proyectos = [
    {
      titulo: "API de Notas",
      descripcion: "Una API REST para gestionar notas de forma sencilla.",
      imagen: "https://via.placeholder.com/300x200",
      link: "https://github.com/tu-repo/api-notas",
    },
    {
      titulo: "Saltareiras do Mundo",
      descripcion: " Un espazo onde a paixón polas danzas e culturas do mundo cobra vida.",
      imagen: "https://via.placeholder.com/300x200",
      link: "https://github.com/tu-repo/portfolio",
    },
    {
      titulo: "S.D. Valdoviño de veteranos",
      descripcion: "Un blog informativo sobre el equipo de Veteranos de Valdoviño",
      imagen: veteranos,
      link: "https://github.com/tu-repo/api-notas",
    },
  ];

  // Función para animar el título cuando el ratón entra
  const animarTitulo = () => {
    gsap.to(refTitulo.current, { scale: 1.2, duration: 0.3 });
  };

  // Función para devolver el título a su tamaño original cuando el ratón sale
  const devolverTitulo = () => {
    gsap.to(refTitulo.current, { scale: 1, duration: 0.3 });
  };

   // Asumiendo que refImagenes.current es un array de referencias
  const animarImagen = (index) => {
    gsap.to(refImagenes.current[index], { scale: 1.1, duration: 0.3 });
  };
  
  const devolverImagen = (index) => {
    gsap.to(refImagenes.current[index], { scale: 1, duration: 0.3 });
  };
  
  

  return (
    <section id="proyectos" className="proyectos-section">
      <h2 
        ref={refTitulo}
        onMouseEnter={animarTitulo}  // Activamos la animación al pasar el ratón
        onMouseLeave={devolverTitulo}  // Devolvemos el tamaño original al quitar el ratón
      >
        <Lottie animationData={animacionProyecto} style={{ width: "70px", height: "90px" }} />
        Proyectos
      </h2>
      {proyectos.length > 3 ? (
        <Carousel>
          {proyectos.map((proyecto, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center align-items-center flex-column">
              <img className="d-block imagenProyectos" src={proyecto.imagen} alt={proyecto.titulo} onMouseEnter={() => animarImagen(index)} onMouseLeave={() => devolverImagen(index)} ref={(el) => refImagenes.current[index] = el}/>
                <div className="text-center mt-3">
                  <h3>{proyecto.titulo}</h3>
                  <p>{proyecto.descripcion}</p>
                  <a
                    href={proyecto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Ver proyecto
                  </a>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div className="misProyectos">
          {proyectos.map((proyecto, index) => (
            <div key={index} className="cardProyectos">
              <img
                className="imagenProyectos"
                src={proyecto.imagen}
                alt={proyecto.titulo}
              />
              <div className="text-center mt-3">
                <h3>{proyecto.titulo}</h3>
                <p>{proyecto.descripcion}</p>
                <a
                  href={proyecto.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Ver proyecto
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
