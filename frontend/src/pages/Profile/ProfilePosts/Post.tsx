import React from "react";
// @ts-ignore
import styles from "../Profile.module.css";
import { Button, FormControl, FormControlLabel, Grid, IconButton, Typography } from "@mui/material";
import { PostDto } from "../../../types/post/post.dto";
import {
	fetchedDelete,
	fetchedUpdate
} from "../../../redux/ducks/post/post.slice";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../utils/validators/updatePost";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {
	fetchedPostDislike,
	fetchedPostLike,
	fetchedPostUndislike,
	fetchedPostUnlike
} from "../../../redux/ducks/profile/profile.slice";
interface PostInterface {
	post: PostDto;
	userId: number | null;
	isOwner: boolean;
}

export const Post: React.FC<PostInterface> = ({ post, userId, isOwner }) => {

	const [editMode, setEditMode] = React.useState(false);

	const dispatch = useDispatch();

	const {
		register, control, handleSubmit, formState: { errors }
	} = useForm({
		resolver: yupResolver(validationSchema)
	});

	const onSubmit = (event: any) => {
		setEditMode(false);
		dispatch(fetchedUpdate(event));
	};

	const [image, setImage] = React.useState<File | null>(null);

	if (!post) {
		return <div>...Loading</div>
	}
	return (
		<Grid>
			{editMode ?
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					className={styles.inputs}
				>
					<Grid container>
						<Typography variant="h6">Edit post:</Typography>
						<Grid item xs={12}>
							<TextField
								sx={{ m: "10px 0" }}
								required
								fullWidth
								id="title"
								label="Title"
								autoComplete="Title"
								{...register("title")}
								error={!!errors.title}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.title?.message}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								multiline
								rows={5}
								maxRows={20}
								id="content"
								label="Content"
								autoComplete="Content"
								{...register("content")}
								error={!!errors.content}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.content?.message}
							</Typography>
						</Grid>
						<Grid item xs={12} style={{ visibility: "hidden" }}>
							<TextField
								required
								fullWidth
								value={post.id}
								id="postId"
								label="postId"
								autoComplete="postId"
								{...register("postId")}
								error={!!errors.postId}
							/>
						</Grid>
						<Grid>
							<FormControl error={!!errors.file?.message}>
								<FormControlLabel
									control={(
										<Controller
											{...register("image")}
											// @ts-ignore
											inputRef={register()}
											render={({ field: { onChange } }) => (
												<Button
													variant="contained"
													component="label"
													sx={{
														ml: 1, mb: 2, p: 1
													}}
												>
													<input
														type="file"
														hidden
														value={image?.name}
														onChange={(e) => {
															onChange(e.target.files);
															// @ts-ignore
															setImage(e.target.files);
														}}
														multiple
													/>
													Upload image
												</Button>
											)}
											control={control}
										/>
									)}
									label=""
								/>
							</FormControl>
							<Typography variant="subtitle2">
								{
									// @ts-ignore
									image && image[0].name
								}
							</Typography>
							<Typography variant="subtitle2" color="error">
								{errors.file?.message}
							</Typography>
						</Grid>
						<Grid>
							<Button type="submit" sx={{ p: "10px 30px" }} variant="contained">
								Submit
							</Button>
						</Grid>
					</Grid>
					<Button onClick={() => setEditMode(false)} variant="contained">Back</Button>
				</Box>
				:
				<Grid className={styles.profilePost}>
					<Typography variant="h6">{post.title}</Typography>
					<Typography variant="subtitle2" sx={{ p: 2 }}>{post.content}</Typography>
					<img className={styles.postImage} src={"http://localhost:8000/" + post.image} />
					<Grid>
						{isOwner &&
                        <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} variant="contained">Edit</Button>}
						{post.likes?.find((post) => post.userId === Number(userId)) ?
                          <IconButton color="secondary" aria-label="add an alarm" onClick={() => dispatch(fetchedPostUnlike({ postId: post.id, userId: Number(userId) }))}>
                            <ThumbUpAltIcon />{post.likes.length}
                          </IconButton>
							: <IconButton color="secondary" aria-label="add an alarm" onClick={() => dispatch(fetchedPostLike({ postId: post.id, userId: Number(userId) }))}>
								<ThumbUpOffAltIcon />{post.likes.length}
							</IconButton>}
						{post.dislikes?.find((post) => post.userId === Number(userId)) ?
                          <IconButton color="secondary" aria-label="add an alarm" onClick={() => dispatch(fetchedPostUndislike({ postId: post.id, userId: Number(userId) }))}>
                            <ThumbDownAltIcon />{post.dislikes.length}
                          </IconButton>
							: <IconButton color="secondary" aria-label="add an alarm" onClick={() => dispatch(fetchedPostDislike({ postId: post.id, userId: Number(userId) }))}>
								<ThumbDownOffAltIcon />{post.dislikes.length}
							</IconButton>}
						{isOwner && <Button onClick={() => dispatch(fetchedDelete(post.id))} sx={{ m: 2 }}
                                            variant="contained">Delete</Button>}
					</Grid>
				</Grid>
			}
		</Grid>
	);
};
