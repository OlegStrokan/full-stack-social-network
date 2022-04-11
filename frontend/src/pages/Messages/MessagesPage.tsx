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

	},[])


	return (
		<div>

		</div>
	);
};
