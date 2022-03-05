import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchedPosts } from "../../redux/ducks/post/post.slice";
import { Card } from "@mui/material";
import { RootState } from "../../redux/store";
import { Post } from "../Profile/ProfilePosts/Post";

interface PostInterface {
    isOwner: boolean;
}

export const Posts: React.FC<PostInterface> = ({ isOwner }) => {
    const { posts } = useSelector((state: RootState) => state.postReducer)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchedPosts())
    },[])

    if (!posts) {
        return <div>...loading</div>
    }
    return (
        <Card>
            {posts.map((post) => <Post isOwner={isOwner} post={post}/>)}
        </Card>
    );
};
