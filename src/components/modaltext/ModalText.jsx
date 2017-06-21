import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./modaltext.scss');

class ModalText extends React.Component {
    constructor() {
        super();
    }
    render() {
        let {media, titleChange, contentChange, tagsChange} = this.props;
        return (
            <div className="modaltext">
                <input value={media.title} onChange={titleChange} className="title form-control" type="text" placeholder="Title" />
                <textarea value={media.content} onChange={contentChange} className="content form-control" type="text" placeholder="Your text here" />
                <input value={media.tagsStr} onChange={tagsChange} className="tags form-control" type="text" placeholder="#tags" />
            </div>
        );
    };
}

export default connect()(ModalText);
