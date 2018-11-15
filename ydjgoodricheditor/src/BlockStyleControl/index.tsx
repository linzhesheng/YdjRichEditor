import * as React from 'react'
import { IProp } from './type'
import {
    setBlockData,
    getSelectedBlocksMetadata
} from "draftjs-utils"
import {
    convertFromRaw,
    convertToRaw,
} from 'draft-js'
import { Button, Dropdown, Icon, InputNumber } from 'antd'
import '../Common/style.css'

const alignList = [
    { value: 'left', title: '左对齐' },
    { value: 'center', title: '居中对齐' },
    { value: 'right', title: '右对齐' },
    { value: 'justify', title: '两端对齐' },
]

export default class BlockStyleControl extends React.Component<IProp> {

    state = {

    }

    // 点击缩进按钮
    onHandleIndentation = (e) => {
        e.preventDefault()

        const { editorState } = this.props
        const selectedBlocksMetadata = getSelectedBlocksMetadata(editorState)
        let newEditorState = null

        if (selectedBlocksMetadata.get('text-indent')) {
            const types = this.getAllBlockType(undefined, selectedBlocksMetadata.get('line-height'), selectedBlocksMetadata.get('letter-spacing'), selectedBlocksMetadata.get('text-align'))
            newEditorState = setBlockData(editorState, types)
        } else {
            const types = this.getAllBlockType('2em', selectedBlocksMetadata.get('line-height'), selectedBlocksMetadata.get('letter-spacing'), selectedBlocksMetadata.get('text-align'))
            newEditorState = setBlockData(editorState, types)
        }

        this.props.onBlockStyleChange(newEditorState)
    }

    // 行高改变
    onLineHeightChange = (value) => {
        const lineHeight = value
        const { editorState } = this.props
        const selectedBlocksMetadata = getSelectedBlocksMetadata(editorState)
        const types = this.getAllBlockType(selectedBlocksMetadata.get('text-indent'), lineHeight, selectedBlocksMetadata.get('letter-spacing'), selectedBlocksMetadata.get('text-align'))
        const newEditorState = setBlockData(editorState, types)
        this.props.onBlockStyleChange(newEditorState)
    }

    // 字间距改变
    onWordSpacingChange = (value) => {
        const letterSpacing = value
        const { editorState } = this.props
        const selectedBlocksMetadata = getSelectedBlocksMetadata(editorState)
        const types = this.getAllBlockType(selectedBlocksMetadata.get('text-indent'), selectedBlocksMetadata.get('line-height'), `${letterSpacing}px`, selectedBlocksMetadata.get('text-align'))
        const newEditorState = setBlockData(editorState, types)
        this.props.onBlockStyleChange(newEditorState)
    }

    // 点击对齐按钮
    onHandleAligning = (e) => {
        e.preventDefault()
        const textAlign = e.target.value
        const { editorState } = this.props
        const selectedBlocksMetadata = getSelectedBlocksMetadata(editorState)
        let newEditorState = null
        if (selectedBlocksMetadata.get('text-align') !== textAlign) {
            const types = this.getAllBlockType(selectedBlocksMetadata.get('text-indent'), selectedBlocksMetadata.get('line-height'), selectedBlocksMetadata.get('letter-spacing'), textAlign)
            newEditorState = setBlockData(editorState, types)
        } else {
            const types = this.getAllBlockType(selectedBlocksMetadata.get('text-indent'), selectedBlocksMetadata.get('line-height'), selectedBlocksMetadata.get('letter-spacing'), undefined)
            newEditorState = setBlockData(editorState, types)
        }
        this.props.onBlockStyleChange(newEditorState)
    }

    // 得到总样式
    getAllBlockType = (textIndent, lineHeight, letterSpacing, textAlign) => {
        return {
            'text-indent': textIndent,
            'line-height': lineHeight,
            'letter-spacing': letterSpacing,
            'text-align': textAlign
        }
    }

    render() {

        const { editorState } = this.props
        const selectedBlocksMetadata = getSelectedBlocksMetadata(editorState)

        const btnClassName = selectedBlocksMetadata.get('text-indent') ? 'activeButton' : ''
        const lineHeight = selectedBlocksMetadata.get('line-height') ? selectedBlocksMetadata.get('line-height') : 1.5
        let letterSpacing = selectedBlocksMetadata.get('letter-spacing')
        letterSpacing = letterSpacing ? letterSpacing.substring(0, letterSpacing.indexOf('px')) : 0
        const textAlign = selectedBlocksMetadata.get('text-align')

        return (
            <div style={{ display: 'inline-block', marginBottom: 15, }}>

                <Button
                    style={{ marginLeft: 8 }}
                    onMouseDown={this.onHandleIndentation}
                    className={btnClassName}
                >
                    缩进
                </Button>
                <div style={{ display: 'inline-block', marginLeft: 8 }}>行高:<InputNumber style={{ width: 60 }} min={0} max={100} value={lineHeight} step={0.1} onChange={this.onLineHeightChange} /></div>
                <div style={{ display: 'inline-block', marginLeft: 8 }}>字间距:<InputNumber style={{ width: 60 }} min={0} max={10} value={letterSpacing} step={0.1} onChange={this.onWordSpacingChange} /></div>
                <div style={{ display: 'inline-block' }}>
                    {
                        alignList.map(item => {
                            return (
                                <Button key={item.value} style={{ marginLeft: 8 }} value={item.value} onMouseDown={this.onHandleAligning} className={textAlign === item.value ? 'activeButton' : ''}>{item.title}</Button>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}