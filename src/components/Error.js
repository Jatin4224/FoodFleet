import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div className="error-container">
      <h1 className="error-heading">Oops! Something went wrong</h1>
      <p className="error-message">
        We're sorry, but it seems like there was an error.
      </p>
      <p>
        {err.status}: {err.statusText}
      </p>
    </div>
  );
};

export default Error;
