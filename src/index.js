// Please run your solution from this file

import { renderData, prepareData } from './solution';

import axios from 'axios';

const URL = 'https://api.spacexdata.com/v3/launches/past';

axios.get(URL).then((response) => {
  const data = prepareData(response.data);

  renderData(data);
});

console.log('Hello from %csrc/index.js', 'font-weight:bold');
