import React from "react";
import { Button, Grid, Typography } from "@mui/material";
// @ts-ignore
import styles from "../Profile.module.css";
import { PostDto } from "../../../types/post/post.dto";
import { useDispatch } from "react-redux";
import { fetchedProfile } from "../../../redux/ducks/profile/profile.slice";
import { fetchedDelete } from "../../../redux/ducks/post/post.slice";

interface PostsInterface {
	posts?: PostDto[];
	userId: string | undefined
}

export const Posts:React.FC<PostsInterface> = ({ posts, userId }) => {

	const dispatch = useDispatch();

	const onDelete = (post: PostDto) => {
		dispatch(fetchedDelete(post.id))
	}

	return (
		<Grid>
			<Typography variant="h5">Posts</Typography>
			{posts?.map((post) => {
				return (
					<Grid className={styles.profilePost}>
						<Typography>{post.title}</Typography>
						<Typography>{post.content}</Typography>
						<Typography>Likes count: {post.likesCount}</Typography>
						<img src={post.image} />
						<Button onClick={() => onDelete(post)} variant="contained">Delete</Button>
					</Grid>
				);
			})}
		</Grid>
	);
};

