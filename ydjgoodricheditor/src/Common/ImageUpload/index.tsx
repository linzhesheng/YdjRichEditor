import * as React from 'react'
import { Upload, message, Icon, Modal } from 'antd'
import { IProp, IState } from './type'

export default class ImageUpload extends React.Component<IProp, IState> {
    constructor(props) {
        super(props)
        this.state = {
            args: {
                token: ''
            },

            previewVisible: false,
            previewImage: '',
            fileList: props.value || []
        }
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value
            this.setState({ fileList: value })
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }

    handleChange = ({ fileList }) => {
        const { onChange } = this.props
        this.setState({ fileList })
        if (onChange) {
            onChange(fileList)
        }
    }

    beforeUpload = async file => {

        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('图片不能超过 2MB!')
        }

        if (this.props.imageUploadConfig.getQnToken) {
            const res = await this.props.imageUploadConfig.getQnToken({})
            this.setState({
                args: {
                    token: res.token
                }
            })
        }
    }

    render() {
        const { limitNum } = this.props
        const { fileList, previewVisible, previewImage,args } = this.state
        const { action } = this.props.imageUploadConfig
        
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <>
                <Upload
                    name="file"
                    action = {action}
                    accept="image/*"
                    data={args}
                    beforeUpload={this.beforeUpload}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= limitNum ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img
                        alt="example"
                        style={{ width: '100%' }}
                        src={previewImage}
                    />
                </Modal>
            </>
        )
    }
}
