import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import URLBase from '../URLBase';
import { Segment, Form, Input, Label, Button } from 'semantic-ui-react';

const LogIn = props => {
	const dispatch = useDispatch();
	const usernameInput = useSelector(state => state.usernameInput);
	const passwordInput = useSelector(state => state.passwordInput);
    const logInError = useSelector(state => state.errorMessages.logIn);

	const handleLogIn = () => {
		dispatch({ type: 'CHANGE_GENERIC_ERROR', message: null });
		fetch(`${URLBase}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				user: {
					username: usernameInput,
					password: passwordInput,
				},
			}),
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				if (res.user) {
					dispatch({ type: 'SET_LOGGED_IN_USER', user: res.user });
					dispatch({ type: 'SET_USER_AVATAR', avatar: res.avatar });
					localStorage.token = res.token;
					props.history.push('/home');
				} else {
					dispatch({
						type: 'CHANGE_GENERIC_ERROR',
						message: res.error,
					});
				}
			});
	};
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
			<h1>Welcome Back!</h1>
			<Form>
				<Form.Field>
					<Input
						label='Username'
						placeholder='JDoe'
						onChange={e =>
							dispatch({
								type: 'CHANGE_USERNAME_INPUT',
								value: e.target.value,
							})
						}
					/>
				</Form.Field>
				<Form.Field>
					<Input
						label='Password'
						type='password'
						placeholder='P@$$w0rd'
						onChange={e =>
							dispatch({
								type: 'CHANGE_PASSWORD_INPUT',
								value: e.target.value,
							})
						}
					/>
					{logInError ? (
						<Label basic color='red' pointing>
							{logInError}
						</Label>
					) : null}
				</Form.Field>
				<Button primary onClick={handleLogIn}>
					Log In
				</Button>
			</Form>
		</Segment>
	);
};

export default LogIn;
