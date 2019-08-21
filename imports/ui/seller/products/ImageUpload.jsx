import React, { Component, Fragment } from 'react';
import './image-upload.css';

class ImageUpload extends Component {
    state = { 
        image: '',
        cloudName: 'tungg',
        loading: false,
        unsignedUploadPreset: 'testUpload'
    }

    addPhoto = () => {
        if (this.state.image) return;
        var imageInput = this.refs.imageInput;
        imageInput.click();
    }

    inputChange = (event) => {
        let files = event.target.files;

        if (!files) return;

        this.uploadImage(files[0]);
    }
    removePhoto = () => {
        this.setState({image: ''});
    }

    uploadImage = (file) => {
        const { cloudName } = this.state;
        var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        var xhr = new XMLHttpRequest();
        var formData = new FormData();

        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.upload.addEventListener("progress", (e) => {            
            this.setState({ loading: true });
        });

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // file upload successfully
                var response = JSON.parse(xhr.responseText);

                var url = response.secure_url;

                var token = url.split('/');
                token.splice(-2, 0, 'w_150,c_scale');

                this.setState({image: token.join('/'), loading: false});
                this.props.add(token.join('/'));
                // document.getElementById('image-loaded').src = token.join('/');
            } 
        }

        formData.append('upload_preset', 'pcanrb6v');
        formData.append('tags', 'browser_upload');
        formData.append('file', file);
        xhr.send(formData);
    }

    render() { 
        const { image, loading } = this.state;
        return ( 
            <div id="image-uploader">
                <input type="file" id="image-input" style={{display: "none"}} ref="imageInput" onChange={this.inputChange} />
                <div className="photo-upload-wrapper" onClick={this.addPhoto}>
                    { !image ?
                        ( !loading ?  
                            <Fragment>
                                <img src="/add.png" alt="add button" className="add-btn-icon" />
                                <div className="add-btn-label">Add photo</div>
                            </Fragment>
                            :
                            <div className="loadersmall" />
                        )
                        :
                        <Fragment>
                            {/* <div className="image-uploaded" id="gallery" /> */}
                            <img src={image} alt="image upload" id="image-loaded" className="add-photo-image-upload" />
                            <button className="close add-photo-close-button" onClick={this.removePhoto}>
                                &times;
                            </button>
                        </Fragment>
                    }
                </div>
            </div>
        );
    }   
}
 
export default ImageUpload;