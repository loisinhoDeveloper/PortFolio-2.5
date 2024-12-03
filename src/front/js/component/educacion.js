import React, { useEffect, useRef } from "react";
import { gsap } from "gsap"; //librería de JavaScript que permite o animar textos, imágenes, secciones completas. Primero instalas npm install gsap
import "../../styles/educacion.css";
import Lottie from 'lottie-react';
import animationData from "../../../assets/iconos/educacionPortFolio.json"; //icono animado.json


export const Educacion = () => {
    //useRef: Crea referencias para elementos HTML. Es decir, le decimos a GSAP qué elemento queremos animar.
  const refSection = useRef(null); // Referencia para toda la sección
  const refTitulo = useRef(null); // Referencia para el título
  const refContenido = useRef(null); // Referencia para el parrafo (contenido)

  useEffect(() => {
    // Funciona cuando el componente educacion aparece en la pantalla
    gsap.from(refTitulo.current, {
      opacity: 0, //título empieza transparente
      y: -50, // Aparece desde arriba (50px hacia arriba).
      duration: 1, // Tarda 1 segundo.
      ease: "power2.out", // animación suave.
    });

    // Animación para el contenido de los cursos
    gsap.from(refContenido.current.children, { //aplicar animaciones a todos los elementos hijos del contenedor referenciado (refContenido).
    //al poner ".children", cada curso aparece con su propio movimiento, lo cual es más dinámico y atractivo.
      opacity: 0,
      y: 50, // Aparece desde abajo (50 px)
      stagger: 0.3, // Cada hijo (curso) aparezca con un retraso de 3 s
      duration: 1, //cada animación 1 segundo.
      ease: "power2.out",
    });
  }, []);

  const handleMouseEnter = () => {
    // Efecto interactivo al pasar el ratón por el título
    gsap.to(refTitulo.current, {
      scale: 1.1, //titulo se agranda un 10%
      color: "white", // Cambia el color
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    //  Al quitar el ratón
    gsap.to(refTitulo.current, {
      scale: 1,
      color: "#DA4167", // Color original
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  return (
    <section ref={refSection} id="educacion" className="educacion-section">  {/* El título (h2) se desliza desde arriba con un efecto de entrada suave. */}
      <h2 ref={refTitulo} 
        ////Detectan cuando el ratón pasa por encima o no del título para aplicar las animaciones.
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
         <Lottie animationData={animationData} style={{ width: "70px", height: "90px" }} // Tamaño ajustado de la animación />
        /> 
        Educación
      </h2>
      <div ref={refContenido} className="educacion-content">
        <h3> 02/2024–09/2024 Bootcamp Full Stack Developer </h3>
        <p> </p>
        <h3> 11/2023-01/2024. Formador de formadores E-learning </h3>
        <p> </p>
        <h3>05/2020-01/2021. Curso Oficial de Coordinación de Tiempo Libre. </h3>
        <p> </p>
        <h3>09/2010–09/2014. Grado en Educación Infantil por la USC. </h3>
        <p> </p>
      </div>
    </section>
  );
};
