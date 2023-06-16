import { ProTable } from "@ant-design/pro-components";
import { useCSVTableFormURL } from "../csv2obj";
import { MinusCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Input } from "antd";

export default function CSVTable(props) {
  const { url, onClick, selected } = props;
  const csv = useCSVTableFormURL(url);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(csv);
  }, csv);

  const recordHeaders = Object.keys(records[0] ?? []).map((key) => {
    return {
      title: key,
      dataIndex: key,
      key: key,
    };
  });

  const headers = [
    {
      title: "Select",
      key: "option",
      render: (text, record, _, action) => {
        const isSelected = selected == record.DatasetID;
        return (
          <ClickableIcon
            selected={isSelected}
            onClick={() => onClick?.(record)}
          />
        );
      },
    },
    ...recordHeaders,
  ];

  const configs = {
    columns: headers,
    dataSource: records,
    search: false,
  };

  const tableStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "4px",
  };

  const handleSearch = (str) => {
    const reg = new RegExp(
      str.split(" ").map((s) => `(?=.*${s})`),
      "i"
    );
    const filteredData = csv.filter((record) => {
      return JSON.stringify(record).match(reg);
    });
    setRecords(filteredData);
  };

  return (
    <div style={tableStyle}>
      <SearchInput onSearch={handleSearch} />
      <ProTable {...configs}></ProTable>
    </div>
  );
}

const SearchInput = (props) => {
  const { onSearch } = props;
  const { Search } = Input;
  return (
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
  );
};

const ClickableIcon = (props) => {
  const { onClick, selected } = props;
  return (
    <div onClick={onClick} style={{ display: "flex", placeContent: "center" }}>
      {selected ? (
        <CheckCircleTwoTone style={{ fontSize: "24px" }} />
      ) : (
        <MinusCircleOutlined style={{ fontSize: "24px" }} />
      )}
    </div>
  );
};
