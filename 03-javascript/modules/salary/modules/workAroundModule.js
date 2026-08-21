/* Salary calculations kept separate from the page behavior. */

(() => {
  const {
    salaryData,
    getDataByRole,
    getDataByCompany,
  } = window.WorkAroundData;

  function calculateAverage(numbers) {
    const total = numbers.reduce((sum, number) => sum + number, 0);
    return total / numbers.length;
  }

  function getAverageSalaryByRole(role) {
    const salaries = getDataByRole(role).map(item => item.salary);
    return calculateAverage(salaries);
  }

  function getAverageSalaryByCompany(company) {
    const salaries = getDataByCompany(company).map(item => item.salary);
    return calculateAverage(salaries);
  }

  function getSalaryAtCompany(role, company) {
    const match = salaryData.find(
      item => item.role === role && item.company === company
    );

    return match ? match.salary : null;
  }

  function getIndustryAverageSalary() {
    return calculateAverage(salaryData.map(item => item.salary));
  }

  window.WorkAroundCalculations = {
    getAverageSalaryByRole,
    getAverageSalaryByCompany,
    getSalaryAtCompany,
    getIndustryAverageSalary,
  };
})();
