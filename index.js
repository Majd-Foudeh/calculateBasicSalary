const calculate = document.getElementById('Calculate');
const basicSalaryForm = document.getElementById('BasicSalaryForm');
const basicSalary = document.getElementById('BasicSalaryInputField');
let basicSalaryValue;
let isValidForm = false;
const basicSalaryModalDiv = document.getElementById('BasicSalaryModal');

basicSalaryModalDiv.addEventListener('shown.bs.modal', () => {
  basicSalary.focus();
});

basicSalaryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  basicSalaryValue = basicSalary.value;

  ValidateBasicSalary();
  if (isValidForm == true) {
    let socialSecurity = CalculateSocialSecurity();
    let incomeTax = CalculateIncomeTax();

    document.getElementById('SocialSecuritySpan').textContent = socialSecurity;
    document.getElementById('BasicSalarySpan').textContent = basicSalaryValue;
    document.getElementById('IncomeTaxSpan').textContent = incomeTax;

    document.getElementById('NetSalarySpan').textContent =
      basicSalaryValue - (socialSecurity + Number(incomeTax));

    const mainContainerDiv = document.getElementById('MainContainer');
    mainContainerDiv.classList.replace('d-none', 'd-block');
    const initialContainerDiv = document.getElementById('InitialContainer');
    initialContainerDiv.classList.add('d-none');

    const basicSalaryModalDiv = document.getElementById('BasicSalaryModal');
    basicSalaryModalDiv.classList.replace('show', 'hide');
    basicSalaryModalDiv.classList.add('d-none');

    const basicSalaryModalContainer =
      document.getElementsByClassName('modal-backdrop')[0];
    if (basicSalaryModalContainer != undefined) {
      basicSalaryModalContainer.classList.replace('show', 'hide');
      basicSalaryModalContainer.classList.add('d-none');
    }
  }
});

function ValidateBasicSalary() {
  if (basicSalaryValue == '' || basicSalaryValue <= 0) {
    basicSalary.classList.add('is-invalid');
  } else if (basicSalary.classList.contains('is-invalid')) {
    basicSalary.classList.replace('is-invalid', 'is-valid');
    isValidForm = true;
  } else {
    isValidForm = true;
  }
}

function CalculateIncomeTax() {
  let yearlyIncomeTax = 0;
  if (basicSalaryValue >= 700) {
    let yearlyIncome = basicSalaryValue * 12;
    yearlyIncome -= 8400;
    for (let i = 5; i <= 25; i += 5) {
      if (yearlyIncome < 0) break;

      if (yearlyIncome < 5000) {
        yearlyIncomeTax += yearlyIncome * (i / 100);
        break;
      } else {
        yearlyIncomeTax += 5000 * (i / 100);
        yearlyIncome -= 5000;
      }
    }
  }
  return (yearlyIncomeTax / 12).toFixed(2);
}

function CalculateSocialSecurity() {
  return basicSalaryValue * (7.5 / 100);
}
