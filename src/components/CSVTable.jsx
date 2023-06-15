import { ProTable } from "@ant-design/pro-components";
import { useCSVTableFormURL } from "../csv2obj";
import { Input, Table } from "antd";
import { InfoCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function CSVTable(props) {
  const { url, onClick, selected } = props;
  const data = useCSVTableFormURL(url);

  if (!data.length) return <></>;

  return <TableContent selected={"selected"} data={data} onClick={onClick} />;
}

const TableContent = (props) => {
  const { data: rawData, onClick, selected } = props;

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
      key: index,
    };
    record.forEach((value, index) => {
      temp[headers[index]] = record[index];
    });
    const isSelected = selected == temp.DatasetID;
    temp["Select"] = (
      <ClickableIcon selected={isSelected} onClick={() => onClick?.(temp)} />
    );
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
  const { onClick, selected } = props;
  return (
    <div onClick={onClick} style={{ display: "flex", placeContent: "center" }}>
      {selected ? (
        <InfoCircleFilled style={{ fontSize: "24px" }} />
      ) : (
        <InfoCircleOutlined style={{ fontSize: "24px" }} />
      )}
    </div>
  );
};
