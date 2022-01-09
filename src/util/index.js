export const chunk = (arr, perChunk = 2) => arr.reduce((previousValue, currentvalue, currentIndex, array) => {
  const chunkIndex = Math.floor(currentIndex / perChunk)

  if (!previousValue[chunkIndex]) {
    previousValue[chunkIndex] = []
  }

  previousValue[chunkIndex].push(currentvalue)

  return previousValue
}, [])