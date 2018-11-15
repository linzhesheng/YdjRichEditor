import * as React from 'react'
import { IEditorProp } from 'type'
import {
    convertFromRaw,
    convertToRaw,
    CompositeDecorator,
    DefaultDraftBlockRenderMap,
    ContentState,
    Editor,
    EditorState,
    Entity,
    RichUtils,
    getDefaultKeyBinding,
    KeyBindingUtil,
    Modifier,
    SelectionState
} from 'draft-js'
import {
    getCustomStyleMap,
    setBlockData,
    getSelectedBlocksMetadata
} from 'draftjs-utils'
import Immutable from 'immutable'
import InlineTypesControl from './InlineTypesControl'
import BlockTypesControl from './BlockTypesControl'
import AddLinkControl from './AddLinkControl'
import TextColorControl from './TextColorControl'
import EmojiControl from './EmojiControl'
import FontSizeControl from './FontSizeControl'
import ImageControl from './ImageControl'
import Media from './ImageControl/media'
import BlockStyleControl from './BlockStyleControl'
import MyTextColorControl from './MyTextColorControl'
import { inlineTypes, blockTypes } from './config'
import decorator from './decorator'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import { Button } from 'antd'
import 'antd/dist/antd.css'

export default class YdjRichEditor extends React.Component<IEditorProp> {
    state = {
        editorState: EditorState.createEmpty(decorator),
        dymanicCssList: []
    }

    componentWillMount() {
        // @ts-ignore
        if (this.props.value) {
            this.setState({
                // @ts-ignore
                editorState: this.props.value
            })
        }
    }

    // editorState改变
    onEditorStateChange = editorState => {
        this.setState({ editorState })

        const { onChange } = this.props
        if (onChange) {
            onChange(editorState)
        }
    }

    // 行内样式改变
    onInlineTypeChange = editorState => {
        this.onEditorStateChange(editorState)
    }

    // 块样式改变
    onBlockTypeChange = editorState => {
        this.setState({ editorState }, () => {
            this.onEditorFocus()
        })
    }

    // editor获得焦点
    onEditorFocus = () => {
        const editor = this.refs.editor as Editor
        editor.focus()
    }

    // -------添加超链接相关-------

    // 添加链接
    onAddLink = editorState => {
        this.onEditorStateChange(editorState)
    }

    // 删除链接
    onRemoveLink = editorState => {
        this.onEditorStateChange(editorState)
    }

    // -------添加超链接相关-------

    // 文字颜色改变
    onTextColorChange = editorState => {
        this.setState(
            {
                editorState
            },
            () => {
                this.onEditorFocus()
            }
        )
    }

    // 添加emoji
    onAddEmoji = editorState => {
        this.onEditorStateChange(editorState)
    }

    // 改变字体大小
    onFontSizeChange = editorState => {
        if (!editorState.getSelection().isCollapsed()) {
            this.setState(
                {
                    editorState
                },
                () => {
                    this.onEditorFocus()
                }
            )
        } else {
            // 待处理
            this.setState(
                {
                    editorState
                },
                () => {
                    this.onEditorFocus()
                }
            )
        }
    }

    // 添加图片
    onAddImage = editorState => {
        this.setState(
            {
                editorState
            },
            () => {
                setTimeout(() => this.onEditorFocus(), 0)
            }
        )
    }

    // image,mp3,mp4的渲染组件匹配
    mediaBlockRenderer = block => {
        if (block.getType() === 'atomic') {
            return {
                component: Media,
                editable: false
            }
        }
        return null
    }

    // 自定义样式匹配
    myBlockStyleFn = contentBlock => {
        const type = contentBlock.getType()
        const metaData = contentBlock.getData()

        const textIndent = metaData.get('text-indent')
        const lineHeight = metaData.get('line-height')
        const letterSpacing = metaData.get('letter-spacing')
        const textAlign = metaData.get('text-align')

        if (textIndent || lineHeight || letterSpacing || textAlign) {
            let letterSpacingName = ''
            if (!letterSpacing) {
                letterSpacingName = letterSpacing
            } else {
                letterSpacingName = Math.round(
                    Number(
                        letterSpacing.substring(0, letterSpacing.indexOf('px'))
                    ) * 100
                ).toString()
            }

            const className =
                'custom' +
                textIndent +
                Math.round(lineHeight * 100) +
                letterSpacingName +
                textAlign
            const { dymanicCssList } = this.state
            let classIsExist = false

            for (const dymanicCss of dymanicCssList) {
                if (dymanicCss === className) {
                    classIsExist = true
                    break
                }
            }

            // for (let i = 0; i < dymanicCssList.length; i++) {
            //     if (dymanicCssList[i] === className) {
            //         classIsExist = true
            //         break
            //     }
            // }
            if (!classIsExist) {
                // console.log(className,textIndent,lineHeight,letterSpacing)
                dymanicCssList.push(className)
                this.loadCssCode(`.${className} {
                    text-indent: ${textIndent};
                    line-height: ${lineHeight};
                    letter-spacing: ${letterSpacing};
                    text-align: ${textAlign};
                }`)
            }
            return className
        }
    }

    // BlockStyle样式改变
    onBlockStyleChange = editorState => {
        this.setState({ editorState }, () => this.onEditorFocus)
    }

    // 动态创建css
    loadCssCode = code => {
        const style = document.createElement('style')
        style.type = 'text/css'
        // style.rel = 'stylesheet';
        // for Chrome Firefox Opera Safari
        style.appendChild(document.createTextNode(code))
        // for IE
        // style.styleSheet.cssText = code;
        const head = document.getElementsByTagName('head')[0]
        head.appendChild(style)
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            this.onEditorStateChange(newState)
            return true
        }
        return false
    }

    // printf = () => {
    //     const { editorState } = this.state

    //     // 打印EditorState
    //     console.log(editorState)
    //     // 打印ContentState
    //     console.log(editorState.getCurrentContent())
    //     // 打印PlainObject
    //     const contentObj: PlainObject = convertToRaw(
    //         editorState.getCurrentContent()
    //     )
    //     console.log(contentObj)
    //     // 打印json字符串
    //     const jsonString: string = JSON.stringify(contentObj)
    //     console.log(jsonString)
    //     // 打印html字符串
    //     console.log(draftToHtml(contentObj))
    // }

    // -----测试-----
    render() {
        const functionConfig = this.props.functionConfig || {}

        return (
            <div style={{ border: '1px solid #fff', lineHeight: 1.5 }}>
                <div
                    style={{
                        padding: '0 15px',
                        backgroundColor: 'white',
                        borderBottom: '1px solid #ccc'
                    }}
                >
                    <InlineTypesControl
                        editorState={this.state.editorState}
                        onInlineTypeChange={this.onInlineTypeChange}
                    />
                    <BlockTypesControl
                        editorState={this.state.editorState}
                        onBlockTypeChange={this.onBlockTypeChange}
                    />
                    <FontSizeControl
                        editorState={this.state.editorState}
                        onFontSizeChange={this.onFontSizeChange}
                    />
                    {functionConfig.textColorControl === false ? (
                        ''
                    ) : (
                        <TextColorControl
                        editorState={this.state.editorState}
                        onTextColorChange={this.onTextColorChange}
                    />
                    )}
                    {functionConfig.myTextColorControl === false ? (
                        ''
                    ) : (
                        <MyTextColorControl
                        editorState={this.state.editorState}
                        onTextColorChange={this.onTextColorChange}
                    />
                    )}
                    <EmojiControl
                        editorState={this.state.editorState}
                        onAddEmoji={this.onAddEmoji}
                    />
                    <AddLinkControl
                        editorState={this.state.editorState}
                        onAddLink={this.onAddLink}
                        onRemoveLink={this.onRemoveLink}
                    />
                    <ImageControl
                        editorState={this.state.editorState}
                        onAddImage={this.onAddImage}
                        imageUploadConfig={this.props.imageUploadConfig}
                    />
                    {functionConfig.blockStyleControl === false ? (
                        ''
                    ) : (
                        <BlockStyleControl
                            editorState={this.state.editorState}
                            onBlockStyleChange={this.onBlockStyleChange}
                        />
                    )}

                    {/* <Button onClick={this.printf}>打印</Button> */}
                </div>
                <div
                    style={{
                        padding: 15,
                        backgroundColor: 'white',
                        height: 600,
                        overflow: 'scroll'
                    }}
                    onClick={this.onEditorFocus}
                >
                    <Editor
                        ref="editor"
                        editorState={this.state.editorState}
                        onChange={this.onEditorStateChange}
                        customStyleMap={getCustomStyleMap()}
                        // @ts-ignore
                        handleKeyCommand={this.handleKeyCommand}
                        blockRendererFn={this.mediaBlockRenderer}
                        blockStyleFn={this.myBlockStyleFn}
                    />
                </div>
            </div>
        )
    }
}
