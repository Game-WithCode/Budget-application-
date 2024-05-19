let BalanceMark = document.getElementById('Balance-Mark');
let DescriptionInp = document.getElementById('Description');
let AmountInp = document.getElementById('Amount');
let Incomebtn = document.getElementById('Income-btn');
let Expensebtn = document.getElementById('Expense-btn');
let IncomeContainer = document.querySelector(".Income-Container2");
let ExpenseContainer = document.querySelector(".Expense-Container2");
let IncomeCounter=0;
let ExpenseCounter=0;
let GetArr = (e) => {
  let ReturnValue;
  if (e == 'Income') {
    ReturnValue = JSON.parse(localStorage.getItem('Income'));
  }
  if (e == 'Expense') {
    ReturnValue = JSON.parse(localStorage.getItem('Expense'));
  }
  // console.log(preIncome[0])
  if (ReturnValue == "" || ReturnValue == null) {
    return null
  }
  return ReturnValue;
}
  let AvaiableBalancePrinter = (Income, Expense) => {
    BalanceMark.innerHTML = Income - Expense;
  }
//Income-Bar-printer
window.addEventListener("load", () => {
  //for income purpose
  const localIncome = JSON.parse(localStorage.getItem('Income'));
  if (localIncome != null) {
    let Length = localIncome.length;
    if (Length >= 1) {
      for (let i = (Length - 1); i >= 0; i--) {
        IncomeContainer.innerHTML += `
      <div class="Income-Bar">
            <span class="Income-Bar-Description">${localIncome[i].Description}</span>
            <span class="Income-Bar-rupees">+${localIncome[i].Amount}</span>
            </div>
            `;
            IncomeCounter+=parseInt(localIncome[i].Amount);
      }
    }
  }
  //for Expense purpose
  const localExpense = JSON.parse(localStorage.getItem('Expense'));
  if (localExpense != null) {
    let ExpenseLength = localExpense.length;
    if (ExpenseLength >= 1) {
      for (let i = (ExpenseLength - 1); i >= 0; i--) {
        ExpenseContainer.innerHTML += `
              <div class="Expense-Bar">
                    <span class="Expense-Bar-Description">${localExpense[i].Description}</span>
                    <span class="Expense-Bar-rupees">-${localExpense[i].Amount}</span>
                    </div>
                    `;
                    ExpenseCounter+=parseInt(localExpense[i].Amount);
      }
    }
  }
  AvaiableBalancePrinter(IncomeCounter,ExpenseCounter);
});
//Click on Income button
Incomebtn.addEventListener('click', (e) => {
  if (AmountInp.value != '' && DescriptionInp.value != '') {
    //call the printing funtion 
    PrintIncome(AmountInp.value, DescriptionInp.value);
  }
})
//Click on Expense btn
Expensebtn.addEventListener('click', (e) => {
  if (AmountInp.value != ''&& DescriptionInp.value != '') {
    //call the printing funtion 
    PrintExpense(AmountInp.value, DescriptionInp.value);
  }
})
//print refresher
let PrintRefresher = (e, Description, Amount) => {
  if (e == 'Income') {
    IncomeContainer.insertAdjacentHTML("afterbegin", `
          <div class="Income-Bar">
                <span class="Income-Bar-Description">${Description}</span>
                <span class="Income-Bar-rupees">+${Amount}</span>
                </div>
                `);
  }
  if (e == 'Expense') {
    ExpenseContainer.insertAdjacentHTML("afterbegin", `
              <div class="Expense-Bar">
                    <span class="Expense-Bar-Description">${Description}</span>
                    <span class="Expense-Bar-rupees">-${Amount}</span>
                    </div>
                    `);
  }}
//Print in Income container
let PrintIncome = (Amount, description) => {
  //Balance Printer
  IncomeCounter+=parseInt(Amount);
  AvaiableBalancePrinter(IncomeCounter,ExpenseCounter);
  //Income-bar-Printer

  const preArr = GetArr('Income');
  
  if (preArr == null) {
    const sample = [
      {
        Description: "sample",
        Amount: 0
    }
     ]
    sample[0].Description = description;
    sample[0].Amount = Amount;
    localStorage.setItem('Income', JSON.stringify(sample));
    PrintRefresher("Income", description, Amount);
    return
  }
  const sample = [
    {
      Description: "sample",
      Amount: 0
}
 ]
  sample[0].Description = description;
  sample[0].Amount = Amount;
  //const newArr= preArr + sample;
  preArr[preArr.length] = sample[0];
  localStorage.setItem('Income', JSON.stringify(preArr));
  PrintRefresher("Income", description, Amount);
}
//Expense printer
let PrintExpense = (Amount, description) => {
  //Income-bar-Printer
  ExpenseCounter += parseInt(Amount);
  AvaiableBalancePrinter(IncomeCounter, ExpenseCounter);
  const preArr = GetArr('Expense');
  if (preArr == null) {
    const sample = [
      {
        Description: "sample",
        Amount: 0
      }
       ]
    sample[0].Description = description;
    sample[0].Amount = Amount;
    localStorage.setItem('Expense', JSON.stringify(sample));
    PrintRefresher("Expense", description, Amount);
    return
  }
  const sample = [
    {
      Description: "sample",
      Amount: 0
}
 ]
  sample[0].Description = description;
  sample[0].Amount = Amount;
  //const newArr= preArr + sample;
  preArr[preArr.length] = sample[0];
  localStorage.setItem('Expense', JSON.stringify(preArr));
  PrintRefresher("Expense", description, Amount)
}