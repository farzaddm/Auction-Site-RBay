import { Box, Flex } from '@chakra-ui/react';
import DiscoverGrid from '../components/discover/DiscoverGrid';
import DiscoverFilter from '../components/discover/DiscoverFilter';

function DiscoverPage() {
  return (
    <Box pt={'28'} width={{ base: '100%', md: '95%' }} mx={"auto"}>
      <Box
        rounded={'lg'}
        shadow={'md'}
        backgroundColor={'gray.500/60'}
        minH={'80vh'}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          gap={4}
        >
          <DiscoverGrid />
          <DiscoverFilter />
        </Flex>
      </Box>
    </Box>
  );
}

export default DiscoverPage;
