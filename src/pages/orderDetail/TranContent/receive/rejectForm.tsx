import React, { useImperativeHandle, useState } from 'react';
import { Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { translationIndex } from '@/store/reducers/orderDetailSlice';
import { getAmphi } from '@/contracts/contract';
import { useAppSelector } from '@/store/hooks';
// import BigNumber from 'bignumber.js';

type Iprops = {
    onRef?: any;
};

const RejectForm = ({ onRef }: Iprops) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const transIndex = useAppSelector(translationIndex);

    console.log(transIndex);

    const showModal = () => {
        setIsModalOpen(true);
    };

    // 向父组件暴露 shouModal
    useImperativeHandle(onRef, () => {
        // 需要将暴露的接口返回出去
        return {
            showRejectModal: showModal
        };
    });

    const handleOk = async () => {
        console.log('reject confirm', form.getFieldsValue());
        const amphi = await getAmphi();

        // reject api
        const rejectPro = {
            index: transIndex,
            isPass: false,
            file: '',
            illustrate: form.getFieldValue('rejectReason') || ''
        };
        console.log('reject param', rejectPro);
        amphi.methods
            .receiveTask(rejectPro.index, rejectPro.isPass, rejectPro.file, rejectPro.illustrate)
            .call()
            .then((data: any) => {
                console.log('reject res', data);
                setIsModalOpen(false);
            })
            .catch((err: any) => {
                console.log('err', err);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title='Reject the translation'
            open={isModalOpen}
            okText='Confirm'
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                name='reject-form'
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                layout='vertical'
            >
                <Form.Item label='The Version' name='rejectVersion'>
                    <p>version</p>
                </Form.Item>
                <Form.Item label='The Reason' name='rejectReason'>
                    <TextArea
                        allowClear
                        showCount
                        maxLength={1000}
                        placeholder='Please enter a detailed description so translators can modlify it'
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RejectForm;
