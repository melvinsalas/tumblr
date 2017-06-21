import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./smallpost.scss');

class SmallPost extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="smallpost">
                <img src="https://68.media.tumblr.com/9f5418dd8fa146aade4f6148a0d3287d/tumblr_orpkw4XkIT1s60oo7o1_400.gif" alt="Post Image" />
                <div className="footer">
                    <span className="count">234,450 notes</span>
                    <div className="actions">
                        <img className="btn-footer" src="src/assets/images/post/like.svg" alt="Like" />
                        <img className="btn-footer" src="src/assets/images/post/reblog.svg" alt="Reblog" />
                    </div>
                </div>
            </div>
        );
    };
}

export default connect()(SmallPost);
