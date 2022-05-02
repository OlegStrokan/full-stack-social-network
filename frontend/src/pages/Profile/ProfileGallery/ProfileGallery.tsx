import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { PhotoDto } from "../../../types/photo/photo.dto";
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import styles from "./ProfileGallery.module.css";

interface ProfileGalleryInterface {
	images?: PhotoDto[];
	userId: number;
	gallery: boolean;
	setGallery: (value: boolean) => void;
}

export const ProfileGallery: React.FC<ProfileGalleryInterface> = ({ images, userId, setGallery, gallery }) => {

	const navigate = useNavigate();

	const onClick = () => {
		navigate(`/profile/${userId}`);
		setGallery(!gallery)

	}
	return (
		<Grid
			className={!setGallery ? styles.modal : `${styles.modal} ${styles.modal_active}`}>
			<Grid
				className={!setGallery  ? styles.alert : `${styles.alert} ${styles.alert_active}`}>
				<Typography variant="h6" align="center">Gallery</Typography>
				<Button variant="contained" onClick={onClick}>Back</Button>
				<Grid className={styles.galleryGrid}>
					{images?.map((image) => {
						return <>
							<img className={styles.galleryImage}  src={"http://localhost:8000/" + image.url} alt="" />
						</>;
					})}
				</Grid>

			</Grid>
	</Grid>
	);
};
