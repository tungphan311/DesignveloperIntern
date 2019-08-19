import React, { Component } from 'react';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';

const app = express();

app.use('/static', express.static('./server/static'));
app.use(corsPrefetch);

app.post('/', imagesUpload(
    './server/static/files',
    'http://localhost:3000/'
));

app.listen(3000, () => {
    console.log('listen: 3000');
})

class ImageUpload extends Component {
    state = {  }
    render() { 
        return ( 
            <ImagesUploader
                url="http://localhost:3000/"
                optimisticPreviews
                multiple={false}
                onLoadEnd={(err) => {
                    if (err) {
                        console.error(err);
                    }
                }}
                label="Upload a picture"
            />
        );
    }   
}
 
export default ImageUpload;