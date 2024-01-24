import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null); //initially null.
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch("api-url");
    const json = await data.json();
    console.log(json);
    //i want to fill this resInfo with json.data
    setResInfo(json.data);
  };

  //destructuring

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;
  //shimmer ui
  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu">
      {/* <h1>{resInfo?.cards[0]?.card?.card?.info?.name}</h1> */}
      <h1>{name}</h1>
      <h3>{cuisines}</h3>
      <h3>{costForTwoMessage}</h3>
      <h2>Menu</h2>
      <ul>
        <li>Biryani</li>
        <li>Burgers</li>
        <li>Diet Coke</li>
      </ul>
    </div>
  );
};

export default RestaurantMenu;
