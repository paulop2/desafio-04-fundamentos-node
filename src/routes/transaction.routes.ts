import { Router } from 'express';

import Transaction from '../models/Transaction'

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all()
    const balance = transactionsRepository.getBalance()

    return response.json({ transactions, balance })

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // ok
    const { title, value, type } = request.body //ok

    const createTransaction = new CreateTransactionService(transactionsRepository) //ok

    const transaction = createTransaction.execute({ title, type, value }) //ok 

    return response.json(transaction)// ok


  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
