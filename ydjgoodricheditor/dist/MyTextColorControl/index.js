import * as tslib_1 from "tslib";
import * as React from 'react';
import { Button, Popover, Input, Icon } from 'antd';
import { toggleCustomInlineStyle, } from 'draftjs-utils';
var MyTextColorControl = /** @class */ (function (_super) {
    tslib_1.__extends(MyTextColorControl, _super);
    function MyTextColorControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            textColorList: [],
            inputColor: ''
        };
        // 颜色选择器选择的颜色改变，draft.js不支持更改文字透明度
        _this.handleChangeComplete = function (color) {
            _this.setState({ textColor: color });
            var newEditState = toggleCustomInlineStyle(_this.props.editorState, 'color', color);
            _this.props.onTextColorChange(newEditState);
        };
        // 点击确定按钮
        _this.handleOk = function () {
            var _a = _this.state, textColorList = _a.textColorList, inputColor = _a.inputColor;
            textColorList.push(inputColor);
            _this.setState({ textColorList: textColorList, inputColor: '' });
        };
        // 清空所有颜色
        _this.handelClear = function () {
            _this.setState({ textColorList: [] });
        };
        // 颜色输入框文本改变
        _this.onInputColorChange = function (e) {
            _this.setState({ inputColor: e.target.value });
        };
        // 点击颜色块
        _this.onSelectTextColorChange = function (e) {
            e.preventDefault();
            _this.handleChangeComplete(e.target.innerHTML);
        };
        // 渲染颜色选择器
        _this.renderColorPicker = function () {
            return (React.createElement("div", { style: { width: 265 } },
                React.createElement("div", null, _this.state.textColorList.map(function (textColor) {
                    return React.createElement("span", { key: textColor, style: { display: 'inline-block', cursor: 'pointer', marginLeft: 5, backgroundColor: textColor, color: 'white', fontSize: 11 }, onMouseDown: _this.onSelectTextColorChange }, textColor);
                })),
                React.createElement(Input, { style: { width: 90 }, placeholder: '#000000', value: _this.state.inputColor, onChange: _this.onInputColorChange }),
                React.createElement(Button, { style: { marginLeft: 10 }, onMouseDown: _this.handleOk, type: "primary" }, "\u786E\u5B9A"),
                React.createElement(Button, { style: { marginLeft: 10 }, onMouseDown: _this.handelClear }, "\u6E05\u7A7A\u6240\u6709")));
        };
        return _this;
    }
    MyTextColorControl.prototype.componentWillUnmount = function () {
        localStorage.setItem('textColorList', JSON.stringify(this.state.textColorList));
    };
    MyTextColorControl.prototype.componentWillMount = function () {
        var textColorList = JSON.parse(localStorage.getItem('textColorList'));
        if (textColorList) {
            this.setState({ textColorList: textColorList });
        }
    };
    MyTextColorControl.prototype.render = function () {
        return (React.createElement(Popover, { content: this.renderColorPicker() },
            React.createElement(Button, { style: { marginLeft: 8 } },
                "\u81EA\u5B9A\u4E49\u989C\u8272",
                React.createElement(Icon, { type: 'down' }))));
    };
    return MyTextColorControl;
}(React.Component));
export default MyTextColorControl;
