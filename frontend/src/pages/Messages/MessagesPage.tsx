import React from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

interface MessagesPageInterface {
	isAuth: boolean;
}

export const MessagesPage:React.FC<MessagesPageInterface> = ({ isAuth }) => {

	const navigate = useNavigate();


	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}

		const socket = io('http://localhost:8001', {
			transportOptions: {
				polling: {
					extraHeaders: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					},
				},
			},
		});
		socket.open();
	},[])


	return (
		<div>

		</div>
	);
};
