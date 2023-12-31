import { CartContext } from "../../../context/CartContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import NavigateToTop from "../../../routes/NavigateToTop";
import GoBackButton from "../../common/goBackButton/GoBackButton";
import LoaderModal from "../../modals/loaderModal/LoaderModal";
import SuccessModal from "../../modals/successModal/SuccessModal";
import styles from "./Credit.module.css";

export default function Credit() {
  // Consumir variables y funciones que vienen del contexto CartContext
  const { cartProducts, getTotalPrice, clearCart } = useContext(CartContext);

  // En una variable guardar la función getQuantityById
  let totalPrice = getTotalPrice();

  // Crear un estado para mostrar el id de la orden de compra
  const [orderId, setOrderId] = useState("");

  // Crear un estado para mostrar el modal loader
  const [loaderModal, setLoaderModal] = useState(false);

  // Crear un estado para mostrar el modal success
  const [successModal, setSuccessModal] = useState(false);

  // Crear un estado para rellenar los inputs
  const [data, setData] = useState({
    nombre: "",
    phone: "",
    email: "",
    cardNumber: "",
    cardExpirationDate: "",
    cvc: "",
    adress: "",
  });

  // Crear una función para rellenar los inputs
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Crear una función para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Configurar un objeto para la orden de compra de un producto
    let order = {
      buyer: data,
      products: cartProducts,
      total: totalPrice,
      date: serverTimestamp(),
    };

    // Agregar la orden de compra en la base de datos Firestore y recuperar el id
    let ordersCollection = collection(db, "creditOrders");
    addDoc(ordersCollection, order).then((response) => setOrderId(response.id));

    // Actualizar la propiedad stock que se encuentra en la colección "products"
    cartProducts.forEach((product) => {
      updateDoc(doc(db, "products", product.id), {
        stock: product.stock - product.quantity,
      });
    });

    setLoaderModal(true);

    setTimeout(() => {
      setLoaderModal(false);
      setSuccessModal(true);
    }, 4000);
  };

  // Crear una función para limpiar el carrito, y volver a la parte superior del Home
  const navigate = useNavigate();

  const navigateToHome = () => {
    clearCart();
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <section className={styles.section}>
      <NavigateToTop />
      <div className={styles.container}>
        <GoBackButton />

        <h2 className={styles.title}>Pagar con tarjeta de crédito o débito</h2>

        {cartProducts.length === 0 ? (
          <p className={styles.message}>
            No tienes productos agregados. Si lo deseas, puedes volver a la
            tienda.
          </p>
        ) : (
          <>
            <h3 className={styles.subtitle}>Completa todos los campos</h3>

            <div className={styles.products}>
              <div className={styles.col1}>
                {/* Formulario */}
                <form onSubmit={handleSubmit} className={styles.form}>
                  {/* Campo Nombre */}
                  <div className={styles.containerInput}>
                    <label htmlFor="nombre">
                      Nombre del titular de la tarjeta
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* Campo Teléfono */}
                  <div className={styles.containerInput}>
                    <label htmlFor="phone">Teléfono</label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* Campo Correo electrónico */}
                  <div className={styles.containerInput}>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* Campo Número de tarjeta */}
                  <div className={styles.containerInput}>
                    <label htmlFor="cardNumber">
                      Número de tarjeta (Crédito o Débito)
                    </label>
                    <input
                      type="number"
                      id="cardNumber"
                      name="cardNumber"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* Campo Vencimiento de la tarjeta */}
                  <div className={styles.containerInput}>
                    <label htmlFor="cardExpirationDate">
                      Vencimiento de la tarjeta
                    </label>
                    <input
                      type="date"
                      id="cardExpirationDate"
                      name="cardExpirationDate"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* Campo CVC */}
                  <div className={styles.containerInput}>
                    <label htmlFor="cvc">Código de seguridad</label>
                    <input
                      type="number"
                      id="cvc"
                      name="cvc"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* Campo Domicilio de facturación */}
                  <div className={styles.containerInput}>
                    <label htmlFor="adress">Domicilio de facturación</label>
                    <input
                      type="text"
                      id="adress"
                      name="adress"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* Botón Pagar */}
                  <button type="submit" className={styles.payButton}>
                    Pagar
                  </button>
                </form>
              </div>
              {/* Detalle de compra */}
              <div className={styles.col2}>
                {cartProducts.map((cartProduct) => {
                  return (
                    <div
                      key={cartProduct.id}
                      className={styles.containerProduct}
                    >
                      <img src={cartProduct.image} alt={cartProduct.title} />
                      <h3>{cartProduct.title}</h3>
                      <p>
                        ${" "}
                        {(cartProduct.price * cartProduct.quantity).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
                <h4 className={styles.totalPrice}>
                  Precio Total: $ {totalPrice.toFixed(2)}
                </h4>
              </div>
            </div>
          </>
        )}

        {/* Si el estado loaderModal es true, mostrar el componente Loader  */}
        {loaderModal && <LoaderModal message="Procesando el pago" />}

        {/* Si el estado successModal es true, mostrar el componente successModal  */}
        {successModal && (
          <SuccessModal
            title="Pago realizado correctamente"
            message="Tu número de seguimiento es:"
            orderId={orderId}
            onConfirm={navigateToHome}
          />
        )}
      </div>
    </section>
  );
}
