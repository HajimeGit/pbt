import { axiosClient } from '../services/axios';

export interface ITransaction {
  amount: number;
  type: string;
  date: string;
  description: string;
  category: ICategory;
}

export interface ICategory {
  id: number;
  name: string;
}

const loadAll = async () => {
  try {
    const response = await axiosClient<ITransaction[]>(
      'get',
      'transaction/all',
      null,
      {
        requiresAuth: true,
      }
    );

    return response;
  } catch (err) {
    console.error(err);
  }

  return [];
};

interface ITransactionCreationResponse {
  message: string;
}

interface ITransactionPayload {
  amount: number;
  type: string;
  category: string;
  description: string;
}

const create = async (data: ITransactionPayload) => {
  try {
    const response = await axiosClient<ITransactionCreationResponse>(
      'post',
      'transaction/create',
      data,
      {
        requiresAuth: true,
      }
    );

    return response;
  } catch (err) {
    console.error(err);
  }
};

const transactionRepository = { loadAll, create };
export default transactionRepository;
