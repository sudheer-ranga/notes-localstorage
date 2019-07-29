import React, { useContext } from 'react';
import close from '../../images/close.svg';
import { TodoListContext } from './../../TodoListStore';

const TodoItem = props => {
  const [appState, doAction] = useContext(TodoListContext);
  const { todo } = props;

  const removeItemFromNote = itemId => {
    const data = {
      parentId: todo.id,
      itemId: itemId
    };

    doAction({
      type: 'DELETE_ITEM_FROM_NOTE',
      payload: data
    });
  };

  const toggleComplete = itemId => {
    const data = {
      parentId: todo.id,
      itemId: itemId
    };

    doAction({
      type: 'TOGGLE_COMPLETE',
      payload: data
    });
  };

  const addItemToNotes = event => {
    if (event.key === 'Enter') {
      const data = {
        parentId: todo.id,
        description: event.target.value
      };

      doAction({
        type: 'ADD_ITEM_TO_NOTE',
        payload: data
      });

      event.target.value = '';
    }
  };

  const removeNote = () => {
    doAction({
      type: 'DELETE_NOTE',
      payload: todo.id
    });
  };

  return (
    <div className="notes-item-block">
      <div className="title-block">
        <h3 className="title">{todo.title}</h3>
        <span className="close-block" onClick={removeNote}>
          <img src={close} alt="" />
        </span>
      </div>

      <div className="todo-items">
        {todo.items.length > 0 &&
          todo.items.map(item => {
            return (
              <div className="todo-item" key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={e => toggleComplete(item.id)}
                    checked={item.completed}
                    required
                  />
                  <div className="checkbox-icon">
                    <span className="checkbox-bg" />
                  </div>
                  <span className="item-description">{item.description}</span>
                </label>

                <span
                  className="btn-remove"
                  onClick={e => removeItemFromNote(item.id)}
                >
                  Remove
                </span>
              </div>
            );
          })}
      </div>

      <div className="todo-item new-item">
        <input type="text" placeholder="Add Item" onKeyDown={addItemToNotes} />
      </div>
    </div>
  );
};

export default TodoItem;
