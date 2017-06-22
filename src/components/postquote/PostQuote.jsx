import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./postquote.scss');

class PostQuote extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { post } = this.props;
        return (
            <div className="postquote">
                <div className="title">"{post.media.title}"</div>
                <div className="content">— {post.media.content}</div>
            </div>
        );
    };
}

export default connect()(PostQuote);

