import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store/types';
import { RequestStatus } from '../constants';
import deepEquals from 'deep-equal';
import { postsActions } from '../store/actions/posts';
import { PostsState } from '../store/types/posts';

type PostsProps =
    PostsState
    & typeof postsActions
    & RouteComponentProps<{}>;

class Posts extends React.Component<PostsProps, {}> {
    requestData(props: PostsProps, oldProps?: PostsProps) {
        if (!oldProps || !deepEquals(props, oldProps)) {
            this.props.postsRequest();
        }
    }

    componentDidMount() {
        this.requestData(this.props);
    }

    componentWillReceiveProps(nextProps: PostsProps) {
        this.requestData(nextProps, this.props);
    }

    public render() {
        return (
            <div>
                <h1>Posts</h1>
                <p>This component demonstrates using data from the server, in a timeline format.</p>
                {
                    this.props.requestStatus === RequestStatus.Success ? (
                        <PostsTimeline posts={this.props.posts} />
                    ) : (
                        'loading...'
                    )
                }
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.posts,
    postsActions
)(Posts) as typeof Posts;
