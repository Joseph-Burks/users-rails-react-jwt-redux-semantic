import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import URLBase from '../URLBase';

const Landing = props => {
    const dispatch = useDispatch();

    useEffect(()=>{
        if(localStorage.token){
            fetch(`${URLBase}/get_user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                }
		    })
            .then(res => res.json())
            .then(user => {
                dispatch({ type: 'SET_LOGGED_IN_USER', user: user });
                props.history.push('/home');
            })
        }
    }, [])

    return(
        <h1>Hello World!</h1>
    )
}

export default Landing