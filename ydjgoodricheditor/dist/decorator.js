import * as React from 'react';
import { CompositeDecorator, } from 'draft-js';
// 自定义组件，用于超链接
var Link = function (props) {
    // 这里通过contentState来获取entity�，之后通过getData获取entity中包含的数据
    var url = props.contentState.getEntity(props.entityKey).getData().url;
    return (
    // @ts-ignore
    React.createElement("a", { href: url }, props.children));
};
// decorator，用于超链接
var decorator = new CompositeDecorator([
    {
        strategy: function (contentBlock, callback, contentState) {
            // 这个方法接收2个函数作为参数，如果第一个参数的函数执行时�返回true，就会执行第二个参数函数，同时会�将匹配的�字符的起始位置和结束位置传递给第二个参数。
            contentBlock.findEntityRanges(function (character) {
                var entityKey = character.getEntity();
                return (entityKey !== null &&
                    contentState.getEntity(entityKey).getType() === 'LINK');
            }, function () {
                var arr = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arr[_i] = arguments[_i];
                }
                callback.apply(void 0, arr);
            });
        },
        component: Link
    }
]);
export default decorator;
