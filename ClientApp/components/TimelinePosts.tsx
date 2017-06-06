import * as React from 'react';
import { PostDisplay } from '../store/types/posts';
import { TimelinePost } from './TimelinePost';

type PostsTimelineProps = {
    posts: PostDisplay[];
};

export const TimelinePosts: React.StatelessComponent<PostsTimelineProps> = ({ posts }) => {
    return (
        <div>
            {posts.map((post) => <TimelinePost post={post} />)}
        </div>
    );
};
