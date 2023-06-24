import React from 'react';
import { Button, Col, Form, Row, Select } from 'antd';
import { currentLanguages, translationTypes } from '@/constants/selcet.json';

interface IProps {
    isRequired?: boolean;
    size?: 'large' | 'middle' | 'small';
}

export default ({ isRequired = true, size = 'middle' }: IProps) => {
    const selectList = [
        {
            label: 'Translate from',
            name: 'from',
            rules: isRequired ? [{ required: true, message: 'Please select Translate from' }] : [],
            placeholder: 'Select a language',
            options: currentLanguages
        },
        {
            label: 'Translate to',
            name: 'to',
            rules: isRequired ? [{ required: true, message: 'Please select Translate to' }] : [],
            placeholder: 'Select a language',
            options: currentLanguages
        },
        {
            label: 'Service Type',
            name: 'type',
            rules: isRequired ? [{ required: true, message: 'Please select Service Type' }] : [],
            placeholder: 'Select a Service Type',
            options: translationTypes
        }
    ];
    const onFinish = () => {};
    const onFinishFailed = () => {};
    return (
        <Form
            layout='vertical'
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <Row align='bottom' gutter={20}>
                {selectList.map(({ label, name, rules, placeholder, options }) => (
                    <Col flex='auto' key={name}>
                        <Form.Item label={label} name={name} rules={rules}>
                            <Select
                                size={size}
                                showSearch
                                allowClear
                                placeholder={placeholder}
                                optionFilterProp='label'
                                options={options}
                            />
                        </Form.Item>
                    </Col>
                ))}
                {isRequired ? null : (
                    <Col flex='auto'>
                        <Form.Item>
                            <Button type='primary' ghost block>
                                Start
                            </Button>
                        </Form.Item>
                    </Col>
                )}
            </Row>
        </Form>
    );
};