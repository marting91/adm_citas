import { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";


function App() {

  // Citas en localstorage
  let citasLS = JSON.parse(localStorage.getItem('citas')) || [];

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasLS);

  // Use Effect
  useEffect(() => {
    let citasLS = JSON.parse(localStorage.getItem('citas')) || [];
    if (citasLS) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  // Función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Elimino una cita por su id
  const eliminarCita = id => {
    guardarCitas(citas.filter(cita => cita.id !== id));
  }

  // Mensaje listado
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <div className="App">
        <h1>Administrador de pacientes</h1>

        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario
                crearCita={crearCita}
              />
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
