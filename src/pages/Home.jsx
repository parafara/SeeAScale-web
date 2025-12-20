import { Outlet } from 'react-router-dom';
import useUser from '@hooks/useUser';
import Header from '@components/Header';

function Home() {
  const {username, fetchMyName, fetchLogIn, fetchLogOut, fetchPreregister, fetchSignUp} = useUser();
  
  return (
    <>
      <Outlet context={{fetchLogIn, fetchLogOut, fetchPreregister, fetchSignUp}} />
      <Header props={{username, fetchMyName}} />
    </>
  );
}

export default Home;
