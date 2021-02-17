import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import URLBase from '../URLBase';
import { DirectUpload } from 'activestorage';
import { Segment, Form, Input, Label, Button } from 'semantic-ui-react';

const SignUp = props => {
	const dispatch = useDispatch();
	const emailInput = useSelector(state => state.emailInput);
	const usernameInput = useSelector(state => state.usernameInput);
	const passwordInput = useSelector(state => state.passwordInput);
	//const avatarInput = useSelector(state => state.avatarInput);
	const emailError = useSelector(state => state.errorMessages.email);
	const usernameError = useSelector(state => state.errorMessages.username);
	const passwordError = useSelector(state => state.errorMessages.password);
	const [avatarInput, setAvatarInput] = useState(null)

	const uploadFile = (file, user) => {
		const upload = new DirectUpload(file, `${URLBase}/rails/active_storage/direct_uploads`)
		upload.create((error, blob, token) => {
			if (error) {
				console.log(error)
			} else {
				console.log(blob);
				fetch(`${URLBase}/users/${user.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({ avatar: blob.attachable_sgid }),
				})
					.then(res => res.json())
					.then(res => {
						dispatch({ type: 'SET_LOGGED_IN_USER', user: res.user });
						dispatch({ type: 'SET_USER_AVATAR', avatar: res.avatar });
						localStorage.token = token;
						//props.history.push('/home');
					});
			}
		})
	}

	const handleSignUp = () => {
		dispatch({ type: 'CHANGE_EMAIL_ERROR', message: null });
		dispatch({ type: 'CHANGE_USERNAME_ERROR', message: null });
		fetch(`${URLBase}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				user: {
					email: emailInput,
					username: usernameInput,
					password: passwordInput,
				},
			}),
		})
			.then(res => res.json())
			.then(res => {
				if (res.user) {
					uploadFile(avatarInput, res.user, res.token)
				} else {
					if (res.email) {
						dispatch({ type: 'CHANGE_EMAIL_ERROR', message: res.email });
					}
					if (res.username) {
						dispatch({ type: 'CHANGE_USERNAME_ERROR', message: res.username });
					}
					if (res.username) {
						dispatch({
							type: 'CHANGE_PASSWORD_ERROR',
							message: res.password[1],
						});
					}
				}
			});
	};

	return (
		<Segment
			style={{
				marginTop: '10vh',
				marginLeft: '25vw',
				marginRight: '25vw',
				paddingLeft: '10vw',
				paddingRight: '10vw',
				textAlign: 'center',
			}}
		>
			<h1>Join the fun.</h1>
			<Form>
				<Form.Field>
					<Input
						label='Email'
						placeholder='j.doe@example.com'
						onChange={e => {
							dispatch({
								type: 'CHANGE_EMAIL_INPUT',
								value: e.target.value,
							});
						}}
					/>
					{emailError ? (
						<Label basic color='red' pointing>
							{emailError}
						</Label>
					) : null}
				</Form.Field>
				<Form.Field>
					<Input
						label='Username'
						placeholder='JDoe'
						onChange={e => {
							dispatch({
								type: 'CHANGE_USERNAME_INPUT',
								value: e.target.value,
							});
						}}
					/>
					{usernameError ? (
						<Label basic color='red' pointing>
							{usernameError}
						</Label>
					) : null}
				</Form.Field>
				<Form.Field>
					<Input
						label='Password'
						type='password'
						placeholder='P@$$w0rd'
						onChange={e => {
							dispatch({
								type: 'CHANGE_PASSWORD_INPUT',
								value: e.target.value,
							});
						}}
					/>
					{passwordError ? (
						<Label basic color='red' pointing>
							{passwordError}
						</Label>
					) : null}
				</Form.Field>
				<Form.Field>
					<Input
						label='Avatar'
						type='file'
						onChange={e => {
							setAvatarInput(e.target.files[0]);
							// dispatch({
							// 	type: 'CHANGE_AVATAR_INPUT',
							// 	value: e.target.files[0],
							// });
						}}
					/>
				</Form.Field>
				<Button primary onClick={handleSignUp}>
					Join
				</Button>
			</Form>
		</Segment>
	);
};

export default SignUp;
