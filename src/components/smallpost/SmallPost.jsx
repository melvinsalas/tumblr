import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import LikeImage from '../../assets/images/post/like.svg';
import ReblogImage from '../../assets/images/post/reblog.svg';

require('./smallpost.scss');

class SmallPost extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { post } = this.props; 
        return (
            !!post && 
            <div className="smallpost">
                <img src={post.media.url} alt="Post Image" />
                <div className="footer">
                    <span className="count">234,450 notes</span>
                    <div className="actions">
                        <img className="btn-footer" src={LikeImage} alt="Like" />
                        <img className="btn-footer" src={ReblogImage} alt="Reblog" />
                    </div>
                </div>
            </div>
        );
    };
}

export default connect()(SmallPost);
