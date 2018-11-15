import * as tslib_1 from "tslib";
import * as React from 'react';
import { Button, Input, Icon, Popover } from 'antd';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import ImageUpload from '../Common/ImageUpload';
var ImageControl = /** @class */ (function (_super) {
    tslib_1.__extends(ImageControl, _super);
    function ImageControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            visible: false,
            url: '',
            fileList: [],
            width: 'auto',
            height: 'auto',
            numWidth: 'auto',
            numHeight: 'auto'
        };
        //
        // 控件显示与隐藏
        _this.handleVisibleChange = function (visible) {
            _this.setState({
                visible: visible
            });
        };
        // 图片url地址改变
        _this.onUrlChange = function (e) {
            _this.setState({ url: e.target.value });
        };
        // 图片宽度改变
        _this.onWidthChange = function (e) {
            var width = e.target.value;
            if (width.length && width !== 'auto') {
                _this.setState({ width: width + "px", numWidth: width });
            }
            else {
                _this.setState({ width: 'auto', numWidth: width });
            }
        };
        // 图片高度改变
        _this.onHeightChange = function (e) {
            var height = e.target.value;
            if (height.length && height !== 'auto') {
                _this.setState({ height: height + "px", numHeight: height });
            }
            else {
                _this.setState({ height: 'auto', numHeight: height });
            }
        };
        // 点击取消按钮
        _this.handleCancel = function () {
            _this.setState({
                visible: false
            });
        };
        // 点击确定按钮
        _this.handleOk = function (e) {
            e.preventDefault();
            var editorState = _this.props.editorState;
            var _a = _this.state, url = _a.url, width = _a.width, height = _a.height;
            var contentState = editorState.getCurrentContent();
            var contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
                src: url,
                width: width,
                height: height
            });
            var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            var newEditorState = EditorState.set(editorState, {
                currentContent: contentStateWithEntity
            });
            var newNewEditorState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
            _this.props.onAddImage(newNewEditorState);
            _this.setState({
                visible: false,
                url: '',
                fileList: [],
                width: 'auto',
                height: 'auto',
                numWidth: 'auto',
                numHeight: 'auto'
            });
        };
        // 上传图片改变
        _this.onImageUploadChange = function (fileList) {
            // console.log(fileList)
            var url = fileList[0].response
                ? _this.props.imageUploadConfig.cdnUrl + "/" + fileList[0].response.hash
                : fileList[0].url;
            _this.setState({ url: url, fileList: fileList });
        };
        // 渲染图片上传视图
        _this.renderAddImage = function () {
            return (React.createElement("div", { style: { width: 350 } },
                _this.props.imageUploadConfig ? (React.createElement("div", { style: { height: 117 } },
                    React.createElement(ImageUpload, { value: _this.state.fileList, limitNum: 1, onChange: _this.onImageUploadChange, imageUploadConfig: _this.props.imageUploadConfig }))) : (''),
                React.createElement(Input, { key: "linkUrl", addonBefore: React.createElement(Icon, { type: "link" }), placeholder: "\u94FE\u63A5\u5730\u5740", value: _this.state.url, onChange: _this.onUrlChange, style: { marginBottom: 12 } }),
                React.createElement(Input, { style: { width: 90, marginRight: 8 }, ref: "width", addonBefore: React.createElement("h4", null, "W"), placeholder: "auto", value: _this.state.numWidth, onChange: _this.onWidthChange }),
                React.createElement(Input, { style: { width: 90 }, ref: "height", addonBefore: React.createElement("h4", null, "H"), placeholder: "auto", value: _this.state.numHeight, onChange: _this.onHeightChange }),
                React.createElement(Button, { onMouseDown: _this.handleCancel, style: { marginLeft: 25, marginRight: 8 } }, "\u53D6\u6D88"),
                React.createElement(Button, { onMouseDown: _this.handleOk, type: "primary" }, "\u786E\u5B9A")));
        };
        return _this;
    }
    ImageControl.prototype.render = function () {
        return (React.createElement("div", { style: { display: 'inline-block' } },
            React.createElement(Popover, { content: this.renderAddImage(), trigger: "click", visible: this.state.visible, onVisibleChange: this.handleVisibleChange },
                React.createElement(Button, { style: { marginLeft: 8 } }, "\u6DFB\u52A0\u56FE\u7247"))));
    };
    return ImageControl;
}(React.Component));
export default ImageControl;
