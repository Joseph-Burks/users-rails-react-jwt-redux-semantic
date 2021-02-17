import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import URLBase from '../URLBase';
import { Segment, Button } from 'semantic-ui-react';

const Landing = props => {
	const dispatch = useDispatch();

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
				.then(user => {
					dispatch({ type: 'SET_LOGGED_IN_USER', user: user });
					props.history.push('/home');
				});
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
			<h1>Hello World!</h1>
			<Button primary onClick={() => props.history.push('/signup')}>
				Join
			</Button>
			<Button primary onClick={() => props.history.push('/login')}>
				Log In
			</Button>
		</Segment>
	);
};

export default Landing;
