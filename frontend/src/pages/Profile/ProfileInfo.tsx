import React from "react";
import { Grid, Typography } from "@mui/material";
import { ProfileDto } from "../../types/profile/profile.dto";

interface ProfileInfoInterface {
	profile: ProfileDto | null;
}

export const ProfileInfo: React.FC<ProfileInfoInterface> = ({ profile }) => {
	return (
		<Grid>
			<Typography variant="h6">{profile?.email}</Typography>
			<Typography variant="h6">About: {profile?.about}</Typography>
			<Typography variant="h6">Interests: {profile?.interests}</Typography>
			<Typography variant="h6">Date of birth: {profile?.birth}</Typography>
			<Typography variant="h6">Job: {profile?.job}</Typography>
			<Typography variant="h6">Location: {profile?.location}</Typography>
		</Grid>
	);
};
