import React, {useState, useCallback, useEffect} from 'react'

import './App.css';

import MyHeader from './components/Header';
import AddInput from './components/AddInput';
import TodoItem from './components/TodoItem';
import CheckModal from './components/Modal/CheckModal';
import EditModal from './components/Modal/EditModal';
import NoDataTip from './components/NoDataTip';

function App() {
  const [isShowInput, setisShowInput] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [isShowCheckModal, setisShowCheckModal] = useState(false);
  const [isShowEditModal, setisShowEditModal] = useState(false);
  const [currentData, setCurrentData] = useState({});

  const addItem = useCallback((value) => {
  const dataItem={
    id: new Date().getTime(),
    content: value,    //内容
    completed: false
  };

    setTodoList((todoList) => [...todoList, dataItem]);
    setisShowInput(false)   //提交完数据隐藏添加框
  }, []);

  //打开查看框
  const openCheckModle = useCallback((id) => {
    setCurrentData(() => todoList.filter(item => item.id === id)[0]);
    setisShowCheckModal(true);
  }, [todoList]);

  //打开编辑框
  const openEditModle = useCallback((id) => {
    setCurrentData(() => todoList.filter(item => item.id === id)[0]);
    setisShowEditModal(true);
  }, [todoList]);

  //提交数据并关闭窗口
  const submitEdit = useCallback((newData, id) => {
    setTodoList((todoList) => 
      todoList.map((item) => {
        if(item.id === id) {
          item = newData;
        }
        return item;
      })
    )
    setisShowEditModal(false);
  }, []);

  const completeItem = useCallback((id) => {
    setTodoList((todoList) => todoList.map(item =>{
      if(item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    }))
  }, []);

  //删除事件
  const deleteItem = useCallback((id) => {
    setTodoList((todoList) => todoList.filter(item => item.id !== id));     //id相等就过滤掉，不等的返回
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
      <CheckModal
        data={currentData}
        isShowCheckModal = {isShowCheckModal}
        closeModal = { () => setisShowCheckModal(false)}
      />
      <EditModal
        data={currentData}
        isShowEditModal = {isShowEditModal}
        closeModal = { () => setisShowEditModal(false)}
        submitEdit = {submitEdit}
      />
      <MyHeader openInput={() => setisShowInput(!isShowInput)}/>
      <AddInput
        isShowInput = {isShowInput}
        addItem = {addItem}
      />
      {
        !todoList || todoList.length === 0
        ?
        (
          <NoDataTip></NoDataTip>
        )
        :
        (
          <ul className="todo-list">
          {
            todoList.map((item,index) => {
              return (
                <TodoItem
                  data={item}
                  key={index}
                  openCheckModle={ openCheckModle }
                  openEditModle={ openEditModle }
                  completeItem = { completeItem }
                  deleteItem = { deleteItem }
                />
              );
            })
          }
      </ul>
        )
      }
      
    </div>
  );
}

export default App;
