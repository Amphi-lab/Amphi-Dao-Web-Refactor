import React, { useEffect, useState } from 'react';
import AmCard from '@/components/Card';
import { Button, Form, Rate, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
// import UnSelectedStar from '@/components/Icon/UnSelectedStar';
// import SelectedStar from '@/components/Icon/SelectedStar';
import api from '@/api';
import { useAppSelector } from '@/store/hooks';
import { translationIndex } from '@/store/reducers/orderDetailSlice';
import { useForm } from 'antd/es/form/Form';
import styles from './index.module.scss';

const ServiceRating = () => {
    const [form] = useForm();
    const transIndex = useAppSelector(translationIndex);
    // const [isSatisty, setIsSatisty] = useState(1);
    const [yetEvalData, setYetEvalData] = useState<any>({});

    // 提交评价
    const handleSubmit = (data: any) => {
        api.evalution(data).then((res: any) => {
            if (res.code === 200) {
                message.success('Evaluate success');
            }
        });
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        const finalParmas = {
            ...values,
            // machine: isSatisty,
            translationIndex: transIndex
        };
        handleSubmit(finalParmas);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('Please comment');
    };

    //  --机翻是否满意 0=不满意 1=满意
    // const handleMachine = (value: number) => {
    //     setIsSatisty(value);
    // };

    useEffect(() => {
        // 查询评价
        if (transIndex !== '0') {
            api.getEvalutions(transIndex).then((res: any) => {
                // console.log(res);
                if (res.code === 200 && res.data) {
                    setYetEvalData(res.data);
                }
            });
        }
    }, [transIndex]);

    // console.log(yetEvalData);

    return (
        <AmCard title='Reviewing'>
            <Form
                form={form}
                labelAlign='left'
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 12 }}
                name='basic'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                colon={false}
            >

                {/* Grammatical accuracy */}
                {yetEvalData.translationIndex && yetEvalData.grammaticalAccuracy ? (
                    <Form.Item label='Grammatical accuracy'>
                        <Rate disabled defaultValue={yetEvalData.grammaticalAccuracy} />
                    </Form.Item>
                ) : (
                    <Form.Item label='Grammatical accuracy' name='grammaticalAccuracy'>
                        <Rate allowClear />
                    </Form.Item>
                )}

                {/* words accuracy */}
                {yetEvalData.translationIndex && yetEvalData.wordsAccuracy ? (
                    <Form.Item label='Words accuracy'>
                        <Rate disabled defaultValue={yetEvalData.wordsAccuracy} />
                    </Form.Item>
                ) : (
                    <Form.Item label='Words accuracy' name='wordsAccuracy'>
                        <Rate allowClear />
                    </Form.Item>
                )}

                {/* Sentence fluency */}
                {yetEvalData.translationIndex && yetEvalData.sentenceFluency ? (
                    <Form.Item label='Sentence fluency'>
                        <Rate disabled defaultValue={yetEvalData.sentenceFluency} />
                    </Form.Item>
                ) : (
                    <Form.Item label='Sentence fluency' name='sentenceFluency'>
                        <Rate allowClear />
                    </Form.Item>
                )}

                {/* Culture fit */}
                {yetEvalData.translationIndex && yetEvalData.cultureFit ? (
                    <Form.Item label='Culture fit'>
                        <Rate disabled defaultValue={yetEvalData.cultureFit} />
                    </Form.Item>
                ) : (
                    <Form.Item label='Culture fit' name='cultureFit'>
                        <Rate allowClear />
                    </Form.Item>
                )}

                {/* perservation */}
                {yetEvalData.translationIndex && yetEvalData.perservation ? (
                    <Form.Item label='Perservation and Transmission of Local Colors'>
                        <Rate disabled defaultValue={yetEvalData.perservation} />
                    </Form.Item>
                ) : (
                    <Form.Item label='Perservation and Transmission of Local Colors' name='perservation'>
                        <Rate allowClear />
                    </Form.Item>
                )}

                {/* fidelity */}
                {yetEvalData.translationIndex && yetEvalData.fidelity ? (
                    <Form.Item label='Fidelity to the emotion and context of the original text'>
                        <Rate disabled defaultValue={yetEvalData.fidelity} />
                    </Form.Item>
                ) : (
                    <Form.Item label='Fidelity to the emotion and context of the original text' name='fidelity'>
                        <Rate allowClear />
                    </Form.Item>
                )}

                {/*  Overall */}
                {yetEvalData.translationIndex && yetEvalData.overall ? (
                    <Form.Item label='Overall'>
                        <Rate disabled defaultValue={yetEvalData.overall} />
                    </Form.Item>
                ) : (
                    <Form.Item label='Overall' name='overall'>
                        <Rate allowClear />
                    </Form.Item>
                )}

                {/* comment */}
                {yetEvalData.translationIndex && yetEvalData.comment ? (
                    <Form.Item label='Comment'>{yetEvalData.comment}</Form.Item>
                ) : (
                    <Form.Item label='Comment' name='comment'>
                        <TextArea placeholder='Comment' allowClear showCount maxLength={1000} />
                    </Form.Item>
                )}

                {!yetEvalData.translationIndex && (
                    <Form.Item>
                        <Button htmlType='submit' className={styles['rate-submit']}>
                            Submit
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </AmCard>
    );
};

export default ServiceRating;
