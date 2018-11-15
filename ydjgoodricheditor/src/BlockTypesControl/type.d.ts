import {EditorState} from 'draft-js'

export interface IProp {
    editorState:EditorState,
    onBlockTypeChange(editorState:EditorState):void
}