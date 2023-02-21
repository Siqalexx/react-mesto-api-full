import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, loggedIn, email, ...props }) {
	return (
		<Route>
			{loggedIn ? (
				<Component userData={email} {...props} />
			) : (
				<Redirect to='/signin' />
			)}
		</Route>
	);
}

export default ProtectedRoute;
