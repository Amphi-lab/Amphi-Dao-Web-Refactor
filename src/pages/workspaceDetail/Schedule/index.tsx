import { Steps } from 'antd';
import React from 'react';
import AmCard from '@/components/Card';
import arrowLeft from '@/assets/svg/arrow-left.svg';
import verBar from '@/assets/svg/vertical-bar.svg';
import { useAppSelector } from '@/store/hooks';
import { currentStep } from '@/store/reducers/orderDetailSlice';
import { useNavigate } from 'react-router';

import styles from './index.module.scss';

const cardStyle = {
    background: '#FFF',
    padding: '8px 24px 24px'
};
const Schedule = () => {
    const step = useAppSelector(currentStep);
    const navigate = useNavigate();
    // const dispatch = useAppDispatch();
    // const transState = useAppSelector(translationState);
    // const [currentState, setCurrentState] = useState(1);
    // const getCurrentStepState = () => {
    //     switch (transState) {
    //         case 0:
    //             dispatch(getCurrentStep(1)); // 1 pengding
    //             break;
    //         case 1:
    //         case 2:
    //         case 3:
    //             dispatch(getCurrentStep(2)); // 2 in service
    //             break;
    //         case 5:
    //             dispatch(getCurrentStep(3)); // 3 complete
    //             break;
    //         default:
    //             dispatch(getCurrentStep(1)); // 1 pengding
    //     }
    // };
    // useEffect(() => {
    //     getCurrentStepState();
    // });

    const backToMyOrder = () => {
        navigate('/myorders');
    };

    return (
        <AmCard cardStyle={cardStyle}>
            <div className={styles['order-detail-top-nav']} onClick={backToMyOrder}>
                <img src={arrowLeft} alt='' />
                <img src={verBar} alt='' className={styles['nav-ver-bar']} />
                <span>Back to my orders</span>
            </div>
            <div className={styles['order-detail-top-steps']}>
                <Steps
                    current={step}
                    items={[
                        {
                            title: 'Submit the order'
                        },
                        {
                            title: 'In service'
                        },
                        {
                            title: 'Pending Review'
                        },
                        {
                            title: 'Order completed'
                        }
                    ]}
                />
            </div>
        </AmCard>
    );
};

export default Schedule;