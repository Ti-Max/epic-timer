const formatTime = (time, toFixed) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - minutes * 60 - hours * 3600;

  // seconds
  let text = seconds.toFixed(toFixed);

  // minutes
  if (minutes > 0) {
    if (seconds < 10) {
      text = "0" + text;
    }

    text = minutes + ":" + text;
  }

  // hours
  if (hours > 0) {
    if (minutes < 10) {
      text = "0" + text;
    }

    text = hours + ":" + text;
  }

  return text;
};

const generateId = () => {
  // generates random base64 sting with the length of 11 characters (yeah, just like youtube)
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"; // base64 url
  var charactersLength = characters.length;
  for (var i = 0; i < 11; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const calculateAO = (aoX, solves) => {
  if (solves.length < aoX) return 0;

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
};

export { formatTime, generateId, calculateAO };
