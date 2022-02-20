import React from "react";
import { Grid, Typography } from "@mui/material";
import { ProfileDto } from "../../types/profile/profile.dto";

interface ProfileEntities {
	profile: ProfileDto | null;
}

export const ProfileEntities: React.FC<ProfileEntities> = ({ profile }) => {
	return (
		<Grid>
			<Typography variant="h6">{profile?.email}</Typography>
			<Typography variant="h6">{profile?.email}</Typography>
			<Typography variant="h6">{profile?.email}</Typography>
			<Typography variant="h6">{profile?.email}</Typography>
			<Typography variant="h6">{profile?.email}</Typography>
		</Grid>
	);
};
