import React from 'react';
import { useDispatch } from "react-redux";
import { fetchedPosts } from "../../redux/ducks/post/post.slice";
import { useNavigate } from "react-router-dom";

interface PostInterface {
    isAuth: boolean;
}

export const Posts: React.FC<PostInterface> = ({ isAuth }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    React.useEffect(() => {

        if (!isAuth) {
            return navigate("/login");
        }

        dispatch(fetchedPosts())
    },[])

    return (
        <div>
            Posts page
        </div>
    );
};
