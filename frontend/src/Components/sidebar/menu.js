import { FcGrid, FcAddImage, FcSelfie } from 'react-icons/fc';

const menu = [
  {
    title: 'Dashboard',
    icon: <FcGrid />,
    path: '/dashboard',
  },
  {
    title: 'Add Photo',
    icon: <FcAddImage />,
    path: '/add-photo',
  },
  {
    title: 'Account',
    icon: <FcSelfie />,
    childrens: [
      {
        title: 'Profile',
        path: '/profile',
      },
      {
        title: 'Edit Profile',
        path: '/edit-profile',
      },
    ],
  },
];

export default menu;
/****************Checked!*/
