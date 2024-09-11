import { useDisclosure } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface IModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<IModalProviderProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};
