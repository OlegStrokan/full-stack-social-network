import React from 'react';
import { ProfilePosts } from './ProfilePosts';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchedProfile } from "../../redux/ducks/profile/profile.slice";

export const Profile = () => {

    const dispatch = useDispatch();
    const { profile } = useSelector((state: RootState) => state.profileReducer)
    React.useEffect(() => {
        dispatch(fetchedProfile(1));
    },[])
    return (
        <div>
            {profile?.email}
            Profile page
            <ProfilePosts/>
        </div>
    );
};
