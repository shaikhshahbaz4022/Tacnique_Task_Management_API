// Generating Email for Jest Testing Purpose
const uniqueEmail = () => {
  let randomGeneration = Math.floor(Math.random() * 300);
  let randomEmail = `testuser${randomGeneration}.gmail.com`;
  console.log(randomEmail);
  return randomEmail;
};
module.exports = { uniqueEmail };
