import { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./style.scss";
import { getPostById } from "../../actions/posts/getPostById";
import { deletePost } from "../../actions/posts/deletePost";
import { deletePostQuery } from "../../queries";
import Preloader from "../../components/Preloader/index";
import { getCurrentPostId } from "../../actions/posts/getCurrentPost";
import { filter } from "lodash";
import { withCookies } from "react-cookie";
class SinglePost extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      currentPost: null,
      name: cookies.get("token") || "",
      userId: cookies.get('userId') || -1
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    deletePostQuery(this.props.match.params.id);
    this.props.deletePost(this.props.match.params.id);
    this.props.history.replace("/posts");
  }
  componentDidMount() {
    const POST_ID = this.props.match.params.id;
    this.props.getCurrentPostId(POST_ID);
    if (
      !this.props.isFullPosts &&
      !this.props.posts.some(element => element.id == POST_ID)
    ) {
      this.props.getPostById(POST_ID);
    }
  }
  render() {
    if (this.props.postsStatus !== "ready" || !this.props.currentPost)
      return <Preloader />;
    return (
      <div className="singlepost container">
        <h2 className="singlepost__title_disable">
          {this.props.currentPost.title}
        </h2>
        <p className="singlepost__text">{this.props.currentPost.body}</p>
        {this.state.token != '' &&
          this.props.currentPost.userId == this.state.userId && (
            <div className="singlepost__buttons">
              <Link
                className="singlepost__edit"
                to={`${this.props.match.params.id}/edit`}>
                Редактировать
              </Link>
              <button className="singlepost__delete" onClick={this.onDelete}>
                Удалить
              </button>
            </div>
          )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  let currentPost = filter(
    state.posts.loadedPosts,
    elem => elem.id == state.posts.currentPost
  )[0];
  return {
    userId: state.authUser.id,
    posts: state.posts.loadedPosts,
    postsStatus: state.posts.status,
    isFullPosts: state.posts.isFull,
    currentPostId: state.posts.currentPost,
    currentPost: currentPost,
  };
}
const mapDispathToProps = {
  getPostById,
  getCurrentPostId,
  deletePost,
};
export default withCookies(
  withRouter(connect(mapStateToProps, mapDispathToProps)(SinglePost))
);
