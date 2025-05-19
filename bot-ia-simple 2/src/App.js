import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://botmemoire.onrender.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.error("Erreur chargement utilisateurs", err));
  }, []);

  const handleClick = async (id) => {
    setLoading(true);
    const res = await fetch(`https://botmemoire.onrender.com/users/${id}`);
    const data = await res.json();
    setSelected({ id, history: data.history });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Conversations IA</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Utilisateurs</h2>
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span className="text-gray-700">{user.id}</span>
              <button
                onClick={() => handleClick(user.id)}
                className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
              >
                Voir conversation
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Conversation</h2>
          {loading ? (
            <p className="text-gray-500">Chargement...</p>
          ) : selected ? (
            <pre className="whitespace-pre-wrap text-sm text-gray-800 max-h-[400px] overflow-y-auto">
              {selected.history}
            </pre>
          ) : (
            <p className="text-gray-400">Clique sur un utilisateur pour voir sa conversation.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
