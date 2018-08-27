declare namespace Http {
    interface IConstructorOpts {
        baseUrl: string
        proKey: string
        format?: string
        timeout?: number
        headers?: object
        [props: string]: any
    }

    interface IResponse {
        [props: string]: any
    }

    interface IMethods {
        get?(url: string, data: object, apiOpts?: IApitOpts): Promise<IResponse>
        post?(
            url: string,
            data: object,
            apiOpts?: IApitOpts
        ): Promise<IResponse>
    }

    interface IApitOpts {
        shouldShowUniyErrorTip?: boolean
        [props: string]: any
    }
}
