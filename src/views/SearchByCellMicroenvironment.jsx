import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import CSVTable from '../components/CSVTable'
import { SelectBar } from '../components/SelectBar'
import { SelectData } from '../components/SelectData'

const SearchByCellMicroenvironment = () => {
    let [organ, setOrgan] = useState(SelectData.organ_list[0])
    let [cat, setCat] = useState(SelectData.category_list[0])
    let [dataType, setDataType] = useState(SelectData.datatype_list[0])
    return (<>
            <Row>
                <Col span={6}>
                    <img src='/icon/micro.png' style={{maxWidth:'100%'}}/>
                    <SelectBar organ={organ} cat={cat} dataType={dataType} setOrgan={setOrgan} setCat={setCat} setDataType={setDataType} />

                </Col>

                <Col span={18}>
                    <CSVTable
                        onClick={() => {}}
                        url={'/DB/4.Similarity/Cluster_similarity_dfall.csv'}
                        filter={[organ, cat]}
                    />
                </Col>
            </Row>
    </>)
}

export default SearchByCellMicroenvironment