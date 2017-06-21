import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory'
import * as testActions from '../../actions/testActions';
import '../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

require('./navbar.scss');

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            greeting: ''
        }
    }

    onGreetingUpdate = (e) => {
        this.setState({ greeting: e.target.value });
    }

    updateGreeting = () => {
        this.props.testActions.setGreeting(this.state.greeting);
        this.setState({ greeting: '' });
    }

    logOutEvent = (e) => {
        e.preventDefault();
        this.logOut();
    }

    logOut = () => {
        localStorage.clear();
        const customHistory = createBrowserHistory({
            forceRefresh: true
        });
        customHistory.push('/');
    }

    render() {
        let { greeting } = this.props;
        !localStorage.getItem('token') && this.logOut()
        return (
            <nav className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="logo" href="#">
                            <div className="white-logo"></div>
                            <div className="animated-logo"></div>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form className="navbar-form navbar-left">
                            <div className="form-group search-bar inner-addon left-addon">
                                <input type="text" className="form-control input-search-bar" placeholder="Search Tumblr" />
                                <svg className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 53 53">
                                    <path d="M1394.12,952l-14.91-14.91a21.08,21.08,0,1,0-1.41,1.41l14.91,14.91a1,1,0,1,0,1.41-1.41Zm-49.43-29a19,19,0,1,1,19,19A19,19,0,0,1,1344.7,923Z" transform="translate(-1342.2 -901.5)" />
                                </svg>
                            </div>
                        </form>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active"><a href="#"><img className="image-navbar" src="src/assets/images/navbar/dashboard.svg" alt="Dashboard" />
                                <span className="hidden-sm hidden-md hidden-lg">Dashboard</span>
                            </a></li>
                            <li><a href="#"><img className="image-navbar" src="src/assets/images/navbar/explore.svg" alt="Explore" />
                                <span className="hidden-sm hidden-md hidden-lg">Explore</span>
                            </a></li>
                            <li><a href="#"><img className="image-navbar" src="src/assets/images/navbar/inbox.svg" alt="Inbox" />
                                <span className="hidden-sm hidden-md hidden-lg">Inbox</span>
                            </a></li>
                            <li><a href="#"><img className="image-navbar" src="src/assets/images/navbar/messaging.svg" alt="Messaging" />
                                <span className="hidden-sm hidden-md hidden-lg">Messaging</span>
                            </a></li>
                            <li><a href="#"><img className="image-navbar" src="src/assets/images/navbar/activity.svg" alt="Activity" />
                                <span className="hidden-sm hidden-md hidden-lg">Activity</span>
                            </a></li>
                            <li>
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <img className="image-navbar" src="src/assets/images/navbar/account.svg" alt="Account" />
                                    <span className="hidden-sm hidden-md hidden-lg">Account</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="profile-photo"><a href="#">
                                        <img className="navbar-profile-photo" src={localStorage.getItem("photo")} alt="Imagen" />
                                        {localStorage.getItem("name")}
                                    </a></li>
                                    <li role="separator" className="divider"></li>
                                    <li>
                                        <a onClick={this.logOutEvent}>
                                            Log out
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="btn-navbar">
                                    <img className="btn-navbar-image" src="src/assets/images/navbar/make-a-post.svg" alt="Make a Post" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
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
)(Navbar);
