import React from "react";
import { Grid, Typography } from "@mui/material";
// @ts-ignore
import styles from "../Profile.module.css";
import { PostDto } from "../../../types/post/post.dto";
import { Post } from "./Post";

interface PostsInterface {
	posts?: PostDto[];
	userId: number | null;
	isOwner: boolean;
}

export const Posts:React.FC<PostsInterface> = ({ posts, userId, isOwner }) => {

	if (!posts) {
		return <div>...Loading</div>
	}

	let newPosts = [...posts]
	return (
		<Grid>
			<Typography variant="h5" sx={{ mt: 1, textAlign: 'center' }}>Posts</Typography>
			{newPosts.reverse().map((post, index) => {
				return (
					<Post isOwner={isOwner} userId={userId} post={post} key={index}/>
				);
			})}
		</Grid>
	);
};

