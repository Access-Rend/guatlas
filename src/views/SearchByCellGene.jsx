import React, { useEffect, useState } from 'react'
import { SelectData } from '../components/SelectData'
import { DownOutlined, FullscreenOutlined } from "@ant-design/icons";
import { Button, Row, Col, Divider, Space, Input, Dropdown } from 'antd'
import CSVTable from '../components/CSVTable'
import { ImgBar } from '../components/ImgBar'
import { SelectBar } from '../components/SelectBar'
import { tree } from "../hooks/DBAPI"
import ButtonDescription from "../components/ButtonDescription";

const SearchByCellGene = () => {
    let [organ, setOrgan] = useState(SelectData.organ_list[0])
    let [cat, setCat] = useState(SelectData.category_list[0])

    let [GeneSymbol, setGeneSymbol] = useState('')
    let [detailTag, setDetailTag] = useState('RNA')
  
    return (
      <div>
          <Row>
            <Col span={6}><img src='/icon/gene.png' style={{maxWidth:'100%'}}/></Col>
            <Col span={18}>
              <div style={{transformOrigin: 'left top', transform:'scale(2)', width:'50%'}}>
                <Input.Search
                  placeholder="input a Gene Symbol"
                  allowClear
                  enterButton="Search"
                  size="large"
                  value={GeneSymbol}
                  onChange={(e)=>{setGeneSymbol(e.target.value)}}
                />
              </div>
            </Col>
            <Divider/>
            
            <Col span={6}><SelectBar organ={organ} cat={cat} setOrgan={setOrgan} setCat={setCat}/></Col>
            <Col span={18}/>

            <Col span={12}>
              <Button
                style={{transform: 'scale(1.5'}}
                onClick={()=>{setDetailTag("RNA")}}
                size="large" type="primary" icon={<FullscreenOutlined />}
              >
                Singile cell RNA result
              </Button>
            <ButtonDescription>
              DEGs, GSEA, Cell-cell communication, TF regulatory network across different life states
            </ButtonDescription>
            </Col>

            <Col span={12}>
              <Button
                style={{transform: 'scale(1.5'}}
                onClick={()=>{setDetailTag("Spatial")}}
                size="large" type="primary" icon={<FullscreenOutlined />}
              >
                Spatial Transcriptomic result
              </Button>
            <ButtonDescription>
              Spatial expression, Spatially co-expressed genes of the DEGs
            </ButtonDescription>
            </Col>
              
          </Row>
        <br />
        <hr />
  
        <Detail organ={organ} cat={cat} tag={detailTag} GeneSymbol={GeneSymbol} />
      </div>
    )
}

export default SearchByCellGene

const Detail = (props) => {
  let [seFolderTree, setSeFolderTree] = useState([])
  let [seSelected, setSeSelected] = useState('')
  let [seImgList, setSeImgList] = useState([])
  let [seImgFolder, setSeImgFolder] = useState('')

  let [scFolderTree, setScFolderTree] = useState([])
  let [scSelected, setScSelected] = useState('')
  let [scICList, setScICList] = useState([])
  let [scICFolder, setScICFolder] = useState('')
  let [name, setName] = useState('')

  const { tag, GeneSymbol, organ, cat } = props
  let [filter, setFilter] = useState([organ, cat])
  useEffect(()=>{ 
    if(GeneSymbol !== '')
      setFilter([...filter, GeneSymbol])
  },[GeneSymbol])

  useEffect(() =>{
    (async () => {
      let se = await tree('/3.Gene/3.2.ST/3.2.1.SpatialFeaturePlot/',2)
      let sc = await tree('/3.Gene/3.2.ST/3.2.2.Spark-coexpression/',2)
      setSeFolderTree(se)
      setScFolderTree(sc)
    })();
  },[])

  useEffect(() =>{
    (async () => {
      let res = await tree(seImgFolder,1)
      setSeImgList(res)
    })();
  },[seSelected, seImgFolder])

  useEffect(() =>{
    (async () => {
      let res = await tree(scICFolder,1)
      setScICList(res)
    })();
  },[scSelected, scICFolder])

  const getNameList = (list) => {
    const uniqueFileNamesSet = new Set();
    list.map(file => {
      const fileName = file.split('.')[0];
      uniqueFileNamesSet.add(fileName);
    });
    return Array.from(uniqueFileNamesSet);
  }

  if(tag === '') return <></>
  if(tag === 'RNA') return (<div>
      <Row>
          <Col span={24}>
            <h1>DEG</h1>
            <CSVTable
              onClick={() => {}}
              url={'/DB/3.Gene/3.1.scRNA/3.1.2.DEG/outputfinal.csv'}
              filter={filter}
            />
          </Col>
      </Row>

      <Row>
          <Col span={24}>
          <h1>GSEA</h1>
          <CSVTable
            onClick={() => {}}
            url={'/DB/3.Gene/3.1.scRNA/3.1.2.GSEA/GSEA_output.csv'}
            filter={filter}
          />
          </Col>
      </Row>

      <Row>
          <Col span={24}>
          <h1>Cell communication</h1>
            <CSVTable
              onClick={() => {}}
              url={'/DB/3.Gene/3.1.scRNA/3.1.3.cellchat/cellchat_dfall.csv'}
              filter={filter}
            />
          </Col>
      </Row>

      <Row>
          <Col span={24}>
          <h1>TF regulatory network</h1>
            <CSVTable
                onClick={() => {}}
                url={"/DB/3.Gene/3.1.scRNA/3.1.4.pyscenic/Regulon_specific_score.csv"}
                filter={filter}
              />
          </Col>
      </Row>
  </div>)

  if(tag === 'Spatial') return (<div>
      <Row>
          <Col span={24}><h1>Spatial expression</h1></Col>
          <Col span={8}>
            {seFolderTree.length === 0 ? (<div></div>) : (
                <Dropdown menu={{ items: seFolderTree.map((f, fidx) => {
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
                          setSeImgFolder(`/3.Gene/3.2.ST/3.2.1.SpatialFeaturePlot/${fn}/${ff}/`)
                          setSeSelected(ff)
                        }}>{ff}</div>),
                      }
                    })
                  }
          
                  return res
                })}}>
                  
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Button >{seSelected}<DownOutlined /></Button>
                    </Space>
                  </a>
                </Dropdown>
            )}
          </Col>
          <Col span={16} />

          <Divider/>
          <Col span={24}>
            <ImgBar ImageList={seImgList.map((img, idx) => {return 'DB' + seImgFolder + '/' + img})} />
          </Col>
      </Row>

      <Row>
          <Col span={24}><h1>Spatially co-expressed genes</h1></Col>
         
          <Col span={8}>
            {scFolderTree.length === 0 ? (<div></div>) : (
                <Dropdown menu={{ items: scFolderTree.map((f, fidx) => {
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
                          setScICFolder(`/3.Gene/3.2.ST/3.2.2.Spark-coexpression/${fn}/${ff}/`)
                          setScSelected(ff)
                          console.log(scICList)
                        }}>{ff}</div>),
                      }
                    })
                  }
          
                  return res
                })}}>
                  
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Button >{scSelected}<DownOutlined /></Button>
                    </Space>
                  </a>
                </Dropdown>
            )}
          </Col>
          <Col span={8} /><Col span={8} />

          <Col span={8}>
            {
              !scICList ? <div></div> : (
                <Dropdown menu={{ items: getNameList(scICList).map((name, idx) => {
                  return {
                    label: <div onClick={()=>{setName(name)}}>{name}</div>,
                    key: idx,
                  }
                })}}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Button >{name}<DownOutlined /></Button>
                    </Space>
                  </a>
                </Dropdown>
              )
            }
          </Col>
          <Col span={8} /><Col span={8} />

          <Col span={24}>
            <ImgBar ImageList={['DB' + scICFolder + '/' + name + '.png']} />
          </Col>

          <Col span={24}>
            <CSVTable url={'DB' + scICFolder + '/' + name + '.csv'}/>
          </Col>
      </Row>

  </div>)
}

const styles = {

}