import { useState } from 'react';
import api from '@api/axios';


export default () => {
  const [current, setCurrent] = useState({prefix: 0, item: 0})
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState([[0, 0], [0, 0]]);

  const init = (prefix = 0) => {
    api.get('/thing', {params: {prefix: prefix, page: 0}})
    .then(response => {
      setData(response.data);
    })
  }

  const moveRight = async () => {
    if (current.item + 3 < data.length) {
      setCurrent({prefix: data[current.item + 1].prefix, item: current.item + 1});
    }
    else {
      let i = 0;
      for (; limit[1][0] + i <= 10; i++) {
        const response = await api.get('/thing', {params: {prefix: limit[1][0] + i, page: limit[1][1] + (i === 0 ? 1 : 0)}});
        if (response.data.length === 0) {
          continue;
        }
        else {
          setData([...data, ...response.data]);
          setCurrent({prefix: data[0].prefix, item: current.item + 1});
          setLimit([limit[0], [limit[1][0] + i, limit[1][1] + (i === 0 ? 1 : 0)]])
          return;
        }
      }
      setLimit([limit[0], [limit[1][0] + i, limit[1][1] + (i === 0 ? 1 : 0)]])
    }
  }

  const moveLeft = async () => {
    if (current.item - 1 >= 0) setCurrent({prefix: data[current.item + 1].prefix, item: current.item - 1});
    else {
      let i = 0;
      for (; limit[0][0] + i >= -10; i--) {
        const response = await api.get('/thing', {params: {prefix: limit[0][0] + i, page: limit[0][1] + (i === 0 ? 1 : 0)}});
        if (response.data.length === 0) {
          continue;
        }
        else {
          setData([...response.data, ...data]);
          setCurrent({prefix: response.data[response.data.length - 1].prefix, item: response.data.length - 1});
          setLimit([[limit[0][0] + i, limit[0][1] + (i === 0 ? 1 : 0)], limit[1]])
          return;
        }
      }
      setLimit([[limit[0][0] + i, limit[0][1] + (i === 0 ? 1 : 0)], limit[1]])
    }
  }

  return {data, current, init, moveRight, moveLeft};
}