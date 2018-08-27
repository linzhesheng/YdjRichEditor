import * as React from 'react'
import { IProp } from './type'
import { Button, Popover, Input, Icon } from 'antd'
import {
    EditorState,
    Entity,
    RichUtils,
    Modifier
} from 'draft-js'

export default class AddLinkControl extends React.Component<IProp> {
    state = {
        visible: false,
        title: '',
        editorUrl: ''
    }

    // 控件显示与隐藏
    handleVisibleChange = (visible) => {

        if (visible) {
            const { editorState } = this.props
            this.setState({
                title: this.getBeginTitle(editorState),
                editorUrl: this.getBeginUrl(editorState)
            }, () => {
                setTimeout(() => {
                    const input = this.refs.linkTitle as Input
                    input.focus()
                }, 0);
            })
        }

        this.setState({
            visible,
        })
    }

    // 得到editorState的title
    getBeginTitle = (editorState) => {
        const selectionState = editorState.getSelection()
        const anchorKey = selectionState.getAnchorKey()
        const currentContent = editorState.getCurrentContent()
        const currentContentBlock = currentContent.getBlockForKey(anchorKey)
        const start = selectionState.getStartOffset()
        const end = selectionState.getEndOffset()
        const title = currentContentBlock.getText().slice(start, end)
        return title
    }

    // 得到editorState的url
    getBeginUrl = (editorState) => {
        const selection = editorState.getSelection()
        let editorUrl = ''
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent()
            const startKey = editorState.getSelection().getStartKey()
            const startOffset = editorState.getSelection().getStartOffset()
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)

            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey)
                editorUrl = linkInstance.getData().url
            }
        }
        
        return editorUrl
    }


    // 点击确认按钮
    handleOk = (e) => {
        e.preventDefault()
        
        // 参考wysiwyg
        const { title, editorUrl } = this.state
        const { editorState } = this.props
        const selection = editorState.getSelection()
        const entityKey = editorState
            .getCurrentContent()
            .createEntity('LINK', 'MUTABLE', { url: editorUrl })
            .getLastCreatedEntityKey()
        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            selection,
            `${title}`,
            editorState.getCurrentInlineStyle(),
            entityKey,
        )
        const newEditorState = EditorState.push(editorState, contentState, 'insert-characters')
        this.props.onAddLink(newEditorState)
        this.setState({
            visible: false,
            title: '',
            editorUrl: ''
        })
    }

    // 点击取消按钮
    handleCancel = (e) => {
        e.preventDefault()

        this.setState({
            visible: false,
        });
    }

    // 点击删除按钮
    clickRemoveBtn = (e) => {
        e.preventDefault()
        const { editorState } = this.props
        const selection = editorState.getSelection()
        if (!selection.isCollapsed()) {
            const newEditorState = RichUtils.toggleLink(editorState, selection, null)
            this.props.onRemoveLink(newEditorState)
        }
    }

    // 链接的文本改变
    onTitleChange = (e) => {
        this.setState({ title: e.target.value })
    }

    // 链接的地址改变
    onUrlChange = (e) => {
        this.setState({ editorUrl: e.target.value })
    }

    renderAddLink = () => {
        return (
            <div>
                <div style={{ width: 350 }}>
                    <Input ref='linkTitle' addonBefore={<Icon type="book" />} placeholder='链接文本' value={this.state.title} onChange={this.onTitleChange} style={{ marginBottom: 12 }} />
                    <Input ref='linkUrl' addonBefore={<Icon type="link" />} placeholder='链接地址' value={this.state.editorUrl} onChange={this.onUrlChange} />
                </div>
                <div style={{ textAlign: 'right', marginTop: 12 }}>
                    <Button onMouseDown={this.handleCancel} style={{ marginRight: 8 }}>取消</Button>
                    <Button onMouseDown={this.handleOk} type="primary">确定</Button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{ display: 'inline-block', marginBottom: 15 }}>
                <Popover
                    content={this.renderAddLink()}
                    trigger="click"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                >
                    <Button style={{ marginLeft: 8, marginRight: 8 }}>添加链接</Button>
                </Popover>
                <Button onMouseDown={this.clickRemoveBtn}>删除链接</Button>
            </div>

        )

    }
}