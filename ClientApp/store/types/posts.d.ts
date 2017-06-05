import { RequestStatus } from '../../constants/index';

export interface PostsState {
    requestStatus: RequestStatus;
    posts: Post[];
}

export interface Post {
    PostId: number;
    Title: string;
    ContentHtml: string;
    EmailAddress: string;
    Price: number;
}