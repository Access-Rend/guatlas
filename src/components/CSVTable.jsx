import { ProTable } from "@ant-design/pro-components";
import { useCSVTableFormURL } from "../csv2obj";
import { useEffect } from "react";

export default function CSVTable(props) {
  const { url } = props;
  const data = useCSVTableFormURL(url);
  const headers = data[0];
  const records = data.slice(1, data.length);

  const columns = headers?.map((header) => {
    return {
      title: header,
      dataIndex: header,
      key: header,
    };
  });

  const dataFormat = records?.map((record, index) => {
    const temp = { key: index };
    record.forEach((value, index) => {
      temp[headers[index]] = record[index];
    });
    return temp;
  });

  const configs = {
    columns: columns,
    dataSource: dataFormat,
    search: false,
  };

  return <ProTable {...configs}></ProTable>;
}
