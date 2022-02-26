import React from "react";
import { Grid, Typography } from "@mui/material";
import { PhotoDto } from "../../types/photo/photo.dto";
import { Link } from "react-router-dom";

interface ProfileGallery {
	images: PhotoDto[];
	userId: number;
	gallery: boolean;
	setGallery: (value: boolean) => void;
}

export const ProfileGallery: React.FC<ProfileGallery> = ({ images, userId, setGallery, gallery }) => {
	return (
		<Grid>
			<Typography variant="h6"><Link to={'/profile/'+userId} onClick={() => setGallery(!gallery)}>Back</Link></Typography>
			{images.map((image) => {
				return <>
					<img src={"http://localhost:8000/" + image.url} alt="" />
				</>;
			})}
		</Grid>
	);
};
