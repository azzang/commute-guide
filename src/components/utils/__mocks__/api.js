export default (latitude, longitude) => date => {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () => date ? resolve() : reject()
    );
  });
};
