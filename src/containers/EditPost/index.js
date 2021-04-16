import { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./style.scss";
import { getPostById } from "../../actions/posts/getPostById";
import { editPost } from "../../actions/posts/editPost";
import Preloader from "../../components/Preloader/index";
import { getCurrentPostId } from "../../actions/posts/getCurrentPost";
import { filter } from 'lodash'
class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPost: null,
            title: this.props.currentPost.title,
            body: this.props.currentPost.body
        };
        this.onSave = this.onSave.bind(this);
    }
    handleInputChange(field, el) {
        this.setState({
            [field]: el.target.value,
        });
    }

    onSave() {

            this.props.editPost(this.props.match.params.id, this.state.title, this.state.body)

        this.props.history.push(`/posts/${this.props.match.params.id}`)
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
        if(this.props.currentPost.userId != this.props.userId) this.props.history.goBack();
    }
    render() {
        if (this.props.postsStatus !== "ready" || !this.props.currentPost)
            return <Preloader />;
        return (
            <div className="editpost container">
                <input onChange={this.handleInputChange.bind(this, 'title')} className="editpost__title" defaultValue={this.state.title} type="text" />
                <textarea onChange={this.handleInputChange.bind(this, 'body')} rows='10' className="editpost__text" defaultValue={this.state.body} type="text" />

                <div className="editpost__buttons">
                    <button className='editpost__save' onClick={this.onSave}>Сохранить</button>
                    <Link className="editpost__cancel" to={`/posts/${this.props.match.params.id}`}>Отмена</Link>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    let currentPost = filter(state.posts.loadedPosts, elem => elem.id == state.posts.currentPost)[0];
    return {
        accessToken: state.authUser.token,
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
    editPost
};
export default withRouter(
    connect(mapStateToProps, mapDispathToProps)(EditPost)
);
