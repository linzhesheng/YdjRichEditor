import * as React from 'react'
import { IProp } from './type'
import { Button, Dropdown, Input, Icon, Menu, Popover, Upload } from 'antd'
import {
    EditorState,
    Entity,
    RichUtils,
    Modifier,
    AtomicBlockUtils
} from 'draft-js'
import {
    toggleCustomInlineStyle,
    getSelectionCustomInlineStyle
} from 'draftjs-utils'
import ImageUpload from '../Common/ImageUpload'


export default class ImageControl extends React.Component<IProp> {
    state = {
        visible: false,
        url: '',
        fileList: [],
        width: 'auto',
        height: 'auto',
        numWidth: 'auto',
        numHeight: 'auto'
    }

    //

    // 控件显示与隐藏
    handleVisibleChange = visible => {
        this.setState({
            visible
        })
    }

    // 图片url地址改变
    onUrlChange = e => {
        this.setState({ url: e.target.value })
    }

    // 图片宽度改变
    onWidthChange = e => {
        const width: string = e.target.value
        if (width.length && width !== 'auto') {
            this.setState({ width: `${width}px`, numWidth: width })
        } else {
            this.setState({ width: 'auto', numWidth: width })
        }
    }

    // 图片高度改变
    onHeightChange = e => {
        const height: string = e.target.value
        if (height.length && height !== 'auto') {
            this.setState({ height: `${height}px`, numHeight: height })
        } else {
            this.setState({ height: 'auto', numHeight: height })
        }
    }

    // 点击取消按钮
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    // 点击确定按钮
    handleOk = e => {
        e.preventDefault()
        const { editorState } = this.props
        const { url, width, height } = this.state
        const contentState = editorState.getCurrentContent()
        const contentStateWithEntity = contentState.createEntity(
            'IMAGE',
            'IMMUTABLE',
            {
                src: url,
                width,
                height
            }
        )
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity
        })

        const newNewEditorState = AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' '
        )
        this.props.onAddImage(newNewEditorState)

        this.setState({
            visible: false,
            url: '',
            fileList: [],
            width: 'auto',
            height: 'auto',
            numWidth: 'auto',
            numHeight: 'auto'
        })
    }

    // 上传图片改变
    onImageUploadChange = fileList => {
        // console.log(fileList)
        const url = fileList[0].response
            ? `${this.props.imageUploadConfig.cdnUrl}/${fileList[0].response.hash}`
            : fileList[0].url
        this.setState({ url, fileList })
    }

    // 渲染图片上传视图
    renderAddImage = () => {
        return (
            <div style={{ width: 350 }}>
                {this.props.imageUploadConfig ? (
                    <div style={{ height: 117 }}>
                        <ImageUpload
                            value={this.state.fileList}
                            limitNum={1}
                            onChange={this.onImageUploadChange}
                            imageUploadConfig={this.props.imageUploadConfig}
                        />
                    </div>
                ) : (
                    ''
                )}
                <Input
                    key="linkUrl"
                    addonBefore={<Icon type="link" />}
                    placeholder="链接地址"
                    value={this.state.url}
                    onChange={this.onUrlChange}
                    style={{ marginBottom: 12 }}
                />
                <Input
                    style={{ width: 90, marginRight: 8 }}
                    ref="width"
                    addonBefore={<h4>W</h4>}
                    placeholder="auto"
                    value={this.state.numWidth}
                    onChange={this.onWidthChange}
                />
                <Input
                    style={{ width: 90 }}
                    ref="height"
                    addonBefore={<h4>H</h4>}
                    placeholder="auto"
                    value={this.state.numHeight}
                    onChange={this.onHeightChange}
                />
                <Button
                    onMouseDown={this.handleCancel}
                    style={{ marginLeft: 25, marginRight: 8 }}
                >
                    取消
                </Button>
                <Button onMouseDown={this.handleOk} type="primary">
                    确定
                </Button>
            </div>
        )
    }

    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <Popover
                    content={this.renderAddImage()}
                    trigger="click"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                >
                    <Button style={{ marginLeft: 8 }}>添加图片</Button>
                </Popover>
            </div>
        )
    }
}
