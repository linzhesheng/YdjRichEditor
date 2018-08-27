import { UploadFile } from 'antd/lib/upload/interface'

export interface IProp {
    value?:object[]
    limitNum: number
    onChange?(fileList: UploadFile[]): void
    imageUploadConfig?: {
        action: string
        cdnUrl: string
        getQnToken: (data: object) => Promise<Http.IResponse>
    }
}

export interface IState {
    fileList: UploadFile[]
    args: object
    previewImage: string
    previewVisible: boolean
}
