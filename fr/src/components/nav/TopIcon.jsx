import { Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoIosArrowDropupCircle } from 'react-icons/io';

function TopIcon() {
  const [scroll, setScroll] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, [window.scrollY]);

  return (
    <Icon
      as={IoIosArrowDropupCircle}
      transition={'all .3s ease'}
      position={scroll > 50 ? 'fixed' : 'none'}
      bottom={5}
      right={5}
      color={'teal.400'}
      width={10}
      height={10}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      opacity={scroll > 50 ? 1 : 0}
      transform={scroll > 50 ? 'translateY(0)' : 'translateY(20px)'}
    />
  );
}

export default TopIcon;
