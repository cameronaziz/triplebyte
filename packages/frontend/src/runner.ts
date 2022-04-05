const generateTest = (baseDelay = 2000) => {
  return function runTest() {
   const delay = baseDelay + (Math.random() * baseDelay);
    const testPassed = Math.random() > 0.5;

    return new Promise<boolean>(function(resolve) {
     setTimeout(function() {
      resolve(testPassed);
    }, delay);
   });
  };
};

export default generateTest
