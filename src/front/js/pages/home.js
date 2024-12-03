import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ScrollToTop from "../component/scrollToTop";
import { Educacion } from "../component/educacion";
import { Skills } from "../component/skills";
import { Proyectos } from "../component/proyectos";
import { Contacto } from "../component/contacto";
import { FaGithub, FaLinkedin } from "react-icons/fa";  // instalamos npm i @flaticon/flaticon-uicons. Usamos React Icons para los íconos.
import avatar from "../../img/avatar.png";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <ScrollToTop>
      <div className="home">
        {/* Sección Home: Introducción y experiencia */}
        <section id="home" className="intro">
          <div className="intro-text">
            <h1>¡Hola! Soy Lois</h1>
            <h2><span>Desarrollador Jr Full Stack</span></h2>
            <p>
              Con habilidades y conocimientos en HTML, CSS, Javascript, ReactJS, Python, Flask, SQL, APIs, Stripe. 
              Siempre en busca de nuevos desafíos y aprendizajes. 
              Entusiasta y comprometido, con una gran inclinación hacia la investigación y el aprendizaje constante. 
            </p>
            <p>
              Además <span>Profesor</span> con más de 5 años gestionando proyectos de robótica y programación para niños. 
            </p>

            {/* Iconos y botón de contacto */}
            <div className="social-icons">
              <a href="https://github.com/loisinhoDeveloper" target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} />
              </a>
              <a href="https://www.linkedin.com/in/loisinho" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} />
              </a>
              <button className="contact-btn" onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}>
                contáctame
              </button>
            </div>
          </div>

          {/* Imagen al lado derecho */}
          <div className="intro-image">
            <img src={avatar} alt="Lois" />
          </div>
        </section>

        {/* Sección Educación */}
        <section id="educacion">
          <Educacion />
        </section>

        {/* Sección Skills */}
        <section id="skills">
          <Skills />
        </section>

        {/* Sección Proyectos */}
        <section id="proyectos">
          <Proyectos />
        </section>

        {/* Sección Contacto */}
        <section id="contacto">
          <Contacto />
        </section>
      </div>
    </ScrollToTop>
  );
};
