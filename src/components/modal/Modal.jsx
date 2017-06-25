import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import ModalText from '../modaltext/ModalText'
import ModalPhoto from '../modalphoto/ModalPhoto'
import ModalQuote from '../modalquote/ModalQuote'
import ModalVideo from '../modalvideo/ModalVideo'
import ModalLink from '../modallink/ModalLink'
import ModalChat from '../modalchat/ModalChat'
import ModalAudio from '../modalaudio/ModalAudio'
import { API_SERVER } from '../../constants.js';
import settingsImage from '../../assets/images/modal/settings.svg';
import twitterImage from '../../assets/images/modal/twitter.svg';

require('./modal.scss');

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            media: {
                type: "",
                tags: [],
                title: "",
                content: "",
                url: ""
            },
            tagsStr: ""
        }
    }

    submit = () => {
        var axios = require('axios');

        var instance = axios.create({
            baseURL: API_SERVER,
            headers: { 'Authorization': 'Basic ' + localStorage.getItem('token') }
        });

        const self = this;
        instance.post('/posts', self.state)
            .then(function (response) {
                self.props.addPost(response.data);
                self.setState({
                    tagsStr: ""
                });
                self.props.handlerOpen();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    titleChange(e) {
        this.state.media.title = e.target.value;
    }

    contentChange(e) {
        this.state.media.content = e.target.value;
    }

    urlChange(url) {
        this.state.media.url = url;
    }

    tagsChange(e) {
        this.state.media.tags = e.target.value
            .split('#')
            .map(Function.prototype.call, String.prototype.trim)
            .filter(Boolean);
        this.setState({tagsStr: e.target.value});
    }

    render() {
        let addPost = this.props.addPost;
        let contentChange = this.contentChange.bind(this);
        let handlerOpen = this.props.handlerOpen;
        let media = this.state;
        let modalType = this.props.modalType;
        let tagsChange = this.tagsChange.bind(this);
        let titleChange = this.titleChange.bind(this);
        let urlChange = this.urlChange.bind(this);
        this.state.media.type = modalType;
        return (
            (this.props.isOpen &&
                <div className="modal2 row">
                    <div className="background" onClick={() => handlerOpen()}></div>
                    <div className="panel col-md-offset-3 col-md-6">
                        <div className="panel-heading">
                            <span className="account">Account</span>
                            <img className="settings" src={settingsImage} alt="Settings" />
                        </div>
                        <div className="panel-body">
                            {modalType == 'text'  && <ModalText media={media} titleChange={titleChange} contentChange={contentChange} tagsChange={tagsChange}/>}
                            {modalType == 'photo' && <ModalPhoto media={media} urlChange={urlChange} tagsChange={tagsChange}/>}
                            {modalType == 'quote' && <ModalQuote media={media} titleChange={titleChange} contentChange={contentChange} tagsChange={tagsChange}/>}
                            {modalType == 'video' && <ModalVideo media={media} urlChange={urlChange} tagsChange={tagsChange}/>}
                            {modalType == 'link'  && <ModalLink media={media} urlChange={urlChange} tagsChange={tagsChange}/>}
                            {modalType == 'chat'  && <ModalChat media={media} titleChange={titleChange} contentChange={contentChange} tagsChange={tagsChange}/>}
                            {modalType == 'audio' && <ModalAudio media={media} urlChange={urlChange} tagsChange={tagsChange}/>}
                        </div>
                        <div className="panel-footer">
                            <span className="btn-close" onClick={() => handlerOpen()}>CLOSE</span>
                            <button onClick={this.submit} className="btn btn-post">POST</button>
                            <img className="twitter" src={twitterImage} alt="Twitter" />
                        </div>
                    </div>
                </div>)
        );
    };
}

export default connect()(Modal);
