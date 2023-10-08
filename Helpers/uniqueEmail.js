// Generating Email for Jest Testing Purpose
const uniqueEmail = () => {
  let randomGeneration = Math.floor(Math.random() * 5000);
  let randomEmail = `testuser${randomGeneration}.gmail.com`;
  return randomEmail;
};
module.exports = { uniqueEmail };
