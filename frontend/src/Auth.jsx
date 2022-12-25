import React from "react";

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authMethod: "login",
    };
  }

  login(e) {
    e.preventDefault();

    let username = document.getElementById("username-login").value;
    let password = document.getElementById("password-login").value;

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          document.querySelector(".error-message").innerHTML = data.error;
        } else {
          // store token
          document.cookie =
            "token=" +
            data.token +
            "; Expires=" +
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString(); // 30 days

          document.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }

  signup(e) {
    e.preventDefault();

    let username = document.getElementById("username-signup").value;
    let password = document.getElementById("password-signup").value;
    let email = document.getElementById("email-signup").value;
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          document.querySelector(".error-message").innerHTML = data.error;
          console.log(data.error);
        } else {
          document.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }

  changeMethod(method) {
    this.setState({
      authMethod: method,
    });
  }

  render() {
    if (this.state.authMethod === "login") {
      return (
        <div className="bg-tertiary p-4 rounded-xl">
          <div id="login-form">
            <form onSubmit={this.login}>
              <input
                className="input-auth"
                type="text"
                id="username-login"
                placeholder="Username"
              />
              <br />
              <input
                className="input-auth"
                type="password"
                id="password-login"
                placeholder="Password"
              />
              <button className="button-auth">Login</button>
            </form>
          </div>
          <ChooseMethod
            onClick={() => this.changeMethod("signup")}
            text="Create an account"
          />
        </div>
      );
    }
    return (
      <div className="bg-tertiary p-4 rounded-xl">
        <div id="signup-form">
          <form onSubmit={this.signup}>
            <input
              className="input-auth"
              type="text"
              id="username-signup"
              placeholder="Username"
            />
            <br />
            <input
              className="input-auth"
              type="email"
              id="email-signup"
              placeholder="Email"
            />
            <br />
            <input
              className="input-auth"
              type="password"
              id="password-signup"
              placeholder="Password"
            />
            <button className="button-auth">Sign up</button>
          </form>
        </div>
        <ChooseMethod
          onClick={() => this.changeMethod("login")}
          text="Log in"
        />
      </div>
    );
  }
}

function ChooseMethod(props) {
  return (
    <div className="text-center text-secondaryAlt mt-3">
      or&nbsp;
      <button
        className="text-primary hover:text-secondary"
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
}

export default AuthForm;
