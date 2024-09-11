import { Box, Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { ReactNode } from 'react';
import { useModal } from '../../context/modalContext';

interface INavItem {
  label: string;
  href: string;
}

const navItems: INavItem[] = [
  {
    label: 'Transactions',
    href: '/transactions',
  },
];

interface INavTealLink {
  href: string;
  children: ReactNode;
}

const NavTealLink: React.FC<INavTealLink> = ({ href, children }) => {
  return (
    <Button
      as={Link}
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize={'sm'}
      colorScheme='teal'
      fontWeight={600}
      to={href}
      _hover={{
        bg: useColorModeValue('gray.200', 'gray.700'),
        color: '#319795',
      }}
    >
      {children}
    </Button>
  );
};

const Navigation = () => {
  const { currentUser } = useAuth();
  const bg = useColorModeValue('gray.200', 'gray.700');
  const { onOpen } = useModal();
  const { pathname } = useLocation();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack
          spacing={8}
          alignItems={'center'}
          justifyContent={'space-between'}
          w={'100%'}
        >
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {pathname === '/transactions' && (
              <Button
                as={'a'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                colorScheme='teal'
                fontWeight={600}
                _hover={{
                  bg: useColorModeValue('gray.200', 'gray.700'),
                  color: '#319795',
                  cursor: 'pointer',
                }}
                onClick={onOpen}
              >
                New transaction
              </Button>
            )}
            {navItems.map((link, index) => (
              <Box
                key={index + 'lll'}
                as={Link}
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg,
                }}
                to={link.href}
              >
                {link.label}
              </Box>
            ))}
          </HStack>
          <HStack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            {currentUser ? (
              <>
                <Button
                  as={Link}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  to={'/logout'}
                >
                  Logout
                </Button>
                <NavTealLink href='/profile'>Profile</NavTealLink>
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  to={'/login'}
                >
                  Sign In
                </Button>
                <NavTealLink href='/registration'>Sign Up</NavTealLink>
              </>
            )}
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navigation;
