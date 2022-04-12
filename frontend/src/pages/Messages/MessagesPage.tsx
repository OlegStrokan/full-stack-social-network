import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchedInit } from "../../redux/ducks/message/message.slice";
import { socket } from "../../api/message.api";

interface MessagesPageInterface {
	isAuth: boolean;
}

export const MessagesPage:React.FC<MessagesPageInterface> = ({ isAuth }) => {

	const navigate = useNavigate();

	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}

		dispatch(fetchedInit(socket))


	},[])


	return (
		<div>

		</div>
	);
};
