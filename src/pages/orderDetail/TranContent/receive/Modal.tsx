import React, { useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';

interface Iprops {
    title?: string;
    onText?: string;
    cancelText?: string;
    footer?: any;
    onRef: any;
    children?: any;
}

const AmModal = ({ title, onText, cancelText, footer, onRef, children }: Iprops) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // 将shouModal暴露
    useImperativeHandle(onRef, () => {
        // 需要将暴露的接口返回出去
        return {
            showModal,
            handleOk,
            handleCancel
        };
    });

    return (
        <Modal
            title={title}
            open={isModalOpen}
            okText={onText}
            onOk={handleOk}
            cancelText={cancelText}
            onCancel={handleCancel}
            footer={footer}
        >
            {children}
        </Modal>
    );
};

export default AmModal;
