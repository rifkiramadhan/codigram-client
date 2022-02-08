import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return <div>
            <h1>Sorry, Page Not Found :</h1>
            <h3>Go to the Home Page : 
                <Link className="linkHome" to="/">Home Page</Link>
            </h3>
         </div>;
};

export default PageNotFound;
