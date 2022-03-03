import React from 'react';
import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
        <div className="flex-center position-ref full-height">
          <div className="code">
              404 
          </div>
          <div className="message">
              Halaman Tidak Ditemukan
              <br />
          </div>
        </div>
  );
};

export default PageNotFound;
