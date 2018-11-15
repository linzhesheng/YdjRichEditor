import * as tslib_1 from "tslib";
import * as React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { getCustomStyleMap } from 'draftjs-utils';
import InlineTypesControl from './dist/InlineTypesControl';
import BlockTypesControl from './dist/BlockTypesControl';
import AddLinkControl from './dist/AddLinkControl';
import TextColorControl from './dist/TextColorControl';
import EmojiControl from './dist/EmojiControl';
import FontSizeControl from './dist/FontSizeControl';
import ImageControl from './dist/ImageControl';
import Media from './dist/ImageControl/media';
import BlockStyleControl from './dist/BlockStyleControl';
import MyTextColorControl from './dist/MyTextColorControl';
import decorator from './dist/decorator';
import 'antd/dist/antd.css';
var YdjRichEditor = /** @class */ (function (_super) {
    tslib_1.__extends(YdjRichEditor, _super);
    function YdjRichEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            editorState: EditorState.createEmpty(decorator),
            dymanicCssList: []
        };
        // editorState改变
        _this.onEditorStateChange = function (editorState) {
            _this.setState({ editorState: editorState });
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(editorState);
            }
        };
        // 行内样式改变
        _this.onInlineTypeChange = function (editorState) {
            _this.onEditorStateChange(editorState);
        };
        // 块样式改变
        _this.onBlockTypeChange = function (editorState) {
            _this.setState({ editorState: editorState }, function () {
                _this.onEditorFocus();
            });
        };
        // editor获得焦点
        _this.onEditorFocus = function () {
            var editor = _this.refs.editor;
            editor.focus();
        };
        // -------添加超链接相关-------
        // 添加链接
        _this.onAddLink = function (editorState) {
            _this.onEditorStateChange(editorState);
        };
        // 删除链接
        _this.onRemoveLink = function (editorState) {
            _this.onEditorStateChange(editorState);
        };
        // -------添加超链接相关-------
        // 文字颜色改变
        _this.onTextColorChange = function (editorState) {
            _this.setState({
                editorState: editorState
            }, function () {
                _this.onEditorFocus();
            });
        };
        // 添加emoji
        _this.onAddEmoji = function (editorState) {
            _this.onEditorStateChange(editorState);
        };
        // 改变字体大小
        _this.onFontSizeChange = function (editorState) {
            if (!editorState.getSelection().isCollapsed()) {
                _this.setState({
                    editorState: editorState
                }, function () {
                    _this.onEditorFocus();
                });
            }
            else {
                // 待处理
                _this.setState({
                    editorState: editorState
                }, function () {
                    _this.onEditorFocus();
                });
            }
        };
        // 添加图片
        _this.onAddImage = function (editorState) {
            _this.setState({
                editorState: editorState
            }, function () {
                setTimeout(function () { return _this.onEditorFocus(); }, 0);
            });
        };
        // image,mp3,mp4的渲染组件匹配
        _this.mediaBlockRenderer = function (block) {
            if (block.getType() === 'atomic') {
                return {
                    component: Media,
                    editable: false
                };
            }
            return null;
        };
        // 自定义样式匹配
        _this.myBlockStyleFn = function (contentBlock) {
            var type = contentBlock.getType();
            var metaData = contentBlock.getData();
            var textIndent = metaData.get('text-indent');
            var lineHeight = metaData.get('line-height');
            var letterSpacing = metaData.get('letter-spacing');
            var textAlign = metaData.get('text-align');
            if (textIndent || lineHeight || letterSpacing || textAlign) {
                var letterSpacingName = '';
                if (!letterSpacing) {
                    letterSpacingName = letterSpacing;
                }
                else {
                    letterSpacingName = Math.round(Number(letterSpacing.substring(0, letterSpacing.indexOf('px'))) * 100).toString();
                }
                var className = 'custom' +
                    textIndent +
                    Math.round(lineHeight * 100) +
                    letterSpacingName +
                    textAlign;
                var dymanicCssList = _this.state.dymanicCssList;
                var classIsExist = false;
                for (var _i = 0, dymanicCssList_1 = dymanicCssList; _i < dymanicCssList_1.length; _i++) {
                    var dymanicCss = dymanicCssList_1[_i];
                    if (dymanicCss === className) {
                        classIsExist = true;
                        break;
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
                    dymanicCssList.push(className);
                    _this.loadCssCode("." + className + " {\n                    text-indent: " + textIndent + ";\n                    line-height: " + lineHeight + ";\n                    letter-spacing: " + letterSpacing + ";\n                    text-align: " + textAlign + ";\n                }");
                }
                return className;
            }
        };
        // BlockStyle样式改变
        _this.onBlockStyleChange = function (editorState) {
            _this.setState({ editorState: editorState }, function () { return _this.onEditorFocus; });
        };
        // 动态创建css
        _this.loadCssCode = function (code) {
            var style = document.createElement('style');
            style.type = 'text/css';
            // style.rel = 'stylesheet';
            // for Chrome Firefox Opera Safari
            style.appendChild(document.createTextNode(code));
            // for IE
            // style.styleSheet.cssText = code;
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(style);
        };
        _this.handleKeyCommand = function (command, editorState) {
            var newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                _this.onEditorStateChange(newState);
                return true;
            }
            return false;
        };
        return _this;
    }
    YdjRichEditor.prototype.componentWillMount = function () {
        // @ts-ignore
        if (this.props.value) {
            this.setState({
                // @ts-ignore
                editorState: this.props.value
            });
        }
    };
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
    YdjRichEditor.prototype.render = function () {
        var functionConfig = this.props.functionConfig || {};
        return (React.createElement("div", { style: { border: '1px solid #fff', lineHeight: 1.5 } },
            React.createElement("div", { style: {
                    padding: '0 15px',
                    backgroundColor: 'white',
                    borderBottom: '1px solid #ccc'
                } },
                React.createElement(InlineTypesControl, { editorState: this.state.editorState, onInlineTypeChange: this.onInlineTypeChange }),
                React.createElement(BlockTypesControl, { editorState: this.state.editorState, onBlockTypeChange: this.onBlockTypeChange }),
                React.createElement(FontSizeControl, { editorState: this.state.editorState, onFontSizeChange: this.onFontSizeChange }),
                functionConfig.textColorControl === false ? ('') : (React.createElement(TextColorControl, { editorState: this.state.editorState, onTextColorChange: this.onTextColorChange })),
                functionConfig.myTextColorControl === false ? ('') : (React.createElement(MyTextColorControl, { editorState: this.state.editorState, onTextColorChange: this.onTextColorChange })),
                React.createElement(EmojiControl, { editorState: this.state.editorState, onAddEmoji: this.onAddEmoji }),
                React.createElement(AddLinkControl, { editorState: this.state.editorState, onAddLink: this.onAddLink, onRemoveLink: this.onRemoveLink }),
                React.createElement(ImageControl, { editorState: this.state.editorState, onAddImage: this.onAddImage, imageUploadConfig: this.props.imageUploadConfig }),
                functionConfig.blockStyleControl === false ? ('') : (React.createElement(BlockStyleControl, { editorState: this.state.editorState, onBlockStyleChange: this.onBlockStyleChange }))),
            React.createElement("div", { style: {
                    padding: 15,
                    backgroundColor: 'white',
                    height: 600,
                    overflow: 'scroll'
                }, onClick: this.onEditorFocus },
                React.createElement(Editor, { ref: "editor", editorState: this.state.editorState, onChange: this.onEditorStateChange, customStyleMap: getCustomStyleMap(), 
                    // @ts-ignore
                    handleKeyCommand: this.handleKeyCommand, blockRendererFn: this.mediaBlockRenderer, blockStyleFn: this.myBlockStyleFn }))));
    };
    return YdjRichEditor;
}(React.Component));
export default YdjRichEditor;
