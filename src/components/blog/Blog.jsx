import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import { API_SERVER } from '../../constants.js';
import followImage from '../../assets/images/blog/follow.svg'

require('./blog.scss');

class Blog extends React.Component {
    constructor() {
        super();
    }

    follow = () => {
        var id = this.props.blog.id;
        var axios = require('axios');

        var instance = axios.create({
            baseURL: API_SERVER,
            headers: { 'Authorization': 'Basic ' + localStorage.getItem('token') }
        });

        const self = this;
        instance.post('/following', { id })
        .then(function (response) {
            self.props.blog.isFollowed = true;
            self.forceUpdate();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        this.follow = this.follow.bind(this);
        let {blog} = this.props;
        return (
            !!blog &&
            <div className="blog">
                <img className="blog-photo" src={blog.photo} alt="Avatar" />
                <div className="blog-info">
                    <div className="title">{blog.name}</div>
                    <div className="subtitle">{blog.blogname}</div>
                </div>
                {!blog.isFollowed && 
                    <img onClick={this.follow} className="blog-btn" src={followImage} alt="Follow"/>
                }
            </div>
        );
    };
}

export default connect()(Blog);
