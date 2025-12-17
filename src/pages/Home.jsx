import useUser from '@hooks/useUser';
import Header from '@components/Header';

function Home() {
  const {username, fetchMyName} = useUser();
  
  return (
    <>
      <Header props={{username, fetchMyName}} />
    </>
  );
}

export default Home;
