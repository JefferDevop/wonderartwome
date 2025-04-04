import { useCart } from "@/hooks/useCart";
import { Button, CardImg } from "reactstrap";
import { map } from "lodash";
import { BASE_NAME } from "@/config/constants";

import { BsTrash3 } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

import styles from "./ListCart.module.scss";

export function ListCart(props) {
  const { product } = props;
  const { decreaseCart, incrementCart, deleteCart } = useCart();

  const format = (number) => {
    const integerPart = Math.floor(number);
    return integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Calcular el subtotal del carrito
  const subtotal = product.reduce(
    (acc, item) => acc + item[0].price * item.quantity,
    0
  );

  const descuento = product.reduce(
    (acc, item) => acc + item[0].discount * item.quantity,
    0
  );

  return (
    <div className={styles.list}>
      <h4>CARRITO</h4>

      {map(product, (item) => (
        <div key={item[0].codigo} className={styles.card}>
          <div className={styles.body}>
            <div className={styles.body__content}>
              <BsTrash3
                size="20"
                color="gray"
                onClick={() => deleteCart(item[0].codigo)}
              />

              {item[0].images ? (
                <CardImg
                  alt="Card image cap"
                  src={BASE_NAME + item[0].images}
                  className={styles.skeleton}
                />
              ) : (
                <CardImg
                  alt="Card image cap"
                  src={item[0].image_alterna}
                  className={styles.skeleton}
                />
              )}

              <frames className={styles.sizecolor}>
                <p>
                  Talla <label>{item[0].talla}</label>
                </p>
                <p>
                  Color <label>{item[0].color}</label>
                </p>
              </frames>

              <frames className={styles.price}>
                <p className={styles.unid}>
                  Unidad: $ {format(item[0].price)}{" "}
                </p>
                <p className={styles.unid}>
                  SubTotal: $ {format(item[0].price * item.quantity)}
                </p>
                {item[0].discount > 0 && (
                  <p className={styles.unid}>
                    Descuento:{" "}
                    <u>$ {format(item[0].discount * item.quantity)}</u>{" "}
                  </p>
                )}

                <p className={styles.total}>
                  Total: ${" "}
                  {format((item[0].price - item[0].discount) * item.quantity)}
                </p>
              </frames>

              <frames className={styles.button}>
                <AiOutlineMinusCircle
                  onClick={() => decreaseCart(item[0].codigo)}
                  size={20}
                />
                <p>{item.quantity}</p>
                <AiFillPlusCircle
                  onClick={() => incrementCart(item[0].codigo)}
                  size={20}
                />
              </frames>
            </div>
          </div>

          <div className={styles.foot}>
            <p className={styles.name}>{item[0].name}</p>
          </div>
        </div>
      ))}

      <div className={styles.totales}>
        <p>SUBTOTAL: $ {format(subtotal)}</p>
        {descuento > 0 && (
          <label>
            <p>
              {" "}
              DESCUENTO:<u> $ {format(descuento)}</u>
            </p>
            <p>TOTAL: $ {format(subtotal - descuento)}</p>
          </label>
        )}
      </div>

      <div className={styles.footButton}>
        <Button block>Finalizar Compra</Button>

        <Button outline block>
          Seguir comprando
        </Button>
      </div>
    </div>
  );
}
