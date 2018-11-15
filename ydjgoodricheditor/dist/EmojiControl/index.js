import * as tslib_1 from "tslib";
import * as React from 'react';
import { Button, Popover, Icon, Row, Col } from 'antd';
import { EditorState, Modifier } from 'draft-js';
var emojiString1 = '😀,😁,🤣,😂,😄,😅,😆,😇,😉,😊,🙂,🙃,😋,😌,😍,😘,😙,😜,😝,🤑,🤓,😎,🤗,🤡,🤠,😏,😶,😑,😒,🙄,🤔,😳,😞,😟,😠,😡,😔,😕,☹️,😣,😖,😫,😤,😮,😱,😨,😰,😯,😦,😢,😥,😪,😓,🤤,😭,😲,🤥,🤢,🤧,🤐,😷,🤒,🤕,😴,💤,💩,😈,👹,👺,💀,👻,👽,🤖,👏,👋,👍,👎,👊,🤞,🤝,✌️,👌,✋,💪,🙏,☝️,👆,👇,👈,👉,🖐,🤘,✍️,💅,👄,👅,👂,👃,👁,👀,🗣,👶,👦,👧,👩,👱,👴,👵,👲,👳,👮,👷,💂,👨‍⚕️‍,👨‍🌾‍,👨‍🍳‍,👩‍🎓‍,👩‍🎤,👨‍💻‍,👨‍💼,👨‍🔧‍,👨‍🔬‍‍,👩‍🎨‍,👨‍🚒‍,👨‍✈️‍,👨‍🚀‍,👩‍⚖️‍,🕵,🎅,👼,👸,🤴,👰,🤵,🚶,🏃,💃,👯,👫,👬,👭,🤰,🤦‍,🙇,💁,🙅,🙋,💇,💆,💑,💏,👪,👨‍👩‍👧‍👦,👕,👖,👔,👗,👙,👘,💄,💋,👣,👠,👡,👢,👞,👟,👒,🎩,⛑,🎓,👑,🎒,👝,👛,👜,💼,👓,🕶,💍,🌂';
var emojiString2 = '🐶,🐱,🐭,🐹,🐰,🐻,🐼,🐨,🐯,🦁,🐮,🐷,🐽,🐸,🐙,🐵,🙈,🙉,🙊,🐒,🐔,🐧,🐦,🐤,🐣,🐥,🦆,🦉,🦅,🦇,🐺,🐗,🐴,🦄,🐝,🐛,🦋,🐌,🐞,🐜,🕷,🦂,🦀,🐍,🐢,🦎,🦑,🦐,🐠,🐟,🐡,🐬,🐳,🐊,🐆,🐅,🐃,🐂,🐄,🐪,🐫,🐘,🦏,🦍,🐐,🐏,🐑,🐎,🐖,🐀,🐁,🐓,🦃,🕊,🐕,🐩,🐈,🐇,🐿,🐾,🐲';
var emojiString3 = '🌵,🎄,🌲,🌳,🌴,🌱,🌿,☘,🍀,🎋,🍃,🍂,🍁,🌾,🌺,🌻,🌹,🥀,🌷,🌼,🌸,💐,🍄,🌰,🎃,🐚,🕸,🌎,🌍,🌏,🌕,🌖,🌗,🌘,🌑,🌒,🌓,🌔,🌚,🌝,🌛,🌞,🌙,⭐️,🌟,💫,✨,☄️,☀️,⛅️,🌦,☁️,🌧,⛈,🌩,⚡️,🔥,💥,❄️,🌨,☃️,⛄️,🌬,💨,🌪,🌫,☂️,☔️,💧,💦,🌊';
var emojis1 = emojiString1.split(',');
var emojis2 = emojiString2.split(',');
var emojis3 = emojiString3.split(',');
var emojis = (emojis1.concat(emojis2)).concat(emojis3);
var EmojiControl = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiControl, _super);
    function EmojiControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            historyEmojis: []
        };
        // 点击了emoji表情
        _this.clickEmoji = function (e) {
            var emoji = e.target.innerHTML;
            var historyEmojis = _this.addEmojiIntoHistory(emoji);
            _this.setState({ historyEmojis: historyEmojis });
            var editorState = _this.props.editorState;
            var contentState = Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), emoji, editorState.getCurrentInlineStyle());
            _this.props.onAddEmoji(EditorState.push(editorState, contentState, 'insert-characters'));
        };
        // 渲染表情界面
        _this.renderEmojiMenus = function () {
            return (React.createElement("div", { style: { width: 350, height: 210 } },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 7 },
                        React.createElement("div", { style: { height: 210, overflow: 'scroll', borderRight: '1px solid #ccc', marginRight: 4 } },
                            React.createElement("p", null, "\u5386\u53F2\u8868\u60C5"),
                            _this.state.historyEmojis.map(function (emoji) {
                                return React.createElement("a", { key: emoji, style: { marginRight: 9, marginBottom: 9, font: '20px' }, onClick: _this.clickEmoji }, emoji);
                            }))),
                    React.createElement(Col, { span: 17 },
                        React.createElement("div", { style: { height: 210, overflow: 'scroll' } }, emojis.map(function (emoji) {
                            return React.createElement("a", { key: emoji, style: { marginRight: 9, marginBottom: 9, font: '20px' }, onClick: _this.clickEmoji }, emoji);
                        }))))));
        };
        return _this;
    }
    EmojiControl.prototype.componentWillUnmount = function () {
        localStorage.setItem('historyEmojis', JSON.stringify(this.state.historyEmojis));
    };
    EmojiControl.prototype.componentWillMount = function () {
        var historyEmojis = JSON.parse(localStorage.getItem('historyEmojis'));
        if (historyEmojis) {
            this.setState({ historyEmojis: historyEmojis });
        }
    };
    // 增加历史表情 
    EmojiControl.prototype.addEmojiIntoHistory = function (emoji) {
        var historyEmojis = this.state.historyEmojis;
        var newHistoryEmojis = historyEmojis.filter(function (historyEmoji) { return historyEmoji !== emoji; });
        newHistoryEmojis.unshift(emoji);
        if (newHistoryEmojis.length > 20) {
            newHistoryEmojis.pop();
        }
        return newHistoryEmojis;
    };
    EmojiControl.prototype.render = function () {
        return (React.createElement(Popover, { content: this.renderEmojiMenus() },
            React.createElement(Button, { style: { marginLeft: 8 } },
                "\u8868\u60C5 ",
                React.createElement(Icon, { type: "down" }))));
    };
    return EmojiControl;
}(React.Component));
export default EmojiControl;
