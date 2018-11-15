import * as React from 'react'
import { IProp } from './type'
import { Button, Popover, Input, Icon, Row, Col } from 'antd'
import {
    EditorState,
    Entity,
    RichUtils,
    Modifier
} from 'draft-js'

const emojiString1 = '😀,😁,🤣,😂,😄,😅,😆,😇,😉,😊,🙂,🙃,😋,😌,😍,😘,😙,😜,😝,🤑,🤓,😎,🤗,🤡,🤠,😏,😶,😑,😒,🙄,🤔,😳,😞,😟,😠,😡,😔,😕,☹️,😣,😖,😫,😤,😮,😱,😨,😰,😯,😦,😢,😥,😪,😓,🤤,😭,😲,🤥,🤢,🤧,🤐,😷,🤒,🤕,😴,💤,💩,😈,👹,👺,💀,👻,👽,🤖,👏,👋,👍,👎,👊,🤞,🤝,✌️,👌,✋,💪,🙏,☝️,👆,👇,👈,👉,🖐,🤘,✍️,💅,👄,👅,👂,👃,👁,👀,🗣,👶,👦,👧,👩,👱,👴,👵,👲,👳,👮,👷,💂,👨‍⚕️‍,👨‍🌾‍,👨‍🍳‍,👩‍🎓‍,👩‍🎤,👨‍💻‍,👨‍💼,👨‍🔧‍,👨‍🔬‍‍,👩‍🎨‍,👨‍🚒‍,👨‍✈️‍,👨‍🚀‍,👩‍⚖️‍,🕵,🎅,👼,👸,🤴,👰,🤵,🚶,🏃,💃,👯,👫,👬,👭,🤰,🤦‍,🙇,💁,🙅,🙋,💇,💆,💑,💏,👪,👨‍👩‍👧‍👦,👕,👖,👔,👗,👙,👘,💄,💋,👣,👠,👡,👢,👞,👟,👒,🎩,⛑,🎓,👑,🎒,👝,👛,👜,💼,👓,🕶,💍,🌂'
const emojiString2 = '🐶,🐱,🐭,🐹,🐰,🐻,🐼,🐨,🐯,🦁,🐮,🐷,🐽,🐸,🐙,🐵,🙈,🙉,🙊,🐒,🐔,🐧,🐦,🐤,🐣,🐥,🦆,🦉,🦅,🦇,🐺,🐗,🐴,🦄,🐝,🐛,🦋,🐌,🐞,🐜,🕷,🦂,🦀,🐍,🐢,🦎,🦑,🦐,🐠,🐟,🐡,🐬,🐳,🐊,🐆,🐅,🐃,🐂,🐄,🐪,🐫,🐘,🦏,🦍,🐐,🐏,🐑,🐎,🐖,🐀,🐁,🐓,🦃,🕊,🐕,🐩,🐈,🐇,🐿,🐾,🐲'
const emojiString3 = '🌵,🎄,🌲,🌳,🌴,🌱,🌿,☘,🍀,🎋,🍃,🍂,🍁,🌾,🌺,🌻,🌹,🥀,🌷,🌼,🌸,💐,🍄,🌰,🎃,🐚,🕸,🌎,🌍,🌏,🌕,🌖,🌗,🌘,🌑,🌒,🌓,🌔,🌚,🌝,🌛,🌞,🌙,⭐️,🌟,💫,✨,☄️,☀️,⛅️,🌦,☁️,🌧,⛈,🌩,⚡️,🔥,💥,❄️,🌨,☃️,⛄️,🌬,💨,🌪,🌫,☂️,☔️,💧,💦,🌊'
const emojis1 = emojiString1.split(',')
const emojis2 = emojiString2.split(',')
const emojis3 = emojiString3.split(',')
const emojis = (emojis1.concat(emojis2)).concat(emojis3)

export default class EmojiControl extends React.Component<IProp> {

    state = {
        historyEmojis: []
    }

    componentWillUnmount() {
        localStorage.setItem('historyEmojis',JSON.stringify(this.state.historyEmojis))
    }

    componentWillMount() {
        const historyEmojis = JSON.parse(localStorage.getItem('historyEmojis'))
        if(historyEmojis) {
            this.setState({historyEmojis})
        }
        
    }

    // 点击了emoji表情
    clickEmoji = (e) => {
        const emoji = e.target.innerHTML
        const historyEmojis = this.addEmojiIntoHistory(emoji)
        this.setState({ historyEmojis })
        const { editorState } = this.props
        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            emoji,
            editorState.getCurrentInlineStyle(),
        )
        this.props.onAddEmoji(EditorState.push(editorState, contentState, 'insert-characters'))
    }

    // 增加历史表情 
    addEmojiIntoHistory(emoji: string) {
        const historyEmojis = this.state.historyEmojis
        const newHistoryEmojis = historyEmojis.filter(historyEmoji => historyEmoji !== emoji)
        newHistoryEmojis.unshift(emoji)
        if(newHistoryEmojis.length>20) {
            newHistoryEmojis.pop()
        }

        return newHistoryEmojis
    }

    // 渲染表情界面
    renderEmojiMenus = () => {
        return (
            <div style={{ width: 350, height: 210 }}>
                <Row>
                    <Col span={7}>
                        <div style={{ height: 210, overflow: 'scroll', borderRight: '1px solid #ccc' ,marginRight:4}}>
                            <p>历史表情</p>
                            {
                                this.state.historyEmojis.map(emoji => {
                                    return <a key={emoji} style={{ marginRight: 9, marginBottom: 9, font: '20px' }} onClick={this.clickEmoji}>{emoji}</a>
                                })
                            }
                        </div>
                    </Col>
                    <Col span={17}>
                        <div style={{ height: 210, overflow: 'scroll' }}>
                            {
                                emojis.map(emoji => {
                                    return <a key={emoji} style={{ marginRight: 9, marginBottom: 9, font: '20px' }} onClick={this.clickEmoji}>{emoji}</a>
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        return(
            <Popover content={this.renderEmojiMenus()}>
                <Button style={{ marginLeft: 8 }}>
                    表情 <Icon type="down" />
                </Button>
            </Popover>
        )
    }
}