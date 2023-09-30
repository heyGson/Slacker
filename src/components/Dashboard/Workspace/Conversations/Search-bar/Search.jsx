import "../Search-bar/Search.css";
import { useEffect, useState } from "react";

function Search({ setData }) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.trim() === "") {
      setData([]); // Clear the data if the search input is empty
      return;
    }

    // Check if data is already in local storage
    const storedData = localStorage.getItem("searchResults");

    if (storedData) {
      // If data is available in local storage, parse and use
      const parsedData = JSON.parse(storedData);
      const filteredData = parsedData.filter((user) =>
        user.uid.startsWith(searchValue)
      );
      setData(filteredData);
    } else {
      // If data is not available in local storage, fetch it from the API
      const apiUrl = `http://206.189.91.54/api/v1/users`;

      const headers = {
        "access-token": "Qdia5nwkc9fxtuZVlLU0Yw",
        client: "jBRsjRTAugAWh0DvRCozEw",
        expiry: "1697244413",
        uid: "heygson@gmail.com",
      };

      fetch(apiUrl, {
        method: "GET",
        headers,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log the API response
          const filteredData = data.data.filter((user) =>
            user.uid.startsWith(searchValue)
          );
          setData(filteredData);

          // Save the fetched data to local storage for future use
          localStorage.setItem("searchResults", JSON.stringify(data.data));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [searchValue, setData]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="search-input">
      <input
        type="search"
        placeholder="Search people"
        autoComplete="off"
        name="search"
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Search;
