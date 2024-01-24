import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://corsproxy.org/?https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D28.6773353%26lng%3D77.3464618%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING"
      );

      const json = await data.json();

      const restaurants =
        json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      if (restaurants && restaurants.length > 0) {
        setListOfRestaurants(restaurants);
        setFilteredRestaurant(restaurants);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="body">
      {listOfRestaurants.length === 0 ? (
        <Shimmer />
      ) : (
        <>
          <div className="filter">
            <div className="search">
              <input
                type="text"
                className="search-box"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                onClick={() => {
                  const filteredRestaurant = listOfRestaurants.filter((res) =>
                    res.data.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                  setFilteredRestaurant(filteredRestaurant);
                }}
              >
                Search
              </button>
            </div>
            <button
              className="filter-btn"
              onClick={() => {
                const filteredList = listOfRestaurants.filter(
                  (res) => res.data.avgRating > 4
                );
                setFilteredRestaurant(filteredList);
              }}
            >
              Top Rated restaurants
            </button>
          </div>
          <div className="res-container">
            {filteredRestaurant.map((restaurant) => (
              <RestaurantCard key={restaurant.info.id} resData={restaurant} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
