import { HomeOutlined, SearchOutlined, LinkOutlined } from '@ant-design/icons';
import Logo from '/logo/guatlas.png'
import { Menu } from 'antd';
import { useState } from 'react';
const items = [
  {
    label: (<a href='/'>Home</a>),
    key: 'Home',
    icon: <HomeOutlined />,
  },
  {
    label: (<a>Search</a>),
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
    label: (<a href='/Links'>Links</a>),
    key: 'Links',
    icon: <LinkOutlined />,
  },
  
]

const TopBar = () => {
  const [current, setCurrent] = useState('Home');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <div style={styles.TopBar}>
        <img src={Logo} width='100px' height='auto' ></img>
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
        width: '100%',
        height: '70%',
        fontSize: '20px',
    }
}