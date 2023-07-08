import React, { useState } from 'react';
import AmCard from '@/components/Card';
import IconButton from '@/components/IconButton';
import EditIcon from '@/components/Icon/Edit';
import CancelIcon from '@/components/Icon/Cancel';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router';
// import { useLocation } from 'react-router-dom';
// import { getAmphi } from '@/contracts/contract';
// import { useAppSelector } from '@/store/hooks';
// import { translationIndex } from '@/store/reducers/orderDetailSlice';
import OrderDes from './orderDes';
import styles from './index.module.scss';

const { confirm } = Modal;

const cardStyle = {
    background: '#FFF',
    padding: '16px 24px 24px'
};
const titleStyle = {
    marginBottom: '24px'
};

const Detail = () => {
    // const transIndex = useAppSelector(translationIndex);
    const navigate = useNavigate();
    // const location = useLocation();
    // const id = location.state || +location.pathname.split('/')[2];

    const [isOpen, setIsOpen] = useState(false);

    // 取消任务
    const cancelTask = async () => {
        // const amphi = await getAmphi();
        // amphi.methods
        //     .closeTask(transIndex)
        //     .call()
        //     .then((data: any) => {
        //         console.log(data);
        //     })
        //     .catch((err: any) => {
        //         console.log('err', err);
        //     });
    };

    const handleOk = () => {
        console.log('ok', isOpen);
        cancelTask();
        setIsOpen(false);
    };

    const handleCancel = () => {
        console.log('cancelled', isOpen);
        setIsOpen(false);
    };

    const showConfirm = () => {
        confirm({
            open: isOpen,
            title: 'Warning!',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to cancel?',
            closable: true,
            maskClosable: true,
            // okText: 'No',
            // cancelText: 'Yes',
            // onOk() {
            //     console.log('OK');
            // },
            // onCancel() {
            //     console.log('Cancel');
            // },
            footer: (
                <div className={styles['custom-cancal-modal']}>
                    <Button className={styles['yes-btn']} onClick={handleOk}>
                        Yes
                    </Button>
                    <Button className={styles['no-btn']} type='primary' onClick={handleCancel}>
                        No
                    </Button>
                </div>
            )
        });
    };

    const handleEditOrder = () => {
        navigate('/requestTranslation');
    };

    const orderRight = (
        <div>
            <IconButton icon={EditIcon} text='Edit order information' onClick={handleEditOrder} />
            <IconButton icon={CancelIcon} text='Cancel the order' onClick={showConfirm} />
        </div>
    );
    return (
        <AmCard
            title='Order Detail'
            cardStyle={cardStyle}
            titleStyle={titleStyle}
            rightContent={orderRight}
        >
            <OrderDes />
        </AmCard>
    );
};

export default Detail;
