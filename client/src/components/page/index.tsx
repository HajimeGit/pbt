import { ReactNode } from 'react';
import { Center, Container, Flex } from '@chakra-ui/react';
import Navigation from '../navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IPageProps {
  children: ReactNode;
}

const Page: React.FC<IPageProps> = ({ children }) => {
  return (
    <Container padding={0} maxW={'100%'}>
      <Navigation />
      <Flex
        width={'100vw'}
        height={'calc(100vh - 64px)'}
        alignContent={'center'}
        justifyContent={'center'}
      >
        <Center>{children}</Center>
      </Flex>
      <ToastContainer />
    </Container>
  );
};

export default Page;
