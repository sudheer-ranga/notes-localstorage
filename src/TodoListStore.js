import React, { useReducer, createContext } from 'react';

export const TodoListContext = createContext();

const setLocalstorage = updatedList => {
  localStorage.setItem('notes', JSON.stringify(updatedList));
};

const deleteNote = (state, payload) => {
  state.list.some((note, index) => {
    if (note.id === payload) {
      state.list.splice(index, 1);

      return true;
    }

    return false;
  });

  setLocalstorage(state.list);
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      const item = [
        {
          id: new Date(),
          title: action.payload,
          completed: false,
          items: []
        }
      ];

      const newList = [...state.list, ...item];
      setLocalstorage(newList);
      return { ...state, list: newList };

    case 'DELETE_NOTE':
      deleteNote(state, action.payload);

      return { ...state };

    case 'ADD_ITEM_TO_NOTE':
      const newTodoItem = {
        id: new Date(),
        parentId: action.payload.parentId,
        completed: false,
        description: action.payload.description
      };

      state.list.some(note => {
        if (note.id === action.payload.parentId) {
          note.items.push(newTodoItem);

          return true;
        }

        return false;
      });

      setLocalstorage(state.list);

      return { ...state };

    case 'DELETE_ITEM_FROM_NOTE':
      state.list.some(note => {
        if (note.id === action.payload.parentId) {
          note.items.some((item, index) => {
            if (item.id === action.payload.itemId) {
              note.items.splice(index, 1);

              if (note.items.length === 0) {
                deleteNote(state, action.payload.parentId);
              }

              return true;
            }
          });

          return true;
        }

        return false;
      });

      setLocalstorage(state.list);

      return { ...state };

    case 'TOGGLE_COMPLETE':
      state.list.some(note => {
        if (note.id === action.payload.parentId) {
          note.items.some(item => {
            if (item.id === action.payload.itemId) {
              item.completed = !item.completed;
              return true;
            }
          });

          return true;
        }

        return false;
      });

      setLocalstorage(state.list);

      return { ...state };

    case 'SET_LOCALSTORAGE':
      const localItems = [...state.list, ...action.payload];
      setLocalstorage(localItems);
      return { ...state, list: localItems };

    case 'GET_LOCALSTORAGE':
      const items = JSON.parse(localStorage.getItem('notes'));
      return { ...state, list: items };

    default:
      return state;
  }
};

const getNotesFromLocalStorage = () => {
  if (localStorage && localStorage.getItem) {
    let notes = localStorage.getItem('notes');
    notes = JSON.parse(notes) || [];
    return notes;
  }

  return [];
};

export const TodoListStore = props => {
  let stateHooks = useReducer(reducer, {
    list: getNotesFromLocalStorage()
  });

  return (
    <TodoListContext.Provider value={stateHooks}>
      {props.children}
    </TodoListContext.Provider>
  );
};
