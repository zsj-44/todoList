import React, {useRef} from 'react';
import './index.scss';

function AddInput(props) {
  const inputRef = useRef();
  const {isShowInput, addItem} = props;
  

  function submitValue (){
    const inputValue = inputRef.current.value.trim();

    if (inputValue.length === 0) {
      return;
    }

    addItem(inputValue);
    inputRef.current.value = '';
  }

  return (
    <div>
    {
      isShowInput ? (
        <div className="input-wrapper">
          <input type="text" ref={inputRef} placeholder="请输入待办事项"/>
          <button className="btn btn-primary" onClick={submitValue}>添加</button>
        </div>
      ) : ('')
    }
    </div>
  );
}

export default AddInput;