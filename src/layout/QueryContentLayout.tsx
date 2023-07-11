import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Row, Col, Pagination } from 'antd';

import type { ColProps, FormInstance, FormProps, PaginationProps, FormItemProps } from 'antd';

import PageTitle from '@/components/PageTitle';
import { DefaultPageSize } from '@/contracts/constants';
import { noop } from '@/utils/util';

import './queryContentLayout.scss';

export type QueryItem = {
    colProps?: ColProps;
    name: string;
    itemRender: React.ReactNode;
} & FormItemProps;

type QueryContentLayoutProps = React.PropsWithChildren<{
    initFormValues: FormProps['initialValues'];
    pageNum: number;
    total: number;
    title: string;
    queryItems: QueryItem[];

    onFormValuesChange?: FormProps['onValuesChange'];
    onPageChange?: PaginationProps['onChange'];
}>;

export type QueryContentLayoutRef = { form: FormInstance };

export default forwardRef<QueryContentLayoutRef, QueryContentLayoutProps>(function QueryContentPage(
    {
        initFormValues,
        title,
        pageNum,
        total,
        queryItems,
        onFormValuesChange = noop,
        onPageChange = noop,
        children
    },
    ref
) {
    const formRef = React.useRef<FormInstance>(null);

    useImperativeHandle(
        ref,
        () => ({
            form: formRef.current!
        }),
        []
    );

    return (
        <>
            <PageTitle title={title} />
            <div className='query-content-page-content'>
                <Form
                    ref={formRef}
                    initialValues={initFormValues}
                    onValuesChange={onFormValuesChange}
                >
                    <Row gutter={8} wrap>
                        {queryItems.map(({ colProps = {}, name, itemRender }) => (
                            <Col key={name} {...colProps}>
                                <Form.Item name={name}>{itemRender}</Form.Item>
                            </Col>
                        ))}
                    </Row>

                    {children}

                    <Row style={{ marginTop: '16px' }} justify='end'>
                        <Col>
                            <Pagination
                                current={pageNum}
                                total={total}
                                pageSize={DefaultPageSize}
                                showSizeChanger={false}
                                showTotal={value => `Total ${value} items`}
                                onChange={onPageChange}
                            />
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
});
