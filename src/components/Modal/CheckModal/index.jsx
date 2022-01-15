import React from 'react';

import './index.scss';

import Modal from '../index.jsx';

import {formatDateTime} from '../../../libs/utils.js'

function CheckModal(props) {

  const {isShowCheckModal, data, closeModal} = props;

  return(
    <Modal
      isShowModal = {isShowCheckModal}
      modaTitle = "查看事件"
    >
    <p className="topic">时间：{ formatDateTime(data.id) }</p>
    <p className="topic">内容：{data.content}</p>
    <p className="topic">状态：{data.completed ? '已完成' : '未完成'}</p>
    <button className="btn btn-primary comfirm-btn" onClick={closeModal}>确定</button>
    </Modal>
  );

}

export default CheckModal;