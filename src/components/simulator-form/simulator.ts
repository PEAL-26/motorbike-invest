// const init = 566_800;
// const INVESTMENT = 466_800;
// const payMonth = 100_000;
// const intervalPeriodBeforeInvestment = 2;
// const objective = 10_000_000;
// const months = 6;
// const profit = 133_200;

export type InputData = {
  date: Date;
  balanceInitial: number;
  investment: number;
  income: number;
  intervalPeriodBeforeInvestment: number;
  goal: number;
  duration: number;
  profit: number;
  bonus: number;
};

let cycle = 1;
// let balance = init - INVESTMENT;
let investments = [{ cycle: 1 }];

export function simulate(input: InputData) {
  const {
    investment,
    profit,
    bonus,
    goal,
    intervalPeriodBeforeInvestment,
    duration,
    income,
    balanceInitial,
  } = input;
  let date = new Date("2024-12-27");
  let balance = balanceInitial - investment;
  const repeat = investments.length * profit + bonus + investment < goal;
  const items = [];

  while (repeat) {
    let index = -1;
    let rendMonth = 0;

    for (const inv of investments) {
      index++;

      if (cycle - (inv.cycle + intervalPeriodBeforeInvestment) >= duration) {
        continue;
      }

      if (cycle - inv.cycle >= intervalPeriodBeforeInvestment) {
        rendMonth += income;
      }
    }

    balance += rendMonth;

    const calc = setBalance(investment, balance, cycle);
    balance = calc.balance;

    items.push({
      date,
      number: cycle,
      investmentsTotal: investments.length,
      investments: calc.reinvests.length,
      income: rendMonth,
      balance: balance,
    });

    cycle++;

    date = addOneMonth(date);
  }

  return items;
}

function addOneMonth(date: Date) {
  // Cria uma nova instância de Date para evitar modificar o original
  const newDate = new Date(date);

  // Adiciona 1 ao mês atual
  newDate.setMonth(newDate.getMonth() + 1);

  // Verifica se houve um ajuste automático do dia (ex: de 31 para 1)
  if (newDate.getDate() !== date.getDate()) {
    newDate.setDate(0); // Define o último dia do mês anterior
  }

  return newDate;
}

var _balance = 0;
var _reinvests: { cycle: number }[] = [];

function setBalance(
  invest: number,
  _blc: number,
  _cycle: number,
  reset = true,
) {
  if (reset) {
    _balance = _blc;
    _reinvests = [];
  }

  if (_balance >= invest) {
    _balance -= invest;
    investments.push({ cycle: _cycle });
    _reinvests.push({ cycle: _cycle });

    setBalance(invest, _balance, _cycle, false);
  }

  return { balance: _balance, reinvests: _reinvests };
}
