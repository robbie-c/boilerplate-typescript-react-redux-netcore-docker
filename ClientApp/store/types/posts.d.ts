import { RequestStatus } from '../../constants/index';

export interface PostsState {
    requestStatus: RequestStatus;
    posts: PostDisplay[];
}

export interface PostDisplay {
    post: Post;
    isEditing: boolean;
}

export interface Post {
    PostId: number;
    Title: string;
    ContentHtml: string;
    EmailAddress: string;
    Price: number;
}