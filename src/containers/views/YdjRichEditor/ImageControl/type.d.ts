import { EditorState } from 'draft-js'

export interface IProp {
    editorState: EditorState,
    onAddImage(editorState: EditorState): void
    imageUploadConfig?: {
        action: string
        cdnUrl: string
        getQnToken: (data: object) => Promise<Http.IResponse>
    }
}