// utils.js

/**
 * Shuffles an array in place (Fisher-Yates algorithm)
 * @param {Array} array
 * @returns {Array}
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Starts a countdown timer and calls callback when done
 * @param {number} seconds
 * @param {function} onTick
 * @param {function} onComplete
 */
function startTimer(seconds, onTick, onComplete) {
  let time = seconds;
  onTick(time);
  const interval = setInterval(() => {
    time--;
    onTick(time);
    if (time <= 0) {
      clearInterval(interval);
      onComplete();
    }
  }, 1000);
}

