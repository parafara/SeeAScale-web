import { useState } from 'react';
import api from '@api/axios';


export default () => {
  const [current, setCurrent] = useState({prefix: 0, item: 0})
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState([0, 0]);

  const init = (prefix = 0) => {
    api.get('/thing', {params: {prefix: prefix, page: 0}})
    .then(response => {
      if (response?.data?.length < 3) return;
      setData(response.data);
      setCurrent({prefix: prefix, item: 0});
      setLimit([0, 0]);
    })
  }

  const moveRight = async () => {
    if (current.item + 3 < data.length) {
      setCurrent({prefix: current.prefix, item: current.item + 1});
    }
    else {
      const response = await api.get('/thing', {params: {prefix: current.prefix, page: limit[1] + 1}});
      if (response.data.length === 0) return;
      setData([...data, ...response.data]);
      setCurrent({prefix: current.prefix, item: current.item + 1});
      setLimit([limit[0], limit[1] + 1])
    }
  }

  const moveLeft = async () => {
    if (current.item - 1 >= 0) setCurrent({prefix: current.prefix, item: current.item - 1});
    else {
      const response = await api.get('/thing', {params: {prefix: current.prefix, page: limit[0] - 1}});
      if (response.data.length === 0) return;
      setData([...response.data, ...data]);
      setCurrent({prefix: current.prefix, item: response.data.length - 1});
      setLimit([limit[0] - 1, limit[1]])
    }
  }

  const fetchThing = async (thingId) => {
    try {
      const response = await api.get(`/thing/${thingId}`);
      console.log(response);
      return response.data;
    }
    catch (e) {
      console.log(e);
    }
  }

  return {data, current, init, moveRight, moveLeft, fetchThing};
}