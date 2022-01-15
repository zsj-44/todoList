import React, {useState, useCallback, useEffect} from 'react'

import './App.css';

import MyHeader from './components/Header';
import AddInput from './components/AddInput';
import TodoItem from './components/TodoItem';

function App() {
  const [isShowInput, setisShowInput] = useState(true);
  const [todoList, setTodoList] = useState([]);

  const addItem = useCallback((value) => {
  const dataItem={
    id: new Date().getTime(),
    content: value,    //内容
    completed: false
  };

    setTodoList((todoList) => [...todoList, dataItem]);
    setisShowInput(false)   //提交完数据隐藏添加框
  }, []);

  //数据存储在setTodoList数组中
  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]');
    setTodoList(todoData)
  }, []);

  //把setTodoList中数据存储在localStorage中
  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoList));
  }, [todoList]);
  
  return (
    <div className="App">
       <MyHeader openInput={() => setisShowInput(!isShowInput)}/>
       <AddInput
        isShowInput = {isShowInput}
        addItem = {addItem}
      />
      <ul className="todo-list">
        {
          todoList.map((item,index) => {
            return (
              <TodoItem
                data={item}
                key={index}
              />
            );
          })
        }
      </ul>
    </div>
  );
}

export default App;
