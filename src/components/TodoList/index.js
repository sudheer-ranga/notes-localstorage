import React, { useContext } from 'react';
import TodoItem from './../TodoItem';
import { TodoListContext } from './../../TodoListStore';

// to populate dummy data for testing. remove later
const populateLocalStorage = doAction => {
  const localList = [
    {
      id: '1',
      title: 'Todo List 1',
      items: [
        {
          id: '1a',
          description: 'Todo List Item 1',
          completed: false
        },
        {
          id: '1b',
          description: 'Todo List Item 2',
          completed: false
        },
        {
          id: '1c',
          description: 'Todo List Item 3',
          completed: false
        },
        {
          id: '1d',
          description: 'Todo List Item 4',
          completed: false
        },
        {
          id: '1e',
          description: 'Todo List Item 5',
          completed: false
        }
      ]
    }
  ];

  doAction({
    type: 'SET_LOCALSTORAGE',
    payload: localList
  });
};

const TodoList = () => {
  const [appState, doAction] = useContext(TodoListContext);
  const list = appState.list;

  return (
    <div className="notes-container">
      {list.length > 0
        ? list.map(todo => {
            return (
              <React.Fragment key={todo.id}>
                <TodoItem todo={todo} />
              </React.Fragment>
            );
          })
        : 'No Items'}

      {/* <button
        className="btn"
        onClick={populateLocalStorage.bind(null, doAction)}
      >
        Polulate Locastorage
      </button> */}
    </div>
  );
};

export default TodoList;
