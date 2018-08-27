import Http from 'util/http'
import config from 'env'
import { message } from "antd"

// 创建管家http 实例
const fandomHttp = new Http({
    baseUrl: config.baseUrl,
    proKey: config.proKey,
    prefix: config.prefix
})

const { get, post } = fandomHttp.methods

export const login = (data: object) => post('api/staff/login', data)
