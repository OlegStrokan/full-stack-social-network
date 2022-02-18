import React from "react";
import { Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Drafts, Inbox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface IHeader {
	isAuth: boolean;
	userId: number | null;
}

export const Navbar: React.FC<IHeader> = ({ userId, isAuth }) => {
	const navigate = useNavigate();
	return (
		<Card>
			<List>
				{!isAuth ?
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate('/login')}>
						<ListItemIcon>
							<Inbox />
						</ListItemIcon>
						<ListItemText primary="Login" />
					</ListItemButton>
				</ListItem>
					:
					<>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate('/posts')}>
						<ListItemIcon>
							<Inbox />
						</ListItemIcon>
						<ListItemText primary="Posts" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate(`/profile/${userId}`)}>
						<ListItemIcon>
							<Drafts />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate(`/users`)}>
						<ListItemIcon>
							<Drafts />
						</ListItemIcon>
						<ListItemText primary="Users" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate(`/roles`)}>
						<ListItemIcon>
							<Drafts />
						</ListItemIcon>
						<ListItemText primary="Roles" />
					</ListItemButton>
				</ListItem>
				</>
				}
			</List>
		</Card>
	);
};
