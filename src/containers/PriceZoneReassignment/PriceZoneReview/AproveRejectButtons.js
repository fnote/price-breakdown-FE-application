import React from 'react';

export default function AproveRejectButtons() {
    return (
        <div className="pz-aprove-reject-wrapper">
            <button
                type="primary"
                htmlType="submit"
                className="search-btn outlined-btn"
              >
                APPROVE
              </button>
              <button
                type="primary"
                htmlType="submit"
                className="search-btn reject-btn outlined-btn"
              >
                REJECT
              </button>
        </div>
    );
}
