import { Outlet } from 'react-router-dom';
import NavBar from '../components/nav/NavBar';
import Footer from '../components/home/Footer';
import { Image } from '@chakra-ui/react';
import TopIcon from '../components/nav/TopIcon';

function Layout() {
  return (
    <>
      <Image
        src="background.svg"
        width={'full'}
        height={'full'}
        zIndex={-100}
        position={'fixed'}
      />
      <NavBar />
      <Outlet />
      <Footer />
      <TopIcon />
    </>
  );
}

export default Layout;
