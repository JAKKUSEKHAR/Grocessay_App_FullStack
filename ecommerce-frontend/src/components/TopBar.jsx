import { Link } from "react-router-dom";
import {aiBot} from "../api/productApi.js";

function TopBar({ searchText, onSearch }) {

  
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="location-dot" />
        <div>
          <div className="delivery-time">Deliver in 10 mins</div>
          <div className="location-text">Home · Your area</div>
        </div>
      </div>

      <div className="search-wrapper">
        <input
          className="search-input"
          placeholder="Search for milk, bread, fruits…"
          value={searchText}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
         
        <div className="ai-bot"> 
              <button onClick={}>AiBot</button>
          </div>

      <Link to="/orders" className="orders-link">My Orders</Link>
    </div>
  );
}

export default TopBar;
