import React, { useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';
import EditablForm from './EditableForm';

type Iprops = {
    isGlossaryModalOpen?: boolean;
    onRef?: any;
};

const Glossary = ({ onRef }: Iprops) => {
    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const handleOk = () => {
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    // 向父组件暴露 shouModal
    useImperativeHandle(onRef, () => {
        // 需要将暴露的接口返回出去
        return {
            showModal
        };
    });

    return (
        <Modal title='Glossary' open={isOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <EditablForm />
        </Modal>
    );
};

export default Glossary;
