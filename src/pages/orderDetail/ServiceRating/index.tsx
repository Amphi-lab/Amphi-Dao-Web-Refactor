import React from 'react';
import AmCard from '@/components/Card';
import { Button, Form, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
// import UnSelectedStar from '@/components/Icon/UnSelectedStar';
// import SelectedStar from '@/components/Icon/SelectedStar';
import styles from './index.module.scss';

const ServiceRating = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <AmCard title='Service rating'>
            <Form
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
                <Form.Item label='' name='machine'>
                    <Button>Satisfy</Button>
                    <Button>Dissatisfied</Button>
                </Form.Item>
                <p className={styles['group-heading']}>The human validation</p>
                <Form.Item label='Overall' name='overall'>
                    <Rate allowClear />
                </Form.Item>
                <Form.Item label='Professional' name='professional'>
                    <Rate allowClear />
                </Form.Item>
                <Form.Item label='Timeliness' name='timeliness'>
                    <Rate allowClear />
                </Form.Item>
                <Form.Item label='Service Attitude' name='serviceAttitude'>
                    <Rate allowClear />
                </Form.Item>
                <Form.Item label='Comment' name='comment'>
                    <TextArea placeholder='Comment' allowClear showCount maxLength={1000} />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </AmCard>
    );
};

export default ServiceRating;
