import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchedPosts } from "../../redux/ducks/post/post.slice";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { RootState } from "../../redux/store";
import { Post } from "../Profile/ProfilePosts/Post";

interface PostInterface {
    isAuth: boolean;
    isOwner: boolean;
}

export const Posts: React.FC<PostInterface> = ({ isAuth, isOwner }) => {
    const { posts } = useSelector((state: RootState) => state.postReducer)
    let navigate = useNavigate();
    const dispatch = useDispatch()

    React.useEffect(() => {

        if (!isAuth) {
            return navigate("/login");
        }

        dispatch(fetchedPosts())
    },[isAuth])

    if (!posts) {
        return <div>...loading</div>
    }
    return (
        <Card>
            {posts.map((post) => <Post isOwner={isOwner} post={post}/>)}
        </Card>
    );
};
