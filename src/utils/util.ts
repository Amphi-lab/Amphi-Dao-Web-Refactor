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

export const formatFileList = (fileList: [any]) => {
    return fileList?.map(file => {
        return {
            fileName: file?.name,
            filePath: file?.response?.data?.path,
            fileType: 0, // 0: 文本， 1：视频， 2：音频
            fileSize: file?.size
        };
    });
};

export const getTotalWorkload = (fileList: [any]) => {
    let total = 0;
    fileList.forEach(file => {
        total += Number(file?.response?.data?.wordCount || 0);
    });
    return total;
};
