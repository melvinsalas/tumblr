if (module.hot) {
  module.hot.accept()
}

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Login from './containers/Login';
import Home from './containers/Home';
import { BrowserRouter, Route, Match, Switch } from 'react-router-dom';

const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Home} />
          </Switch>
        </Provider>
      </BrowserRouter>
    )
  }
};

render(<App />, document.getElementById('app'));
