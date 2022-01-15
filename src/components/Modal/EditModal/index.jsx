import React, {useRef} from 'react';

import './index.scss';

import Modal from '../index.jsx';

import {formatDateTime} from '../../../libs/utils.js'

function EditModal(props) {

  const inputRef = useRef();
  const checkRef = useRef();

  const { data, isShowEditModal, submitEdit } = props;
  function formatNewData() {
    const value = inputRef.current.value.trim();
    
    if(value.length === 0 ) {
      inputRef.current.value = data.content;
      return;
    }

    const newData = {
      id: new Date().getTime(),
      content: value,
      completed: checkRef.current.checked
    }

    submitEdit(newData, data.id);
  }

  return (
    <Modal
    //设置父组件属性
      isShowModal = {isShowEditModal}
      modaTitle = "编辑事件"
    >
      <div className="topic"><span>时间：</span>{formatDateTime(data.id)}</div>
      <div className="topic">
      <span>待办事项：</span>
        <textarea
          className="text-area"
          ref={inputRef}
          defaultValue={ data.content }
        ></textarea>
      </div>
      <div className="topic">
        <span>状态：</span>
        <input
          type="checkbox"
          defaultChecked={data.completed}
          ref={checkRef}
        />
      </div>
      <button className="btn btn-primary comfirm-btn" onClick={ formatNewData }>提交</button>
    </Modal>
  );
}
export default EditModal;