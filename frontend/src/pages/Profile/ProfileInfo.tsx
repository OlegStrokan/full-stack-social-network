import React from "react";
import { Grid, Typography } from "@mui/material";
import { ProfileDto } from "../../types/profile/profile.dto";

interface ProfileInfo {
	profile: ProfileDto | null;
}

export const ProfileInfo: React.FC<ProfileInfo> = ({ profile }) => {
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

