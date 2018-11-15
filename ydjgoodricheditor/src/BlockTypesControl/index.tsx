import * as React from 'react'
import { IProp } from './type'
import {
    RichUtils
} from 'draft-js'
import { Button, Menu, Dropdown, Icon } from 'antd'
const MenuItem = Menu.Item
import { blockTypes } from '../config'
import '../Common/style.css'

export default class InlineTypesControl extends React.Component<IProp> {

    // 点击菜单
    clickMenu = (e) => {
        const newEditState = RichUtils.toggleBlockType(
            this.props.editorState,
            e.key
        )
        this.props.onBlockTypeChange(newEditState)
    }

    // 得到当前块样式的label
    getCurrentBlockLabel = () => {
        const editorState = this.props.editorState
        const selection = editorState.getSelection()
        const blockStyle = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()
        let blockLabel = ''
        blockTypes.forEach((blockType) => {
            if (blockType.style === blockStyle) {
                blockLabel = blockType.label
                return
            }
        })
        return blockLabel
    }

    // 渲染菜单
    renderMenu = () => {
        return (
            <Menu onClick={this.clickMenu}>
                {
                    blockTypes.map(blockType =>
                        <MenuItem key={blockType.style}>{blockType.label}</MenuItem>
                    )
                }
            </Menu>

        )
    }

    render() {

        return (
            <Dropdown overlay={this.renderMenu()}>
                <Button>
                    {this.getCurrentBlockLabel()} <Icon type="down" />
                </Button>
            </Dropdown>
        )
    }
}