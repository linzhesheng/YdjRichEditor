import * as tslib_1 from "tslib";
import * as React from 'react';
import { Button, Popover, Icon } from 'antd';
import { toggleCustomInlineStyle, } from 'draftjs-utils';
import { SketchPicker } from 'react-color';
var AddLinkControl = /** @class */ (function (_super) {
    tslib_1.__extends(AddLinkControl, _super);
    function AddLinkControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            textColor: 'rgba(0, 0, 0, 0)',
        };
        // 颜色选择器选择的颜色改变，draft.js不支持更改文字透明度
        _this.handleChangeComplete = function (color) {
            var newTextColor = "rgb(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ")";
            _this.setState({ textColor: newTextColor });
            var newEditState = toggleCustomInlineStyle(_this.props.editorState, 'color', newTextColor);
            _this.props.onTextColorChange(newEditState);
        };
        // 渲染颜色选择器
        _this.renderColorPicker = function () {
            return (React.createElement(SketchPicker, { color: _this.state.textColor, onChangeComplete: _this.handleChangeComplete }));
        };
        return _this;
    }
    AddLinkControl.prototype.render = function () {
        return (React.createElement(Popover, { content: this.renderColorPicker() },
            React.createElement(Button, { style: { marginLeft: 8 } },
                "\u6587\u672C\u989C\u8272",
                React.createElement(Icon, { style: { backgroundColor: this.state.textColor }, type: 'down' }))));
    };
    return AddLinkControl;
}(React.Component));
export default AddLinkControl;
