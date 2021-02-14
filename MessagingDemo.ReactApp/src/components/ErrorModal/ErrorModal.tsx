import React from 'react';
import { useErrorModal } from '../../context/ErrorModalContext';
import { Modal } from 'antd';

const ErrorModal = () => {
    const {showError, setShowError} = useErrorModal();
    
    return(
        <Modal 
            title="Error" 
            visible={showError}
            onCancel={() => setShowError(false)}
            onOk={() => setShowError(false)}
        >
            Unfortunaltely, an error occured while processing your request.
        </Modal>
    )
}

export default ErrorModal;