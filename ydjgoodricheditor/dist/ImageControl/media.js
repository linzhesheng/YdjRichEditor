import * as React from 'react';
var Audio = function (props) {
    return React.createElement("audio", { controls: true, src: props.src, style: { width: '100%', whiteSpace: 'initial' } });
};
var Image = function (props) {
    return React.createElement("div", { style: { textAlign: 'center' } },
        React.createElement("img", { src: props.src, style: { width: props.width, height: props.height, whiteSpace: 'initial' } }));
};
var Video = function (props) {
    return React.createElement("video", { controls: true, src: props.src, style: { width: '100%', whiteSpace: 'initial' } });
};
var Media = function (props) {
    var key = props.block.getEntityAt(0);
    if (key) {
        var entity = props.contentState.getEntity(key);
        var src = entity.getData().src;
        var type = entity.getType();
        var media = void 0;
        if (type === 'audio') {
            media = React.createElement(Audio, { src: src });
        }
        else if (type === 'IMAGE') {
            var _a = entity.getData(), width = _a.width, height = _a.height;
            media = React.createElement(Image, { src: src, width: width, height: height });
        }
        else if (type === 'video') {
            media = React.createElement(Video, { src: src });
        }
        return media;
    }
    return null;
};
export default Media;
