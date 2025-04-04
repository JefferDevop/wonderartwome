import { Products } from "@/api";
import { useState } from "react";
import Link from "next/link";
import { useWhatsApp } from "@/hooks";
import { BASE_NAME } from "@/config/constants";

import map from "lodash/map";
import { CardImg } from "reactstrap";
import { BsWhatsapp } from "react-icons/bs";
import styles from "./Available.module.scss";
import { SizeColor } from "../SizeColor/SizeColor";

export function Available(props) {
  const { products } = props;
  const { generateWhatsAppLink, items, selectedItem, handleItemClick } =
    useWhatsApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [propductWhatsApp, setPropductWhatsApp] = useState("");
  const [propductAlternaWhatsApp, setPropductAlternaWhatsApp] = useState("");
  const [propductTC, setPropductTC] = useState([]);

  const productCtrl = new Products();

  // const uniqueProducts = products.filter(
  //   (product, index, self) =>
  //     index === self.findIndex((p) => p.item_id === product.item_id)
  // );

  const uniqueProducts = products.reduce((acc, product) => {
    // Buscar si el producto ya existe en el acumulador por item_id
    const existingProduct = acc.find((p) => p.item_id === product.item_id);

    // Garantizar que qty_available sea un número antes de sumar
    const qtyAvailable = Number(product.qty_available) || 0;

    if (existingProduct) {
      // Si ya existe, sumar qty_available
      existingProduct.qty_available += qtyAvailable;

      // Verificar si discount sigue siendo mayor que 0 para todos los productos
      if (product.discount <= 0) {
        existingProduct.offer = false; // Si algún producto no tiene descuento, no está en oferta
      }
    } else {
      // Si no existe, agregar el producto y garantizar que qty_available sea un número
      acc.push({
        ...product,
        qty_available: qtyAvailable,
        // Inicialmente se asume que está en oferta si tiene descuento
        offer: product.discount > 0,
      });
    }

    return acc;
  }, []);

  const format = (number) => {
    const roundedNumber = Math.round(number);
    return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addProductId = async (id) => {
    const newProducts = await productCtrl.getProductById(id);
    setPropductTC(newProducts);

    // setIdPropduct(id);
    toggleModal();
  };

  //----------------------------------------------

  const toggleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  const addProductToWhatsApp = (data) => {
    setPropductWhatsApp(data);
    toggleModal2();
  };

  const addProductAlternaToWhatsApp = (data) => {
    setPropductAlternaWhatsApp(data);
    toggleModal2();
  };

  const addDataToWhatsApp = () => {
    if (propductWhatsApp != "") {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        BASE_NAME + propductWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal2();
    } else {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        propductAlternaWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal2();
    }
  };

  return (
    <>
      <div className={styles.list__product}>
        {map(uniqueProducts, (product, index) => (
          <div key={index}>
            {product.qty_available > 1 ? (
              <div className={styles.image}>
                {product.offer && (
                  <div className={styles.offer}>
                    <h5>¡OFERTA!</h5>
                  </div>
                )}

                {product.images ? (
                  <Link href={`/${product.slug}`}>
                    <CardImg
                      alt="Card image cap"
                      src={BASE_NAME + product.images}
                    />
                  </Link>
                ) : (
                  <Link href={`/${product.slug}`}>
                    <CardImg alt="Card image cap" src={product.image_alterna} />
                  </Link>
                )}
                <h5>{product.name}</h5>
                <h6> $ {format(parseInt(product.price))}</h6>
              </div>
            ) : (
              <div className={styles.soldout}>
                <div className={styles.offer}>
                  <h5>AGOTADO</h5>
                </div>
                {product.images ? (
                  <CardImg
                    alt="Card image cap"
                    src={BASE_NAME + product.images}
                  />
                ) : (
                  <CardImg alt="Card image cap" src={product.image_alterna} />
                )}
                <h5>{product.name}</h5>
              </div>
            )}
            {/* <Button
              color="primary"
              onClick={() => addProductId(product.item_id)}  
            >
              Agregar al Carrito
            </Button> */}
          </div>
        ))}

        {/* <Modal centered isOpen={isOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            Seleccione Talla y Color
          </ModalHeader>
          <ModalBody>
            <SizeColor propductTC={propductTC} toggle={toggleModal} />
          </ModalBody>
        </Modal>

        <Modal centered isOpen={isOpen2} toggle={toggleModal2}>
          <ModalHeader toggle={toggleModal2}>Seleccione una Línea</ModalHeader>

          <ModalBody>
            <FormGroup>
              {items.map((item, index) => (
                <Button
                  size="sm"
                  key={index}
                  color="success"
                  outline
                  className={index === selectedItem ? "selected" : ""}
                  onClick={() => handleItemClick(item)}
                >
                  <BsWhatsapp size={20} /> Linea {index + 1}
                </Button>
              ))}
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button siz="sm" outline color="secondary" onClick={toggleModal2}>
              Cancelar
            </Button>
            <Button size="sm" color="success" onClick={addDataToWhatsApp}>
              Aceptar
            </Button>{" "}
          </ModalFooter>
        </Modal> */}
      </div>
    </>
  );
}
