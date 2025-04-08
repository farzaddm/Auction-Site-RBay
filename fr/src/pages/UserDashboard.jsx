import {
  Box,
  Button,
  Heading,
  Icon,
  Spinner,
  Table,
  Text,
} from '@chakra-ui/react';
import {
  ActionBarCloseTrigger,
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from '../components/ui/action-bar';
import { Checkbox } from '../components/ui/checkbox';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDashboardData, useDeleteItem } from '../http/useHttp';
import { Toaster, toaster } from '../components/ui/toaster';

function UserDashboard() {
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();
  const [selection, setSelection] = useState([]);
  const {
    mutate,
    isPending,
    isError: isDeleteError,
    error: deleteError,
    data: deleteItemData,
    isSuccess,
  } = useDeleteItem();
  const { data, isLoading, isError, error } = useDashboardData(userId);
  const indeterminate = selection.length > 0 && selection.length < data.length;

  useEffect(() => {
    if (isDeleteError) {
      toaster.error({ title: deleteError.response.data.error });
      if (deleteError.response.status === 401) navigate('/login');
    }
    if (isSuccess) {
      toaster.success({ title: deleteItemData.message });
    }
  }, [isDeleteError, deleteItemData, isSuccess, deleteError]);

  const rows = data?.map((item) => (
    <Table.Row
      backgroundColor={'teal.950/60'}
      key={item.name}
      data-selected={selection.includes(item.id) ? '' : undefined}
    >
      <Table.Cell>
        <Checkbox
          _hover={{ cursor: 'pointer' }}
          colorPalette="gray"
          variant="solid"
          backgroundColor="whiteAlpha.300"
          rounded={3}
          top="1"
          aria-label="Select row"
          checked={selection.includes(item.id)}
          onCheckedChange={(changes) => {
            setSelection((prev) => (changes.checked ? [item.id] : []));
          }}
        />
      </Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>${item.price}</Table.Cell>
      {/* <Table.Cell>{item.timeLeft}</Table.Cell> */}
      {/* <Table.Cell>{item.bids}</Table.Cell> */}
      <Table.Cell>{item.views}</Table.Cell>
      <Table.Cell>{item.likes}</Table.Cell>
      <Table.Cell>
        <Button
          m={0}
          variant="subtle"
          p={2}
          backgroundColor={'whiteAlpha.200'}
          _hover={{ backgroundColor: 'whiteAlpha.400' }}
        >
          <Link to={`/product/${item.id}`}>View</Link>
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Box
        width={{ base: '95%', md: '80%' }}
        pt={'8rem'}
        minH={'95vh'}
        mx={'auto'}
      >
        <Box
          p={{ base: 3, md: 5 }}
          rounded={8}
          shadow="md"
          backgroundColor={'gray.600/60'}
          overflowX={'auto'}
        >
          <Heading textAlign={'left'} p={5}>
            Your Dashboard
          </Heading>
          {isLoading ? (
            <Spinner color={'teal'} size={'xl'} borderWidth={'4px'} />
          ) : isError ? (
            <Text color={'red'}>{error.response.data.message}</Text>
          ) : (
            <>
              <Table.Root
                width={'100%'}
                rounded={4}
                variant="outline"
                striped
                size="lg"
                interactive="true"
              >
                <Table.Header backgroundColor={'teal.700/80'}>
                  <Table.Row>
                    <Table.ColumnHeader w="6">
                      <Checkbox
                        _hover={{ cursor: 'pointer' }}
                        colorPalette="gray"
                        backgroundColor="blackAlpha.500"
                        top="1"
                        aria-label="Select all rows"
                        checked={
                          indeterminate ? 'indeterminate' : selection.length > 0
                        }
                        onCheckedChange={(changes) => {
                          setSelection(changes.checked && []);
                        }}
                      />
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Price</Table.ColumnHeader>
                    {/* <Table.ColumnHeader>Time left</Table.ColumnHeader> */}
                    {/* <Table.ColumnHeader>Bids</Table.ColumnHeader> */}
                    <Table.ColumnHeader>Views</Table.ColumnHeader>
                    <Table.ColumnHeader>Likes</Table.ColumnHeader>
                    <Table.ColumnHeader>Link</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>{rows}</Table.Body>
              </Table.Root>

              <ActionBarRoot open={selection.length}>
                <ActionBarContent backgroundColor="blackAlpha.800/100">
                  <ActionBarSelectionTrigger>
                    {selection.length} selected
                  </ActionBarSelectionTrigger>
                  <ActionBarSeparator />
                  <Button
                    colorPalette="white"
                    backgroundColor={'red.focusRing'}
                    variant="outline"
                    size="sm"
                  >
                    <Icon>
                      <FaRegTrashAlt />
                    </Icon>
                    {isPending ? (
                      <Spinner />
                    ) : (
                      <Text onClick={() => mutate(selection[0])}>Delete</Text>
                    )}
                  </Button>
                  <ActionBarCloseTrigger onClick={() => setSelection([])} />
                </ActionBarContent>
              </ActionBarRoot>
            </>
          )}
        </Box>
        {/* <Toaster /> */}
      </Box>
    </>
  );
}

const items = [
  {
    id: 1,
    name: 'Laptop',
    price: 999.99,
    timeLeft: '4 days',
    bids: 3,
    views: 0,
    likes: 2,
    link: 'https://google.com',
  },
];

export default UserDashboard;
