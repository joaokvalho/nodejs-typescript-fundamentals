import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransationDTO {
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
    return this.transactions
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulation: Balance, transation: Transaction) => {
        if (transation.type == 'income') {
          accumulation.income += transation.value
        } else if (transation.type == 'outcome') {
          accumulation.outcome += transation.value
        }

        return accumulation
      },
      {
        income: 0,
        outcome: 0,
        total: 0
      })

    const total = income - outcome
    return { income, outcome, total }
  }

  public create({ title, value, type }: CreateTransationDTO): Transaction {
    const transation = new Transaction({ title, value, type })

    this.transactions.push(transation)

    return transation
  }
}

export default TransactionsRepository;
