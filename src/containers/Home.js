import React from 'react';
import Main from '../components/main/Main';
import Navbar from '../components/navbar/Navbar';
import MainFooter from '../components/mainfooter/MainFooter';
import { connect } from 'react-redux';

require('./home.scss');

class Home extends React.Component {

    render() {
        return (
            <div className="home">
                <Navbar />
                <Main />
                <MainFooter />
            </div>
        );
    };
}

export default connect()(Home);