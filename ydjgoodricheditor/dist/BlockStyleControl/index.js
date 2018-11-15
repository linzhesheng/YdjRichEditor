import * as tslib_1 from "tslib";
import * as React from 'react';
import { setBlockData, getSelectedBlocksMetadata } from "draftjs-utils";
import { Button, InputNumber } from 'antd';
import '../Common/style.css';
var alignList = [
    { value: 'left', title: '左对齐' },
    { value: 'center', title: '居中对齐' },
    { value: 'right', title: '右对齐' },
    { value: 'justify', title: '两端对齐' },
];
var BlockStyleControl = /** @class */ (function (_super) {
    tslib_1.__extends(BlockStyleControl, _super);
    function BlockStyleControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        // 点击缩进按钮
        _this.onHandleIndentation = function (e) {
            e.preventDefault();
            var editorState = _this.props.editorState;
            var selectedBlocksMetadata = getSelectedBlocksMetadata(editorState);
            var newEditorState = null;
            if (selectedBlocksMetadata.get('text-indent')) {
                var types = _this.getAllBlockType(undefined, selectedBlocksMetadata.get('line-height'), selectedBlocksMetadata.get('letter-spacing'), selectedBlocksMetadata.get('text-align'));
                newEditorState = setBlockData(editorState, types);
            }
            else {
                var types = _this.getAllBlockType('2em', selectedBlocksMetadata.get('line-height'), selectedBlocksMetadata.get('letter-spacing'), selectedBlocksMetadata.get('text-align'));
                newEditorState = setBlockData(editorState, types);
            }
            _this.props.onBlockStyleChange(newEditorState);
        };
        // 行高改变
        _this.onLineHeightChange = function (value) {
            var lineHeight = value;
            var editorState = _this.props.editorState;
            var selectedBlocksMetadata = getSelectedBlocksMetadata(editorState);
            var types = _this.getAllBlockType(selectedBlocksMetadata.get('text-indent'), lineHeight, selectedBlocksMetadata.get('letter-spacing'), selectedBlocksMetadata.get('text-align'));
            var newEditorState = setBlockData(editorState, types);
            _this.props.onBlockStyleChange(newEditorState);
        };
        // 字间距改变
        _this.onWordSpacingChange = function (value) {
            var letterSpacing = value;
            var editorState = _this.props.editorState;
            var selectedBlocksMetadata = getSelectedBlocksMetadata(editorState);
            var types = _this.getAllBlockType(selectedBlocksMetadata.get('text-indent'), selectedBlocksMetadata.get('line-height'), letterSpacing + "px", selectedBlocksMetadata.get('text-align'));
            var newEditorState = setBlockData(editorState, types);
            _this.props.onBlockStyleChange(newEditorState);
        };
        // 点击对齐按钮
        _this.onHandleAligning = function (e) {
            e.preventDefault();
            var textAlign = e.target.value;
            var editorState = _this.props.editorState;
            var selectedBlocksMetadata = getSelectedBlocksMetadata(editorState);
            var newEditorState = null;
            if (selectedBlocksMetadata.get('text-align') !== textAlign) {
                var types = _this.getAllBlockType(selectedBlocksMetadata.get('text-indent'), selectedBlocksMetadata.get('line-height'), selectedBlocksMetadata.get('letter-spacing'), textAlign);
                newEditorState = setBlockData(editorState, types);
            }
            else {
                var types = _this.getAllBlockType(selectedBlocksMetadata.get('text-indent'), selectedBlocksMetadata.get('line-height'), selectedBlocksMetadata.get('letter-spacing'), undefined);
                newEditorState = setBlockData(editorState, types);
            }
            _this.props.onBlockStyleChange(newEditorState);
        };
        // 得到总样式
        _this.getAllBlockType = function (textIndent, lineHeight, letterSpacing, textAlign) {
            return {
                'text-indent': textIndent,
                'line-height': lineHeight,
                'letter-spacing': letterSpacing,
                'text-align': textAlign
            };
        };
        return _this;
    }
    BlockStyleControl.prototype.render = function () {
        var _this = this;
        var editorState = this.props.editorState;
        var selectedBlocksMetadata = getSelectedBlocksMetadata(editorState);
        var btnClassName = selectedBlocksMetadata.get('text-indent') ? 'activeButton' : '';
        var lineHeight = selectedBlocksMetadata.get('line-height') ? selectedBlocksMetadata.get('line-height') : 1.5;
        var letterSpacing = selectedBlocksMetadata.get('letter-spacing');
        letterSpacing = letterSpacing ? letterSpacing.substring(0, letterSpacing.indexOf('px')) : 0;
        var textAlign = selectedBlocksMetadata.get('text-align');
        return (React.createElement("div", { style: { display: 'inline-block', marginBottom: 15, } },
            React.createElement(Button, { style: { marginLeft: 8 }, onMouseDown: this.onHandleIndentation, className: btnClassName }, "\u7F29\u8FDB"),
            React.createElement("div", { style: { display: 'inline-block', marginLeft: 8 } },
                "\u884C\u9AD8:",
                React.createElement(InputNumber, { style: { width: 60 }, min: 0, max: 100, value: lineHeight, step: 0.1, onChange: this.onLineHeightChange })),
            React.createElement("div", { style: { display: 'inline-block', marginLeft: 8 } },
                "\u5B57\u95F4\u8DDD:",
                React.createElement(InputNumber, { style: { width: 60 }, min: 0, max: 10, value: letterSpacing, step: 0.1, onChange: this.onWordSpacingChange })),
            React.createElement("div", { style: { display: 'inline-block' } }, alignList.map(function (item) {
                return (React.createElement(Button, { key: item.value, style: { marginLeft: 8 }, value: item.value, onMouseDown: _this.onHandleAligning, className: textAlign === item.value ? 'activeButton' : '' }, item.title));
            }))));
    };
    return BlockStyleControl;
}(React.Component));
export default BlockStyleControl;
