import * as tslib_1 from "tslib";
import * as React from 'react';
import { Button, Dropdown, Icon, Menu } from 'antd';
import { toggleCustomInlineStyle, getSelectionCustomInlineStyle, } from 'draftjs-utils';
var MenuItem = Menu.Item;
// 字体大小
var fontSize = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96];
var FontSizeControl = /** @class */ (function (_super) {
    tslib_1.__extends(FontSizeControl, _super);
    function FontSizeControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 点击菜单
        _this.clickMenu = function (e) {
            var newEditState = toggleCustomInlineStyle(_this.props.editorState, 'fontSize', Number(e.key));
            _this.props.onFontSizeChange(newEditState);
        };
        // 得到当前的字体大小
        _this.getCurrentFontSize = function () {
            var currentFontSize = getSelectionCustomInlineStyle(_this.props.editorState, ['FONTSIZE']).FONTSIZE;
            if (currentFontSize) {
                return currentFontSize.substring(9);
            }
            else {
                return 14;
            }
        };
        // 渲染菜单
        _this.renderMenu = function () {
            return (React.createElement(Menu, { onClick: _this.clickMenu, style: { height: 250, overflow: 'scroll' } }, fontSize.map(function (value) {
                return React.createElement(MenuItem, { key: value }, value);
            })));
        };
        return _this;
    }
    FontSizeControl.prototype.render = function () {
        return (React.createElement(Dropdown, { overlay: this.renderMenu() },
            React.createElement(Button, { style: { margin: '0 0 15px 8px' } },
                this.getCurrentFontSize(),
                " ",
                React.createElement(Icon, { type: "down" }))));
    };
    return FontSizeControl;
}(React.Component));
export default FontSizeControl;
