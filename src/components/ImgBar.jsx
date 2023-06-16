import { Image } from "antd"

const ImgBar = ({ ImageList }) => {
    console.log(ImageList[0])
    return (<div style={{height:'50vh', overflowX:'auto', overflowY:'auto'}}>
        {
            ImageList.map((i, idx) => (
                <Image src={i} width={'100%'} />
            ))
        }
    </div>)
}

export {ImgBar}