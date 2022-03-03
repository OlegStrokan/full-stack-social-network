import React from "react";
import { Grid, Typography } from "@mui/material";
import { ProfileDto } from "../../types/profile/profile.dto";
import { Link } from "react-router-dom";

interface ProfileEntitiesInterface {
	profile: ProfileDto;
}

export const ProfileEntities: React.FC<ProfileEntitiesInterface> = ({ profile }) => {
	return (
		<Grid>
			<Typography variant="h6"><Link to={'/profile/'+profile.id+'?gallery=true'}>Photos</Link></Typography>
		</Grid>
	);
};
