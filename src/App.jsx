
import React, { useState } from 'react';
import './App.css'

const App = () => {
  const [filtros, setFiltros] = useState({
    titular: '',
    destino: '',
    pagoMayorCincoMillones: false,
    pagoMenorCincoMillones: false,
  });

  const [nuevoViaje, setNuevoViaje] = useState({
    titular: '',
    destino: '',
    valor: 0,
    personas: 0,
  });

  const [viajes, setViajes] = useState([
    { id: 1, titular: 'Juan Pérez', destino: 'París', valor: 4500000, personas: 2 },
    { id: 2, titular: 'María López', destino: 'Londres', valor: 6000000, personas: 1 },
    { id: 3, titular: 'Pedro Gómez', destino: 'Roma', valor: 4800000, personas: 3 },
    { id: 4, titular: 'Camilo Jaramillo', destino: 'Inglaterra', valor: 6500000, personas: 2 },
    { id: 5, titular: 'Camila Londoño', destino: 'Londres', valor: 6000000, personas: 3 },
    { id: 6, titular: 'Carlos Marin', destino: 'Suecia', valor: 4800000, personas: 3 },
  ]);

  const guardarNuevoViaje = (e) => {
    e.preventDefault();
    setViajes([...viajes, { ...nuevoViaje, id: viajes.length + 1 }]);
    setNuevoViaje({ titular: '', destino: '', valor: 0, personas: 0 });
  };

  const filtrarViajes = () => {
    return viajes.filter(viaje => {
      const cumpleFiltros =
        (filtros.titular === '' || viaje.titular.toLowerCase().includes(filtros.titular.toLowerCase())) &&
        (filtros.destino === '' || viaje.destino.toLowerCase().includes(filtros.destino.toLowerCase())) &&
        (!filtros.pagoMayorCincoMillones || viaje.valor > 5000000) &&
        (!filtros.pagoMenorCincoMillones || viaje.valor < 5000000);
      return cumpleFiltros;
    });
  };

  return (
    <div>
      <h1>Agencia de Viajes "Nos Fuimos"</h1>
      <h2>Lista de Viajes</h2>
      <div>
        {/* Formulario para ingresar filtros */}
        <form>
          <input
            type="text"
            placeholder="Buscar por titular"
            value={filtros.titular}
            onChange={(e) => setFiltros({ ...filtros, titular: e.target.value })}
          />
          <input
            type="text"
            placeholder="Buscar por destino"
            value={filtros.destino}
            onChange={(e) => setFiltros({ ...filtros, destino: e.target.value })}
          />
          <label>
            Pago mayor a 5 millones:
            <input
              type="checkbox"
              checked={filtros.pagoMayorCincoMillones}
              onChange={(e) => setFiltros({ ...filtros, pagoMayorCincoMillones: e.target.checked })}
            />
          </label>
          <label>
            Pago menor a 5 millones:
            <input
              type="checkbox"
              checked={filtros.pagoMenorCincoMillones}
              onChange={(e) => setFiltros({ ...filtros, pagoMenorCincoMillones: e.target.checked })}
            />
          </label>
        </form>
      </div>
      {/* Tabla para mostrar viajes */}
      <table>
        <thead>
          <tr>
            <th>Titular</th>
            <th>Destino</th>
            <th>Valor</th>
            <th>Personas</th>
          </tr>
        </thead>
        <tbody>
          {filtrarViajes().map((viaje) => (
            <tr key={viaje.id}>
              <td>{viaje.titular}</td>
              <td>{viaje.destino}</td>
              <td>{viaje.valor.toLocaleString()}</td>
              <td>{viaje.personas}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Agregar Nuevo Viaje</h2>
        <form onSubmit={guardarNuevoViaje}>
          <input
            type="text"
            placeholder="Titular"
            value={nuevoViaje.titular}
            onChange={(e) => setNuevoViaje({ ...nuevoViaje, titular: e.target.value })}
          />
          <input
            type="text"
            placeholder="Destino"
            value={nuevoViaje.destino}
            onChange={(e) => setNuevoViaje({ ...nuevoViaje, destino: e.target.value })}
          />
          <input
            type="number"
            placeholder="Valor"
            value={nuevoViaje.valor}
            onChange={(e) => setNuevoViaje({ ...nuevoViaje, valor: parseInt(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Número de Personas"
            value={nuevoViaje.personas}
            onChange={(e) => setNuevoViaje({ ...nuevoViaje, personas: parseInt(e.target.value) })}
          />
          <button type="submit">Guardar Viaje</button>
        </form>
      </div>
    </div>
  );
};

export default App;