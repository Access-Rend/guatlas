import { useEffect, useState } from "react";
import { usePapaParse } from "react-papaparse";
// import { parse } from 'csv-parse'

// const records = []

// const parser = parse({
//     delimiter: ','
// })

// parser.on('readable', function(){
//     let record;
//     while ((record = parser.read()) !== null) {
//       records.push(record)
//     }
// })

const csv2obj = (str) => {
  // parser.write(str)
  // return records
};

export const useCSVFromURL = (url) => {
  const { readString } = usePapaParse();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const csv = await res.text();
      setData(readString(csv));
    };
    fetchData();
  }, []);

  return data;
};

export { csv2obj };
