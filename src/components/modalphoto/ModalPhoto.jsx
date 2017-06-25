import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import { API_SERVER } from '../../constants.js';
import UploadPhotoImage from '../../assets/images/modal/upload-photo.svg';
import UploadPhotoWebImage from '../../assets/images/modal/upload-photos-for-web.svg'

require('./modalphoto.scss');

class ModalPhoto extends React.Component {
    constructor() {
        super();
        this.state = {
            photoUrl: '',
            loading: false,
            loaded: false,
            forweb: false
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
                            photoUrl: ("https://s3.us-east-2.amazonaws.com/melvinsalas.tumblr/" + response.data)
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

    forweb = () => {
        this.setState({
            forweb: true
        });
    }

    keyPress(e){
        if(e.keyCode == 13){
            this.setState({
                photoUrl: e.target.value,
                loaded: true,
                forweb: false
            });
            this.props.urlChange(e.target.value);
        }
    }

    render() {
        this.loadfile = this.loadfile.bind(this);
        this.forweb = this.forweb.bind(this);
        this.keyPress = this.keyPress.bind(this);
        let {media, urlChange, tagsChange} = this.props;
        return (
            <div className="modalphoto row">
                {this.state.loaded &&
                    <div className="addphoto final-photo col-xs-12">
                        <img className="loaded-photo" src={this.state.photoUrl} alt="Upload Photo" />
                    </div>
                }
                {!this.state.loaded && !this.state.forweb &&
                    <div>
                        <div className="addphoto left col-xs-6">
                            <input onChange={this.loadfile} className="input-file" type="file" />
                            <div className="modalphoto-logo">
                                <img src={UploadPhotoImage} alt="Upload Photo" />
                                <div className="modalphoto-subtitle">{(this.state.loading && <span>Loading photo...</span>) || <span>Upload photo</span>}</div>
                            </div>
                        </div>
                        <div onClick={this.forweb} className="addphoto col-xs-6">
                            <div className="modalphoto-logo">
                                <img src={UploadPhotoWebImage} alt="Upload Photo for Web" />
                                <div className="modalphoto-subtitle">Add photo for web</div>
                            </div>
                        </div>
                    </div>
                }
                {this.state.forweb &&
                    <div className="div-forweb">
                        <input onKeyDown={this.keyPress} className="form-control" type="text" placeholder="URL"/>
                    </div>
                }
                <input value={media.tagsStr} onChange={tagsChange} className="tags form-control" type="text" placeholder="#tags" />
            </div>
        );
    };
}

export default connect()(ModalPhoto);
