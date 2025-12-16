import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useUser from '@hooks/useUser';
import Logo from '@assets/VerticalLogo.svg?react';
import sty from '@components/Header/Header.module.css';

function Header() {
    const { name, myName, logIn } = useUser();

    useEffect(() => {myName();}, []);

    return (
        <>
            <Outlet context={{logIn: logIn}} />
            <header className={sty.header}>
                <Link to='/' className={sty.logo}><Logo/></Link>
                <Link to={name ? '/logout' : '/login'} className={sty.account}>{name ?? "로그인"}</Link>
            </header>
        </>
        
    );
}

export default Header;