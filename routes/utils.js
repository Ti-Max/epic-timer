function calculateAO(aoX, solves) {
  if (solves.length < aoX) return 0;

  console.log(solves);
  solves.length = aoX;
  // remove the best solve
  const max = Math.max(...solves);
  let index = solves.indexOf(max);
  solves.splice(index, 1);

  //remove the worst solve
  const min = Math.min(...solves);
  index = solves.indexOf(min);
  solves.splice(index, 1);

  // Calculate average
  let sum = 0;
  solves.forEach((solve) => {
    sum += solve;
  });

  return sum / (aoX - 2);
}

module.exports = { calculateAO };
