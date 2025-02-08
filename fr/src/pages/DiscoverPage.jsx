import { Box, Heading, Flex } from '@chakra-ui/react';
import DiscoverGrid from '../components/discover/DiscoverGrid';
import DiscoverFilter from '../components/discover/DiscoverFilter';

function DiscoverPage() {
  return (
    <Box pt={'28'} width={'95%'} mx={'auto'}>
      <Box
        rounded={'lg'}
        shadow={'md'}
        backgroundColor={'gray.500/60'}
        minH={'80vh'}
      >
        <Flex direction={'row'} justifyContent={"space-between"}>
          <DiscoverGrid />
          <DiscoverFilter />
        </Flex>
      </Box>
    </Box>
  );
}

export default DiscoverPage;
