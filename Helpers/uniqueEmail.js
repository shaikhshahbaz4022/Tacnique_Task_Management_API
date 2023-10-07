const uniqueEmail = () => {
  let randomGeneration = Math.floor(Math.random() * 300);
  let randomEmail = `testuser${randomGeneration}.gmail.com`;
  return randomEmail;
};
module.exports = { uniqueEmail };
