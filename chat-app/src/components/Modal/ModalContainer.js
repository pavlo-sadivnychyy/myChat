import React, { useEffect, useState } from 'reactn';
import { isFunction } from 'lodash/lang';
import Modal from './Modal';
import ModalDialog from './ModalDialog';

function ModalContainer() {
  const [modals, setModals] = useState([]);

  useEffect(() => {
    Modal.addChangeListener(onChange);
    return function () {
      Modal.removeChangeListener(onChange);
    };
  }, []);

  return modals.map((modal) => {
    const { id, onCloseCallback, close } = modal;

    return <ModalDialog key={id} {...modal} onClose={onClose} />;

    function onClose(data) {
      isFunction(onCloseCallback) && onCloseCallback(data);
      close();
    }
  });

  function onChange(list) {
    setModals(list);
  }
}

export default ModalContainer;
