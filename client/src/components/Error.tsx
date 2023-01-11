import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";

function Error() {
  return (
    <div className="Error">
      <div>
        <img src="/src/assets/react.svg" alt="logo" />
        <span>
          Error not found page <br />
          <Link to="/">Back to Home</Link>
        </span>
      </div>
    </div>
  );
}

export default Error;
