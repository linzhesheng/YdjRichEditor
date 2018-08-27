import {EditorState} from 'draft-js'

export interface IProp {
    editorState:EditorState,
    onBlockStyleChange(editorState:EditorState):void
}