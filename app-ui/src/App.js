import { useState } from 'react';
import './App.css';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

function App() {
  const [view, setView] = useState('list');
  const [editingId, setEditingId] = useState(null);

  const goToList = () => {
    setView('list');
    setEditingId(null);
  };

  const goToCreate = () => {
    setEditingId(null);
    setView('form');
  };

  const goToEdit = (id) => {
    setEditingId(id);
    setView('form');
  };

  return (
    <div className="app">
      <main className="container">
        {view === 'list' ? (
          <PersonList onCreate={goToCreate} onEdit={goToEdit} />
        ) : (
          <PersonForm personId={editingId} onCancel={goToList} onSaved={goToList} />
        )}
      </main>
    </div>
  );
}

export default App;
