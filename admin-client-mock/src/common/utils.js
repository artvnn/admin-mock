const convertToHashmap = stringArray => {
  let output = {};
  stringArray.forEach(str => (output[str] = str));
  return output;
};

export {convertToHashmap};
