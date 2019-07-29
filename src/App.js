import React, { useState, useContext } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import { TodoListContext } from './TodoListStore';

function App() {
  const [appState, doAction] = useContext(TodoListContext);
  const [isNoteToggled, setIsNoteToggled] = useState(false);
  const [title, setTitle] = useState('');

  const toggleAddNotes = () => {
    setIsNoteToggled(!isNoteToggled);
  };

  const addNewNoteByEnter = event => {
    if (event.key === 'Enter') {
      addNewNote();
    }
  };

  const addNewNote = () => {
    if (!title) {
      return;
    }

    doAction({
      type: 'ADD_NOTE',
      payload: title
    });

    setTitle('');
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="app-heading text-center text-uppercase">Sticky Notes</h1>
        <TodoList />
      </div>

      <footer className="footer text-center">
        {isNoteToggled ? (
          <div>
            <input
              type="text"
              placeholder="Enter Title for Note"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={addNewNoteByEnter}
              required
            />
            <button className="btn btn-create-note" onClick={addNewNote}>
              Submit
            </button>
            <button className="btn btn-cancel" onClick={toggleAddNotes}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn btn-add-note" onClick={toggleAddNotes}>
            <span>+</span>
            <span>Add Note</span>
          </button>
        )}
      </footer>
    </div>
  );
}

export default App;
