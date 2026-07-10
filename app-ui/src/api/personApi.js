const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
  } catch {
    throw new Error(
      'No se pudo conectar al backend en ' +
        API_BASE +
        '. ¿Está corriendo ./mvnw spring-boot:run?'
    );
  }
  const json = await res.json().catch(() => ({}));
  if (!json.status) {
    throw new Error(json.msg || `Error en la operación (${res.status})`);
  }
  return json;
}

export async function fetchPersons() {
  const json = await request('/person');
  return json.data || [];
}

export async function fetchPersonById(id) {
  const json = await request(`/person/${id}`);
  return json.data?.[0] || null;
}

export async function createPerson(person) {
  const json = await request('/person', {
    method: 'POST',
    body: JSON.stringify(person),
  });
  return json.data?.[0];
}

export async function updatePerson(id, person) {
  const json = await request(`/person/${id}`, {
    method: 'PUT',
    body: JSON.stringify(person),
  });
  return json.data?.[0];
}

export async function deletePerson(id) {
  await request(`/person/${id}`, { method: 'DELETE' });
}
