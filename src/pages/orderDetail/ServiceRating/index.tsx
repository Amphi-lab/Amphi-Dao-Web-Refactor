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
    const [isSatisty, setIsSatisty] = useState(1);
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
            machine: isSatisty,
            translationIndex: transIndex
        };
        handleSubmit(finalParmas);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('Please comment');
    };

    //  --机翻是否满意 0=不满意 1=满意
    const handleMachine = (value: number) => {
        setIsSatisty(value);
    };

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

    console.log(yetEvalData);

    return (
        <AmCard title='Service rating'>
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
                <p className={styles['group-heading']}>The machine translation</p>
                {yetEvalData.translationIndex &&
                (yetEvalData.machine === 0 || yetEvalData.machine === 1) ? (
                    <Form.Item label='' name='machine'>
                        {yetEvalData.machine === 0 ? (
                            <span>Dissatisfied</span>
                        ) : (
                            <span>Satisfy</span>
                        )}
                    </Form.Item>
                ) : (
                    <Form.Item label='' name='machine'>
                        <Button className={styles['satisfy-btn']} onClick={() => handleMachine(1)}>
                            Satisfy
                        </Button>
                        <Button
                            className={styles['dis-satisfy-btn']}
                            onClick={() => handleMachine(0)}
                        >
                            Dissatisfied
                        </Button>
                    </Form.Item>
                )}

                <p className={styles['group-heading']}>The human validation</p>

                {/*  overall */}
                {yetEvalData.translationIndex && yetEvalData.overall ? (
                    <Form.Item label='Overall'>
                        <Rate disabled defaultValue={yetEvalData.overall} />
                    </Form.Item>
                ) : (
                    <Form.Item label='Overall' name='overall'>
                        <Rate allowClear />
                    </Form.Item>
                )}

                {/* Professional */}
                {yetEvalData.translationIndex && yetEvalData.professional ? (
                    <Form.Item label='Professional'>
                        <Rate disabled defaultValue={yetEvalData.professional} />
                    </Form.Item>
                ) : (
                    <Form.Item label='Professional' name='professional'>
                        <Rate allowClear />
                    </Form.Item>
                )}

                {/* timeliness */}
                {yetEvalData.translationIndex && yetEvalData.timeliness ? (
                    <Form.Item label='Timeliness'>
                        <Rate disabled defaultValue={yetEvalData.timeliness} />
                    </Form.Item>
                ) : (
                    <Form.Item label='Timeliness' name='timeliness'>
                        <Rate allowClear />
                    </Form.Item>
                )}

                {/* attitude */}
                {yetEvalData.translationIndex && yetEvalData.attitude ? (
                    <Form.Item label='Service Attitude'>
                        <Rate disabled defaultValue={yetEvalData.attitude} />
                    </Form.Item>
                ) : (
                    <Form.Item label='Service Attitude' name='attitude'>
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
