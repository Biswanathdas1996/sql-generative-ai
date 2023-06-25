import React from "react";
import ProfilesList from "examples/Lists/ProfilesList";
import CSV from "../../assets/images/csv.jpg";
import { get, post } from "../../helper/apiHelper";

// eslint-disable-next-line react/prop-types
export default function BasicSelect({ open }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await get("/api/get-list-of-files");
      console.log("response------->", response);
      setData(response);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <>
      {!loading ? (
        <ProfilesList
          title="Select file"
          profiles={data?.map((val, i) => {
            return {
              image: CSV,
              name: val?.File,
              description: val?.Report,
              action: {
                type: "internal",
                route: `?file=${open === "File" ? val?.File : val?.Report}`,
                color: "info",
                label: "Select File",
              },
            };
          })}
        />
      ) : (
        <center>
          <div className="loader" />
        </center>
      )}
    </>
  );
}
