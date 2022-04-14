import React from "react";
import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Socket } from "socket.io-client";

export const AddMessageForm: React.FC<{socket: Socket | null}> = ({ socket }) => {

	return <Grid>
			<TextField
				required
				fullWidth
				id="message"
				label="Message"
				autoComplete="Message"
			/>
		<Button onClick={() => null} variant="contained">Send</Button>
	</Grid>
}
