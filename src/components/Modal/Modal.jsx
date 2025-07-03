import React from 'react';
import './Modal.css';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, width = '400px', height = 'auto', children }) => {
    if (!isOpen) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content" style={{ width, height }}>
                <div className="custom-modal-header">
                    <button className="custom-close-button" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="custom-modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
