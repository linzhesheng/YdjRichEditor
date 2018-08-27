interface PlainObject {
    [key: string]: any;
}

interface Console {
    dev?: (param: any) => any;
}

declare module "*.png";

/**
 * 环境设置模块
 */
declare module 'env' {
    import env from 'env/dev'
    export default env
}
