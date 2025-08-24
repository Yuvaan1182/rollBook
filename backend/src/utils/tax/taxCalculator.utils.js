async function calculateTax(TaxBracketModel, countryCode, income) {
  const taxData = await TaxBracketModel.findOne({ countryCode });
  if (!taxData) throw new Error("Country not supported");

  let tax = 0;
  let prevLimit = 0;

  for (const bracket of taxData.brackets) {
    const taxable = Math.min(income, bracket.upTo) - prevLimit;
    if (taxable > 0) {
      tax += taxable * bracket.rate;
      prevLimit = bracket.upTo;
    }
    if (income <= bracket.upTo) break;
  }

  return tax;
}

module.exports = calculateTax;
