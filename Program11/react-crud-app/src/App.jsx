import { useState } from "react";
import "./index.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Create
  const addItem = () => {
    if (newItem.trim() === "") return;
    setItems([...items, newItem]);
    setNewItem("");
  };

  // Delete
  const deleteItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  // Enable Edit
  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(items[index]);
  };

  // Update
  const saveEdit = (index) => {
    const updated = [...items];
    updated[index] = editValue;
    setItems(updated);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="app-container">
      <h1>React CRUD Example</h1>

      <div className="input-section">
        <input
          type="text"
          value={newItem}
          placeholder="Enter item..."
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul className="item-list">
        {items.length === 0 && <p>No items found.</p>}
        {items.map((item, index) => (
          <li key={index} className="item">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{item}</span>
                <div>
                  <button onClick={() => startEditing(index)}>Edit</button>
                  <button onClick={() => deleteItem(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
