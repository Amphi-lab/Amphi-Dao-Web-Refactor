import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "https://api.amphi.space/";

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    (config) => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            "Content-Type": "application/json",
        };
        return config;
    },
    (error) => Promise.reject(error),
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response) => {
        if (response.status === 403) {
            console.log("Login Information Expired, Please Log In Again")
        }
        return response;
    },
    (error) => {
        console.log("请求出错：", error);
    },
);

// 失败提示
function errorMsg(err: any) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                alert(err.response.data.error.details);
                break;
            case 401:
                alert("未授权，请登录");
                break;

            case 403:
                alert("拒绝访问");
                break;

            case 404:
                alert("请求地址出错");
                break;

            case 408:
                alert("请求超时");
                break;

            case 500:
                alert("服务器内部错误");
                break;

            case 501:
                alert("服务未实现");
                break;

            case 502:
                alert("网关错误");
                break;

            case 503:
                alert("服务不可用");
                break;

            case 504:
                alert("网关超时");
                break;

            case 505:
                alert("HTTP版本不受支持");
                break;
            default:
        }
    }
}

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */

export const get = (url: string, params = {}) => new Promise((resolve, reject) => {
        axios.get(url, { params })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                errorMsg(err);
                reject(err);
            });
    })
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export const post = (url: string, data: any) => new Promise((resolve, reject) => {
        axios.post(url, data)
        .then( res => {
            // 关闭进度条
            resolve(res.data);
        })
        .catch((err) => {
            errorMsg(err);
            reject(err);
        });
    })

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export const put = (url: string, data: any) => new Promise((resolve, reject) => {
        axios.put(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                errorMsg(err);
                reject(err);
            },
        );
    })

export default axios;
