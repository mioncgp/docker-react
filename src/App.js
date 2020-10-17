import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation.js";
import AddPost from "./components/addPost/AddPost";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
      this.setState({
        route: "signin",
        isSignedIn: false,
        user: {
          id: "",
          name: "",
          email: "",
          entries: 0,
          joined: "",
        },
      });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
      this.setState({ route: route });
    } else {
      this.setState({ route: route });
    }
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.date,
      },
    });
  };

  render() {
    const { isSignedIn, route, user } = this.state;
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        <div className="container-app">
          {route === "home" ? (
            <div>
              <AddPost id={user.id} name={user.name} entries={user.entries} />
            </div>
          ) : route === "signin" ? (
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )}
        </div>
        <div style={{ fontSize: "0.1px" }}>react</div>
      </div>
    );
  }
}

export default App;
