import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import Blog from '../blog/Blog'
import SmallPost from '../smallpost/SmallPost'

require('./radar.scss');

class Radar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="panel radar">
        <div className="panel-heading">
          <span>RADAR</span>
        </div>
        <div className="panel-body">
          <Blog />
          <SmallPost />
        </div>
      </div>
    );
  };
}

export default connect()(Radar);
