import TimeZone from '@/constants/TimeZone.json';

export const getTimeZoneName = (tzId: string) => {
    let ans: string = '';
    TimeZone.forEach(item => {
        if (tzId === item.timeZoneId) {
            ans = item.timeZoneName;
        }
    });
    return ans;
};

export const other = [];
