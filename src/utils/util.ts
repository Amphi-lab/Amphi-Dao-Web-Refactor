import TimeZone from '@/constants/TimeZone.json';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
export const getTimeZoneName = () => {
    let ans: string = '';
    const tzId = dayjs.tz.guess();
    TimeZone.forEach(item => {
        if (tzId === item.timeZoneId) {
            ans = item.timeZoneName;
        }
    });
    return ans;
};

export const other = [];
