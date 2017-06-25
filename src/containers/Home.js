import React from 'react';
import Main from '../components/main/Main';
import Navbar from '../components/navbar/Navbar';
import MainFooter from '../components/mainfooter/MainFooter';
import { connect } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory'


require('./home.scss');

class Home extends React.Component {

    logOut = () => {
        localStorage.clear();
        const customHistory = createBrowserHistory({
            forceRefresh: true
        });
        customHistory.push('/');
    }

    render() {
        return (
            !localStorage.getItem('token')? this.logOut() :
            <div className="home">
                <Navbar />
                <Main />
                <MainFooter />
            </div>
        );
    };
}

export default connect()(Home);