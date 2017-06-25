import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./loadingposts.scss');

class LoadingPost extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { loadingData } = this.props;
        return (
            <div className="loadingposts">
                <div className="post">
                    <div className="panel">
                        { loadingData &&
                            <div className="panel-body">
                                <span>🚀</span> Loading data... 
                            </div>
                        }
                        { !loadingData &&
                            <div className="panel-body">
                                <span>🤔</span> No content yet, try creating cool posts with the options above <span>⬆️</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    };
}


export default connect()(LoadingPost);
