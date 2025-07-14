import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div role="dialog" aria-labelledby="modalTitle" aria-describedby="modalMessage" className="fixed inset-0 flex items-center justify-center bg-black/75">
            <div className="bg-white p-6 rounded-lg shadow-lg mx-auto text-center">
                <h2 id="modalTitle" className="text-lg font-semibold">
                    Message
                </h2>
                <p id="modalMessage">{message}</p>
                <button className="mt-4 bg-[#5a6f07] text-white px-4 py-2 rounded" onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
}

// Définition des PropTypes
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};

export default Modal;
