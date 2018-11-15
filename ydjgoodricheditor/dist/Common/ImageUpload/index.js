import * as tslib_1 from "tslib";
import * as React from 'react';
import { Upload, message, Icon, Modal } from 'antd';
var ImageUpload = /** @class */ (function (_super) {
    tslib_1.__extends(ImageUpload, _super);
    function ImageUpload(props) {
        var _this = _super.call(this, props) || this;
        _this.handleCancel = function () { return _this.setState({ previewVisible: false }); };
        _this.handlePreview = function (file) {
            _this.setState({
                previewImage: file.url || file.thumbUrl,
                previewVisible: true
            });
        };
        _this.handleChange = function (_a) {
            var fileList = _a.fileList;
            var onChange = _this.props.onChange;
            _this.setState({ fileList: fileList });
            if (onChange) {
                onChange(fileList);
            }
        };
        _this.beforeUpload = function (file) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var isLt2M, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isLt2M = file.size / 1024 / 1024 < 2;
                        if (!isLt2M) {
                            message.error('图片不能超过 2MB!');
                        }
                        if (!this.props.imageUploadConfig.getQnToken) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.imageUploadConfig.getQnToken({})];
                    case 1:
                        res = _a.sent();
                        this.setState({
                            args: {
                                token: res.token
                            }
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            args: {
                token: ''
            },
            previewVisible: false,
            previewImage: '',
            fileList: props.value || []
        };
        return _this;
    }
    ImageUpload.prototype.componentWillReceiveProps = function (nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            var value = nextProps.value;
            this.setState({ fileList: value });
        }
    };
    ImageUpload.prototype.render = function () {
        var limitNum = this.props.limitNum;
        var _a = this.state, fileList = _a.fileList, previewVisible = _a.previewVisible, previewImage = _a.previewImage, args = _a.args;
        var action = this.props.imageUploadConfig.action;
        var uploadButton = (React.createElement("div", null,
            React.createElement(Icon, { type: "plus" }),
            React.createElement("div", { className: "ant-upload-text" }, "Upload")));
        return (React.createElement(React.Fragment, null,
            React.createElement(Upload, { name: "file", action: action, accept: "image/*", data: args, beforeUpload: this.beforeUpload, listType: "picture-card", fileList: fileList, onPreview: this.handlePreview, onChange: this.handleChange }, fileList.length >= limitNum ? null : uploadButton),
            React.createElement(Modal, { visible: previewVisible, footer: null, onCancel: this.handleCancel },
                React.createElement("img", { alt: "example", style: { width: '100%' }, src: previewImage }))));
    };
    return ImageUpload;
}(React.Component));
export default ImageUpload;
