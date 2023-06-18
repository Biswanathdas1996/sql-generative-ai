import React, { useState } from "react";
import { post } from "../helper/apiHelper";
import DynamicTable from "../components/DynamicTable";
import SearchBar from "../components/SearchBar";
import Card from "@mui/material/Card";

const OpenAI = () => {
  const [loading, setLoading] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [searchData, setSearchData] = useState(null);
  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchData(null);
    setLoading(true);
    try {
      const response = await post("/api/generate", {
        nlp_text: searchTerm,
      });
      setSearchData(response);
      if (response && response !== []) {
        console.log("response=========>", response);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    // Perform search logic here
    console.log("Search term:", searchTerm);
    // Reset the search term
    // setSearchTerm("");
  };

  return (
    <div className="search-page">
      <div
        className="search-bar"
        style={{
          display: "flex",
          justifyContent: "center",
          height: "20vh",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSearch}>
          <SearchBar
            value={searchTerm}
            onchange={(event) => setSearchTerm(event.target.value)}
          />
          <center>
            <button
              type="submit"
              className="search-button"
              style={{
                marginTop: "20px",
                padding: "15px 32px",
                borderRadius: "6px",
              }}
            >
              Search
            </button>
          </center>
        </form>
      </div>

      <center>
        <Card style={{ margin: 20 }}>
          {searchData && searchData?.length > 0 ? (
            <div className="search-results" style={{ width: "90%" }}>
              <div>
                <h1 style={{ float: "left" }}>Search Data</h1>

                <DynamicTable data={searchData} />
              </div>
            </div>
          ) : (
            <b>{loading ? "Please wait...." : ""}</b>
          )}
        </Card>
      </center>
    </div>
  );
};

export default OpenAI;
