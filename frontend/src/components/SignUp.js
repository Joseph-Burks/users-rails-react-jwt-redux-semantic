import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import URLBase from '../URLBase';
import { Input, Button } from 'semantic-ui-react';

const SignUp = props => {
	const dispatch = useDispatch();
	const emailInput = useSelector(state => state.emailInput);
	const usernameInput = useSelector(state => state.usernameInput);
    const passwordInput = useSelector(state => state.passwordInput);
    
    const handleSignUp = () => {
        fetch(`${URLBase}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: emailInput,
                    username: usernameInput,
                    password: passwordInput
                }
            })
        })
        .then(res => res.json())
        .then(console.log)
    }

	return (
		<div>
			<h1>Join the fun.</h1>
			<Input
				label='email'
				placeholder='example@example.com'
				onChange={e =>
					dispatch({ type: 'CHANGE_EMAIL_INPUT', value: e.target.value })
				}
			/>
			<Input
				label='username'
				placeholder='JohnDoe'
				onChange={e =>
					dispatch({ type: 'CHANGE_USERNAME_INPUT', value: e.target.value })
				}
			/>
			<Input
				type='password'
				label='password'
				placeholder='password'
				onChange={e =>
					dispatch({ type: 'CHANGE_PASSWORD_INPUT', value: e.target.value })
				}
			/>
			<Button onClick={handleSignUp}>Join</Button>
		</div>
	);
};

export default SignUp;
