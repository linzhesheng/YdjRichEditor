// 行内样式
var inlineTypes = [
    { label: '加粗', style: 'BOLD' },
    { label: '倾斜', style: 'ITALIC' },
    { label: '下划线', style: 'UNDERLINE' },
    { label: '删除线', style: 'STRIKETHROUGH' },
];
// 块样式
var blockTypes = [
    { label: '普通', style: 'unstyled' },
    { label: 'h1', style: 'header-one' },
    { label: 'h2', style: 'header-two' },
    { label: 'h3', style: 'header-three' },
    { label: 'h4', style: 'header-four' },
    { label: 'h5', style: 'header-five' },
    { label: 'h6', style: 'header-six' },
    { label: '引用', style: 'blockquote' },
    { label: '代码', style: 'code-block' },
    // { label: 'atomic', style: 'atomic' },这个有问题
    { label: '有序列表', style: 'ordered-list-item' },
    { label: '无序列表', style: 'unordered-list-item' },
];
export { inlineTypes, blockTypes };
