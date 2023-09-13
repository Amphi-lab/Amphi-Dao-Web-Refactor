import React, { useState } from 'react';
import AmCard from '@/components/Card';
import IconButton from '@/components/IconButton';
import EditIcon from '@/components/Icon/Edit';
import CancelIcon from '@/components/Icon/Cancel';
import { Button, Modal, message } from 'antd';
import { useNavigate, useLocation } from 'react-router';
// import { getAmphi } from '@/contracts/contract';
// import { useAppSelector } from '@/store/hooks';
// import { translationIndex } from '@/store/reducers/orderDetailSlice';
import api from '@/api';
import WarningIcon from '@/assets/svg/warning.svg';
import OrderDes from './orderDes';
import styles from './index.module.scss';

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
    const location = useLocation();
    const id = location.state || +location.pathname.split('/')[2];

    const [isOpen, setIsOpen] = useState(false);

    // 取消任务
    const cancelTask = async () => {
        api.cancelOrder(id)
            .then((res: any) => {
                console.log(res);
                if (res.code === 200) {
                    message.success('Order cancelled successfully');
                }
            })
            .catch((err: any) => {
                console.log(err);
            });
    };

    // 点击modal Yes 按钮
    const handleOk = () => {
        cancelTask();
        setIsOpen(false);
    };

    // 点击modal No 按钮
    const handleCancel = () => {
        setIsOpen(false);
    };

    // 显示modal
    const showModalConfirm = () => {
        setIsOpen(true);
    };

    const handleEditOrder = () => {
        navigate('/requestTranslation');
    };

    const orderRight = (
        <div>
            <IconButton icon={EditIcon} text='Edit order information' onClick={handleEditOrder} />
            <IconButton icon={CancelIcon} text='Cancel the order' onClick={showModalConfirm} />
        </div>
    );
    return (
        <>
            <AmCard
                title='Order Title'
                cardStyle={cardStyle}
                titleStyle={titleStyle}
                rightContent={orderRight}
            >
                <OrderDes />
            </AmCard>
            <Modal
                title={
                    <div className={styles['cancel-modal-title']}>
                        <img src={WarningIcon} alt='' />
                        <span>Warning!</span>
                    </div>
                }
                open={isOpen}
                footer={
                    <div className={styles['custom-cancal-modal']}>
                        <Button className={styles['yes-btn']} onClick={handleOk}>
                            Yes
                        </Button>
                        <Button className={styles['no-btn']} type='primary' onClick={handleCancel}>
                            No
                        </Button>
                    </div>
                }
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to cancel?</p>
            </Modal>
        </>
    );
};

export default Detail;
