import React from "react";
import { Grid, Typography } from "@mui/material";
import { ProfileDto } from "../../types/profile/profile.dto";
import { Link } from "react-router-dom";

interface ProfileEntities {
	profile: ProfileDto;
}

export const ProfileEntities: React.FC<ProfileEntities> = ({ profile }) => {
	return (
		<Grid>
			<Typography variant="h6"><Link to={'/profile/'+profile.id+'?gallery=true'}>Photos</Link></Typography>
		</Grid>
	);
};
