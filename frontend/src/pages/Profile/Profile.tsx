import React from 'react';
import { ProfilePosts } from './ProfilePosts';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchedProfile } from "../../redux/ducks/profile/profile.slice";
import { useNavigate, useParams } from "react-router-dom";

export const Profile = () => {

    const dispatch = useDispatch();
    const { profile } = useSelector((state: RootState) => state.profileReducer)
    const { userId } = useSelector((state: RootState) => state.authReducer)
    let id = useParams<string>();
    let navigate = useNavigate()
    React.useEffect(() => {
        if  (!userId) {
            return navigate('/login')
        }
        dispatch(fetchedProfile(+id));
    },[])
    return (
        <div>
            {profile?.email}
            Profile page
            <ProfilePosts/>
        </div>
    );
};
