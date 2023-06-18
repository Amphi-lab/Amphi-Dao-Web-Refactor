import globalTheme from './global.json';

export default {
    token: {
        colorPrimary: '#0049ff',
        colorSuccess: '#00943e',
        colorWarning: '#eca20f',
        colorError: '#e34949',
        colorInfo: '#507aec',
        colorText: '#323335',
        colorTextSecondary: '#64666B',
        colorTextTertiary: '#969AA0',
        colorTextQuaternary: '#BFC1C5',
        colorTextPlaceholder: '#969AA0',
        colorTextDisabled: '#BFC1C5',
        fontSizeHeading1: 40,
        fontSizeHeading2: 36,
        fontSizeHeading3: 32,
        fontSizeHeading4: 28,
        fontSizeHeading5: 24,
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
            colorPrimaryHover: '#000000'
        },
        Table: {
            colorTextHeading: '#666666',
            fontSize: 20,
            fontWeightStrong: 400
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
