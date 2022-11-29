const cpfFormat = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, "").slice(0, 11);
  let newCpf = cpf;
  if (cpf.length > 3) {
    const firstThreeDigits = cpf.slice(0, 3);
    newCpf = `${firstThreeDigits}.`;
    if (cpf.length <= 6) {
      const lastDigits = cpf.slice(3);
      newCpf = `${firstThreeDigits}.${lastDigits}`;
    }
  }
  if (cpf.length > 6) {
    const threeToTheSixDigit = cpf.slice(3, 6);
    newCpf = `${newCpf}${threeToTheSixDigit}.`;
    if (cpf.length <= 9) {
      const lastDigits = cpf.slice(6);
      console.log(lastDigits);
      newCpf = `${newCpf}${lastDigits}`;
    }
  }
  if (cpf.length > 9) {
    const sixToTheNineDigit = cpf.slice(6, 9);
    newCpf = `${newCpf}${sixToTheNineDigit}-`;
    const lastDigits = cpf.slice(9);
    newCpf = `${newCpf}${lastDigits}`;
  }
  return newCpf;
};

export default cpfFormat;
