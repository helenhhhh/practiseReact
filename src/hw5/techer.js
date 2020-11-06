import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: '', password: '', credentials: {}, err: null, auth: false };
  }

  componentDidMount() {
    this.setState({
      credentials: {
        today: '20200622',
        tomorrow: '20200623',
        yeterday: '20200621'
      }
    });
  }

  handleUsername = (e) => {
    this.setState({ login: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { credentials } = this.state;
    const password = credentials[this.state.login];
    if (password && password === this.state.password) {
      this.setState({ auth: true });
    } else {
      this.setState({ err: password ? "Your password doesn't match our record." : "We cound't find your account in our system." });
    }
  };

  render() {
    const { login, password, auth, err } = this.state;
    console.log(this.state);
    return (
      <>
        {auth ? <div>Welcome back!</div> :
          <form onSubmit={this.handleSubmit}>
            {err && <div style={{ color: "red" }}>{err}</div>}
            <label for="username">Username:</label>
            <br />
            <input id="username" value={login} onChange={this.handleUsername} />
            <br />
            <label>Password:</label>
            <br />
            <input value={password} onChange={this.handlePassword} />
            <button type="submit">Login</button>
          </form>}
      </>
    );
  }
}

export default App;
