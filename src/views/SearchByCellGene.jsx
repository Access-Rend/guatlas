import React, { useEffect, useState } from 'react'
import { SelectData } from '../components/SelectData'

import { FullscreenOutlined } from '@ant-design/icons'
import { Button, Row, Col, Divider, Space, Input } from 'antd'
import CSVTable from '../components/CSVTable'
import { ImgBar } from '../components/ImgBar'
import { SelectBar } from '../components/SelectBar'

const SearchByCellGene = () => {
    let [organ, setOrgan] = useState(SelectData.organ_list[0])
    let [cat, setCat] = useState(SelectData.category_list[0])
    let [dataType, setDataType] = useState(SelectData.datatype_list[0])
    let [GeneSymbol, setGeneSymbol] = useState('')
    let [detailTag, setDetailTag] = useState('RNA')
  
    return (
      <div>
        <Space>
          <Row>
          
            <Col span={6}>
              <SelectBar iconUrl={'/icon/gene.png'} organ={organ} cat={cat} dataType={dataType} setOrgan={setOrgan} setCat={setCat} setDataType={setDataType} />
            </Col>
            <Col span={18}>
              <Input.Search
                placeholder="input a Gene Symbol"
                allowClear
                enterButton="Search"
                size="large"
                value={GeneSymbol}
                onChange={(e)=>{setGeneSymbol(e.target.value)}}
              />
            </Col>
            <Divider/>

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
  
        <Detail tag={detailTag} organ={organ} cat={cat} dataType={dataType} GeneSymbol={GeneSymbol} />
      </div>
    )
}

export default SearchByCellGene

const Detail = (props) => {

    const { tag, organ, cat, dataType, GeneSymbol } = props
    let [filter, setFilter] = useState([organ, cat, dataType])
    useEffect(()=>{
      if(GeneSymbol !== '')
        setFilter([...filter, GeneSymbol])
    },[GeneSymbol])
    // todo 某些表，缺少一些 select tags，
    
    if(tag === '') return <></>
    if(tag === 'RNA') return (<div>
        <Row>
            <h1>DEG</h1>
            <Col span={24}>
              <ImgBar />
              {/* <CSVTable
                onClick={() => {}}
                url={'/DB/3.Gene/3.1.scRNA/3.1.2.DEG/outputfinal.csv'}
                filter={filter}
              /> */}
            </Col>
        </Row>

        <Row>
            <h1>GSEA</h1>
            <Col span={24}>
            <CSVTable
              onClick={() => {}}
              url={'/DB/3.Gene/3.1.scRNA/3.1.2.GSEA/GSEA_output.csv'}
              // filter={filter}
            />
            </Col>
        </Row>

        <Row>
            <h1>Cell communication</h1>
            <Col span={24}>
              <CSVTable
                onClick={() => {}}
                url={'/DB/3.Gene/3.1.scRNA/3.1.3.cellchat/cellchat_dfall.csv'}
                // filter={filter}
              />
            </Col>
        </Row>

        <Row>
            <h1>TF regulatory network</h1>
            <Col span={24}>
              <CSVTable
                  onClick={() => {}}
                  url={"/DB/3.Gene/3.1.scRNA/3.1.4.pyscenic/Regulon_specific_score.csv"}
                  // filter={filter}
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