import React from 'react';
import { useDispatch } from "react-redux";
import { fetchedPosts } from "../../redux/ducks/post/post.slice";

export const Posts = () => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchedPosts())
    },[])

    return (
        <div>
            Posts page
        </div>
    );
};
