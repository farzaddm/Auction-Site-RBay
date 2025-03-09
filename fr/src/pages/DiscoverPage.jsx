import { Box, Flex } from '@chakra-ui/react';
import DiscoverGrid from '../components/discover/DiscoverGrid';
import DiscoverFilter from '../components/discover/DiscoverFilter';
import { useState } from 'react';

function DiscoverPage() {
  const [queryParam, setQueryParam] = useState("")
  return (
    <Box pt={'28'} width={{ base: '95%', md: '95%' }} mx={"auto"}>
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
          <DiscoverFilter setQuery={setQueryParam} />
          <DiscoverGrid query={queryParam} />
        </Flex>
      </Box>
    </Box>
  );
}

export default DiscoverPage;
