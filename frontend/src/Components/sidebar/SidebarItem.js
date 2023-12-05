import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FcNext } from 'react-icons/fc';
import { Box } from '@chakra-ui/react';

const activeLink = ({ isActive }) => (isActive ? 'active' : 'link');
const activeSublink = ({ isActive }) => (isActive ? 'active' : 'link');

const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  if (item.childrens) {
    return (
      // <Box> This is Sidebar Item! </Box>
      <Box
        className={
          expandMenu ? 'sidebar-item s-parent open' : 'sidebar-item s-parent'
        }
      >
        <Box className="sidebar-title">
          <span>
            {item.icon && <Box className="icon">{item.icon}</Box>}
            {isOpen && <Box>{item.title}</Box>}
          </span>
          <FcNext
            size={25}
            className="arrow-icon"
            onClick={() => setExpandMenu(!expandMenu)}
          />
        </Box>
        <Box className="sidebar-content">
          {item.childrens.map((child, index) => {
            return (
              <Box key={index} className="s-child">
                <NavLink to={child.path} className={activeSublink}>
                  <Box className="sidebar-item">
                    <Box className="sidebar-title">
                      <span>
                        {child.icon && <Box className="icon">{child.icon}</Box>}
                        {isOpen && <Box>{child.title}</Box>}
                      </span>
                    </Box>
                  </Box>
                </NavLink>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <Box className="sidebar-item s-parent">
          <Box className="sidebar-title">
            <span>
              {item.icon && <Box className="icon">{item.icon}</Box>}
              {isOpen && <Box>{item.title}</Box>}
            </span>
          </Box>
        </Box>
      </NavLink>
    );
  }
};

export default SidebarItem;
