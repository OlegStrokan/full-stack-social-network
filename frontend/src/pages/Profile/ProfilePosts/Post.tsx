import React from "react";
// @ts-ignore
import styles from "../Profile.module.css";
import { Button, Grid, Typography } from "@mui/material";
import { PostDto } from "../../../types/post/post.dto";
import { fetchedDelete } from "../../../redux/ducks/post/post.slice";
import { useDispatch } from "react-redux";

interface PostInterface {
	post: PostDto | null
}
export const Post:React.FC<PostInterface> = ({ post }) => {

	const dispatch = useDispatch();

	return (
		<Grid className={styles.profilePost}>
			<Typography>{post?.title}</Typography>
			<Typography>{post?.content}</Typography>
			<Typography>Likes count: {post?.likesCount}</Typography>
			<img src={post?.image} />
			<Button onClick={() => 	dispatch(fetchedDelete(post?.id as number))} variant="contained">Delete</Button>
		</Grid>
	);
};

