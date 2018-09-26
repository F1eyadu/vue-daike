import axios from 'axios'
import config from './config'
import qs from 'qs'

import { Toast } from 'vant'

export default function $axios(options) {
    console.log(options)
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseURL,
            headers: config.headers,
            transformResponse: [function (data) { }]
        })
        instance.interceptors.request.use(
            config => {
                if (config.method.toLocaleLowerCase() === 'post'
                    || config.method.toLocaleLowerCase() === 'put'
                    || config.method.toLocaleLowerCase() === 'delete') {
                    config.data = qs.stringify(config.data)
                }
                return config
            },
            error => {
                console.log('request:', error)
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    console.log('请求超时')
                }
                const errorInfo = error.response
                if (errorInfo) {
                    const errorStatus = errorInfo.status
                    router.push({
                        path: `/error/${errorStatus}`
                    })
                }
                return Promise.reject(error)
            }
        )

        instance.interceptors.response.use(
            response => {
                let data
                if (response.data == undefined) {
                    data = response.request.responseText
                } else {
                    data = response.data
                }
                data = JSON.parse(data)
                switch (data.code) {
                    case 0:
                        const message = data.msg || 'Error'
                        Toast.fail({
                            message,
                            duration: 1000
                        })
                        return Promise.reject(message)
                    default:
                }
                return data
            },
            err => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误'
                            break

                        case 401:
                            err.message = '未授权，请登录'
                            break
                        case 403: 
                            err.message = '拒绝访问'
                            break
                        case 404:
                            err.message = `请求地址错误: ${err.response.config.url}`
                            break
                        case 408:
                            err.message = '请求超时'
                            break
                        case 500:
                            err.message = '服务器内部错误'
                            break
                        case 501:
                            err.message = '服务未实现'
                            break
                        case 502:
                            err.message = '网关错误'
                            break
                        case 503:
                            err.message = '服务不可取'
                            break
                        case 504:
                            err.message = '网关超时'
                            break
                        case 505:
                            err.message = 'HTTP版本不受支持'
                            break
                        default:
                    }
                }

                console.log(err)
                return Promise.reject(err)
            }
        )
        instance(options)
            .then((res) => {
                resolve(res)
                return false
            })
            .catch((error) => {
                reject(error)
            })
    })
}
