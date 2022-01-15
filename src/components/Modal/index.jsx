import React from 'react';

function Modal (props) {

  const { isShowModal, modaTitle, children } = props
  return(
    <div>
      { isShowModal ? 
        (
          <div className="modal">
            <div className="inner">
                <div className="m-header">{ modaTitle }</div>
                <div className="content-wrapper">
                  { children }
                </div>
            </div>

          </div>
        )
        : '' }
    </div>
  );
}

export default Modal;