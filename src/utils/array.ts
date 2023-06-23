export function chunk(array: any[], len: number) {
    len = Math.ceil(len);
    if (len <= 1 || array.length < len) return array;
    const groups = [];
    const loop = Math.ceil(array.length / len);
    for (let i = 0; i < loop; i++) groups.push(array.slice(len * i, len * (i + 1)));
    return groups;
}

export function test() {}
