import React from 'react';
import type { FC } from 'react';
import { Row, Col, Card } from 'antd';
// components
import RequestTransForm from '@/components/RequestTransForm';
// images
import ImageAbout1 from '@/assets/images/about1.png';
import ImageAbout2 from '@/assets/images/about2.png';
import ImageAbout3 from '@/assets/images/about3.png';
import ImageAbout4 from '@/assets/images/about4.png';
import HomeSection from '@/pageComponents/home/HomeSection';
import Bounties from '@/pageComponents/home/Bounties';
// import Translators from '@/pageComponents/home/Translators';
import './index.scss';

const { Meta } = Card;

// const Banner: FC = () => {
//     return (
//         <div className='home-banner'>
//             <h1>A new language service</h1>
//             <h1 className='primary'>marketplace</h1>
//             <h3>AI translation + human proofreading marketplace</h3>
//             <Button size='large' className='primary'>
//                 Go now
//             </Button>
//         </div>
//     );
// };

const dataList = [
    {
        title: 'Global Language Service Network',
        imageUrl: ImageAbout1,
        description:
            'By aggregating global language service providers, it breaks geographical limitations and allows efficient allocation of worldwide language resources.'
    },
    {
        title: 'Decentralized Project Management',
        imageUrl: ImageAbout2,
        description:
            'Projects are initiated and organized on a decentralized platform, reducing intermediaries and fostering efficiency and direct engagement.'
    },
    {
        title: 'AI Assistance for Efficiency',
        imageUrl: ImageAbout3,
        description:
            'The application of AI in language services, such as automatic translation and voice recognition, greatly boosts efficiency and focus.'
    },
    {
        title: 'Metaverse for Transactions and Socializing',
        imageUrl: ImageAbout4,
        description:
            'All services and transactions occur within the built metaverse, offering a more free, direct, and enriching exchange and social experience.'
    }
];

const index: FC = () => {
    return (
        <div>
            {/* banner */}
            {/* <Banner /> */}
            {/* Earn Bounties by Translating */}
            <Bounties />
            {/* Our Translators */}
            {/* <Translators /> */}
            {/* Get your professional translation */}
            <HomeSection
                className='home-prof-translation'
                title='Get your professional translation'
            >
                <RequestTransForm isRequired={false} size='large' />
            </HomeSection>
            {/* What Does Amphi do */}
            <HomeSection className='home-aboutus' title='What Does Amphi do'>
                <Row gutter={[50, 60]}>
                    {dataList.map(({ title, imageUrl, description }) => (
                        <Col xs={10} sm={10} md={8} lg={6} xl={6} key={title}>
                            <Card cover={<img alt='example' src={imageUrl} />}>
                                <Meta title={title} description={description} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </HomeSection>
        </div>
    );
};

export default index;
