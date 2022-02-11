import { EventEmitter } from "events";

class Modal extends EventEmitter {
    constructor() {
        super();
        this.modal = [];
    }

    create(modal) {
        const id = 1;
        const defaultModal = {
            id,
            fullScreen: false,
            close: () => {
                this.close(id);
            },
        };
        const modalObject = Object.assign(defaultModal, modal);
        this.modal.push(modalObject);
        this.emitChange();
        return modalObject;
    }

    open({ component, onClose, className, ...rest }) {
        return this.create({
            component,
            onCloseCallback: onClose,
            className,
            ...rest,
        });
    }

    close(id) {
        this.modal = this.modal.filter((n) => id !== n.id);
        this.emitChange();
    }

    closeAll() {
        this.modal = [];
        this.emitChange();
    }

    emitChange() {
        this.emit("change", [...this.modal]);
    }

    addChangeListener(callback) {
        this.addListener("change", callback);
    }

    removeChangeListener(callback) {
        this.removeListener("change", callback);
    }

}

export default new Modal();
