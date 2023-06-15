import { Col, Row } from "antd"
import { useState } from "react"

const idList = [1,2,3,4,5,6,7,8]
const click = (id) => {
    console.log(id)
}
const Human = () => {
    let [id, setId] = useState(1)

    return (
        <Row style={{border:'solid 1px'}}>
            <Col span={8}>
                {idList.map((id, idx) => (
                    <Row key={id}><Col span={24}>
                        <div onClick={click(id)}>{id}</div>
                    </Col></Row>
                ))
                }
            </Col>
        </Row>
    )
}
export default Human