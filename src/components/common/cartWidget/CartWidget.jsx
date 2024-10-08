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
      <Link
        to="/carrito"
        className={styles.cartLink}
        aria-label={`Ir al carrito de compras. Cantidad de productos agregados: ${totalCartWidgetNumber}.`}
      >
        <BsCart className={styles.cartIcon} />
      </Link>
      <span className={styles.cartNumber}>{totalCartWidgetNumber}</span>
    </div>
  );
}
