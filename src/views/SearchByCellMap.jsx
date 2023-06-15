import React, { useEffect, useState } from "react";
import { SelectData } from "./SelectData";
import { Row, Col, Radio, Table, Divider, Button, Space } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";
import { useCSVFromURL } from "../csv2obj";
import CSVTable from "../components/CSVTable";

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

const Detail = (tag) => {
    if(tag == '') return<></>
    if(tag == 'RNA') return(
        <Row>
            <Col span={24}><h1>DEG</h1></Col>
            <CSVTable onClick={()=>{}} url={''}></CSVTable>
        </Row>
    )
    if(tag == 'Spatial') return<></>
}

const SearchByCellMap = () => {
  let [organ, setOrgan] = useState(SelectData.organ_list[0]);
  let [cat, setCat] = useState(SelectData.category_list[0]);
  let [dataType, setDataType] = useState(SelectData.datatype_list[0]);
  let [DatasetID, setID] = useState("PMID35657798_R010");
  let [detailTag, setDetailTag] = useState('')

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

  const handleRecordClick = (record) => {
    setID(record.DatasetID) // 写死，第几列
    console.log(record.DatasetID)
  };

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
          <CSVTable
            onClick={handleRecordClick}
            selected={DatasetID}
            url="/DB/1.Cellmap-search/03.all-sample-group-category-20230606.csv"
          />
        </Col>
      </Row>
      <Divider />
      <hr />
      <br />

      <Row>
        <Col span={16}>
          <img
            style={{ maxWidth: "100%" }}
            src={"/DB/2.Cellmap/" + DatasetID + "/2.1.Cellmap/00.finalumap.png"}
          />
        </Col>
        <Col span={8}>
          <img
            style={{ maxWidth: "100%" }}
            src={"/DB/2.Cellmap/" + DatasetID + "/2.1.Cellmap/04umap_Group.png"}
          />
        </Col>
        <Col span={12}>
          <img
            style={{ maxWidth: "100%" }}
            src={
              "/DB/2.Cellmap/" +
              DatasetID +
              "/2.1.Cellmap/05Celltype_dopplot.png"
            }
          />
        </Col>
        <Col span={12}>
          <img
            style={{ maxWidth: "100%" }}
            src={"/DB/2.Cellmap/" + DatasetID + "/2.1.Cellmap/06dodge_bar.png"}
          />
        </Col>
      </Row>

      <Row>
        <Col span={2} />
        <Col span={6}>
          <Button onChange={()=>{setDetailTag('RNA')}} size="large" type="primary" icon={<FullscreenOutlined />}>
            Singile cell RNA result
          </Button>
        </Col>
        <Col span={5} />
        <Col span={6}>
          <Button onChange={()=>{setDetailTag('Spatial')}} size="large" type="primary" icon={<FullscreenOutlined />}>
            Spatial Transcriptomic result
          </Button>
        </Col>
        <Col span={2} />
      </Row>


      {/* <Row>
        <Detail tag={detailTag}></Detail>
      </Row> */}
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
