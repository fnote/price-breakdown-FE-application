import React from 'react';

function AppLoader({ show }) {
  return (
    <div className={show ? 'app-loader show' : 'app-loader'}>
      <div className="loader-wrapper">
        <div className="loader">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
        <div id="loader2" className="loader">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>

        <div id="loader3" className="loader">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
      </div>
    </div>
  );
}

export default AppLoader;
