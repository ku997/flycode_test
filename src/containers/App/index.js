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
import Users from "../../containers/Users";
import SinglePost from "../../containers/SinglePost";
import EditPost from "../EditPost";
import CreatePost from "../CreatePost";
import { useCookies } from 'react-cookie';

function App () {
  const [cookies] = useCookies(['token']);
  const accessToken = cookies.token;
    return (
      <Router>
        <Header accessToken = {accessToken} />
        <Switch>
          <Route
            exact
            path="/registration"
            component={() =>
              accessToken ? (
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
              accessToken ? <Redirect to="/posts" /> : <Login />
            }
          />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/" component={() => <Redirect to="/posts" />} />
          <Route exact path="/posts/:id" component={SinglePost} />
          <Route
            exact
            path="/posts/:id/edit"
            component={() =>
              !accessToken ? <Redirect to="/login" /> : <EditPost />
            }
          />
          <Route
            exact
            path="/create_post"
            component={() =>
              !accessToken ? <Redirect to="/login" /> : <CreatePost />
            }
          />
        </Switch>
      </Router>
    );
  }

export default App;
