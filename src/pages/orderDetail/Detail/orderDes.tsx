import React from 'react';
import { Descriptions } from 'antd';
import copyIcon from '@/assets/svg/icon-copy.svg';

const App: React.FC = () => (
    <Descriptions layout='vertical'>
        <Descriptions.Item label='Language'>Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label='Workload'>1810000000</Descriptions.Item>
        <Descriptions.Item label='Your upcoming payment'>2,798USTD</Descriptions.Item>
        <Descriptions.Item label='Submission time'>Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label='Deadline'>1810000000</Descriptions.Item>
        <Descriptions.Item label='Order number'>
            <span>No.xxxxxxxxxxxxxx</span>
            <img src={copyIcon} alt='' />
        </Descriptions.Item>
        <Descriptions.Item label='Content to translate'>
            <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>
        </Descriptions.Item>
        <Descriptions.Item label='Instructions for Translator' span={2}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam blanditiis debitis
            consequuntur pariatur ratione harum beatae ipsum saepe! Neque quas quae rem alias vitae
            quaerat earum ea similique molestiae facere.
        </Descriptions.Item>
    </Descriptions>
);

export default App;
