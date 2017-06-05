import {createAction} from 'redux-actions';
import * as Actions from '../actionTypes/posts';

export declare interface PostsRequest {}

export const postsRequest = createAction<PostsRequest>(Actions.POSTS_REQUEST);

export const postsActions = {
    postsRequest
};
