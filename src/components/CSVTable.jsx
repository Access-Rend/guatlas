import { ProTable } from "@ant-design/pro-components";
import { useCSVTableFormURL } from "../csv2obj";
import { Input } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

export default function CSVTable(props) {
  const { url, onClick } = props;
  const data = useCSVTableFormURL(url);

  if (!data.length) return <></>;

  const headers = data[0];
  const records = data.slice(1, data.length);

  const expHeaders = ["Select", ...headers];

  const columns = expHeaders.map((header) => {
    return {
      title: header,
      dataIndex: header,
      key: header,
    };
  });

  const dataFormat = records.map((record, index) => {
    const temp = {
      Select: <ClickableIcon onClick={() => onClick?.(record)} />,
      key: index,
    };
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

const ClickableIcon = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} style={{ display: "flex", placeContent: "center" }}>
      <InfoCircleOutlined style={{ fontSize: "24px" }} />{" "}
    </div>
  );
};
