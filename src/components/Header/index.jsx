import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useUser from '@hooks/useUser';
import Logo from '@assets/VerticalLogo.svg?react';
import sty from '@components/Header/Header.module.css';

function Header() {
    const [name, fetchLogIn, fetchLogOut, fetchMyName] = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyName().then(() => setLoading(false));
    }, []);

    return (
        <>
            <Outlet context={{fetchLogIn: fetchLogIn, fetchLogOut: fetchLogOut}} />
            <header className={sty.header}>
                <Link to='/' className={sty.logo}><Logo/></Link>
                <Link to={loading ? null : (name ? 'logout' : 'login')} className={sty.account}>
                    {loading ? '로그인 확인 중...' : (name ?? '로그인')}
                </Link>
            </header>
        </>
        
    );
}

export default Header;