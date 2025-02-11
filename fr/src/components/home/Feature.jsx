import { Box, Flex } from '@chakra-ui/react';
import { FcDonate, FcInTransit, FcAssistant } from 'react-icons/fc';
import FeatureItem from './FeatureItem';

export default function Feature() {
  return (
    <Box maxW={'70rem'} marginX={'auto'} p={{ md: 3, base: 10 }}>
      <Flex
        spacing={10}
        width="100%"
        direction={{ base: 'row', mdDown: 'column' }}
        gap={{ mdDown: '1rem' }}
        justifyContent="space-around"
        alignItems="center"
        textAlign="center"
      >
        <FeatureItem
          title={'Lifetime Support'}
          text={
            'Our dedicated support team is available 24/7 to assist you with any questions or issues you may have. We are committed to providing you with the best possible experience.'
          }
        >
          <FcAssistant size="2rem" />
        </FeatureItem>

        <FeatureItem
          title={'Bid on Auctions'}
          text={
            'Participate in exciting auctions and place your bids on a wide range of items. Experience the thrill of winning and getting great deals.'
          }
        >
          <FcDonate size="2rem" />
        </FeatureItem>

        <FeatureItem
          title={'Instant Delivery'}
          text={
            'Enjoy fast and reliable delivery on all your purchases. We ensure that your items are delivered to your doorstep as quickly as possible.'
          }
        >
          <FcInTransit size="2rem" />
        </FeatureItem>
      </Flex>
    </Box>
  );
}
