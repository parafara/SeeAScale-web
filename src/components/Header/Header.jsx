import VerticalLogo from "@assets/logos/VerticalLogo.svg?react"
import styles from "@components/Header/Header.module.css"

function Header() {
    
    return (
        <header className={styles.header}>
            <a className={styles.logoWraper} href="/">
                <VerticalLogo />
            </a>
            <button className={styles.accountWrapper} href="/login">
                {"로그인"}
            </button>
        </header>
    )
}

export default Header;