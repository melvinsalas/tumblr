import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./postphoto.scss');

class PostPhoto extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { post } = this.props;
        return (
            <div><img src={post.media.url} alt="Sample"/></div>
        );
    };
}

export default connect()(PostPhoto);

