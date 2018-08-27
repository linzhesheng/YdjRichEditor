import { Cascader } from "antd";

declare module 'antd/lib/Cascader' {
    export interface CascaderProps {
        autoFocus?: boolean,
        onKeyDown?: (evt) => void
    }
}

