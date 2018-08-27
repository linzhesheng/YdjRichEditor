import * as React from 'react'
import {
    CompositeDecorator,

} from 'draft-js'

// 自定义组件，用于超链接
const Link = (props) => {
    // 这里通过contentState来获取entity�，之后通过getData获取entity中包含的数据
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        // @ts-ignore
        <a href={url}>
            {props.children}
        </a>
    )
}

// decorator，用于超链接
const decorator = new CompositeDecorator([
    {
        strategy (contentBlock, callback, contentState) {

            // 这个方法接收2个函数作为参数，如果第一个参数的函数执行时�返回true，就会执行第二个参数函数，同时会�将匹配的�字符的起始位置和结束位置传递给第二个参数。
            contentBlock.findEntityRanges(
                (character) => {
                    const entityKey = character.getEntity();
                    return (
                        entityKey !== null &&
                        contentState.getEntity(entityKey).getType() === 'LINK'
                    );
                }, (...arr) => {
                    callback(...arr)
                }
            );
        },
        component: Link
    }
]);

export default decorator