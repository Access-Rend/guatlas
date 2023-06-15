import { Row, Col, Divider } from "antd"

const Footer = () => {
    return (<div>
        <hr/>
        <Divider/>
        <Row>
            <Col span={12}><img style={{ maxWidth: '100%' }} src='/logo/copyright.png'/></Col>
            <Col span={12}>
                <h2>Contacts:</h2>
                <div>Xiaobo Zhou, Ph.D.</div>
                <a href='mailto:Xiaobo.Zhou@uth.tmc.edu'>Xiaobo.Zhou@uth.tmc.edu</a>

                <div>Pora Kim, Ph.D.</div>
                <a href='Pora.Kim@uth.tmc.edu'>Pora.Kim@uth.tmc.edu</a>

                <div>Jingjing Guo, Ph.D.</div>
                <a href='guojingjing@wchscu.cn'>guojingjing@wchscu.cn</a>
            </Col>
            <Col span={12}>Copyright 2022-Present</Col>
        </Row>
    </div>)
}

export default Footer