import { useState } from 'react';

export default function TodoItem({ task, onDelete, onToggle, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const saveEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText);
      setEditing(false);
    }
  };

  const styles = {
    item: {
      backgroundColor: '#f1f1f1',
      padding: '12px',
      marginBottom: '10px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    checkbox: {
      transform: 'scale(1.2)',
    },
    text: (completed) => ({
      textDecoration: completed ? 'line-through' : 'none',
      color: completed ? '#999' : '#000',
    }),
    actions: {
      display: 'flex',
      gap: '10px',
    },
    btn: {
      background: 'none',
      border: 'none',
      color: '#007BFF',
      cursor: 'pointer',
    },
    input: {
      padding: '6px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
  };

  return (
    <li style={styles.item}>
      <div style={styles.textSection}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          style={styles.checkbox}
        />
        {editing ? (
          <input
            style={styles.input}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
          />
        ) : (
          <span style={styles.text(task.completed)}>{task.text}</span>
        )}
      </div>
      <div style={styles.actions}>
        <button
          style={styles.btn}
          onClick={() => (editing ? saveEdit() : setEditing(true))}
        >
          {editing ? 'Save' : 'Edit'}
        </button>
        <button style={{ ...styles.btn, color: '#dc3545' }} onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
