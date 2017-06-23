import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./blog.scss');

class Blog extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {blog} = this.props;
        return (
            !!blog &&
            <div className="blog">
                <img className="blog-photo" src={blog.photo} alt="Avatar" />
                <div className="blog-info">
                    <div className="title">{blog.name}</div>
                    <div className="subtitle">{blog.blogname}</div>
                </div>
                <img className="blog-btn" src="src/assets/images/blog/follow.svg" alt="Follow"/>
            </div>
        );
    };
}

export default connect()(Blog);
