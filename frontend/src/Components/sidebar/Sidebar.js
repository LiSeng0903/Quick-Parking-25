import { List, ListItem, ListIcon, Box } from '@chakra-ui/react';
import { CalendarIcon, EditIcon, AtSignIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { FcGlobe, FcMenu } from 'react-icons/fc';
import { useState } from 'react';
import SidebarItem from './SidebarItem';
import menu from './menu';
import { useNavigate } from 'react-router-dom';

// const Sidebar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <Box style={{ width: isOpen ? '230px' : '60px' }}>
//       <List color="white" fontSize="1.2em" spacing={4}>
//         <ListItem>
//           <NavLink to="/">
//             <ListIcon as={CalendarIcon} color="white" />
//             Homepage
//           </NavLink>
//         </ListItem>
//         {/* <ListItem>
//         <NavLink to="create">
//           <ListIcon as={EditIcon} color="white" />
//           New Task
//         </NavLink>
//       </ListItem>
//       <ListItem>
//         <NavLink to="profile">
//           <ListIcon as={AtSignIcon} color="white" />
//           Profile
//         </NavLink>
//       </ListItem> */}
//       </List>
//     </Box>
//   );
// };
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Box className="layout">
      <List
        className="sidebar"
        style={{ width: isOpen ? '230px' : '60px' }}
        color="white"
        fontSize="1.2em"
        spacing={4}
      >
        <ListItem className="top_section">
          <NavLink to="/">
            <ListIcon
              as={CalendarIcon}
              color="white"
              style={{ display: isOpen ? 'block' : 'none' }}
              size={35}
              style={{ cursor: 'pointer', marginTop: '10px' }}
              onClick={goHome}
            />
            Homepage
          </NavLink>
        </ListItem>
        <ListItem
          className="bars"
          style={{ marginLeft: isOpen ? '100px' : '0px' }}
        >
          <ListIcon as={CalendarIcon} onClick={toggle}>
            {menu.map((item, index) => {
              return <SidebarItem key={index} item={item} isOpen={isOpen} />;
            })}
          </ListIcon>
        </ListItem>
        <Box
          style={{
            paddingLeft: isOpen ? '230px' : '60px',
            transition: 'all .5s',
          }}
        >
          {children}
        </Box>
      </List>
    </Box>
  );
};

export default Sidebar;
