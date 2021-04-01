import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';

}

class CreateTransactionService { //ok
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    if (!["income", "outcome"].includes(type)) {
      throw new Error("Transaction type is invalid")
    }

    const { total } = this.transactionsRepository.getBalance()

    if (type === "outcome" && total < value) {
      throw new Error("You did not have enough balance")
    }

    const transaction = this.transactionsRepository.create({ title, value, type }) //ok

    return transaction //ok 
  }
}

export default CreateTransactionService;
