import * as React from 'react'

const Audio = (props) => {
    return <audio controls src={props.src} style={{ width: '100%', whiteSpace: 'initial' }} />
}
const Image = (props) => {

    return <div style={{textAlign:'center'}}><img src={props.src} style={{ width: props.width, height: props.height,whiteSpace: 'initial'}} /></div>
}
const Video = (props) => {
    return <video controls src={props.src} style={{ width: '100%', whiteSpace: 'initial' }} />
}
const Media = (props) => {

    const key = props.block.getEntityAt(0)

    if (key) {
        const entity = props.contentState.getEntity(
            key
        );
        const { src } = entity.getData()
        const type = entity.getType()
        let media
        if (type === 'audio') {
            media = <Audio src={src} />
        } else if (type === 'IMAGE') {
            const { width, height } = entity.getData()
            media = <Image src={src} width={width} height={height} />
        } else if (type === 'video') {
            media = <Video src={src} />
        }
        return media
    }
    
    return null
};

export default Media