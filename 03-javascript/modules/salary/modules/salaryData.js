/* Salary data and the small lookup functions that use it. */

(() => {
  const salaryData = [
    { role: "CTO", company: "Big Data Inc.", salary: 320000 },
    { role: "Technical Lead", company: "Big Data Inc.", salary: 230000 },
    { role: "Software Engineer II", company: "Big Data Inc.", salary: 180000 },
    { role: "Software Engineer I", company: "Big Data Inc.", salary: 140000 },
    { role: "CTO", company: "Medium Data Inc.", salary: 215000 },
    { role: "Technical Lead", company: "Medium Data Inc.", salary: 165000 },
    { role: "Software Engineer II", company: "Medium Data Inc.", salary: 140000 },
    { role: "Software Engineer I", company: "Medium Data Inc.", salary: 115000 },
    { role: "CTO", company: "Small Data Inc.", salary: 175000 },
    { role: "Technical Lead", company: "Small Data Inc.", salary: 135000 },
    { role: "Software Engineer II", company: "Small Data Inc.", salary: 115000 },
    { role: "Software Engineer I", company: "Small Data Inc.", salary: 95000 },
  ];

  function getRoles() {
    return [...new Set(salaryData.map(item => item.role))];
  }

  function getCompanies() {
    return [...new Set(salaryData.map(item => item.company))];
  }

  function getDataByRole(role) {
    return salaryData.filter(item => item.role === role);
  }

  function getDataByCompany(company) {
    return salaryData.filter(item => item.company === company);
  }

  // I expose one small object instead of leaving every helper in the global scope.
  window.WorkAroundData = {
    salaryData,
    getRoles,
    getCompanies,
    getDataByRole,
    getDataByCompany,
  };
})();
