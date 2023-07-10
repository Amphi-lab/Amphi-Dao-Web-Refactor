import React from 'react';
import { Form } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import AmModal from './Modal';

const rejectForm = () => {
    const childRef: any = React.createRef();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <AmModal title='Reject the translation' onRef={childRef}>
            <Form
                name='reject-from'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                <Form.Item label='The Reason' name='reason'>
                    <TextArea />
                </Form.Item>
            </Form>
        </AmModal>
    );
};

export default rejectForm;
