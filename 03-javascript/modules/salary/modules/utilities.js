/* Small formatting helpers used by the Salary Explorer. */

(() => {
  function formatNumber(number) {
    return Math.round(number).toLocaleString("en-US");
  }

  window.WorkAroundUtils = {
    formatNumber,
  };
})();
