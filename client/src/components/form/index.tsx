import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

interface IFormInput {
  name: string;
  password: string;
}

interface IUserFormProps {
  operation: (name: string, password: string) => Promise<boolean>;
  button: string;
}

const UserForm: React.FC<IUserFormProps> = ({ operation, button }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const success = await operation(data.name, data.password);

    if (success) {
      navigate('/profile', { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <Input
          id='name'
          autoComplete='name'
          placeholder='Your name'
          {...register('name', {
            required: 'This is required!',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        ></Input>
        <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input
          autoComplete='current-password'
          id='password'
          type='password'
          placeholder='Your password'
          {...register('password', {
            required: 'This is required!',
            minLength: { value: 6, message: 'Minimum length should be 6' },
          })}
        ></Input>
        <FormErrorMessage>
          {errors.password?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <Center>
        <Button
          w={'100%'}
          mt={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'
        >
          {button}
        </Button>
      </Center>
    </form>
  );
};

export { UserForm };
