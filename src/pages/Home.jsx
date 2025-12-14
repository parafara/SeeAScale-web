import { Outlet } from 'react-router-dom';
import Header from '@components/Header';

function Home() {

    return (
        <>
            <Outlet />
            <Header />
        </>
    );
}

export default Home;
