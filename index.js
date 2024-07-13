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
      basicSalaryValue - (socialSecurity + incomeTax);

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
    for (let i = 5; i <= 25; i += 5) {
      yearlyIncome -= 8400;
      if (yearlyIncome < 0) break;

      if (yearlyIncome < 8400) {
        yearlyIncomeTax += yearlyIncome * (i / 100);
      } else {
        yearlyIncomeTax += 8400 * (i / 100);
      }
    }
  }
  return yearlyIncomeTax / 12;
}

function CalculateSocialSecurity() {
  return basicSalaryValue * (7.5 / 100);
}
