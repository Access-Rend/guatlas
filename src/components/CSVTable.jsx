import { ProTable } from "@ant-design/pro-components";
import { useCSVTableFormURL } from "../csv2obj";
import { MinusCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Image, Input } from "antd";

const defaultFilter = [];
const defaultRender = {};

export default function CSVTable(props) {
  const {
    url,
    onClick,
    selected,
    filter = defaultFilter,
    render = defaultRender,
  } = props;
  const csv = useCSVTableFormURL(url);
  const [records, setRecords] = useState([]);
  const [filterReg, setFilterReg] = useState("");

  const handleFilter = (filterArray) => {
    setFilterReg(
      new RegExp(filterArray.map((s) => `(?=.*${s})`).join(""), "i")
    );
  };

  useEffect(() => {
    handleFilter(filter);
  }, [filter]);

  useEffect(() => {
    const filteredData = csv.filter((record) => {
      return JSON.stringify(record).match(filterReg);
    });
    const trimData = filteredData.slice(
      0,
      filteredData.length > 100 ? 100 : filteredData.length
    );
    setRecords(trimData);
  }, [csv, filterReg]);

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

  Object.entries(render).forEach(([recordHeader, recordRender]) => {
    const index = headersFormat.findIndex(
      (header) => header.title == recordHeader
    );
    if (index > 0) {
      headersFormat[index].render = (text, record, _, action) =>
        recordRender(record);
    }
  });

  const dataFormat = records.map((record, index) => {
    record.key = index;
    return record;
  });

  const tableStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "4px",
    width: "100%",
  };

  const handleSearch = (str) => {
    handleFilter([...str.split(" "), ...filter]);
  };

  const configs = {
    columns: headersFormat,
    dataSource: dataFormat,
    search: false,
    scroll: { x: "100%" },
    pagination: { pageSize: 15 },
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
