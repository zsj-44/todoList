import React from 'react';

import './index.scss';

function TodoItem(props) {

  const { data, openCheckModle, openEditModle, completeItem, deleteItem } = props;

  return(
    <li className="todo-item">
      <div className="check-box">
        <input type="checkbox"
          checked={data.completed}
          onChange={() => completeItem(data.id)}
        />
      </div>
      { 
        !data.completed ?
        (
          <span className="content">{data.content}</span>
        ) :
        (
          <span className="content Completion">{data.content}</span>
        )
      }
      
      <div className="btn-group">

      <button
        className="btn btn-primary"
        onClick={() => openCheckModle(data.id)}
      >查看</button>
      <button
        className="btn btn-warning"
        onClick={() => openEditModle(data.id)}
      >编辑</button>
      <button
        className="btn btn-danger"
        onClick={() => deleteItem(data.id)}>删除</button>
      </div>
    </li>
  );
}

export default TodoItem;