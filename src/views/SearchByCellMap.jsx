import React, { useEffect, useState } from "react"
import { SelectData } from '../components/SelectData'
import { Row, Col, Radio, Divider, Button, Space, Image, Dropdown } from "antd"
import { DownOutlined, FullscreenOutlined } from "@ant-design/icons"
import { useCSVFromURL } from "../csv2obj"
import CSVTable from "../components/CSVTable"
import { useDBFolder } from "../hooks/DBAPI"
import { ImgBar } from "../components/ImgBar"
import { SelectBar } from '../components/SelectBar'

const SearchByCellMap = () => {
  let [organ, setOrgan] = useState(SelectData.organ_list[0])
  let [cat, setCat] = useState(SelectData.category_list[0])
  let [dataType, setDataType] = useState(SelectData.datatype_list[0])
  let [DatasetID, setID] = useState("PMID34099557_R007")
  let [detailTag, setDetailTag] = useState('RNA')

  const onChange_gen = (setter) => {
    return (e) => {
      setter(e.target.value)
    }
  }

  const organOnchange = onChange_gen(setOrgan)
  const catOnChange = onChange_gen(setCat)
  const dataOnChange = onChange_gen(setDataType)

  const handleRecordClick = (record) => {
    setID(record.DatasetID)
    console.log(record.DatasetID)
  }

  return (
    <div>
      <Row>
        <Col span={6}>
          <img src='/icon/cell_map.png' style={{maxWidth:'100%'}}/>
          <SelectBar organ={organ} cat={cat} dataType={dataType} setOrgan={setOrgan} setCat={setCat} setDataType={setDataType} />
        </Col>

        <Col span={18}>
          <CSVTable
            onClick={handleRecordClick}
            selected={DatasetID}
            filter={[organ,cat,dataType]}
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
            fallback="/images/error.png"
          />
        </Col>
        <Col span={8}>
          <Image
            style={{ width: "100%" }}
            src={"/DB/2.Cellmap/" + DatasetID + "/2.1.Cellmap/04umap_Group.png"}
            fallback="/images/error.png"
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
            fallback="/images/error.png"
          />
        </Col>
        <Col span={12}>
          <Image
            style={{ width: "100%" }}
            src={"/DB/2.Cellmap/" + DatasetID + "/2.1.Cellmap/06dodge_bar.png"}
            fallback="/images/error.png"
          />
        </Col>
      </Row>
      <br />

      <Row>
        <Col span={12}>
          <Button
            onClick={() => {
              setDetailTag("RNA")
            }}
            size="large"
            type="primary"
            icon={<FullscreenOutlined />}
          >
            Singile cell RNA result
          </Button>
        </Col>
        <Col span={12}>
          <Button
            onClick={() => {
              setDetailTag("Spatial")
            }}
            size="large"
            type="primary"
            icon={<FullscreenOutlined />}
          >
            Spatial Transcriptomic result
          </Button>
        </Col>
      </Row>
      <br />
      <hr />

      <Detail tag={detailTag} DatasetID={DatasetID} />
    </div>
  )
}

export default SearchByCellMap

const Detail = ({ tag, DatasetID }) => {
  let [RCDTFolderList, setRCDTFolderList] = useState([])
  let [RCDTImgList, setRCDTImgList] = useState([])
  let [folderName, setFolderName] = useState('')
  
  let fl = useDBFolder("2.Cellmap/" + DatasetID + "/2.3.ST/2.3.1.RCTD")
  let il = useDBFolder("2.Cellmap/" + DatasetID + "/2.3.ST/2.3.1.RCTD/" + fl[0])

  useEffect(() =>{
    setRCDTFolderList(fl)
    setRCDTImgList(il)
    setFolderName(fl[0])
  },[folderName, fl])

  if (tag == "") return <></>
  if (tag == "RNA")
    return (
      <div>
        <Row>
          <Col span={12}>
            <h1>DEG</h1>
            <br />
            <CSVTable
              onClick={() => {}}
              url={
                "/DB/2.Cellmap/" +
                DatasetID +
                "/2.2.scRNA/2.2.1.DEG/nogroup_DEG_output20230602.csv"
              }
            />
          </Col>
          <Col span={12}>
            <h1>GSEA</h1>
            <br />
            <CSVTable
              onClick={() => {}}
              url={"/DB/2.Cellmap/" + DatasetID + "/2.2.scRNA/2.2.2.GSEA/GSEA_nogroup_20230601.csv"}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <h1>Cell Communication</h1>
          </Col>
          <Col span={12}>
            <h2>count</h2>
            <Image
              style={{ width: "80%" }}
              src={
                "/DB/2.Cellmap/" +
                DatasetID +
                "/2.2.scRNA/2.2.3.cellchat/count.png"
              }
              fallback="/images/error.png"
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
              fallback="/images/error.png"
            />
          </Col>

          <Col span={24}>
            <CSVTable
              onClick={() => {}}
              url={
                "/DB/2.Cellmap/" +
                DatasetID +
                "/2.2.scRNA/2.2.3.cellchat/cellchat_dfnet.csv"
              }
            />
          </Col>
        </Row>

        <Row>
          {/* todo 滑动图 */}
          <Col span={24}>
            <h1>TF regulatory network</h1>
          </Col>
          <Col span={24}>
            <ImgBar
              ImageList={[
                "/DB/2.Cellmap/" +
                  DatasetID +
                  "/2.2.scRNA/2.2.4.pyscenic/s5_PlotRegulonRank_celltype.png",
              ]}
            />
          </Col>
          <Col span={24}>
            <CSVTable
              onClick={() => {}}
              url={
                "/DB/2.Cellmap/" +
                DatasetID +
                "/2.2.scRNA/2.2.4.pyscenic/nogroup_s5_celltype_Regulon_specific_score.csv"
              }
            />
          </Col>
        </Row>
      </div>
    )
  if (tag == "Spatial")
    return (
      <div>
        <Row>
          <Col span={24}>
            <h1>Spatial localization of celltypes</h1>
            <br />
          </Col>
          <Col span={12}>
            {RCDTFolderList.length === 0 ? (<div></div>) : (
                <Dropdown menu={{ items: RCDTFolderList.map((fname, idx) => { return {key:'idx', label:(<div onClick={()=>{setFolderName(fname);console.log(RCDTImgList)}}>{fname}</div>)} })
                }}> 
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Button >{'选择啥来着？你选了：' + folderName}<DownOutlined/></Button>
                    </Space>
                  </a>
                </Dropdown>
            )}
          </Col>
          <Col span={12}>todo SearchBar</Col>
          <Divider/>
          <Col span={24}>{
              RCDTImgList.length === 0 ? (<div></div>) : (
              <ImgBar ImageList={RCDTImgList.map((img, idx) => {return "DB/2.Cellmap/" + DatasetID + "/2.3.ST/2.3.1.RCTD/" + folderName + '/' + img})} />
            )
          }</Col>

          <Col span={24}>
            <h1>Spatial communication of celltypes</h1>
          </Col>
          <Col span={12}>
            <Image
              style={{ width: "100%" }}
              src={
                "/DB/2.Cellmap/" +
                DatasetID +
                "/2.3.ST/2.3.2.communication/cellProximityHeatmap.png"
              }
              fallback="/images/error.png"
            />
          </Col>
          <Col span={12}>
            <Image
              style={{ width: "100%" }}
              src={
                "/DB/2.Cellmap/" +
                DatasetID +
                "/2.3.ST/2.3.2.communication/spatPlot.png"
              }
              fallback="/images/error.png"
            />
          </Col>
          <Col span={24}>
            <br />
            <CSVTable
              onClick={() => {}}
              url={
                "/DB/2.Cellmap/" +
                DatasetID +
                "/2.3.ST/2.3.2.communication/comb_commdf.csv"
              }
            />
          </Col>
        </Row>
      </div>
    )
}