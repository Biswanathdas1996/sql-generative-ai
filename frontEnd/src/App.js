import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Redux from "./pages/Redux";
import ApiCall from "./pages/ApiCall";
import { site_text } from "./utils/languageMapper";
import { useDispatch, useSelector } from "react-redux";
import { updateLanguage } from "./redux/slices/config/configSlice";

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
      <div>
        <button onClick={() => changeLang("English")}>English</button>
        <button onClick={() => changeLang("Hindi")}>Hindi</button>
        <button onClick={() => changeLang("Bengali")}>Bengali</button>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/redux" element={<Redux />} />
        <Route exact path="/api" element={<ApiCall />} />
      </Routes>
    </>
  );
}

export default App;
