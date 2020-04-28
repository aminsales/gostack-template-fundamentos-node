import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
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
    const { income, outcome } = this.transactions.reduce(
      (rObj, transaction) => {
        const calIncomeOutcome = rObj;
        if (transaction.type === 'income') {
          calIncomeOutcome.income += transaction.value;
        } else if (transaction.type === 'outcome') {
          calIncomeOutcome.outcome += transaction.value;
        }
        return calIncomeOutcome;
      },
      { income: 0, outcome: 0 },
    );
    const rBalance = { income, outcome, total: income - outcome };
    return rBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
