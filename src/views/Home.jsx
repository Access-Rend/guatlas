import { Col, Divider, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import Human from '../components/Human'

const Home = () => {
    return (<div>
        <Row>
            <Col span={24}>
                <h1 style={{fontSize:'60px'}}>GUatlas</h1>
                <div style={{fontSize:'35px'}}>A database of single cell and spatial transcriptome for the entire lifespan of human genitourinary system.</div>
            </Col>
        </Row>
        <Divider />
        <Divider />
       
        <Row>
            <Col span={24}>
                <h1 style={{fontSize:'30px', textAlign:'left'}}>&emsp;&emsp;&emsp;Include :</h1>
                <hr />
            </Col>
            
            <Col span={2}></Col>
            <Col span={6}>
                <h2>1.Single-cell and spatial transcriptome cell atlas</h2>
                <div style={styles.LeftText}>&emsp;Annotation,  Proportion,  DEGs,  GSEA,Cell-cell communication,TF regulatory network, Spatial location, Spatial interactions of celltypes </div>
            </Col>
            <Col span={1}></Col>
            <Col span={6}>
                <h2>2.DEGs(Differentially expressed genes) across different life states </h2>
                <div style={styles.LeftText}>&emsp;DEGs, GSEA, Cell-cell communication, TF regulatory network,Spatial expression,  Spatially co-expressed genes</div>
            </Col>
            <Col span={1}></Col>
            <Col span={6}>
                <h2>3. Microenvironment similarity</h2>
                <div style={styles.LeftText}>&emsp;T lymphoid cells,B lymphoid cells,Myeloid cells,Fibroblasts,Endothelial cells</div>
            </Col>
            <Col span={2}></Col>
        </Row>

        <Row>
            <Col span={24}>
                <img src='/human/human-1.svg'/>
            </Col>
        </Row>
        
        <Row>
            <Col span={2}></Col>
            <Col span={6}>
                <a href='/SearchByCellMap'>
                <img style={{ maxWidth: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }} src='/icon/cell_map.png' />
                </a>
            </Col>
            <Col span={1}></Col>
            <Col span={6}>
                <a href='/SearchByCellGene'>
                <img style={{ maxWidth: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }} src='/icon/gene.png' />
                </a>
            </Col>
            <Col span={1}></Col>
            <Col span={6}>
                <a href='/SearchByCellMicroenvironment'>
                <img style={{ maxWidth: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }} src='/icon/micro.png' />
                </a>
            </Col>
            <Col span={2}></Col>
        </Row>


        <Divider />
        <Divider />
        <hr/>
        <Row>
            <Col span={24}><h1 style={{fontSize:'40px'}}>Database Statistics</h1></Col>
            <Divider />

            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_1.svg'/></Col>
            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_2.svg'/></Col>
            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_3.svg'/></Col>
            <Divider />

            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_4.svg'/></Col>
            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_5.svg'/></Col>
            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_6.svg'/></Col>
            <Divider />

            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_7.svg'/></Col>
            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_8.svg'/></Col>
        </Row>   
        <Divider/>

        <hr/>
        <Divider/>
        <Row>
            <Col span={12}><img style={{ maxWidth: '80%' }} src='/images/organ.png'/></Col>
            <Col span={12}><img style={{ maxWidth: '80%' }} src='/images/micro.png'/></Col>
            <Col span={12}><h1 style={{fontSize:'25px'}}>Organ</h1></Col>
            <Col span={12}><h1 style={{fontSize:'25px'}}>Micro</h1></Col>
        </Row>
        <Divider/>

    </div>)
}

export default Home

const styles = {
    LeftText:{
        fontSize:'25px', textAlign:'left'
    },
}