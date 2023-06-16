import React, { useEffect, useState } from "react";
import { SelectData } from "./SelectData";
import { Row, Col, Radio, Table, Divider, Button, Space, Image } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";
import { useCSVFromURL } from "../csv2obj";
import CSVTable from "../components/CSVTable";
import { ImgBar } from "../components/ImgBar";

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

const Detail = ({ tag, DatasetID }) => {
    let [RCDTList, setRCDTList] = useState([])
    useEffect(() => {
      //todo
      // 文件夹：'DB/2.Cellmap/' + DatasetID + '/2.3.ST/2.3.1.RCTD'
      // 文件夹内全是图
      // 点击下拉菜单，选择文件夹名
      // 展示文件夹下所有图，搜索框搜索图片名称
    })

    if(tag == '') return<></>
    if(tag == 'RNA') return(<div>
        <Row>
            <Col span={12}>
                <h1>DEG</h1>
                <br/>
                <CSVTable onClick={()=>{}} url={'/DB/2.Cellmap/' + DatasetID + '/2.2.scRNA/2.2.1.DEG/nogroup_DEG_output20230602.csv'} />
            </Col>
            <Col span={12}>
                <h1>GSEA</h1>
                <br/>
                <CSVTable onClick={()=>{}} url={'/DB/2.Cellmap/' + DatasetID + '/2.2.scRNA/2.2.2.GSEA/GSEA_nogroup_20230601.csv'} />
            </Col>
        </Row>

        <Row>
            <Col span={24}><h1>Cell Communication</h1></Col>
            <Col span={12}>
              <h2>count</h2>
                <Image
                style={{ width: "80%" }}
                src={
                "/DB/2.Cellmap/" +
                DatasetID +
                "/2.2.scRNA/2.2.3.cellchat/count.png"
                }
                />
            </Col>
            <Col span={12}>
            <h2>weight</h2>
                <Image
                style={{ width: "80%" }}
                src={
                "/DB/2.Cellmap/" +
                DatasetID +
                "/2.2.scRNA/2.2.3.cellchat/weight.png"
                }
                />
            </Col>

            <Col span={24}>
                <CSVTable onClick={()=>{}} url={'/DB/2.Cellmap/' + DatasetID + '/2.2.scRNA/2.2.3.cellchat/cellchat_dfnet.csv'} />
            </Col>
        </Row>

        <Row>
          {/* todo 滑动图 */}
            <Col span={24}><h1>TF regulatory network</h1></Col> 
            <Col span={24}>
              <ImgBar ImageList={["/DB/2.Cellmap/" + DatasetID + "/2.2.scRNA/2.2.4.pyscenic/s5_PlotRegulonRank_celltype.png"] }/>
            </Col>
            <Col span={24}><CSVTable onClick={()=>{}} url={'/DB/2.Cellmap/' + DatasetID + '/2.2.scRNA/2.2.4.pyscenic/nogroup_s5_celltype_Regulon_specific_score.csv'} /></Col>
        </Row>
    </div>)
    if(tag == 'Spatial') return(<div>
      <Row>
            <Col span={12}>
                <h1>Spatial localization of celltypes</h1>
                <br/>
                <ImgBar ImageList={RCDTList}/>
            </Col>

            <Col span={12}>
                <h1>Spatial communication of celltypes</h1>
                <br/>
                {/* <CSVTable onClick={()=>{}} url={'/DB/2.Cellmap/' + DatasetID + '/2.2.scRNA/2.2.2.GSEA/GSEA_nogroup_20230601.csv'} /> */}
            </Col>
      </Row>


    </div>)
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
    setID(record.DatasetID)
    console.log(record.DatasetID)
  };

  return (
    <div>
      <Row>
        <Col span={6}>
          <img src="/icon/cell_map.png" style={{ width: "100%" }}></img>

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
          <Image
            style={{ width: "100%" }}
            src={"/DB/2.Cellmap/" + DatasetID + "/2.1.Cellmap/00.finalumap.png"}
          />
        </Col>
        <Col span={8}>
          <Image
            style={{ width: "100%" }}
            src={"/DB/2.Cellmap/" + DatasetID + "/2.1.Cellmap/04umap_Group.png"}
          />
        </Col>
        <Col span={12}>
          <Image
            style={{ width: "100%" }}
            src={
              "/DB/2.Cellmap/" +
              DatasetID +
              "/2.1.Cellmap/05Celltype_dopplot.png"
            }
          />
        </Col>
        <Col span={12}>
          <Image
            style={{ width: "100%" }}
            src={"/DB/2.Cellmap/" + DatasetID + "/2.1.Cellmap/06dodge_bar.png"}
          />
        </Col>
      </Row>
      <br/>

      <Row>
        <Col span={12}>
          <Button onClick={()=>{setDetailTag('RNA')}} size="large" type="primary" icon={<FullscreenOutlined />}>
            Singile cell RNA result
          </Button>
        </Col>
        <Col span={12}>
          <Button onClick={()=>{setDetailTag('Spatial')}} size="large" type="primary" icon={<FullscreenOutlined />}>
            Spatial Transcriptomic result
          </Button>
        </Col>
      </Row>
      <br/>
      <hr />
        

        <Detail tag={detailTag} DatasetID={DatasetID} />
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
