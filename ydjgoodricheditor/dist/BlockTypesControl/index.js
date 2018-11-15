import * as tslib_1 from "tslib";
import * as React from 'react';
import { RichUtils } from 'draft-js';
import { Button, Menu, Dropdown, Icon } from 'antd';
var MenuItem = Menu.Item;
import { blockTypes } from '../config';
import '../Common/style.css';
var InlineTypesControl = /** @class */ (function (_super) {
    tslib_1.__extends(InlineTypesControl, _super);
    function InlineTypesControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 点击菜单
        _this.clickMenu = function (e) {
            var newEditState = RichUtils.toggleBlockType(_this.props.editorState, e.key);
            _this.props.onBlockTypeChange(newEditState);
        };
        // 得到当前块样式的label
        _this.getCurrentBlockLabel = function () {
            var editorState = _this.props.editorState;
            var selection = editorState.getSelection();
            var blockStyle = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
            var blockLabel = '';
            blockTypes.forEach(function (blockType) {
                if (blockType.style === blockStyle) {
                    blockLabel = blockType.label;
                    return;
                }
            });
            return blockLabel;
        };
        // 渲染菜单
        _this.renderMenu = function () {
            return (React.createElement(Menu, { onClick: _this.clickMenu }, blockTypes.map(function (blockType) {
                return React.createElement(MenuItem, { key: blockType.style }, blockType.label);
            })));
        };
        return _this;
    }
    InlineTypesControl.prototype.render = function () {
        return (React.createElement(Dropdown, { overlay: this.renderMenu() },
            React.createElement(Button, null,
                this.getCurrentBlockLabel(),
                " ",
                React.createElement(Icon, { type: "down" }))));
    };
    return InlineTypesControl;
}(React.Component));
export default InlineTypesControl;
