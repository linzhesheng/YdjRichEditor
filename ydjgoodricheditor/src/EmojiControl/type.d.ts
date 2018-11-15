import { EditorState } from 'draft-js'

export interface IProp {
    editorState: EditorState,
    onAddEmoji(editorState: EditorState): void
}