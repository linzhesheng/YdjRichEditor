import {EditorState} from 'draft-js'

export interface IProp {
    editorState:EditorState,
    onInlineTypeChange(editorState:EditorState):void
}