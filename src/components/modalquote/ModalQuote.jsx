import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./modalquote.scss');

class ModalQuote extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="modalquote">
                <input className="title form-control" type="text" placeholder={`"Quote"`} />
                <input className="content form-control" type="text" placeholder="Source" />
                <input className="tags form-control" type="text" placeholder="#tags" />
            </div>
        );
    };
}

export default connect()(ModalQuote);
