const filters = ['all', 'active', 'completed'];

export default function FilterButtons({ filter, setFilter }) {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '10px',
    },
    btn: (active) => ({
      padding: '6px 12px',
      borderRadius: '6px',
      backgroundColor: active ? '#007BFF' : '#eee',
      color: active ? '#fff' : '#333',
      border: 'none',
      cursor: 'pointer',
    }),
  };

  return (
    <div style={styles.container}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={styles.btn(filter === f)}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
