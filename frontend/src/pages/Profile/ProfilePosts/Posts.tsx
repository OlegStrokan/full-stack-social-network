import React from "react";
import { Grid, Typography } from "@mui/material";
// @ts-ignore
import styles from "../Profile.module.css";
import { PostDto } from "../../../types/post/post.dto";
import { useDispatch } from "react-redux";
import { fetchedProfile } from "../../../redux/ducks/profile/profile.slice";
import { fetchedDelete } from "../../../redux/ducks/post/post.slice";
import { Post } from "./Post";

interface PostsInterface {
	posts?: PostDto[];
	userId: string | undefined
}

export const Posts:React.FC<PostsInterface> = ({ posts, userId }) => {
	return (
		<Grid>
			<Typography variant="h5">Posts</Typography>
			{posts?.map((post) => {
				return (
					<Post post={post}/>
				);
			})}
		</Grid>
	);
};

