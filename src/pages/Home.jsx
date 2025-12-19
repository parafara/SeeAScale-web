import { Outlet } from 'react-router-dom';
import useUser from '@hooks/useUser';
import Header from '@components/Header';

function Home() {
  const {username, fetchMyName, fetchLogIn, fetchLogOut} = useUser();
  
  return (
    <>
      <Outlet context={{fetchLogIn, fetchLogOut}} />
      <Header props={{username, fetchMyName}} />
    </>
  );
}

export default Home;
