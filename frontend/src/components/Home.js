import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import URLBase from '../URLBase';
import { Segment } from 'semantic-ui-react';

const Home = props => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.loggedInUser);

	useEffect(() => {
		if (!user) {
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
					.then(user => {
						console.log(user);
						dispatch({ type: 'SET_LOGGED_IN_USER', user: user });
					});
			} else {
				props.history.push('/');
			}
		}
	});

	return (
		<Segment
			style={{
				marginTop: '10vh',
				marginLeft: '30vw',
				marginRight: '30vw',
				paddingLeft: '10vw',
				paddingRight: '10vw',
				textAlign: 'center',
			}}
		>
			{user ? (
				<div>
					<h1>Home!</h1>
					<h3>{user.username}</h3>
				</div>
			) : null}
		</Segment>
	);
};

export default Home;
