import { Image } from "antd"

const ImgBar = ({ ImageList }) => {
    if(ImageList.length > 0)
        return (<div style={{height:'50vh', overflowX:'auto', overflowY:'auto'}}>
            {
                ImageList.map((i, idx) => (
                    <Image src={i} width={'100%'} fallback="/images/error.png"/>
                ))
            }
        </div>)
    else
        return (<div>
            No result.
        </div>)
}

export {ImgBar}