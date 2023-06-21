import { Image, Space } from "antd"

const ImgBar = ({ ImageList , direction=''}) => {

    if(ImageList?.length > 0)
        return (<Space direction={direction} style={{height:'40vh', overflowX:'auto', overflowY:'auto'}}>
            {
                ImageList.map((i, idx) => (
                    <Image src={i} width={'100%'} fallback="/images/error.png" key={idx}/>
                ))
            }
        </Space>)
    else
        return (<div>
            No result.
        </div>)
}

export {ImgBar}