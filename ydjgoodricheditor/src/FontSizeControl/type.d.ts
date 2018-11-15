import { EditorState } from 'draft-js'

export interface IProp {
    editorState: EditorState,
    onFontSizeChange(editorState: EditorState): void
}