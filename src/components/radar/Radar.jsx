import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import Blog from '../blog/Blog'
import SmallPost from '../smallpost/SmallPost'
import { API_SERVER } from '../../constants.js';

require('./radar.scss');

class Radar extends React.Component {
  constructor() {
    super();
    this.state = {
      radar: {},
      radarEmpty: false
    }
  }

  componentWillMount() {
    const self = this;

    var axios = require('axios');
    var instance = axios.create({
      baseURL: API_SERVER,
      headers: { 'Authorization': 'Basic ' + localStorage.token }
    });

    instance.get('/radar')
      .then(function (response) {
        self.setState({
          radar: response.data,
          radarEmpty: !response.data
        });
        console.log('radarEmpty?', self.state.radarEmpty);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="panel radar">
        <div className="panel-heading">
          <span>RADAR</span>
        </div>
        <div className="panel-body">
          <Blog blog={this.state.radar.user} />
          <SmallPost post={this.state.radar.post} />
          { this.state.radarEmpty &&
            <div className="radarEmpty">🚫 No radar data 📡</div>
          }
        </div>
      </div>
    );
  };
}

export default connect()(Radar);
