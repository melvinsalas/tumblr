import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./modalphoto.scss');

class ModalPhoto extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="modalphoto row">
                <div className="addphoto left col-xs-6">
                    <div className="modalphoto-logo">
                        <img src="src/assets/images/modal/upload-photo.svg" alt="Upload Photo" />
                        <div className="modalphoto-subtitle">Upload photo</div>
                    </div>
                </div>
                <div className="addphoto col-xs-6">
                    <div className="modalphoto-logo">
                        <img src="src/assets/images/modal/upload-photos-for-web.svg" alt="Upload Photo for Web" />
                        <div className="modalphoto-subtitle">Add photo for web</div>
                    </div>
                </div>
            </div>
        );
    };
}

export default connect()(ModalPhoto);
