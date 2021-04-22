import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import PostList from "../../components/PostsList/index.js";
import ReactPaginate from "react-paginate";
import { getPosts } from "../../actions/posts/getPosts";
import { getPagState } from "../../actions/pagination/getPagState";
import Preloader from "../../components/Preloader/index";
import ErrorPage from "../../components/ErrorPage/Index.js";
import { Input, Space } from "antd";
import { filter } from "lodash";

const perPage = 10;
const { Search } = Input;

function Posts(props) {
  const allPosts = useSelector(state => state.posts.loadedPosts);
  const postsStatus = useSelector(state => state.posts.status);
  const isFullPosts = useSelector(state => state.posts.isFull);
  const isFullPost = useSelector(state => state.posts.isFullPost);
  const currentPagPage = useSelector(state => state.pagState);
  const [posts, setPosts] = useState(allPosts);
  const dispatch = useDispatch();

  function handlePageClick(data) {
    let selected = data.selected;
    if (window.location.href.match(/posts/, "gi"))
      dispatch(getPagState(selected));
  }

  const onSearch = val => {
    setPosts(filter(allPosts, post => post.title.includes(val)));
  };
  useEffect(() => {
    setPosts(allPosts);
  }, [allPosts]);
  
  useEffect(() => {
    dispatch(getPosts());
  }, [isFullPosts]);

  useEffect(() => {
    if (!window.location.href.match(/posts/, "gi")) dispatch(getPagState(0));
  });

  if (!postsStatus || postsStatus === "loading") return <Preloader />;
  if (postsStatus === "error") return <ErrorPage />;
  return (
    <div className="posts">
      <div className="container">
        <div className="posts__inner">
          <h1>Посты</h1>
          <Space direction="vertical">
            <Search
              className="posts__search"
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </Space>

          <PostList
            posts={posts.slice(
              currentPagPage * perPage,
              (currentPagPage + 1) * perPage
            )}
          />
          {Math.ceil(posts.length / perPage) > 1 && (
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              pageCount={Math.ceil(posts.length / perPage)}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__prev"}
              nextLinkClassName={"pagination__next"}
              pageClassName={"pagination__num"}
              breakClassName={"pagination__break"}
              disabledClassName={"pagination__num--disabled"}
              activeClassName={"pagination__num_active"}
              forcePage={currentPagPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
