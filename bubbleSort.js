const sort = () => {
  const numbers = [5, 4, 3, 2, 1];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length - 1; j++) {
      const left = numbers[j];
      const right = numbers[j + 1];
      console.log(left, right);
      if (left > right) {
        numbers[j] = right;
        numbers[j + 1] = left;
      }
    }
  }

  console.log(numbers);
};

sort();
