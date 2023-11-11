import { NavLink, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div id="error-page" className="mt-5 text-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <NavLink to='/'>Back to Home Page</NavLink>
    </div>
  );
}

export default ErrorPage