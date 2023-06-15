import { ProTable } from "@ant-design/pro-components";
import { useCSVTableFormURL } from "../csv2obj";
import { Input, Table } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function CSVTable(props) {
  const { url, onClick } = props;
  const data = useCSVTableFormURL(url);

  if (!data.length) return <></>;

  return <TableContent data={data} onClick={onClick} />;
}

const TableContent = (props) => {
  const { data: rawData, onClick } = props;

  const headers = rawData[0];
  const records = rawData.slice(1, rawData.length);

  const [data, setData] = useState(records);
  const { Search } = Input;

  const expHeaders = ["Select", ...headers];

  const columns = expHeaders.map((header) => {
    return {
      title: header,
      dataIndex: header,
      key: header,
    };
  });

  const dataFormat = data.map((record, index) => {
    const temp = {
      Select: <ClickableIcon onClick={() => onClick?.(record)} />,
      key: index,
    };
    record.forEach((value, index) => {
      temp[headers[index]] = record[index];
    });
    return temp;
  });

  const handleSearch = (str) => {
    const reg = new RegExp(
      str.split(" ").map((s) => `(?=.*${s})`),
      "i"
    );
    const filteredData = records.filter((record) => {
      return JSON.stringify(record).match(reg);
    });
    setData(filteredData);
  };

  const configs = {
    columns: columns,
    dataSource: dataFormat,
    search: false,
  };

  const tableStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "4px",
  };

  return (
    <div style={tableStyle}>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />
      <ProTable {...configs}></ProTable>
    </div>
  );
};

const ClickableIcon = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} style={{ display: "flex", placeContent: "center" }}>
      <InfoCircleOutlined style={{ fontSize: "24px" }} />{" "}
    </div>
  );
};
