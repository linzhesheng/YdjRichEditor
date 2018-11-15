import * as tslib_1 from "tslib";
import * as React from 'react';
import { Button, Popover, Input, Icon } from 'antd';
import { EditorState, RichUtils, Modifier } from 'draft-js';
var AddLinkControl = /** @class */ (function (_super) {
    tslib_1.__extends(AddLinkControl, _super);
    function AddLinkControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            visible: false,
            title: '',
            editorUrl: ''
        };
        // 控件显示与隐藏
        _this.handleVisibleChange = function (visible) {
            if (visible) {
                var editorState = _this.props.editorState;
                _this.setState({
                    title: _this.getBeginTitle(editorState),
                    editorUrl: _this.getBeginUrl(editorState)
                }, function () {
                    setTimeout(function () {
                        var input = _this.refs.linkTitle;
                        input.focus();
                    }, 0);
                });
            }
            _this.setState({
                visible: visible,
            });
        };
        // 得到editorState的title
        _this.getBeginTitle = function (editorState) {
            var selectionState = editorState.getSelection();
            var anchorKey = selectionState.getAnchorKey();
            var currentContent = editorState.getCurrentContent();
            var currentContentBlock = currentContent.getBlockForKey(anchorKey);
            var start = selectionState.getStartOffset();
            var end = selectionState.getEndOffset();
            var title = currentContentBlock.getText().slice(start, end);
            return title;
        };
        // 得到editorState的url
        _this.getBeginUrl = function (editorState) {
            var selection = editorState.getSelection();
            var editorUrl = '';
            if (!selection.isCollapsed()) {
                var contentState = editorState.getCurrentContent();
                var startKey = editorState.getSelection().getStartKey();
                var startOffset = editorState.getSelection().getStartOffset();
                var blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
                var linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
                if (linkKey) {
                    var linkInstance = contentState.getEntity(linkKey);
                    editorUrl = linkInstance.getData().url;
                }
            }
            return editorUrl;
        };
        // 点击确认按钮
        _this.handleOk = function (e) {
            e.preventDefault();
            // 参考wysiwyg
            var _a = _this.state, title = _a.title, editorUrl = _a.editorUrl;
            var editorState = _this.props.editorState;
            var selection = editorState.getSelection();
            var entityKey = editorState
                .getCurrentContent()
                .createEntity('LINK', 'MUTABLE', { url: editorUrl })
                .getLastCreatedEntityKey();
            var contentState = Modifier.replaceText(editorState.getCurrentContent(), selection, "" + title, editorState.getCurrentInlineStyle(), entityKey);
            var newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
            _this.props.onAddLink(newEditorState);
            _this.setState({
                visible: false,
                title: '',
                editorUrl: ''
            });
        };
        // 点击取消按钮
        _this.handleCancel = function (e) {
            e.preventDefault();
            _this.setState({
                visible: false,
            });
        };
        // 点击删除按钮
        _this.clickRemoveBtn = function (e) {
            e.preventDefault();
            var editorState = _this.props.editorState;
            var selection = editorState.getSelection();
            if (!selection.isCollapsed()) {
                var newEditorState = RichUtils.toggleLink(editorState, selection, null);
                _this.props.onRemoveLink(newEditorState);
            }
        };
        // 链接的文本改变
        _this.onTitleChange = function (e) {
            _this.setState({ title: e.target.value });
        };
        // 链接的地址改变
        _this.onUrlChange = function (e) {
            _this.setState({ editorUrl: e.target.value });
        };
        _this.renderAddLink = function () {
            return (React.createElement("div", null,
                React.createElement("div", { style: { width: 350 } },
                    React.createElement(Input, { ref: 'linkTitle', addonBefore: React.createElement(Icon, { type: "book" }), placeholder: '\u94FE\u63A5\u6587\u672C', value: _this.state.title, onChange: _this.onTitleChange, style: { marginBottom: 12 } }),
                    React.createElement(Input, { ref: 'linkUrl', addonBefore: React.createElement(Icon, { type: "link" }), placeholder: '\u94FE\u63A5\u5730\u5740', value: _this.state.editorUrl, onChange: _this.onUrlChange })),
                React.createElement("div", { style: { textAlign: 'right', marginTop: 12 } },
                    React.createElement(Button, { onMouseDown: _this.handleCancel, style: { marginRight: 8 } }, "\u53D6\u6D88"),
                    React.createElement(Button, { onMouseDown: _this.handleOk, type: "primary" }, "\u786E\u5B9A"))));
        };
        return _this;
    }
    AddLinkControl.prototype.render = function () {
        return (React.createElement("div", { style: { display: 'inline-block', marginBottom: 15 } },
            React.createElement(Popover, { content: this.renderAddLink(), trigger: "click", visible: this.state.visible, onVisibleChange: this.handleVisibleChange },
                React.createElement(Button, { style: { marginLeft: 8, marginRight: 8 } }, "\u6DFB\u52A0\u94FE\u63A5")),
            React.createElement(Button, { onMouseDown: this.clickRemoveBtn }, "\u5220\u9664\u94FE\u63A5")));
    };
    return AddLinkControl;
}(React.Component));
export default AddLinkControl;
