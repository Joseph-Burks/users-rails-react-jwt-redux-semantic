import React from 'react'
import { Route, Router } from 'react-router'
import history from './history';
import Landing from './components/Landing'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'

const App = () => {
  return (
		<Router history={history}>
			<Route exact path='/' component={props => <Landing {...props} />} />
			<Route exact path='/signup' component={props => <SignUp {...props} />} />
			<Route exact path='/login' component={props => <LogIn {...props} />} />
		</Router>
	);
}

export default App