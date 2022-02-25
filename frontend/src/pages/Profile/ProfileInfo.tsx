import React from "react";
import { Grid, Typography } from "@mui/material";
import { ProfileDto } from "../../types/profile/profile.dto";

interface ProfileInfoInterface {
	profile: ProfileDto | null;
}

export const ProfileInfo: React.FC<ProfileInfoInterface> = ({ profile }) => {
	return (
		<Grid>
			<Typography variant="subtitle1">{profile?.email}</Typography>
			<Typography variant="subtitle1">About: {profile?.about}</Typography>
			<Typography variant="subtitle1">Interests: {profile?.interests}</Typography>
			<Typography variant="subtitle1">Date of birth: {profile?.birth}</Typography>
			<Typography variant="subtitle1">Job: {profile?.job}</Typography>
			<Typography variant="subtitle1">Location: {profile?.location}</Typography>
		</Grid>
	);
};
