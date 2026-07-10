import { useEffect, useState } from 'react';
import { createPerson, fetchPersonById, updatePerson } from '../api/personApi';

const emptyForm = {
  nombre: '',
  apellido: '',
  fechaNacimiento: '',
  puesto: '',
  sueldo: '',
};

function PersonForm({ personId, onCancel, onSaved }) {
  const isEdit = personId != null;
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) {
      setForm(emptyForm);
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const person = await fetchPersonById(personId);
        if (!person) {
          setError('No se encontró la persona');
          return;
        }
        setForm({
          nombre: person.nombre || '',
          apellido: person.apellido || '',
          fechaNacimiento: person.fechaNacimiento || '',
          puesto: person.puesto || '',
          sueldo: person.sueldo ?? '',
        });
      } catch (err) {
        setError(err.message || 'No se pudieron cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isEdit, personId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      fechaNacimiento: form.fechaNacimiento,
      puesto: form.puesto.trim(),
      sueldo: Number(form.sueldo),
    };

    try {
      if (isEdit) {
        await updatePerson(personId, payload);
      } else {
        await createPerson(payload);
      }
      onSaved();
    } catch (err) {
      setError(err.message || 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="panel">
      <h1>{isEdit ? 'Editar persona' : 'Crear persona'}</h1>

      {loading && <p className="muted">Cargando datos...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && (
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input name="nombre" value={form.nombre} onChange={handleChange} required />
          </label>
          <label>
            Apellido
            <input name="apellido" value={form.apellido} onChange={handleChange} required />
          </label>
          <label>
            Fecha de nacimiento
            <input
              type="date"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Puesto
            <input name="puesto" value={form.puesto} onChange={handleChange} required />
          </label>
          <label>
            Sueldo
            <input
              type="number"
              step="0.01"
              min="0"
              name="sueldo"
              value={form.sueldo}
              onChange={handleChange}
              required
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={saving}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PersonForm;
