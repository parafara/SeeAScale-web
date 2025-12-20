import { useState } from 'react';
import api from '@api/axios';


export default () => {
  const [prefix, setPrefix] = useState(0);
  const [limit, setLimit] = useState([[0, 0], [0, 0]]);
  const [things, setThings] = useState([]);
  const [current, setCurrent] = useState(0);

  return {prefix, things, current};
}