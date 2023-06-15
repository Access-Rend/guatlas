import React, { useEffect, useState } from "react";
import { SelectData } from "./SelectData";
import { Row, Col, Radio, Table } from "antd";
import { useCSVFromURL } from "../csv2obj";
import CSVTable from "../components/CSVTable";
// import { csv2obj } from '../csv2obj'

const DatasetTabel = ({ columns, dataSource }) => {
  return <Table columns={columns} dataSource={dataSource}></Table>;
};

const SelectBar = ({ value, onChange, selectList }) => {
  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      style={{ textAlign: "left" }}
    >
      {selectList.map((item, idx) => (
        <Radio value={item} key={item}>
          {item}
        </Radio>
      ))}
    </Radio.Group>
  );
};

const SearchByCellMap = () => {
  let [organ, setOrgan] = useState(SelectData.organ_list[0]);
  let [cat, setCat] = useState(SelectData.category_list[0]);
  let [dataType, setDataType] = useState(SelectData.datatype_list[0]);
  let [DatasetList, setDL] = useState([]);

  const data = useCSVFromURL(
    "/DB/1.Cellmap-search/03.all-sample-group-category-20230606.csv"
  );

  console.log(data);

  const onChange_gen = (setter) => {
    return (e) => {
      setter(e.target.value);
    };
  };
  const organOnchange = onChange_gen(setOrgan);
  const catOnChange = onChange_gen(setCat);
  const dataOnChange = onChange_gen(setDataType);

  return (
    <div>
      <Row>
        <Col span={6}>
          <img src="/icon/cell_map.png" style={{ maxWidth: "100%" }}></img>

          <div style={styles.SelectTitle}>Organ</div>
          <SelectBar
            value={organ}
            onChange={organOnchange}
            selectList={SelectData.organ_list}
          />

          <div style={styles.SelectTitle}>Category</div>
          <SelectBar
            value={cat}
            onChange={catOnChange}
            selectList={SelectData.category_list}
          />

          <div style={styles.SelectTitle}>Data Type</div>
          <SelectBar
            value={dataType}
            onChange={dataOnChange}
            selectList={SelectData.datatype_list}
          />
        </Col>

        <Col span={18}>
          {/* <DatasetTabel columns={SelectData.columns} dataSource={data} /> */}
          <CSVTable url="/DB/1.Cellmap-search/03.all-sample-group-category-20230606.csv" />
        </Col>
      </Row>
    </div>
  );
};

export default SearchByCellMap;

const styles = {
  SelectTitle: {
    fontSize: "25px",
    textAlign: "left",
    fontWeight: "500",
  },
};
