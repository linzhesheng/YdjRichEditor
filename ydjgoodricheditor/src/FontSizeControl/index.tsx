import * as React from 'react'
import { IProp } from './type'
import { Button, Dropdown, Input, Icon, Menu } from 'antd'
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

const MenuItem = Menu.Item

// 字体大小
const fontSize = [8,9,10,11,12,14,16,18,20,24,30,36,48,60,72,96]

export default class FontSizeControl extends React.Component<IProp> {

    // 点击菜单
    clickMenu = (e) => {
        
        const newEditState = toggleCustomInlineStyle(
            this.props.editorState,
            'fontSize',
            Number(e.key),
          )
        this.props.onFontSizeChange(newEditState)
    }

    // 得到当前的字体大小
    getCurrentFontSize = () => {
        const currentFontSize:string = getSelectionCustomInlineStyle(this.props.editorState, ['FONTSIZE']).FONTSIZE
        
        if (currentFontSize) {
            return currentFontSize.substring(9)
        } else {
            return 14
        }
    }

    // 渲染菜单
    renderMenu = () => {
        return (
            <Menu onClick={this.clickMenu} style={{height:250,overflow:'scroll'}}>
                {
                    fontSize.map(value =>
                        <MenuItem key={value}>{value}</MenuItem>
                    )
                }
            </Menu>

        )
    }

    render() {
        return(
            <Dropdown overlay={this.renderMenu()}>
                <Button style={{margin:'0 0 15px 8px'}}>
                    {this.getCurrentFontSize()} <Icon type="down" />
                </Button>
            </Dropdown>
        )
    }
}