import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import { API_SERVER } from '../../constants.js';

require('./modalvideo.scss');

class ModalVideo extends React.Component {
    constructor() {
        super();
        this.state = {
            videoUrl: '',
            loading: false,
            loaded: false
        }
    }

    loadfile = (e) => {
        const self = this;
        if (e.target.files.length) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function () {

                var axios = require('axios');
                var fileName = '';
                var instance = axios.create({
                    baseURL: API_SERVER,
                    headers: { 'Authorization': 'Basic ' + localStorage.getItem('token') }
                });
                self.setState({ loading: true });
                instance.post('/media', {
                    name: file.name,
                    bytes: btoa(reader.result)
                })
                    .then(function (response) {
                        self.setState({
                            videoUrl: ("https://s3.us-east-2.amazonaws.com/melvinsalas.tumblr/" + response.data)
                        });
                        self.setState({ loading: false, loaded: true });
                        self.props.urlChange("https://s3.us-east-2.amazonaws.com/melvinsalas.tumblr/" + response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                        self.setState({ loading: false });
                    });
            }
            reader.onerror = function () {
                console.log('there are some problems');
            };
        } else {
            console.log('You need to select a file');
        }
    }

    render() {
        this.loadfile = this.loadfile.bind(this);
        let {media, urlChange, tagsChange} = this.props;
        return (
            <div className="modalvideo row">
                {
                    this.state.loaded &&
                    <div className="addvideo final-video col-xs-12">
                        <video className="loaded-video" controls="controls" autoplay="autoplay" name="media">
                            <source src={this.state.videoUrl} type="video/mp4" />
                        </video>
                    </div>
                }
                {
                    !this.state.loaded &&
                    <div>
                        <div className="addvideo left col-xs-6">
                            <input onChange={this.loadfile} className="input-file" type="file" />
                            <div className="modalvideo-logo">
                                <img src="src/assets/images/modal/upload-photo.svg" alt="Upload Video" />
                                <div className="modalvideo-subtitle">{(this.state.loading && <span>Loading video...</span>) || <span>Upload video</span>}</div>
                            </div>
                        </div>
                        <div className="addvideo col-xs-6">
                            <div className="modalvideo-logo">
                                <img src="src/assets/images/modal/upload-photos-for-web.svg" alt="Upload Video for Web" />
                                <div className="modalvideo-subtitle">Add video for web</div>
                            </div>
                        </div>
                    </div>
                }
                <input value={media.tagsStr} onChange={tagsChange} className="tags form-control" type="text" placeholder="#tags" />
            </div>
        );
    };
}

export default connect()(ModalVideo);
