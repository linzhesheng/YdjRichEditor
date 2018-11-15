import { EditorState } from 'draft-js'

export interface IProp {
    editorState: EditorState,
    onTextColorChange(editorState: EditorState): void
}