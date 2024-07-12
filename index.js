const calculate = document.getElementById('Calculate');
const recalculate = document.getElementById('Recalculate');
const basicSalary = document.getElementById('BasicSalaryInputField');
let basicSalaryValue;
let socialSecurity;
let yearlyIncomeTax = 0;

const basicSalaryModalDiv = document.getElementById('BasicSalaryModal');

basicSalaryModalDiv.addEventListener('shown.bs.modal', () => {
  basicSalary.focus();
});

recalculate.addEventListener('click', () => {
  basicSalary.textContent = '';

  const basicSalaryModalDiv = document.getElementById('BasicSalaryModal');
  basicSalaryModalDiv.classList.replace('hide', 'show');
  basicSalaryModalDiv.classList.replace('d-none', 'd-block');

  const basicSalaryModalContainer =
    document.getElementsByClassName('modal-backdrop')[0];
  basicSalaryModalContainer.classList.replace('hide', 'show');
  basicSalaryModalContainer.classList.replace('d-none', 'd-block');
});
calculate.addEventListener('click', (e) => {
  basicSalaryValue = basicSalary.value;
  socialSecurity = basicSalaryValue * (7.5 / 100);
  if (basicSalaryValue >= 700) {
    let yearlyIncome = basicSalaryValue * 12;
    for (let i = 5; i <= 25; i += 5) {
      yearlyIncome -= 8400;
      if (yearlyIncome < 0) break;

      if (yearlyIncome < 8400 && yearlyIncome > 0) {
        yearlyIncomeTax += yearlyIncome * (i / 100);
      } else {
        yearlyIncomeTax += 8400 * (i / 100);
      }
    }
  }
  document.getElementById('SocialSecuritySpan').textContent = socialSecurity;
  document.getElementById('BasicSalarySpan').textContent = basicSalaryValue;
  document.getElementById('IncomeTaxSpan').textContent = yearlyIncomeTax / 12;

  document.getElementById('NetSalarySpan').textContent =
    basicSalaryValue - (socialSecurity + yearlyIncomeTax / 12);

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
});
