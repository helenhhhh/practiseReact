import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  withRouter,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

/* Admin component */
const Private = () => (
  <div>
    <h2>Private Page</h2>
  </div>
);
/* Public component */
const Public = () => (
  <div>
    <h2>Public Page</h2>
  </div>
);

/* Login component */
const Login = props => {
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={props.loginHandler}>Login</button>
    </div>
  );
};

// create a custom route to handle private page
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

/* App component */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
  }
  loginHandler = () => {
    this.setState({ authenticated: true });
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Public</Link>
              </li>
              <li>
                <Link to="/private">Private</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => <Public authenticated={this.state.authenticated} />}
            />
            <PrivateRoute
              path="/private"
              authenticated={this.state.authenticated}
              component={Private}
            />
            <Route
              path="/login"
              render={() => (
                <Login
                  authenticated={this.state.authenticated}
                  loginHandler={this.loginHandler}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}



export default App;