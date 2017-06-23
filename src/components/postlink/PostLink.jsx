import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./postlink.scss');

class PostLink extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { post } = this.props;
        return (
            <div className="postlink">
                <a href={post.media.url} target="_blank" className="content">{post.media.url}</a>
            </div>
        );
    };
}

export default connect()(PostLink);

