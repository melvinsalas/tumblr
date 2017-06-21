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
import { API_SERVER } from '../../constants.js';

require('./main.scss');

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      greeting: '',
      isOpen: false,
      posts: []
    }
  }

  onGreetingUpdate = (e) => {
    this.setState({ greeting: e.target.value });
  }

  updateGreeting = () => {
    this.props.testActions.setGreeting(this.state.greeting);
    this.setState({ greeting: '' });
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
          posts: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let { greeting } = this.props;

    return (
      <div className="container container-main">
        <div className="row">
          <div className="col-md-offset-1 col-md-7 no-padding">
            <NewPost />
            {!!this.state.posts && this.state.posts.map(post => {
              return (
                  <Posts key={post.id} post={post} />
              );
            })}
          </div>
          <div className="col-md-offset-1 col-md-3 no-padding">
            <Recommended />
            <Radar />
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
