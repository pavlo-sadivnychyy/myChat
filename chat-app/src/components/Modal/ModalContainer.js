import React, { useEffect, useState } from "reactn";
import Modal from "./Modal";
import ModalDialog from "./ModalDialog";
import { isFunction } from "lodash/lang";

function ModalContainer() {
    const [modals, setModals] = useState([]);

    useEffect(function () {
        Modal.addChangeListener(onChange);
        return function () {
            Modal.removeChangeListener(onChange);
        };
    }, []);

    return modals.map(function (modal) {
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
