import { Link } from 'react-router-dom';
import useUserName from '@hooks/useUserName';
import Logo from '@assets/VerticalLogo.svg?react';
import sty from '@components/Header/Header.module.css';

function Header() {
    const { name, loading } = useUserName();
    
    return (
        <header className={sty.header}>
            <Link to='/' className={sty.logo}><Logo/></Link>
            <Link to={name ? '/logout' : '/login'} className={sty.account}>
                {loading ? '로딩중...' : name ?? '로그인'}
            </Link>
        </header>
    );
}

export default Header;