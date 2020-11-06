import React from 'react';

function RecentSearchBlock() {
  return (
    <li>
      <header>13 July 2020 05:32PM</header>
      <div className="recent-search-fields">
        <section>
          <div className="block">
            <label>Site</label>
            <div>067 - Houston</div>
          </div>
          <div className="block">
            <label>Cust</label>
            <div>Bells Kitchen</div>
          </div>
        </section>
        <section>
          <div className="block">
            <label>Item</label>
            <div>452332</div>
          </div>
        </section>
        <section>
          <div className="block">
            <label>Date</label>
            <div>07 Mar 2020</div>
          </div>
          <div className="block row">
            <div className="sub-block">
              <label>QTY</label>
              <div>12</div>
            </div>
            <div className="sub-block">
              <label>Split</label>
              <div>N</div>
            </div>
          </div>
        </section>
      </div>
      <footer>
        CUSTOMER NET PRICE <span>$64.00</span>
      </footer>
    </li>
  );
}

export default RecentSearchBlock;
