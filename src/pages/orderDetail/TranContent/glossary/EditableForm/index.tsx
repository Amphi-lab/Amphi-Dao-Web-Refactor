import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import IconButton from '@/components/IconButton';
import deleteIcon from '@/components/Icon/Delete';
import api from '@/api';
import { useAppSelector } from '@/store/hooks';
import { translationIndex } from '@/store/reducers/orderDetailSlice';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`
                    }
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className='editable-cell-value-wrap'
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    id: number;
    source: string;
    target: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const App: React.FC = () => {
    const transIndex = useAppSelector(translationIndex);
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [count, setCount] = useState(1);
    // const [glossaryList, setGlossaryList] = useState<any>([]);

    const fetchDelGlossaryItem = async (id: number) => {
        api.deleteGlossaryItem(id).then((res: any) => {
            if (res.code === 200) {
                message.success('Deleted successfully');
            }
        });
    };

    const handleDelete = (id: number) => {
        fetchDelGlossaryItem(id);
        const newData = dataSource.filter(item => item.id !== id);
        setDataSource(newData);
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Translation from',
            dataIndex: 'source',
            editable: true
        },
        {
            title: 'Translation to',
            dataIndex: 'target',
            editable: true
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record: { id: number }) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.id)}>
                        <IconButton icon={deleteIcon} text='Delete' />
                    </Popconfirm>
                ) : null
        }
    ];

    const handleAdd = () => {
        const newData: DataType = {
            id: count,
            source: `defalut`,
            target: `defalut`
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const fetchAddGlossaryItem = async (data: any) => {
        const parmas = {
            translationIndex: transIndex,
            translationCharactor: 'Buyer', // --需求方提交的传Buyer,翻译者提交的传Translator
            source: data.source, // --单词
            target: data.target // --对应的翻译单词
        };
        api.addGlossaryItem(parmas).then((res: any) => {
            if (res.code === 200) {
                message.success('Added successly!');
            }
        });
    };

    const handleSave = (row: DataType) => {
        fetchAddGlossaryItem(row);
        // console.log('row', row);
        const newData = [...dataSource];
        const index = newData.findIndex(item => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });
        // console.log('newData', newData);
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell
        }
    };

    const columns = defaultColumns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave
            })
        };
    });

    useEffect(() => {
        // get glossary list
        if (transIndex !== '0') {
            api.getGlossaryList(transIndex).then((res: any) => {
                // console.log('glossary', res);
                if (res.code === 200 && res.rows.length > 0) {
                    console.log('glossary', res.rows);
                    // setGlossaryList([...dataSource, ...res.rows]);
                    setDataSource([...dataSource, ...res.rows]);
                    console.log(dataSource);
                }
            });
        }
    }, [transIndex]);

    return (
        <div>
            <Button onClick={handleAdd} type='primary' style={{ color: '#fff' }}>
                + Add
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns as ColumnTypes}
            />
        </div>
    );
};

export default App;
