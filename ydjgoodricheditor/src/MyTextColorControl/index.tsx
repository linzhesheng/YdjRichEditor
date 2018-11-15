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

export default class MyTextColorControl extends React.Component<IProp> {

    state = {
        textColorList: [],
        inputColor: ''
    }

    componentWillUnmount() {
        localStorage.setItem('textColorList',JSON.stringify(this.state.textColorList))
    }

    componentWillMount() {
        const textColorList = JSON.parse(localStorage.getItem('textColorList'))
        
        if(textColorList) {
            this.setState({textColorList})
        }
        
    }

    // 颜色选择器选择的颜色改变，draft.js不支持更改文字透明度
    handleChangeComplete = (color) => {
        this.setState({ textColor: color })
        const newEditState = toggleCustomInlineStyle(
            this.props.editorState,
            'color',
            color,
        )
        this.props.onTextColorChange(newEditState)
    }

    // 点击确定按钮
    handleOk = () => {
        const { textColorList, inputColor } = this.state
        textColorList.push(inputColor)
        this.setState({ textColorList, inputColor: '' })
    }

    // 清空所有颜色
    handelClear = () => {
        this.setState({textColorList:[]})
    }

    // 颜色输入框文本改变
    onInputColorChange = (e) => {
        this.setState({ inputColor: e.target.value })
    }

    // 点击颜色块
    onSelectTextColorChange = (e) => {
        
        e.preventDefault()
        this.handleChangeComplete(e.target.innerHTML)
    }

    // 渲染颜色选择器
    renderColorPicker = () => {
        return (
            <div style={{width:265}}>
                <div> 
                    {
                        this.state.textColorList.map(textColor => {
                            return <span
                                key={textColor}
                                style={{ display: 'inline-block', cursor: 'pointer', marginLeft: 5, backgroundColor: textColor,color:'white',fontSize:11 }}
                                onMouseDown={this.onSelectTextColorChange}>
                                {textColor}
                            </span>
                        })
                    }
                </div>
                <Input style={{ width: 90 }} placeholder='#000000' value={this.state.inputColor} onChange={this.onInputColorChange}></Input>
                <Button style={{ marginLeft: 10 }} onMouseDown={this.handleOk} type="primary">确定</Button>
                <Button style={{ marginLeft: 10 }} onMouseDown={this.handelClear}>清空所有</Button>
            </div>
        )

    }

    render() {
        return (
            <Popover content={this.renderColorPicker()}>
                <Button style={{ marginLeft: 8 }}>自定义颜色<Icon type='down' /></Button>
            </Popover>
        )
    }
}