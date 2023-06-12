import React from 'react';
import type { FC } from 'react';
import { Button, Col, Form, Row, Select } from 'antd';
import { currentLanguages, translationTypes } from '@/constants/selcet.json';

const Component: FC = ({ isRequired }: any = { isRequired: false }) => {
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

export default Component;
