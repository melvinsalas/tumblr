import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import Blog from '../blog/Blog'
import { API_SERVER } from '../../constants.js';

require('./recommended.scss');

class Recommended extends React.Component {
  constructor() {
    super();
    this.state = {
      recomendations: [],
      recomendationsEmpty: false
    }
  }

  componentWillMount() {
    const self = this;
    var axios = require('axios');
    var instance = axios.create({
      baseURL: API_SERVER,
      headers: { 'Authorization': 'Basic ' + localStorage.token }
    });

    instance.get('/recommended')
      .then(function (response) {
        self.setState({
          recomendations: response.data,
          recomendationsEmpty: response.data.length == 0
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  write() {
    console.log('write');
  }

  render() {
    return (
      <div className="panel recommended">
        <div className="panel-heading">
          <span>RECOMMENDED BLOGS</span>
        </div>
        <div className="panel-body">
          {this.state.recomendations.map(recomendation => {
            {
              return (
                <div key={recomendation.id}>
                  <Blog blog={recomendation} />
                  <hr />
                </div>
              );
            }
          })}
          { this.state.recomendationsEmpty &&
            <div className="recomendationsEmpty">🚫 No recomendations data 👤</div>
          }
        </div>
        { !this.state.recomendationsEmpty &&
          <div className="panel-footer">
            <a href="">EXPLORE TUMBLR</a>
          </div>
        }
      </div>
    );
  };
}

export default connect()(Recommended);
