// 字符串过长，中间打点
export const getSubStr = (str: string): string => {
    if (str.length < 10) return str
    return str.slice(0, 4) + "..." + str.slice(-4)
}