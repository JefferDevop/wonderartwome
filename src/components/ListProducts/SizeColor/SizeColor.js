import React, { useState, useEffect } from "react";
import map from "lodash/map";
import { Input, Button } from "reactstrap";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

import styles from "./SizeColor.module.scss";

export function SizeColor({ propductTC, getOffer, toggle }) {
  const { addCart, incrementCart, decreaseCart, deleteCart } = useCart();
  const [idProduct, setIdPropduct] = useState();
  const [productDetail, setProductDetail] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const format = (number) => {
    const roundedNumber = Math.round(number);
    return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const tallas = [...new Set(propductTC.map((item) => item.talla))];
  const colores = [...new Set(propductTC.map((item) => item.color))];

  const availableColors = selectedTalla
    ? [
        ...new Set(
          propductTC
            .filter((item) => item.talla === selectedTalla)
            .map((item) => item.color)
        ),
      ]
    : colores;

  const availableTallas = selectedColor
    ? [
        ...new Set(
          propductTC
            .filter((item) => item.color === selectedColor)
            .map((item) => item.talla)
        ),
      ]
    : tallas;

  const handleTallaClick = (talla) => {
    if (selectedTalla === talla) {
      setSelectedTalla(null);
    } else {
      setSelectedTalla(talla);
    }

    if (selectedColor && !availableColors.includes(selectedColor)) {
      setSelectedColor(null);
    }
  };

  // Manejador de selección de color
  const handleColorClick = (color) => {
    if (selectedColor === color) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }

    if (selectedTalla && !availableTallas.includes(selectedTalla)) {
      setSelectedTalla(null);
    }
  };

  const getCodigoProducto = (talla, color) => {
    const productoCoincidente = propductTC.find(
      (item) => item.talla === talla && item.color === color
    );
    return productoCoincidente ? productoCoincidente.codigo : null;
  };

  const addData = () => {
    const item = getCodigoProducto(selectedTalla, selectedColor);
    addCart(item, quantity);
    toast.success("¡Se agrego con exito!");
  };

  const incrementQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getPrecioProducto = (talla, color) => {
    const productoCoincidente = propductTC.find(
      (item) => item.talla === talla && item.color === color
    );
    return productoCoincidente ? productoCoincidente : null;
  };


  useEffect(() => {
    if (selectedTalla && selectedColor) {
      const product = getPrecioProducto(selectedTalla, selectedColor);
      getOffer(product);
      setProductDetail(product);
    } else if (propductTC.length > 0) {
      // Seleccionar el primer producto de la lista si no hay selección
      const defaultProduct = propductTC[0];
      getOffer(defaultProduct);
      setProductDetail(defaultProduct);
    } else {
      setProductDetail(0);
    }
  }, [selectedTalla, selectedColor, propductTC]);

  return (
    <div className={styles.sizeColor}>
      {productDetail.discount > 0 ? (
        <div className={styles.price}>
          <h5> $ {format(productDetail.price - productDetail.discount)}</h5>
          <h6> $ {format(productDetail.price)}</h6>
        </div>
      ) : productDetail.price ? (
        <div className={styles.price}>
          <h5> $ {format(productDetail.price)}</h5>
        </div>
      ) : (
        <div className={styles.price}>
          <h5> $ ...</h5>
        </div>
      )}

      <div className={styles.sizeColor__container}>
        <h5>Talla</h5>
        {tallas.map((talla) => (
          <Button
            size="sm"
            key={talla}
            onClick={() => handleTallaClick(talla)}
            disabled={!availableTallas.includes(talla)}
            className={`${styles.button} 
            ${selectedTalla === talla ? styles.selected : styles.active}
            ${!availableTallas.includes(talla) ? styles.inactive : ""}`}
          >
            {talla}
          </Button>
        ))}

        <h5>Color</h5>
        {colores.map((color) => (
          <Button
            size="sm"
            key={color}
            onClick={() => handleColorClick(color)}
            disabled={!availableColors.includes(color)}
            className={`${styles.button} ${
              selectedColor === color ? styles.selected : styles.active
            } ${!availableColors.includes(color) ? styles.inactive : ""}`}
          >
            {color}
          </Button>
        ))}

        <div className={styles.quantity}>
          <h5>Cantidad</h5>

          <frames>
            <AiOutlineMinusCircle onClick={decrementQuantity} size={25} />
            <p>{quantity}</p>
            <AiFillPlusCircle onClick={incrementQuantity} size={25} />
          </frames>
        </div>
        {productDetail.discount > 0 && <p>Prendas en promoción no tienen cambio</p>}

        <div>
          <Button
            size="lg"
            block
            onClick={addData}
            disabled={!selectedTalla || !selectedColor}
          >
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
