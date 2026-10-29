import { useTextos } from "./hooks/useTextos.js";
import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import ContadorClics from "./components/ContadorClics.jsx";
import Cronometro from "./components/Cronometro.jsx";
import RecordarNombre from "./components/recordarNombre.jsx";
import PersonajeApi from "./components/PersonajeApi.jsx";
import NavegadorPersonajes from "./components/NavegadorPersonajes.jsx";

function leerSeccion() {
  return window.location.hash.slice(1) || "inicio";
}

function App() {
  // Idiom por defecto español
  const [idioma, setIdioma] = useState("es");
  const [activo, setActivo] = useState(leerSeccion);
  const [consulta, setConsulta] = useState("");
  const [textoGrande, setTextoGrande] = useState(false);
  const datos = useTextos(idioma);
  console.log(datos);
  const [idioma2_Prueba , setIdioma2_Prueba]

  const ingles = idioma === "en";
  const titulo =
    activo === "favoritos"
      ? datos.textos?.navbar.botones.favoritos
      : datos.textos?.navbar.enlaces[activo];

  //Va a sincronizar el estado del componente con el hash de la URL
  useEffect(() => {
    function actualizar() {
      setActivo(leerSeccion());
      setConsulta("");
    }
    window.addEventListener("hashchange", actualizar);
    return () => window.removeEventListener("hashchange", actualizar);
  }, []);

  useEffect(() => {
    document.documentElement.lang;
  }, [idioma]);

  useEffect(() => {
    document.documentElement.style.fontSize = textoGrande ? "112%" : "";
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [textoGrande]);

  function buscar(valor) {
    setConsulta(valor);
    setActivo("heroes");
    //window.history es el que da acceso al historial de la pestaña
    window.history.replaceState(null, "", "#heroes");
  }

  return (

    <>

      <Navbar
        {...datos}
        idioma={idioma}
        cambiarIdioma={setIdioma}
        activo={activo}
        onBuscar={buscar}
        texto={textoGrande}
        alternarTexto={() => setTextoGrande((valor) => !valor)}
      />
      <main className="Contenedor demo-contenido">
        <p>{ingles ? "English content" : "Contenido en español "}</p>
        <h1>{titulo ?? (ingles ? "Navegation" : "Navegacion")}</h1>
        <p role="status">
          {consulta
            ? `${ingles ? "Search submitted" : "Busqueda enviada"}: ${consulta}`
            : ingles
              ? "Select a link"
              : "Selecciona un enlace "}
        </p>
        <p>

          {ingles
            ? "this example loads navigtaion"
            : "Este ejemplo carga los textos del menu desde la app"}

        </p>

      </main>

      <ContadorClics />
      <Cronometro />
      <RecordarNombre />
      <PersonajeApi />
      <NavegadorPersonajes />

    </>

  );
}

export default App;