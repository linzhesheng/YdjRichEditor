import { EditorState } from 'draft-js'

export interface IProp {
    editorState: EditorState,
    onAddLink(editorState: EditorState): void
    onRemoveLink(editorState: EditorState): void
}