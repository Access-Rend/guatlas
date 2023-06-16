import { useEffect, useState } from "react";
import { usePapaParse } from "react-papaparse";

const useCSVFromURL = (url) => {
  const { readString } = usePapaParse();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const csv = await res.text();
      setData(readString(csv));
    };
    console.log("f");
    fetchData();
  }, [url]);

  return data;
};

const useCSVTableFormURL = (url) => {
  const csv = useCSVFromURL(url);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (csv.data) {
      const headers = csv.data[0];
      const records = csv.data.slice(1, csv.data.length);

      headers[0] = "Index";

      const dataFormat = records.map((record, index) => {
        const temp = {};
        record.forEach((value, index) => {
          temp[headers[index]] = record[index];
        });
        return temp;
      });

      setData(dataFormat);
    }
  }, [csv]);

  return data;
};

export { useCSVFromURL, useCSVTableFormURL };
