const practice1 = () => {
  Array.prototype.forEachExt = function (callback) {
    const CustomExceptionForBreak = {};

    const breakLoop = () => {
      throw CustomExceptionForBreak;
    };

    try {
      for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this, breakLoop);
      }
    } catch (err) {
      if (err !== CustomExceptionForBreak) throw err;
    }
  };

  const numbers = [1, 2, 3, 4, 5];

  numbers.forEachExt((each, idx, origin, breakLoop) => {
    console.log(each);
    if (each === 2) {
      breakLoop();
    }
  });
};

practice1();
