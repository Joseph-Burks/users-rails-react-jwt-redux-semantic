import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import URLBase from '../URLBase';

const Home = props => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.loggedInUser);
	const userAvatar = useSelector(state => state.userAvatar);

	useEffect(() => {
		if (localStorage.token) {
			fetch(`${URLBase}/get_user`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.token}`,
				},
			})
				.then(res => res.json())
				.then(res => {
					dispatch({ type: 'SET_LOGGED_IN_USER', user: res.user });
					dispatch({ type: 'SET_USER_AVATAR', avatar: res.avatar });
				});
		} else {
			props.history.push('/');
		}
	}, []);

	return (
		<div>
			{user ? (
				<div>
					<h1>Home!</h1>
					<h3>{user.username}</h3>
					<img
						src={`${URLBase}/${userAvatar}`}
						style={{ width: '20vw', borderRadius: '100%' }}
					/>
				</div>
			) : null}
		</div>
	);
};

export default Home;
