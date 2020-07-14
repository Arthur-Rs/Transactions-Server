import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // Get income values
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value)
      .reduce((total, transaction) => total + transaction, 0);

    // Get outcome values
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value)
      .reduce((total, transaction) => total + transaction, 0);

    // Get total values
    const total = income - outcome;

    const balance: Balance = {
      outcome,
      income,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: Transaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
