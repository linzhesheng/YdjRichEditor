import * as tslib_1 from "tslib";
import * as React from 'react';
import '../Common/style.css';
import { Button } from 'antd';
import { RichUtils } from 'draft-js';
import { inlineTypes } from '../config';
var InlineTypesControl = /** @class */ (function (_super) {
    tslib_1.__extends(InlineTypesControl, _super);
    function InlineTypesControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 点击按钮
        _this.clickBtn = function (e, style) {
            // 阻止点击按钮后editor失去了焦点，而且按钮的事件必须是onMouseDown，onClick调用该方法editor还是会失去焦点
            e.preventDefault();
            var newEditState = RichUtils.toggleInlineStyle(_this.props.editorState, style);
            _this.props.onInlineTypeChange(newEditState);
        };
        return _this;
    }
    InlineTypesControl.prototype.render = function () {
        var _this = this;
        var currentStyle = this.props.editorState.getCurrentInlineStyle();
        return (React.createElement("div", { style: { display: 'inline-block', margin: '15px 0' } }, inlineTypes.map(function (inlineType) {
            return React.createElement(Button, { key: inlineType.style, onMouseDown: function (e) { return _this.clickBtn(e, inlineType.style); }, className: currentStyle.has(inlineType.style) ? 'activeButton' : '', style: { marginRight: 8 } }, inlineType.label);
        })));
    };
    return InlineTypesControl;
}(React.Component));
export default InlineTypesControl;
