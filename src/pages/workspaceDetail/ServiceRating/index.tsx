import React, { useEffect, useState } from 'react';
import AmCard from '@/components/Card';
import { Button, Form, message, Select } from 'antd';  // delete Rate
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
                 {/* {yetEvalData.translationIndex && yetEvalData.grammaticalAccuracy ? ( */}
                 {/*   <Form.Item label='Grammatical accuracy'> */}
                 {/*       <Rate disabled defaultValue={yetEvalData.grammaticalAccuracy} /> */}
                 {/*   </Form.Item> */}
                 {/* ) : ( */}
                 {/*   <Form.Item label='Grammatical accuracy' name='grammaticalAccuracy'> */}
                 {/*       <Rate allowClear /> */}
                 {/*   </Form.Item> */}
                 {/* )} */}
                
                {yetEvalData.translationIndex && yetEvalData.grammaticalAccuracy ? (
                    <Form.Item label='Grammatical accuracy'>
                        <Select disabled defaultValue={yetEvalData.grammaticalAccuracy}>
                            <Select.Option value={8}>No grammatical errors (8 points)</Select.Option>
                            <Select.Option value={5}>Few grammatical errors (5 points)</Select.Option>
                            <Select.Option value={2}>Many grammatical errors (2 points)</Select.Option>
                            <Select.Option value={0}>Full of grammatical errors (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item label='Grammatical accuracy' name='grammaticalAccuracy'>
                        <Select allowClear>
                            <Select.Option value={8}>No grammatical errors (8 points)</Select.Option>
                            <Select.Option value={5}>Few grammatical errors (5 points)</Select.Option>
                            <Select.Option value={2}>Many grammatical errors (2 points)</Select.Option>
                            <Select.Option value={0}>Full of grammatical errors (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                )}

                {/* words accuracy */}
                {yetEvalData.translationIndex && yetEvalData.wordsAccuracy ? (
                    <Form.Item label='Words accuracy'>
                        <Select disabled defaultValue={yetEvalData.wordsAccuracy}>
                            <Select.Option value={8}>The words are completely accurate (8 points)</Select.Option>
                            <Select.Option value={5}>a few inappropriate words are used (5 points)</Select.Option>
                            <Select.Option value={2}>many inappropriate words are used (2 points)</Select.Option>
                            <Select.Option value={0}>completely inappropriate words are used (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item label='Words accuracy' name='wordsAccuracy'>
                        <Select allowClear>
                            <Select.Option value={8}>The words are completely accurate (8 points)</Select.Option>
                            <Select.Option value={5}>a few inappropriate words are used (5 points)</Select.Option>
                            <Select.Option value={2}>many inappropriate words are used (2 points)</Select.Option>
                            <Select.Option value={0}>completely inappropriate words are used (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                )}


                {/* Sentence fluency */}
                {yetEvalData.translationIndex && yetEvalData.sentenceFluency ? (
                    <Form.Item label='Sentence fluency'>
                        <Select disabled defaultValue={yetEvalData.sentenceFluency}>
                            <Select.Option value={8}>Very Fluent (8 points)</Select.Option>
                            <Select.Option value={5}>Moderately Fluent (5 points)</Select.Option>
                            <Select.Option value={2}>Not Fluent (2 points)</Select.Option>
                            <Select.Option value={0}>Not Fluent at All (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item label='Sentence fluency' name='sentenceFluency'>
                        <Select allowClear>
                            <Select.Option value={8}>Very Fluent (8 points)</Select.Option>
                            <Select.Option value={5}>Moderately Fluent (5 points)</Select.Option>
                            <Select.Option value={2}>Not Fluent (2 points)</Select.Option>
                            <Select.Option value={0}>Not Fluent at All (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                )}

                {/* Culture fit */}
                {yetEvalData.translationIndex && yetEvalData.cultureFit ? (
                    <Form.Item label='Culture fit'>
                        <Select disabled defaultValue={yetEvalData.cultureFit}>
                            <Select.Option value={8}>Excellent Fit (8 points)</Select.Option>
                            <Select.Option value={5}>Good Fit (5 points)</Select.Option>
                            <Select.Option value={2}>Poor Fit (2 points)</Select.Option>
                            <Select.Option value={0}>Not a Fit at All (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item label='Culture fit' name='cultureFit'>
                        <Select allowClear>
                            <Select.Option value={8}>Excellent Fit (8 points)</Select.Option>
                            <Select.Option value={5}>Good Fit (5 points)</Select.Option>
                            <Select.Option value={2}>Poor Fit (2 points)</Select.Option>
                            <Select.Option value={0}>Not a Fit at All (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                )}

                {/* Perservation and Transmission of Local Colors */}
                {yetEvalData.translationIndex && yetEvalData.perservation ? (
                    <Form.Item label='Perservation and Transmission of Local Colors'>
                        <Select disabled defaultValue={yetEvalData.perservation}>
                            <Select.Option value={8}>Fully retained (8 points)</Select.Option>
                            <Select.Option value={5}>mostly retained (5 points)</Select.Option>
                            <Select.Option value={2}>partially retained (2 points)</Select.Option>
                            <Select.Option value={0}>not retained (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item label='Perservation and Transmission of Local Colors' name='perservation'>
                        <Select allowClear>
                            <Select.Option value={8}>Fully retained (8 points)</Select.Option>
                            <Select.Option value={5}>mostly retained (5 points)</Select.Option>
                            <Select.Option value={2}>partially retained (2 points)</Select.Option>
                            <Select.Option value={0}>not retained (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                )}

                {/* Fidelity to the emotion and context of the original text */}
                {yetEvalData.translationIndex && yetEvalData.fidelity ? (
                    <Form.Item label='Fidelity to the emotion and context of the original text'>
                        <Select disabled defaultValue={yetEvalData.fidelity}>
                            <Select.Option value={9}>Completely loyal (9 points)</Select.Option>
                            <Select.Option value={6}>Mostly loyal (6 points)</Select.Option>
                            <Select.Option value={3}>Partially loyal (3 points)</Select.Option>
                            <Select.Option value={0}>No Fidelity at All (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item label='Fidelity to the emotion and context of the original text' name='fidelity'>
                        <Select allowClear>
                            <Select.Option value={9}>Completely loyal (9 points)</Select.Option>
                            <Select.Option value={6}>Mostly loyal (6 points)</Select.Option>
                            <Select.Option value={3}>Partially loyal (3 points)</Select.Option>
                            <Select.Option value={0}>No Fidelity at All (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                )}

                {/* Overall */}
                {yetEvalData.translationIndex && yetEvalData.overall ? (
                    <Form.Item label='Overall'>
                        <Select disabled defaultValue={yetEvalData.overall}>
                            <Select.Option value={10}>Very coherent (10 points)</Select.Option>
                            <Select.Option value={7}>Good (7 points)</Select.Option>
                            <Select.Option value={4}>Fair (4 points)</Select.Option>
                            <Select.Option value={0}>Poor (0 points)</Select.Option>
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item label='Overall' name='overall'>
                        <Select allowClear>
                            <Select.Option value={10}>Very coherent (10 points)</Select.Option>
                            <Select.Option value={7}>Good (7 points)</Select.Option>
                            <Select.Option value={4}>Fair (4 points)</Select.Option>
                            <Select.Option value={0}>Poor (0 points)</Select.Option>
                        </Select>
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
