import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ScrollToTop from "../component/scrollToTop";
import { Educacion } from "../component/educacion";
import { Skills } from "../component/skills";
import { Proyectos } from "../component/proyectos";
import { Contacto } from "../component/contacto";

//Aquí es donde se muestran las secciones del portafolio como Educación, Skills, Proyectos, y Contacto.
export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<ScrollToTop>  {/* Envuelve Home.js con ScrollToTop */}
            <div className="home"> {/* Secciones de la página con id que coincida con los valores de los Link del navbar.js */}
                <section id="educacion">
                    <Educacion />
                </section>
                <section id="skills">
                    <Skills />
                </section>
                <section id="proyectos">
                    <Proyectos />
                </section>
                <section id="contacto">
                    <Contacto />
                </section>
            </div>
        </ScrollToTop>
	);
};
