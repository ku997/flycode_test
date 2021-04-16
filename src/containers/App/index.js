import { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Registration from "../../components/Registration";
import Login from "../../components/Login";
import Header from "../../components/Header";
import Posts from "../../containers/Posts";
import SinglePost from "../../containers/SinglePost";
import EditPost from "../EditPost";
import CreatePost from "../CreatePost";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/registration"
            component={() =>
              this.props.accessToken ? (
                <Redirect to="/posts" />
              ) : (
                <Registration />
              )
            }
          />
          <Route
            exact
            path="/login"
            component={() =>
              this.props.accessToken ? <Redirect to="/posts" /> : <Login />
            }
          />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/" component={() => <Redirect to="/posts" />} />
          <Route exact path="/posts/:id" component={SinglePost} />
          <Route
            exact
            path="/posts/:id/edit"
            component={() =>
              !this.props.accessToken ? <Redirect to="/login" /> : <EditPost />
            }
          />
          <Route
            exact
            path="/create_post"
            component={() =>
              !this.props.accessToken ? <Redirect to="/login" /> : <CreatePost />
            }
          />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.authUser.token,
  };
}
export default connect(mapStateToProps, null)(App);
