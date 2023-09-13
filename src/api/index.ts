// 使用 import.meta.glob 动态导入 './interface/' 目录下所有的 .ts 文件。
// eager: true 表示在模块初始化时立即加载这些模块，而不是延迟加载。
const requireApi = import.meta.glob('./interface/*.ts', { eager: true });

// 创建一个名为 module 的对象，用于存放从各个模块中导入的内容。
const module: { [k: string]: any } = {};

// 遍历 requireApi 中的所有键（即模块路径）。
Object.keys(requireApi).forEach((key: string) => {
    // 如果key是 './index.ts' 或 './axios.ts'，则跳过该模块，不进行处理。
    if (key === './index.ts' || key === './axios.ts') return;
    // 使用 Object.assign 将当前模块的导出内容合并到 module 对象中。
    Object.assign(module, requireApi[key]);
});
export default module;
