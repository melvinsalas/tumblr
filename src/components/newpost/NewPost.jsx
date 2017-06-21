import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import Modal from '../../components/modal/Modal';

require('./newpost.scss');

class NewPost extends React.Component {
    constructor() {
        super();
        var handlerOpen  = this.handlerOpen.bind(this);
        this.state = {
            isOpen: false,
            modalType: ''
        }
    }

    toggleOpen = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handlerOpen(){
        this.toggleOpen();
    }

    openModal (newModalType) {
        this.setState({ modalType: newModalType });
        this.toggleOpen();
    }

    render() {
        let handlerOpen = this.handlerOpen;
        return (
            <div className="newpost">
                <Modal isOpen={this.state.isOpen} modalType={this.state.modalType} handlerOpen={handlerOpen.bind(this)} />
                <img src={localStorage.getItem("photo")} alt="avatar" />
                <div className="panel post-panel">
                    <div className="post-option" onClick={() => this.openModal('text')} >
                        <img className="img-newpost img-responsive" src="src/assets/images/new-post/text.svg" alt="" />
                        <p className="label-imagepost">Text</p>
                    </div>
                    <div className="post-option" onClick={() => this.openModal('photo')} >
                        <img className="img-newpost img-responsive" src="src/assets/images/new-post/photo.svg" alt="" />
                        <p className="label-imagepost">Photo</p>
                    </div>
                    <div className="post-option" onClick={() => this.openModal('quote')} >
                        <img className="img-newpost img-responsive" src="src/assets/images/new-post/quote.svg" alt="" />
                        <p className="label-imagepost">Quote</p>
                    </div>
                    <div className="post-option" onClick={() => this.openModal('text')} >
                        <img className="img-newpost img-responsive" src="src/assets/images/new-post/link.svg" alt="" />
                        <p className="label-imagepost">Link</p>
                    </div>
                    <div className="post-option" onClick={() => this.openModal('text')} >
                        <img className="img-newpost img-responsive" src="src/assets/images/new-post/chat.svg" alt="" />
                        <p className="label-imagepost">Chat</p>
                    </div>
                    <div className="post-option" onClick={() => this.openModal('text')} >
                        <img className="img-newpost img-responsive" src="src/assets/images/new-post/audio.svg" alt="" />
                        <p className="label-imagepost">Audio</p>
                    </div>
                    <div className="post-option" onClick={() => this.openModal('text')} >
                        <img className="img-newpost img-responsive" src="src/assets/images/new-post/video.svg" alt="" />
                        <p className="label-imagepost">Video</p>
                    </div>
                </div>
            </div>
        );
    };
}

export default connect()(NewPost);
