import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./postvideo.scss');

class PostVideo extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { post } = this.props;
        return (
            <video controls="controls" autoplay="autoplay" name="media">
                <source src={post.media.url} type="video/mp4"/>
            </video>
        );
    };
}

export default connect()(PostVideo);

