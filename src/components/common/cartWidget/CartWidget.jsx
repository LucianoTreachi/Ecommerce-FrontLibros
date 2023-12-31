import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import styles from "./CartWidget.module.css";

export default function CartWidget() {
  // Consumir la función getTotalCartWidgetNumber creada en CartContext
  const { getTotalCartWidgetNumber } = useContext(CartContext);

  // Guardar en una variable la función getTotalCartWidgetNumber
  let totalCartWidgetNumber = getTotalCartWidgetNumber();

  return (
    <div className={styles.container}>
      <Link to="/carrito">
        <BsCart className={styles.icon} aria-label="Ir al carrito de compras" />
      </Link>
      <span className={styles.number}>{totalCartWidgetNumber}</span>
    </div>
  );
}
