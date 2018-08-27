import { HTMLAttributes } from 'react'
import {
    EditorState
} from 'draft-js'

export type IEditorProp = {
    onChange?(value: EditorState): void
    imageUploadConfig?: {
        action: string
        cdnUrl: string
        getQnToken: (data: object) => Promise<Http.IResponse>
    }
    functionConfig?: {
        textColorControl?: boolean
        myTextColorControl?: boolean
        blockStyleControl?: boolean
    }
} & HTMLAttributes<any>