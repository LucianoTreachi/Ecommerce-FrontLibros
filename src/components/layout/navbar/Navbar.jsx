import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Logo from "../../common/logo/Logo";
import CartWidget from "../../common/cartWidget/CartWidget";
import styles from "./Navbar.module.css";

export default function Navbar({ isOpen, toggleMenu }) {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Logo />

        <div className={`${styles.menu} ${isOpen && styles.open}`}>
          <AiOutlineClose
            className={styles.closeMenuIcon}
            onClick={toggleMenu}
          />
          <Link to="/" className={styles.link} onClick={toggleMenu}>
            Inicio
          </Link>
          <Link to="/como-comprar" className={styles.link} onClick={toggleMenu}>
            Cómo comprar
          </Link>
          <Link to="/contacto" className={styles.link} onClick={toggleMenu}>
            Contacto
          </Link>
        </div>

        <CartWidget />

        {/* Hamburger Menu */}
        <AiOutlineMenu className={styles.openMenuIcon} onClick={toggleMenu} />
      </nav>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      ></div>
    </header>
  );
}
