import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import { API_SERVER } from '../../constants.js';

require('./modallink.scss');

class ModalLink extends React.Component {
    constructor() {
        super();
    }

    urlHandleChange = (e) => {
        this.props.urlChange(e.target.value);
    }

    render() {
        let {media, urlChange, tagsChange} = this.props;
        let urlHandleChange = this.urlHandleChange.bind(this);
        return (
            <div className="modallink row">
                <input value={media.url} onChange={urlHandleChange} className="link form-control" type="text" placeholder="Link" />
                <input value={media.tagsStr} onChange={tagsChange} className="tags form-control" type="text" placeholder="#tags" />
            </div>
        );
    };
}

export default connect()(ModalLink);
