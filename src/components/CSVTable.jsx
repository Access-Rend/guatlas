import { ProTable } from "@ant-design/pro-components";
import { useCSVTableFormURL } from "../csv2obj";
import { MinusCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Image, Input } from "antd";

export default function CSVTable(props) {
  const { url, onClick, selected, filter } = props;
  const csv = useCSVTableFormURL(url);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(csv);
    handleSearch(filter.join(" "));
  }, [csv]);

  useEffect(() => {
    handleSearch(filter.join(" "));
  }, [filter]);

  const recordHeaders = Object.keys(records[0] ?? []).map((key) => {
    return {
      title: key,
      dataIndex: key,
      key: key,
    };
  });

  const selectableHeader = records.length
    ? {
        title: "Select",
        key: "option",
        render: (text, record, _, action) => {
          const isSelected = selected === record.DatasetID;
          return (
            <ClickableIcon
              selected={isSelected}
              onClick={() => onClick?.(record)}
            />
          );
        },
      }
    : null;

  const extHeaders = [selectableHeader, ...recordHeaders];
  const headersFormat = extHeaders.filter((header) => header);

  const imgIndex = headersFormat.findIndex((header) => header.title == "Image");

  if (imgIndex > 0) {
    headersFormat[imgIndex] = {
      title: "Image",
      key: "Image",
      render: (text, record, _, action) => {
        return <Image src={`/DB/${record.Image}`} />;
      },
    };
  }

  const dataFormat = records.map((record, index) => {
    record.key = index;
    return record;
  });

  const tableStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "4px",
  };

  const handleSearch = (str) => {
    const reg = new RegExp(
      str
        .split(" ")
        .map((s) => `(?=.*${s})`)
        .join(""),
      "i"
    );
    const filteredData = csv.filter((record) => {
      return JSON.stringify(record).match(reg);
    });
    setRecords(filteredData);
  };

  const configs = {
    columns: headersFormat,
    dataSource: dataFormat,
    search: false,
    scroll: { x: "100%" },
    pagination: { pageSize: 10 },
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
