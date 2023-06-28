import React from 'react';

import Card from '../Card';
import styles from './index.module.scss';

const ConfirmOrders = () => {
    // const hanldeSaveOrder = () => {
    //     console.log('hanldeSaveOrder');
    // };
    return (
        <Card>
            <div className={styles['confirme-order-box']}>
                <h6>Money Back Guarantee</h6>
                <ul>
                    <li>After payment, you can cancel the order for free within 30 minutes.</li>
                    <li>
                        If no translator accepts the order within 24 hours, the bounty will be
                        refunded.
                    </li>
                </ul>
                {/* <Button
                    type='primary'
                    htmlType='submit'
                    className={styles['confirm-btn']}
                    onClick={hanldeSaveOrder}
                >
                    Confirm Order
                </Button> */}
            </div>
        </Card>
    );
};

export default ConfirmOrders;
