import { Outlet } from 'react-router-dom';
import useUser from '@hooks/useUser';
import Header from '@components/Header';
import Content from '@components/Content';
import css from '@styles/Home.module.css';

function Home() {
  const {username, fetchMyName, fetchLogIn, fetchLogOut, fetchPreregister, fetchSignUp} = useUser();
  
  return (
    <>
      <Outlet context={{fetchLogIn, fetchLogOut, fetchPreregister, fetchSignUp}} />
      <div className={css.content}>
        <Header props={{username, fetchMyName}} />
        <Content />
      </div>
    </>
  );
}

export default Home;
