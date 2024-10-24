import styles from "./Counter.module.css";

export default function Counter({
  count,
  increment,
  decrement,
  stock,
  onAdd,
  totalQuantity,
  productTitle,
}) {
  return (
    <div>
      <div className={styles.containerButtons}>
        <button
          className={styles.counterButton}
          onClick={decrement}
          aria-label={`Disminuir la cantidad del producto. Tienes ${count}. Las unidades disponibles de este producto son: ${stock}.`}
        >
          -
        </button>
        <span className={styles.number}>{count}</span>
        <button
          className={styles.counterButton}
          onClick={increment}
          aria-label={`Aumentar la cantidad del producto. Tienes ${count}. Las unidades disponibles de este producto son: ${stock}.`}
        >
          +
        </button>
      </div>

      {/* Cuando no hay ningún producto agregado, la variable totalQuantity llega como "undefined", por lo tanto muestra el mensaje de unidades disponibles */}
      {typeof totalQuantity === "undefined" && (
        <p className={styles.availableStock}>Unidades Disponibles: {stock}</p>
      )}

      {/* Si la variable totalQuantity es igual a 1, mostrar el siguiente mensaje */}
      {totalQuantity === 1 && (
        <>
          <p className={styles.availableStock}>Unidades Disponibles: {stock}</p>
          <p className={styles.addedStock}>
            Agregaste 1 unidad. Revisa el carrito.
          </p>
        </>
      )}

      {/* Si la variable totalQuantity es mayor a 1, y menor al stock, mostrar el siguiente mensaje */}
      {totalQuantity > 1 && totalQuantity < stock && (
        <>
          <p className={styles.availableStock}>Unidades Disponibles: {stock}</p>
          <p className={styles.addedStock}>
            Agregaste {totalQuantity} unidades. Revisa el carrito.
          </p>
        </>
      )}

      {/* Si la variable totalQuantity es igual al stock disponible, mostrar el siguiente mensaje */}
      {totalQuantity === stock && (
        <p className={styles.maximumStock}>
          Agregaste la máxima cantidad de unidades disponibles. Revisa el
          carrito.
        </p>
      )}

      {/* Si el stock es mayor 0, mostrar el botón de "Agregar al carrito". De lo contrario mostrar un mensaje. */}
      {stock > 0 ? (
        <button
          className={styles.addToCartButton}
          onClick={() => onAdd(count)}
          aria-label={`Agregar al carrito el producto ${productTitle}. Cantidad: ${count}.`}
        >
          Agregar al carrito
        </button>
      ) : (
        <p className={styles.outOfStock}>
          Lo sentimos, por el momento no tenemos stock de este producto. Pronto
          repondremos más unidades.
        </p>
      )}
    </div>
  );
}
