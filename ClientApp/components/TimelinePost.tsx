import * as React from 'react';
import { PostDisplay } from '../store/types/posts';

type PostTimelineProps = {
    post: PostDisplay;
};

export const TimelinePost: React.StatelessComponent<PostTimelineProps> = ({ post }) => {
    if (post.isEditing) {
        return <div>TODO</div>;
    } else {
        const postData = post.post;
        return (
            <div>
                <h3>{postData.Title}</h3>
                <dl>
                    <dt>Author</dt>
                    <dd>{postData.EmailAddress}</dd>
                    <dt>Price</dt>
                    <dd>£{postData.Price}</dd>
                </dl>
                <div dangerouslySetInnerHTML={{__html: postData.ContentHtml}} />
            </div>
        );
    }
};
