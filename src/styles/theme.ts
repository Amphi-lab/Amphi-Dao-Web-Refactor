import globalTheme from './global.json';

export default {
    token: {
        colorPrimary: '#0049ff',
        colorSuccess: '#00943e',
        colorWarning: '#eca20f',
        colorError: '#e34949',
        colorInfo: '#507aec',
        fontSizeHeading1: 48,
        fontSizeHeading2: 40,
        fontSizeHeading3: 36,
        fontSizeHeading4: 32,
        fontSizeHeading5: 28,
        borderRadiusSM: 4,
        borderRadiusLG: 12,
        borderRadiusXS: 2
    },
    components: {
        Button: {
            controlHeightLG: 75,
            controlHeight: 50,
            controlHeightSM: 20,
            fontSizeLG: 30,
            fontSize: 20
        },
        Tabs: {
            titleFontSizeLG: 30,
            colorBorderSecondary: '#000000',
            colorPrimary: '#000000',
            colorPrimaryActive: '#000000',
            colorPrimaryHover: '#000000',
            colorText: '#333333'
        },
        Table: {
            colorText: '#666666',
            colorTextHeading: '#666666',
            fontSize: 20,
            fontWeightStrong: 'normal'
        },
        Card: {
            padding: 10
        },
        Form: {
            ...globalTheme
        },
        Input: {
            ...globalTheme
        },
        InputNumber: {
            ...globalTheme
        },
        Select: {
            ...globalTheme
        },
        Mentions: {
            ...globalTheme
        }
    }
};
