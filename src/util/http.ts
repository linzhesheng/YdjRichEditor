import Axios, { AxiosInstance } from 'axios'
import { debounce } from 'lodash'
import Cookies from 'js-cookie'
import { message } from 'antd'
import qs from 'qs'
import md5 from 'blueimp-md5'

const methods = ['get', 'post']

const logMessage = (msg: string) => {
    message.error(msg)
}
const reLogin = (msg: string) => {
    message.error(msg)
    setTimeout(() => {
        window.location.href = '/#/login'
    }, 300)
}

const $logMessage = debounce(logMessage, 300)
const $reLogin = debounce(reLogin, 300)

export default class Http {
    opts: Http.IConstructorOpts
    instance: AxiosInstance
    methods: Http.IMethods = {}

    constructor(opts: Http.IConstructorOpts) {
        this.opts = {
            timeout: 10000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            format: 'array',
            ...opts
        }
        this.instance = Axios.create({
            baseURL: this.opts.baseUrl,
            headers: this.opts.headers,
            timeout: this.opts.timeout
        })
        this.initMethods()
    }

    initMethods() {
        methods.forEach(method => {
            this.methods[method] = async (
                url: string,
                data: object,
                apiOpts: Http.IApitOpts
            ) => {
                const allApiOpts = {
                    shouldShowUniyErrorTip: true,
                    ...apiOpts
                }

                const res = await this.instance({
                    method,
                    url: `${this.opts.prefix}${url}`,
                    params: method === 'get' ? this.genFinialParams(data) : '',
                    data: method === 'post' ? qs.stringify(this.genFinialParams(data)) : ''
                })

                if(res.status == 200) {
                    const response = res.data
                    if (response.code == 1) {
                        return Promise.resolve(response.data)
                    } else {
                        if (allApiOpts.shouldShowUniyErrorTip) {
                            $logMessage(response.message)
                        }

                        return Promise.reject(response.message)
                    }
                } else {
                    $logMessage('网络或者服务器出问题了')
                    return Promise.reject('网络或者服务器出问题了')
                }
            }
        })
    }

    genFinialParams(data: object) {
        const ts = parseInt(`${Date.now() / 1000}`, 10)

        return {
            ts,
            key: this.opts.proKey,
            sign: md5(`${ts}`),
            format: this.opts.format,
            token: Cookies.get('token'),
            staff_id: Cookies.get('userId'),
            ...data
        }
    }
}
