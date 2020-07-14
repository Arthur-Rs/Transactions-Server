import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    const restTransaction = total - value;

    // Checks whether money is available
    if (restTransaction < 0 && type === 'outcome') {
      throw Error("You don't have money");
    }

    const data: RequestDTO = {
      title,
      type,
      value,
    };

    const transaction = this.transactionsRepository.create(data as Transaction);

    return transaction;
  }
}

export default CreateTransactionService;
