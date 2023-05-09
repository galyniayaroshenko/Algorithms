window.run = form => {
  console.time('time'); // eslint-disable-line

  const dimension = +form.dimension.value;
  const isEven = dimension % 2 === 0;
  const workerCount = Math.ceil(dimension / 2);

  let finishedWorkerCount = 0;
  let incrementer = 1;
  let solutions = 0;

  for (let i = 0; i < workerCount; i++) {
    const worker = new Worker('worker.js'); // eslint-disable-line

    incrementer = isEven || i < workerCount - 1 ? 2 : 1;
    worker.postMessage({col: i, dimension, incrementer});
    worker.onmessage = event => { // eslint-disable-line
      solutions += event.data;
      worker.terminate();
      finishedWorkerCount++;

      if (finishedWorkerCount === workerCount) {
        console.timeEnd('time'); // eslint-disable-line
        console.log(`Рoзмір шахматної дошки: ${dimension}x${dimension}, кількість рішень: ${solutions}`); // eslint-disable-line
      }
    };
  }
};
