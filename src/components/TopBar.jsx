import { HomeOutlined, SearchOutlined, ProfileOutlined, DownloadOutlined, QuestionOutlined, TeamOutlined } from '@ant-design/icons';
import Logo from '/logo/guatlas.svg'
import { Menu } from 'antd';
import { useState } from 'react';
const items = [
  {
    label: (<a href='/'>Home</a>),
    key: 'Home',
    icon: <HomeOutlined />,
  },
  {
    label: (<a style={{color:'inherit'}}>Search</a>),
    key: 'Search',
    icon: <SearchOutlined />,
    children: [
        {
            label: (<a href='/SearchByCellMap'>Search by Cell Map</a>),
            key: 'SearchByCellMap',
        },
        {
            label: (<a href='/SearchByCellGene'>Search by Cell Gene</a>),
            key: 'SearchByCellGene',
        },
        {
            label: (<a href='/SearchByCellMicroenvironment'>Search by Cell Microenvironment</a>),
            key: 'SearchByCellMicroenvironment',
        },
    ],
  },
  {
    label: (<a href='/Publication'>Publication</a>),
    key: 'Publication',
    icon: <ProfileOutlined />,
  },{
    label: (<a href='/Download'>Download</a>),
    key: 'Download',
    icon: <DownloadOutlined />,
  },
  {
    label: (<a href='/Help'>Help</a>),
    key: 'Help',
    icon: <QuestionOutlined />,
  },
  {
    label: (<a href='/About'>About</a>),
    key: 'About',
    icon: <TeamOutlined />,
  },
  
]

const TopBar = () => {
  const [current, setCurrent] = useState('Home');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <div style={styles.TopBar}>
        <img src={Logo} height='120vh'></img>
        <Menu style={styles.Menu} onClick={onClick}  mode="horizontal" items={items} inlineIndent={100}/>
    </div>
  );
}

export default TopBar;

const styles = {
    TopBar:{
        display: 'flex',
        flexDirection: 'row',
    },
    Menu:{
        width: '100vw',
        height: '10vh',
        fontSize: '30px',
        justifyContent: 'flex-end',
    }
}