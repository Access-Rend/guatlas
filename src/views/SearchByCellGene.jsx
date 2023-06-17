import React, { useEffect, useState } from 'react'
import { FullscreenOutlined } from '@ant-design/icons'
import { Button, Row, Col, Divider } from 'antd'
import CSVTable from '../components/CSVTable'
const SearchByCellGene = () => {
    // let [organ, setOrgan] = useState(SelectData.organ_list[0])
    // let [cat, setCat] = useState(SelectData.category_list[0])
    // let [dataType, setDataType] = useState(SelectData.datatype_list[0])
    // let [DatasetID, setID] = useState("PMID34099557_R007")
    let [detailTag, setDetailTag] = useState("")
  
    // const data = useCSVFromURL("/DB/1.Cellmap-search/03.all-sample-group-category-20230606.csv")
    // console.log(data)
  
    // const onChange_gen = (setter) => {
    //   return (e) => {
    //     setter(e.target.value)
    //   }
    // }
  
    // const organOnchange = onChange_gen(setOrgan)
    // const catOnChange = onChange_gen(setCat)
    // const dataOnChange = onChange_gen(setDataType)
  
    // const handleRecordClick = (record) => {
    //   setID(record.DatasetID)
    //   console.log(record.DatasetID)
    // }
  
    return (
      <div>
        <Row>
          <Col span={12}>
            <Button
              onClick={() => {
                setDetailTag("RNA")
              }}
              size="large" type="primary" icon={<FullscreenOutlined />}
            >
              Singile cell RNA result
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                setDetailTag("Spatial")
              }}
              size="large" type="primary" icon={<FullscreenOutlined />}
            >
              Spatial Transcriptomic result
            </Button>
          </Col>
        </Row>
        <br />
        <hr />
  
        <Detail tag={detailTag} />
      </div>
    )
  }

export default SearchByCellGene

const Detail = ({tag}) => {
    if(tag === '') return <></>
    if(tag === 'RNA') return (<div>
        <Row>
            <h1>DEG</h1>
            <Col span={24}>
            {/* 有一列图片 */}
            <CSVTable
              onClick={() => {}}
              url={""}
            />
            </Col>
        </Row>

        <Row>
            <h1>GSEA</h1>
            <Col span={24}>
              <CSVTable
                onClick={() => {}}
                url={""}
              />
            </Col>
        </Row>

        <Row>
            <h1>Cell communication</h1>
            <Col span={24}>
              <CSVTable
                onClick={() => {}}
                url={""}
              />
            </Col>
        </Row>

        <Row>
            <h1>TF regulatory network</h1>
            <Col span={24}>
              <CSVTable
                  onClick={() => {}}
                  url={""}
                />
            </Col>
        </Row>
    </div>)
    if(tag === 'Spatial') return (<div>
        <Row>
            <h1>Spatial expression</h1>
            <Col span={24}>
              {/* csv + imgbar? */}
            </Col>
        </Row>

        <Row>
            <h1>Spatially co-expressed genes</h1>
            <Col span={24}>
              {/* 不懂了 */}
            </Col>
        </Row>

    </div>)
}

const styles = {

}