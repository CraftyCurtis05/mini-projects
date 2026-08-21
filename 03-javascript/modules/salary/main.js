/* WorkAround: connect the salary data and calculations to the browser UI. */

(() => {
  const { getRoles, getCompanies } = window.WorkAroundData;
  const { formatNumber } = window.WorkAroundUtils;
  const {
    getAverageSalaryByRole,
    getAverageSalaryByCompany,
    getSalaryAtCompany,
    getIndustryAverageSalary,
  } = window.WorkAroundCalculations;

  const companies = getCompanies();
  const roles = getRoles();

  const inputContainer = document.querySelector("#inputContainer");
  const salarySelected = document.querySelector("#salarySelected");
  const salaryAverageByRole = document.querySelector("#salaryAverageByRole");
  const salaryAverageByCompany = document.querySelector("#salaryAverageByCompany");
  const salaryAverageIndustry = document.querySelector("#salaryAverageIndustry");

  function renderOptions(labels, groupName) {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "option-group";

    const legend = document.createElement("legend");
    legend.textContent = `Select a ${groupName}`;
    fieldset.appendChild(legend);

    labels.forEach((label, index) => {
      const option = document.createElement("div");
      option.className = "option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = groupName;
      input.value = label;
      input.id = `${groupName}-${index}`;

      const labelElement = document.createElement("label");
      labelElement.htmlFor = input.id;
      labelElement.textContent = label;

      input.addEventListener("change", updateResults);

      option.append(input, labelElement);
      fieldset.appendChild(option);
    });

    inputContainer.appendChild(fieldset);
  }

  function updateResults() {
    const companyInput = document.querySelector("input[name='company']:checked");
    const roleInput = document.querySelector("input[name='role']:checked");

    // I wait for both choices before calculating anything.
    if (!companyInput || !roleInput) {
      salarySelected.textContent =
        "Select a company and a role to see the results.";
      return;
    }

    const company = companyInput.value;
    const role = roleInput.value;
    const salary = getSalaryAtCompany(role, company);

    if (salary === null) {
      salarySelected.textContent =
        "I could not find that company and role combination.";
      return;
    }

    salarySelected.textContent =
      `The salary for ${role} at ${company} is $${formatNumber(salary)}.`;

    salaryAverageByRole.textContent =
      `Average for ${role}: $${formatNumber(getAverageSalaryByRole(role))}.`;

    salaryAverageByCompany.textContent =
      `Average at ${company}: $${formatNumber(getAverageSalaryByCompany(company))}.`;

    salaryAverageIndustry.textContent =
      `Average across all salaries: $${formatNumber(getIndustryAverageSalary())}.`;
  }

  renderOptions(companies, "company");
  renderOptions(roles, "role");
})();
