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
        <Space direction={direction} align="start">
          {selectList.map((item, idx) => (
            <Radio value={item} key={item}>
              {item}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    )
}

const SelectBar = (props) => {
  let { iconUrl, organ, cat, dataType, setOrgan, setCat, setDataType } = props
    return (<div>
        <img src={iconUrl} style={{ width: "100%" }}></img>

        <div style={styles.SelectTitle}>Organ</div>
        <Row>
        <SelectUnit
          value={organ}
          onChange={(e)=>{setOrgan(e.target.value)}}
          selectList={SelectData.organ_list}
          direction="vertical"
        />
        </Row>

        <div style={styles.SelectTitle}>Category</div>

        <Row>
        <SelectUnit
            value={cat}
            onChange={(e)=>{setCat(e.target.value)}}
            selectList={SelectData.category_list}
        />
        </Row>

        <div style={styles.SelectTitle}>Data Type</div>
        <Row>
        <SelectUnit
            value={dataType}
            onChange={(e)=>{setDataType(e.target.value)}}
            selectList={SelectData.datatype_list}
        />
        </Row>
    </div>)
}

export { SelectBar }

const styles = {
  SelectTitle: {
    fontSize: "25px",
    textAlign: "left",
    fontWeight: "500",
  },
}
