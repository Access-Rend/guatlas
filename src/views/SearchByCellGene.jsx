import React, { useEffect, useState } from 'react'
import { FullscreenOutlined } from '@ant-design/icons'
import { Button, Row, Col, Divider, Space, Input } from 'antd'
import CSVTable from '../components/CSVTable'
const SearchByCellGene = () => {
    // let [organ, setOrgan] = useState(SelectData.organ_list[0])
    // let [cat, setCat] = useState(SelectData.category_list[0])
    // let [dataType, setDataType] = useState(SelectData.datatype_list[0])
    // let [DatasetID, setID] = useState("PMID34099557_R007")
    let [GeneSymbol, setGeneSymbol] = useState('')
    const  gs = '';
    let [detailTag, setDetailTag] = useState('')
  
    return (
      <div>
        <Space>
          <Row>
            <Col span={24}>
              <Input.Search
                placeholder="input a Gene Symbol"
                allowClear
                enterButton="Search"
                size="large"
                value={GeneSymbol}
                onChange={(e)=>{setGeneSymbol(e.target.value)}}
              />
            </Col>

            <Col span={12}>
              <Button
                onClick={()=>{setDetailTag("RNA")}}
                size="large" type="primary" icon={<FullscreenOutlined />}
              >
                Singile cell RNA result
              </Button>
            </Col>

            <Col span={12}>
              <Button
                onClick={()=>{setDetailTag("Spatial")}}
                size="large" type="primary" icon={<FullscreenOutlined />}
              >
                Spatial Transcriptomic result
              </Button>
            </Col>
              
          </Row>
        </Space>
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