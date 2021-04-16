import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { createPost } from '../../actions/posts/createPost';
import "./style.scss";
// import Preloader from "../../components/Preloader/index";

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPost: null,
            title: '',
            body: ''
        };
        this.onSave = this.onSave.bind(this);
    }
    handleInputChange(field, el) {
        this.setState({
            [field]: el.target.value,
        });
    }

    onSave(event) {
        event.preventDefault();
        this.props.createPost(this.props.userId, this.state.title, this.state.body);
        this.props.history.push(`/posts`)
    }
    componentDidMount() {

    }
    render() {
        return (
            <form className="createpost container">
                <input required onChange={this.handleInputChange.bind(this, 'title')} className="createpost__title" value={this.state.title} type="text" />
                <textarea required onChange={this.handleInputChange.bind(this, 'body')} rows='10' className="createpost__text" value={this.state.body} type="text" />

                <div className="createpost__buttons">
                    <button className='createpost__save' onClick={this.onSave}>Сохранить</button>
                </div>
            </form>
        );
    }
}
function mapStateToProps(state) {
    return {
        accessToken: state.authUser.token,
        userId: state.authUser.id,
    };
}
const mapDispathToProps = {
    createPost
};
export default withRouter(connect(mapStateToProps, mapDispathToProps)(CreatePost));
