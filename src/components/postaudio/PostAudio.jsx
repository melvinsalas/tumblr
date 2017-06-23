import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./postaudio.scss');

class PostAudio extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { post } = this.props;
        return (
            <video className="postaudio" controls="controls" autoplay="autoplay" name="media">
                <source src={post.media.url} type="audio/mpeg"/>
            </video>
        );
    };
}

export default connect()(PostAudio);

