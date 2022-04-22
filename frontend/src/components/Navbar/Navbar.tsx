import React from "react";
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Drafts, Inbox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IRoleDto } from "../../types/role/role.dto";

interface IHeader {
	isAuth: boolean;
	userId: number | null;
	roles: IRoleDto[] | null;
}

export const Navbar: React.FC<IHeader> = ({ userId, isAuth, roles }) => {
	const navigate = useNavigate();
	return (
		<Grid>
			<List>
				{!isAuth ?
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate("/login")}>
							<ListItemIcon>
								<Inbox />
							</ListItemIcon>
							<ListItemText primary="Login" />
						</ListItemButton>
					</ListItem>
					:
					<>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate(`/profile/${userId}`)}>
								<ListItemIcon>
									<Drafts />
								</ListItemIcon>
								<ListItemText primary="Profile" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate(`/messages`)}>
								<ListItemIcon>
									<Drafts />
								</ListItemIcon>
								<ListItemText primary="Messages" />
							</ListItemButton>
						</ListItem>
						{roles?.map((role) => role.value === "ADMIN") &&
                        <>
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
                        </>}

					</>
				}
			</List>
		</Grid>
	);
};
