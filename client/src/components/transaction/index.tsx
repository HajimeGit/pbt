import { useEffect, useState } from 'react';
import transactionRepository, { ITransaction } from '../../api/transaction';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Page from '../page';
import { useModal } from '../../context/modalContext';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { OptionBase, Select } from 'chakra-react-select';
import { toast } from 'react-toastify';

const Transaction = () => {};

const TransactionList = () => {
  const [list, setList] = useState<ITransaction[] | []>([]);
  const [needUpdate, setNeedUpdate] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await transactionRepository.loadAll();
      setList(response);
    })();
  }, [needUpdate]);

  return (
    <Page>
      <TransactionForm needUpdate={setNeedUpdate} />
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Category</Th>
              <Th>Amount</Th>
              <Th>Desctiption</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((item: ITransaction, index: number) => {
              return (
                <Tr key={index}>
                  <Td>{item.category.name}</Td>
                  <Td>₴ {item.amount}</Td>
                  <Td>{item.description} </Td>
                  <Td>{new Date(item.date).toLocaleString()}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Page>
  );
};

interface ITypeOption extends OptionBase {
  label: string;
  value: string;
}

const typeOptions = [
  {
    label: 'Income',
    value: 'income',
  },
  {
    label: 'Expense',
    value: 'expense',
  },
];

interface ITransactionFormInput {
  amount: string;
  type: ITypeOption;
  category: string;
  description: string;
}

interface ITransactionFormProps {
  needUpdate: (status: boolean) => void;
}

const TransactionForm: React.FC<ITransactionFormProps> = ({ needUpdate }) => {
  const { isOpen, onClose } = useModal();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ITransactionFormInput>();

  const onSubmit: SubmitHandler<ITransactionFormInput> = async (data) => {
    const result = await transactionRepository.create({
      ...data,
      type: data.type.value,
      amount: parseInt(data.amount, 10),
    });

    if (result) {
      toast.success(result.message);
      handleModalClose();
      needUpdate(true);
    }
  };

  const handleModalClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id='transaction-form' onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.amount)}>
              <FormLabel htmlFor='amount'>Amount</FormLabel>
              <NumberInput defaultValue={0} min={-10000} max={10000}>
                <NumberInputField
                  {...register('amount', {
                    required: 'This field is required',
                  })}
                />
              </NumberInput>
              <FormErrorMessage>
                {errors.amount?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <Controller
              control={control}
              name='type'
              rules={{ required: 'This is required' }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <FormControl isInvalid={!!error} id='type'>
                  <FormLabel htmlFor='type'>Type</FormLabel>
                  <Select<ITypeOption>
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={typeOptions}
                  />
                  <FormErrorMessage>{error?.type}</FormErrorMessage>
                </FormControl>
              )}
            ></Controller>

            <FormControl isInvalid={Boolean(errors.category)}>
              <FormLabel htmlFor='category'>Category</FormLabel>
              <Input
                id='category'
                placeholder='Transaction category e.x. Products'
                {...register('category', {
                  required: 'This is required!',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                })}
              ></Input>
              <FormErrorMessage>
                {errors.category?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.description)}>
              <FormLabel htmlFor='description'>Description</FormLabel>
              <Input
                id='description'
                placeholder='Description'
                {...register('description', {
                  required: 'This is required!',
                  maxLength: {
                    value: 400,
                    message: 'Minimum length should be 400',
                  },
                })}
              ></Input>
              <FormErrorMessage>
                {errors.description?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            w={'100%'}
            mr={5}
            colorScheme='teal'
            isLoading={isSubmitting}
            type='submit'
            form='transaction-form'
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { Transaction, TransactionList, TransactionForm };
