import React, { useEffect, useState } from 'react'
import { SelectData } from '../components/SelectData'
import { DownOutlined, FullscreenOutlined } from "@ant-design/icons";
import { Button, Row, Col, Divider, Space, Input, Dropdown } from 'antd'
import CSVTable from '../components/CSVTable'
import { ImgBar } from '../components/ImgBar'
import { SelectBar } from '../components/SelectBar'
import { useDBFolder, tree } from "../hooks/DBAPI"

const SearchByCellGene = () => {
    
    let [GeneSymbol, setGeneSymbol] = useState('')
    let [detailTag, setDetailTag] = useState('RNA')
  
    return (
      <div>
          <Row>
            <Col span={6}><img src='/icon/gene.png' style={{maxWidth:'100%'}}/></Col>
            <Col span={16}>
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
        <br />
        <hr />
  
        <Detail tag={detailTag} GeneSymbol={GeneSymbol} />
      </div>
    )
}

export default SearchByCellGene

const Detail = (props) => {
  let [organ, setOrgan] = useState(SelectData.organ_list[0])
  let [cat, setCat] = useState(SelectData.category_list[0])

  let [FolderTree, setFolderTree] = useState([])
  let [selected, setSelected] = useState('')
  let [ImgList, setImgList] = useState([])
  let [ImgFolder, setImgFolder] = useState('')

  useEffect(() =>{
    let res = '';
    (async () => {
      res = await tree('/3.Gene/3.2.ST/3.2.1.SpatialFeaturePlot/',2)
      setFolderTree(res)
    })();
  },[])

  useEffect(() =>{
    (async () => {
      let res = await tree(ImgFolder,1)
      setImgList(res)
    })();
  },[selected, ImgFolder])

  

  const { tag, GeneSymbol } = props
  let [filter, setFilter] = useState([organ, cat])
  useEffect(()=>{ 
    if(GeneSymbol !== '')
      setFilter([...filter, GeneSymbol])
  },[GeneSymbol])

    
  if(tag === '') return <></>
  if(tag === 'RNA') return (<div>
      <Row>
          <Col span={24}>
            <SelectBar organ={organ} cat={cat} setOrgan={setOrgan} setCat={setCat}/>
          </Col>
          
      </Row>


      <Row>
          <Col span={24}>
            <h1>DEG</h1>
            <ImgBar />
            <CSVTable
              onClick={() => {}}
              url={'/DB/3.Gene/3.1.scRNA/3.1.2.DEG/outputfinal.csv'}
              // filter={filter}
            />
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
            {FolderTree.length === 0 ? (<div></div>) : (
                <Dropdown menu={{ items: FolderTree.map((f, fidx) => {
                  // f = {a:[1,2,3]}
                  let fn = Object.keys(f)[0]
                  let res = {
                    key: fn,
                    label: fn,
                  }
          
                  if(Object.values(f)[0].length > 0){
                    res['children'] = Object.values(f)[0].map((ff, ffidx) => {
                      return {
                        key: fn + ffidx,
                        label: (<div onClick={()=> {
                          setImgFolder(`/3.Gene/3.2.ST/3.2.1.SpatialFeaturePlot/${fn}/${ff}/`)
                          setSelected(ff)
                          console.log(ImgFolder)
                        }}>{ff}</div>),
                      }
                    })
                  }
          
                  return res
                })}}>
                  
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Button >{'选择啥来着'+selected}<DownOutlined /></Button>
                    </Space>
                  </a>
                </Dropdown>
            )}
          </Col>
          <Col span={12}>todo SearchBar</Col>
          <Divider/>
          <Col span={24}>{
              ImgList.length === 0 ? (<div></div>) : (
              <ImgBar ImageList={ImgList.map((img, idx) => {return 'DB' + ImgFolder + '/' + img})} />
            )
          }</Col>
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