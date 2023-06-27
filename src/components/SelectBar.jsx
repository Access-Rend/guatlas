import { Radio, Space, Row, Col } from "antd"
import { SelectData } from "./SelectData"
const SelectUnit = ({ value, onChange, selectList, direction = "" }) => {
    return (
      <Radio.Group
        name={selectList[0]}
        onChange={onChange}
        value={value}
        buttonStyle="solid"
      >
        <Space direction={direction} align="start" style={{paddingLeft:'5vw'}}>
          {selectList.map((item, idx) => (
            <Radio style={{fontSize: '18px'}} value={item} key={item}>
              {item}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    )
}

const SelectBar = (props) => {
  let { organ, cat, dataType, setOrgan, setCat, setDataType } = props
    return (<div>
        
        {!organ ? <div></div> :
        (<div>
        <div style={styles.SelectTitle}>Organ</div>
          <Row>
          <SelectUnit
            value={organ}
            onChange={(e)=>{setOrgan(e.target.value)}}
            selectList={SelectData.organ_list}
            direction="vertical"
          />
          </Row>
        </div>)}

        
        {!cat ? <div></div> :
        (<div>
        <div style={styles.SelectTitle}>Category</div>
        <Row>
        <SelectUnit
            value={cat}
            onChange={(e)=>{setCat(e.target.value)}}
            selectList={SelectData.category_list}
            direction="vertical"
        />
        </Row>
        </div>)}

        {!dataType ? <div></div> :
        (<div> 
        <div style={styles.SelectTitle}>Data Type</div>
        <Row>
        <SelectUnit
            value={dataType}
            onChange={(e)=>{setDataType(e.target.value)}}
            selectList={SelectData.datatype_list}
            direction="vertical"
        />
        </Row>
        </div>)}
    </div>)
}

export { SelectBar }

const styles = {
  SelectTitle: {
    fontSize: "25px",
    fontWeight: "500",
    textAlign: 'left',
    paddingLeft:'5vw',
  },
}
