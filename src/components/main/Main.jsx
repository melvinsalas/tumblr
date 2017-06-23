import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import NewPost from '../newpost/NewPost';
import Posts from '../posts/Posts';
import Radar from '../radar/Radar';
import Recommended from '../recommended/Recommended';
import Modal from '../../components/modal/Modal';
import LoadingPosts from '../loadingposts/LoadingPosts';
import { API_SERVER } from '../../constants.js';

require('./main.scss');

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      greeting: '',
      isOpen: false,
      posts: [],
      loadingData: true,
      algo: false
    }
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  componentWillMount() {
    const self = this;
    var axios = require('axios');
    var instance = axios.create({
      baseURL: API_SERVER,
      headers: { 'Authorization': 'Basic ' + localStorage.token }
    });

    instance.get('/posts')
      .then(function (response) {
        self.setState({
          posts: response.data,
          loadingData: false
        });
      })
      .catch(function (error) {
        console.log(error);
        self.setState({
          loadingData: false
        });
      });
  }

  addPost(post) {
    let newPosts = this.state.posts;
    newPosts.unshift(post);
    this.setState({
      posts: newPosts
    });
  }

  render() {
    let { greeting } = this.props;
    let addPost = this.addPost.bind(this);
    return (
      <div className="container container-main">
        <div className="row">
          <div className="col-md-offset-1 col-md-7 no-padding">
            <NewPost addPost={addPost} />
            {!!this.state.posts && 
              this.state.posts.map(post => {
                return (
                    <Posts key={post.id} post={post} />
                );})
            }
            {!this.state.posts.length && 
              <LoadingPosts loadingData={this.state.loadingData} />
            }
          </div>
          <div className="col-md-offset-1 col-md-3 no-padding">
            <div className="col-xs-6 col-md-12">
              <Recommended />
            </div>
            <div className="col-xs-6 col-md-12">
              <Radar />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default connect(
  state => {
    return {
      greeting: state.textState.get('greeting')
    }
  },
  dispatch => {
    return {
      testActions: bindActionCreators(testActions, dispatch)
    }
  }
)(Main);
