const {
  getLastSolves,
  getSolvesSince,
  getSolvesBeforeAmount,
  updateAO,
} = require("./access/userActionsDB.js");

const calculateAO = require("./utils.js").calculateAO;

// Input: an array of changed solve's ids
async function updateAverage(changedSolves, user_id, category) {
  // Update ao5 and ao12 for every solve that was created before the deleted solves
  // Find earliest one
  const earliestSolve = Math.min(...changedSolves);

  // Solve ids for those who needs update
  const solvesToUpdate = await getSolvesSince(user_id, category, earliestSolve);

  const lastAOs = {};
  // Update
  for (let i = 0; i < solvesToUpdate.length; i++) {
    //get 12 solves to calculate ao5 and ao12 before
    const solves = await getSolvesBeforeAmount(
      user_id,
      category,
      solvesToUpdate[i].id,
      12
    );
    const solvesParsed = [];
    solves.forEach((solve) => {
      solvesParsed.push(solve.time);
    });

    // Calculate average
    const ao12 = calculateAO(12, [...solvesParsed]); // copy array
    const ao5 = calculateAO(5, solvesParsed);

    // Insert new ao5 and ao12 to the database
    await updateAO(solvesToUpdate[i].id, ao5, ao12);

    if (lastAOs.ao5 === undefined) {
      lastAOs.ao5 = ao5;
      lastAOs.ao12 = ao12;
    }
  }

  if (lastAOs.ao5 === undefined) {
    const lastNewSolve = await getLastSolves(user_id, category, 1);
    if (lastNewSolve.length !== 0) {
      lastAOs.ao5 = lastNewSolve[0].ao5;
      lastAOs.ao12 = lastNewSolve[0].ao12;
    }
  }
  return lastAOs;
}

module.exports = { updateAverage };
