import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./mainfooter.scss');

class MainFooter extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="mainfooter text-center row">
          <ul className="col-sx-12">
              <li className="active">© BrainStation</li>
              <li>Help</li>
              <li>About</li>
              <li>Apps</li>
              <li>Developers</li>
              <li>Themes</li>
              <li>Jobs</li>
              <li>Legal</li>
              <li>Privacy</li>
          </ul>
      </div>
    );
  };
}

export default connect()(MainFooter);
