import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import PostText from '../posttext/PostText'
import PostPhoto from '../postphoto/PostPhoto'
import PostQuote from '../postquote/PostQuote'
import PostVideo from '../postvideo/PostVideo'
import { API_SERVER } from '../../constants.js';


require('./post.scss');

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    const self = this;

    var axios = require('axios');
    var instance = axios.create({
      baseURL: API_SERVER,
      headers: { 'Authorization': 'Basic ' + localStorage.token }
    });

    instance.get('/users/' + self.props.post.userId)
      .then(function (response) {
        self.setState({
          user: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let { post } = this.props;
    let { user } = this.state;
    return (
      <div className="post">
        <img src={!!user && user.photo} alt="avatar" />
        <div className="panel">
          <div className="panel-heading row">
            <div className="col-sm-9">
              <div className="blog-name">
                <div className="blog-name">Here's a blog:</div> 
                <div className="account-name">{!!user && user.blogname}</div>
                <div className="btn-follow">Follow</div>    
              </div>
            </div>
            <div className="col-sm-3">
              <img className="btn-heading" src="src/assets/images/post/explore.svg" alt="Explore" />
              <img className="btn-heading btn-small" src="src/assets/images/post/close.svg" alt="Close" />
            </div>
          </div>
          <div className="panel-body">
            { post.media.type == "text" && <PostText post={post} />}
            { post.media.type == "photo" && <PostPhoto post={post} />}
            { post.media.type == "quote" && <PostQuote post={post} />}
            { post.media.type == "video" && <PostVideo post={post} />}
            <div className="row">
              <div className="col-xs-12">
                <div className="tags">
                  {!!post.media.tags && post.media.tags.map(tag => {
                    return (
                      <span key={tag}>#{tag} </span>
                    );
                  })}
                  </div>
              </div>
            </div>
          </div>
          <div className="panel-footer row">
            <div className="col-sm-4">
              <span className="count">
                234,450 notes
              </span>
            </div>
            <div className="col-sm-8">
              <img className="btn-footer" src="src/assets/images/post/like.svg" alt="Like" />
              <img className="btn-footer" src="src/assets/images/post/reblog.svg" alt="Reblog" />
              <img className="btn-footer" src="src/assets/images/post/reply.svg" alt="Reply" />
              <img className="btn-footer" src="src/assets/images/post/share.svg" alt="Share" />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default connect()(Posts);
