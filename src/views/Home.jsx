import { Col, Divider, Row } from 'antd'
import React, { useEffect, useState } from 'react'

const Human = () => {
    let [selected, setSelected] = useState(1)
    const IBList = [1,2,3,4,5,6,7,8,9,10,11]

    const InvisibleButton = (props) => {
        let {id} = props
        return (
            <div style={{ height: '8.5%', width: '40%'}} onClick={()=>{setSelected(id)}} >
                </div>
        )
    }

    return (
        <div id='box' style={{
            backgroundImage: `url(/human/human-${selected}.svg)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            width: '100vw',
            height: '80vh',
            display: 'flex', flexDirection: 'column',
            paddingTop: '3vh'
          }}>
            {IBList.map((i, idx) => {
                return (<InvisibleButton key={idx} style={{height: '9%',}} id={i}/>)
            })}
        </div>
    )
}

const Home = () => {
    return (<div>
        <img src='/images/home.svg' />

        <Row>
            <Col span={1}></Col>
            <Col span={6} >
                <a href='/SearchByCellMap' >
                <img className={'HomeSearchLink'} style={styles.SearchLinkImg} src='/icon/cell_map.png' />
                </a>
            </Col>
            <Col span={2}></Col>
            <Col span={6}>
                <a href='/SearchByCellGene'>
                <img className={'HomeSearchLink'}  style={styles.SearchLinkImg} src='/icon/gene.png' />
                </a>
            </Col>
            <Col span={2}></Col>
            <Col span={6}>
                <a href='/SearchByCellMicroenvironment'>
                <img className={'HomeSearchLink'}  style={styles.SearchLinkImg} src='/icon/micro.png' />
                </a>
            </Col>
            <Col span={1}></Col>
        </Row>
        <br/>

        <Row>
            <Col span={24}>
                <Human/>
            </Col>
        </Row>
        
        <Divider />
        <Divider />
        <hr/>
        <Row>
            <Col span={24}><h1 style={{fontSize:'40px'}}>Database Statistics</h1></Col>
            <Divider />

            <Col span={3} />
            <Col span={8}><img style={{ width: '80%' }} src='/icon/ds_1.svg'/></Col>
            <Col span={2} />
            <Col span={8}><img style={{ width: '80%' }} src='/icon/ds_2.svg'/></Col>
            <Col span={3} />
            <Divider />

            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_3.svg'/></Col>
            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_4.svg'/></Col>
            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_5.svg'/></Col>
            <Divider />

            <Col span={8}><img style={{ maxWidth: '80%' }} src='/icon/ds_6.svg'/></Col>
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
    SearchLinkImg: {
        width: '100%',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.2s',
    }
}