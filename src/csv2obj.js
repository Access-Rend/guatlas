import { useEffect, useState } from "react";
import { usePapaParse } from "react-papaparse";

const useCSVFromURL = (url) => {
  const { readString } = usePapaParse();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(url);
      const text = await res.text();
      const csv = readString(text);
      console.log("parse done", csv);
      if (csv.errors.length) return;
      setData(csv.data);
    })();
  }, [url]);

  return data;
};

const useCSVTableFormURL = (url) => {
  const csv = useCSVFromURL(url);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!csv.length) return;

    const headers = csv[0];
    const records = csv.slice(1, csv.length);

    headers[0] = "Index";

    const dataFormat = records.map((record, index) => {
      const temp = {};
      record.forEach((value, index) => {
        temp[headers[index]] = record[index];
      });
      return temp;
    });

    setData(dataFormat);
  }, [csv]);

  return data;
};

export { useCSVFromURL, useCSVTableFormURL };
