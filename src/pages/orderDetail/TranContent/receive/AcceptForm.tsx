import React, { useImperativeHandle, useState } from 'react';
import { Button, Form, Modal, Rate, Space, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { translationIndex, getCurrentStep } from '@/store/reducers/orderDetailSlice';
// import { getAmphi } from '@/contracts/contract';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useAmphiFactoryFunctionWriter } from '@/hooks/useAmphi';

// import BigNumber from 'bignumber.js';
import api from '@/api';
import styles from './index.module.scss';

type Iprops = {
    onRef?: any;
};

const AcceptForm = ({ onRef }: Iprops) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const transIndex = useAppSelector(translationIndex);
    const [isSatisty, setIsSatisty] = useState(1);
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
            showAcceptModal: showModal
        };
    });

    // 提交评价
    const handleSubmit = (data: any) => {
        api.evalution(data).then((res: any) => {
            if (res.code === 200) {
                message.success('Evaluate success');
                dispath(getCurrentStep(3));
            }
        });
    };

    const handleOk = async () => {
        setIsLoading(true);
        const pro = [transIndex, true, '', ''];
        // const pro = {
        //     index: transIndex,
        //     isPass: true,
        //     file: '',
        //     illustrate: ''
        // };
        console.log('accept param', pro);
        try {
            writeAsync?.({
                args: pro
            }).then((tx: { hash: any }) => {
                if (tx) {
                    console.log(tx);
                    if (tx.hash) {
                        message.success('Accept successfully!');
                        setIsLoading(false);
                        setIsModalOpen(false);
                        dispath(getCurrentStep(3));
                    } else {
                        message.error('Accept failed !');
                    }
                } else {
                    message.error('Accept failed !');
                }
            });
        } catch (err: any) {
            message.error('Accept failed !');
            console.log('catch error', err);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        const finalParmas = {
            ...values,
            machine: isSatisty,
            translationIndex: transIndex
        };
        handleSubmit(finalParmas);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    //  --机翻是否满意 0=不满意 1=满意
    const handleMachine = (value: number) => {
        setIsSatisty(value);
    };

    return (
        <Modal
            title='Accept translations'
            open={isModalOpen}
            okText='Confirm'
            onOk={handleOk}
            confirmLoading={isLoading}
            onCancel={handleCancel}
        >
            <Space style={{ marginBottom: '10px' }}>
                Once accepted, the order will move into the Completed state. Thee amount you
                previously staked will be paid to the translator and the platform.
            </Space>
            <Form
                form={form}
                labelAlign='left'
                labelCol={{ span: 6 }}
                name='basic'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                colon={false}
            >
                <h6 className={styles['group-heading']}>AI translation</h6>
                <Form.Item label='' name='machine'>
                    <Button className={styles['satisfy-btn']} onClick={() => handleMachine(1)}>
                        Satisfy
                    </Button>
                    <Button className={styles['dis-satisfy-btn']} onClick={() => handleMachine(0)}>
                        Dissatisfied
                    </Button>
                </Form.Item>

                <h6 className={styles['group-heading']}>The proofreading</h6>

                <Form.Item label='Overall' name='overall'>
                    <Rate allowClear />
                </Form.Item>

                <Form.Item label='Professional' name='professional'>
                    <Rate allowClear />
                </Form.Item>

                <Form.Item label='Timeliness' name='timeliness'>
                    <Rate allowClear />
                </Form.Item>

                <Form.Item label='Service Attitude' name='attitude'>
                    <Rate allowClear />
                </Form.Item>

                <Form.Item label='Comment' name='comment'>
                    <TextArea placeholder='Comment' allowClear showCount maxLength={1000} />
                </Form.Item>

                {/* <Form.Item>
                    <Button htmlType='submit' className={styles['rate-submit']}>
                        Submit
                    </Button>
                </Form.Item> */}
            </Form>
        </Modal>
    );
};

export default AcceptForm;
