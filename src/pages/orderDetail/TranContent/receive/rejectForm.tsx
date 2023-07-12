import React, { useImperativeHandle, useState } from 'react';
import { Form, Modal, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { translationIndex, getCurrentStep } from '@/store/reducers/orderDetailSlice';

// import { getAmphi } from '@/contracts/contract';
// import BigNumber from 'bignumber.js';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useAmphiFactoryFunctionWriter } from '@/hooks/useAmphi';

type Iprops = {
    onRef?: any;
};

const RejectForm = ({ onRef }: Iprops) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const transIndex = useAppSelector(translationIndex);
    const dispath = useAppDispatch();
    const { writeAsync } = useAmphiFactoryFunctionWriter('receiveTask');
    const [isLoading, setIsLoading] = useState(false);

    // console.log(transIndex);

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
        setIsLoading(true);
        // const amphi = await getAmphi();

        // reject api
        const pro = [transIndex, false, '', form.getFieldValue('rejectReason') || ''];
        // const rejectPro = {
        //     index: transIndex,
        //     isPass: false,
        //     file: '',
        //     illustrate: form.getFieldValue('rejectReason') || ''
        // };
        console.log('reject param', pro);
        try {
            writeAsync?.({
                args: pro
            }).then((tx: { hash: any }) => {
                if (tx) {
                    console.log(tx);
                    if (tx.hash) {
                        message.success('Reject successfully!');
                        setIsLoading(false);
                        setIsModalOpen(false);
                        dispath(getCurrentStep(1));
                    } else {
                        message.error('Reject failed !');
                    }
                } else {
                    message.error('Reject failed !');
                }
            });
        } catch (err: any) {
            message.error('Reject failed !');
            console.log('catch error', err);
        }

        // amphi.methods
        //     .receiveTask(rejectPro.index, rejectPro.isPass, rejectPro.file, rejectPro.illustrate)
        //     .call()
        //     .then((data: any) => {
        //         console.log('reject res', data);
        //         setIsModalOpen(false);
        //         dispath(getCurrentStep(1));
        //     })
        //     .catch((err: any) => {
        //         console.log('err', err);
        //     });
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
            confirmLoading={isLoading}
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
                {/* <Form.Item label='The Version' name='rejectVersion'>
                    <p>version</p>
                </Form.Item> */}
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
