import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import FilterButtons from './components/FilterButtons';

const FILTERS = {
  all: () => true,
  active: task => !task.completed,
  completed: task => task.completed,
};

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const deleteTask = id => setTasks(tasks.filter(t => t.id !== id));
  const toggleTask = id =>
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const editTask = (id, newText) =>
    setTasks(tasks.map(t => (t.id === id ? { ...t, text: newText } : t)));

  const filteredTasks = tasks
    .filter(FILTERS[filter])
    .sort((a, b) => a.completed - b.completed); 

  const styles = {
    container: {
      fontFamily: 'Arial',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    card: {
      background: '#fff',
      borderRadius: '16px',
      padding: '30px',
      width: '100%',
      maxWidth: '500px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },
    inputRow: {
      display: 'flex',
      gap: '10px',
      marginBottom: '15px',
    },
    input: {
      flex: 1,
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    addBtn: {
      padding: '10px 16px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    list: {
      marginTop: '20px',
      listStyle: 'none',
      padding: 0,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>To-Do List</h1>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            placeholder="Add a task..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
          />
          <button style={styles.addBtn} onClick={addTask}>
            Add
          </button>
        </div>

        <FilterButtons filter={filter} setFilter={setFilter} />

        <ul style={styles.list}>
          {filteredTasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTask}
              onEdit={editTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
