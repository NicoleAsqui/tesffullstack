import { useEffect, useState } from 'react';
import { deletePerson, fetchPersons } from '../api/personApi';

function PersonList({ onCreate, onEdit }) {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPersons();
      setPersons(data);
    } catch (err) {
      setError(err.message || 'No se pudieron cargar las personas');
      setPersons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar a ${nombre}?`)) return;
    try {
      await deletePerson(id);
      await load();
    } catch (err) {
      alert(err.message || 'No se pudo eliminar');
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h1>Personas</h1>
        <button type="button" className="btn btn-primary" onClick={onCreate}>
          Crear
        </button>
      </div>

      {loading && <p className="muted">Cargando...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && persons.length === 0 && (
        <p className="muted">No hay personas registradas.</p>
      )}

      {!loading && persons.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha nacimiento</th>
              <th>Puesto</th>
              <th>Sueldo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.fechaNacimiento}</td>
                <td>{p.puesto}</td>
                <td>${Number(p.sueldo).toFixed(2)}</td>
                <td className="actions">
                  <button type="button" className="btn btn-secondary" onClick={() => onEdit(p.id)}>
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(p.id, p.nombre)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PersonList;
