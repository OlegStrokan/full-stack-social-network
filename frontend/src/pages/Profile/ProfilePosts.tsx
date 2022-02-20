import React from 'react';
import { Grid, Typography } from "@mui/material";
// @ts-ignore
import styles from "./Profile.module.css";
import { PostDto } from "../../types/post/post.dto";

interface ProfileInterface {
    posts?: PostDto[];
}

export const ProfilePosts: React.FC<ProfileInterface> = ({ posts }) => {
    return (
        <Grid sx={{ p: 2 }}>
            <Typography variant="h5">Posts</Typography>
            {posts?.map((post) => {
                return <Grid className={styles.profilePost}>
                <Typography>{post.title}</Typography>
                <Typography>{post.content}</Typography>
                <Typography>Likes count: {post.likesCount}</Typography>
                    <img src={post.image} />
                </Grid>
            })}
        </Grid>
    );
};
