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

                {
                    fetch('https://www.crhoy.com/nacionales/escasas-mejoras-mantienen-a-costa-rica-con-redes-moviles-lentas/')
                        .then(function(data) {
                            console.log(data);
                        })
                        .catch(function(error) {
                            console.log(error);
                        })   

                }
            </div>
        );
    };
}

export default connect()(Home);