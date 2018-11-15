import * as React from 'react'
import { IProp } from './type'
import { Button, Popover, Input, Icon } from 'antd'
import {
    EditorState,
    Entity,
    RichUtils,
    Modifier
} from 'draft-js'
import {
    toggleCustomInlineStyle,
    getSelectionCustomInlineStyle,
  } from 'draftjs-utils'
import { SketchPicker } from 'react-color'

export default class AddLinkControl extends React.Component<IProp> {

    state = {
        textColor: 'rgba(0, 0, 0, 0)',
    }

    // 颜色选择器选择的颜色改变，draft.js不支持更改文字透明度
    handleChangeComplete = (color) => {
        const newTextColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
        this.setState({ textColor: newTextColor})
        const newEditState = toggleCustomInlineStyle(
            this.props.editorState,
            'color',
            newTextColor,
          )
        this.props.onTextColorChange(newEditState)
    }

    // 渲染颜色选择器
    renderColorPicker = () => {
        return (
            <SketchPicker color={this.state.textColor} onChangeComplete={this.handleChangeComplete} />
        )

    }

    render() {
        return (
            <Popover content={this.renderColorPicker()}>
                <Button style={{ marginLeft: 8 }}>文本颜色<Icon style={{ backgroundColor: this.state.textColor }} type='down' /></Button>
            </Popover>
        )
    }
}