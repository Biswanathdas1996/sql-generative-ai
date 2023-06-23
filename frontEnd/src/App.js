import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Redux from "./pages/Redux";
import ApiCall from "./pages/ApiCall";
import CsvData from "./pages/CsvData";
import SQLData from "./pages/SQLData";
import OpenAI from "./pages/OpenAI";
import EditSql from "./pages/EditSql";
import HtmlReport from "./pages/HtmlReport";
import { site_text } from "./utils/languageMapper";
import { useDispatch, useSelector } from "react-redux";
import { updateLanguage } from "./redux/slices/config/configSlice";
import Header from "./layout/Header";

function App() {
  const config = useSelector((state) => state.config);
  const dispatch = useDispatch();

  window.site_lang = config?.language;
  window.site_text = site_text;

  React.useEffect(() => {
    const lang_value = localStorage.getItem("site-lang");
    if (lang_value) {
      dispatch(updateLanguage(lang_value));
    } else {
      dispatch(updateLanguage("Engligh"));
    }
  }, []);

  const changeLang = (lang) => {
    dispatch(updateLanguage(lang));
    localStorage.setItem("site-lang", lang);
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "2rem",
        }}
      >
        <Link to="/" className="header-link">
          Home
        </Link>

        <Link to="/csv-data" className="header-link">
          {" "}
          Uploaded Data
        </Link>

        <Link to="/search" className="header-link">
          {" "}
          Search
        </Link>

        <Link to="/sql-data" className="header-link">
          Last Search
        </Link>
      </div>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/redux" element={<Redux />} />
        <Route exact path="/api" element={<ApiCall />} />
        <Route exact path="/csv-data" element={<CsvData />} />
        <Route exact path="/sql-data" element={<SQLData />} />
        <Route exact path="/search" element={<OpenAI />} />
        <Route exact path="/edit-sql" element={<EditSql />} />
        <Route exact path="/report" element={<HtmlReport />} />
      </Routes>
    </>
  );
}

export default App;
