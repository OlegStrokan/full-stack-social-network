import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { PhotoDto } from "../../types/photo/photo.dto";
import { Link } from "react-router-dom";
// @ts-ignore
import styles from "./Profile.module.css";

interface ProfileGalleryInterface {
	images: PhotoDto[];
	userId: number;
	gallery: boolean;
	setGallery: (value: boolean) => void;
}

export const ProfileGallery: React.FC<ProfileGalleryInterface> = ({ images, userId, setGallery, gallery }) => {
	return (
		<Grid className={styles.profileGallery}>
			<Typography variant="h6" align="center">Gallery</Typography>
			<Typography variant="h6"><Button variant="contained"><Link to={'/profile/'+userId} onClick={() => setGallery(!gallery)}>Back</Link></Button></Typography>
			<Grid className={styles.galleryGrid}>
			{images.map((image) => {
				return <>
					<img className={styles.galleryImage} width={400} src={"http://localhost:8000/" + image.url} alt="" />
				</>;
			})}
			</Grid>
		</Grid>
	);
};
