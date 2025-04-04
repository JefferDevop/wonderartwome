import React, { useState } from "react";
import { Payment } from "@/api";
import { useCart, useAuth } from "@/hooks";
import { map } from "lodash";
import { Button, CardImg, Modal, ModalBody, ModalHeader } from "reactstrap";
import { ModalBasic } from "../Common";
import { AddAddress } from "../Address";

// import { CheckoutForm } from "../CheckoutForm";

import { BASE_NAME } from "@/config/constants";

import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

import styles from "./ListPayment.module.scss";

const paymentCtrl = new Payment();

export function ListPayment(props) {
  const { accesToken } = useAuth();
  const { addChange, product, address, payMethod } = props;
  const { decreaseCart, incrementCart, deleteCart } = useCart();
  const [show, setShow] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(
    Array.isArray(address) && address.length > 0 ? address[0] : null
  );

  const payment = async (product, idAddress) => {
    try {
      const storedInitPoint = localStorage.getItem("init_point");

      if (storedInitPoint) {
        window.location.href = storedInitPoint;
        return;
      }

      const response = await paymentCtrl.createPayload(
        product,
        idAddress,
        accesToken
      );

      if (response && response.init_point) {
        localStorage.setItem("init_point", response.init_point);

        window.location.href = response.init_point;
      } else {
        console.error("No se recibió una URL válida en la respuesta");
      }
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
    }
  };

  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Cambia 'es-ES' por tu configuración regional
  };

  // Calcular el subtotal del carrito
  const subtotal = product.reduce(
    (acc, item) => acc + item[0].price * item.quantity,
    0
  );

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const onClose = () => setShow(!show);

  const toggleModal2 = () => {
    addChange();
    setModalOpen2(!isModalOpen2);
  };

  const selectecAddress = (address) => {
    setSelectedAddress(address);
    setModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.list}>
      <div className={styles.totales}>
        <h2>Resumen de Compra</h2>
        <p>Subtotal: $ {format(subtotal)}</p>
        <p>Envío y manejo:$ 15.000</p>
        {/* <p>Descuento: $ 0</p> */}
        <p>Total a Pagar: $ {format(subtotal + 15000)}</p>
      </div>

      <div className={styles.totales}>
        <h2>Dirección de envío</h2>

        {selectedAddress ? (
          <>
            <p>Título: {selectedAddress.title}</p>
            <p>Nombre: {selectedAddress.name_lastname}</p>
            <p>Dirección: {selectedAddress.address}</p>
            <p>Ciudad: {selectedAddress.city}</p>
            <p>Teléfono: {selectedAddress.phone}</p>
          </>
        ) : (
          <ModalBasic onClose={onClose} show={show} title="Dirección de envio">
            <AddAddress />
            {/* <Button onClick={() => toggleModal()}>Cerrar</Button> */}
          </ModalBasic>
        )}
        <Button outline onClick={() => toggleModal()}>
          Cambiar Dirección de envio
        </Button>

        <div className={styles.foot}>
          <Button
            block
            color="primary"
            onClick={() => payment(product, selectedAddress?.id)}
            disabled={!selectedAddress} // Deshabilita si no hay selectedAddress
          >
            Pagar
          </Button>

          <Button
            block
            outline
            onClick={() => window.location.replace("/payment")}
          >
            Continuar Comprando
          </Button>
        </div>
      </div>

      {/* <div className={styles.totales}>
        <h2>Método de pago</h2>
        {selectedAddress ? (
          <>
            <p>Método: {selectedAddress.title}</p>
            <p>Valor: {selectedAddress.name_lastname}</p>           
          </>
        ) : (
          <p>Dirección no disponible</p>
        )}       
        <Button outline onClick={() => toggleModal()}>Cambiar</Button>
      </div> */}

      <hr></hr>
      <div className={styles.detalle}>
        <h5>Detalle de la Compra</h5>
        {map(product, (item) => (
          <div key={item[0].codigo} className={styles.card}>
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

            <div className={styles.detalle}>
              <label className={styles.name}>{item[0].name}</label>
              <p className={styles.price}>
                $ {format(item[0].price * item.quantity)}{" "}
              </p>

              <label>
                <div className={styles.btn}>
                  <AiOutlineMinusCircle
                    onClick={() => decreaseCart(item[0].codigo)}
                    size={30}
                  />
                  <h5>{item.quantity}</h5>
                  <AiFillPlusCircle
                    onClick={() => incrementCart(item[0].codigo)}
                    size={30}
                  />
                </div>
              </label>
            </div>
            <hr></hr>
          </div>
        ))}

        <Button block onClick={() => payment("Payment")}>
          Finalizar Compra
        </Button>

        <Button
          block
          color="primary"
          onClick={() => window.location.replace("/")}
        >
          Comprar más
        </Button>
      </div>

      <Modal centered isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Seleccione una Dirección</ModalHeader>

        <ModalBody>
          <div className={styles.modalContent}>
            <ul>
              {address &&
                address.map((addres, index) => (
                  <div key={index}>
                    <li onClick={() => selectecAddress(addres)}>
                      <h6>{addres.title}</h6>
                      <p>
                        NOMBRE: <label>{addres.name_lastname}</label>
                      </p>
                      <p>
                        DIRECCIÓN: <label>{addres.address}</label>
                      </p>
                      <p>
                        CIUDAD: <label>{addres.city}</label>
                      </p>
                      <p>
                        TELÉFONO: <label>{addres.phone}</label>
                      </p>

                      <hr></hr>
                    </li>
                  </div>
                ))}
            </ul>
            <Button block onClick={toggleModal2}>
              Nueva Dirección
            </Button>
            <Button block outline onClick={toggleModal}>
              Salir
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <Modal centered isOpen={isModalOpen2} toggle={toggleModal2}>
        <ModalHeader toggle={toggleModal2}>Nueva Dirección</ModalHeader>
        <AddAddress toggleModal2={toggleModal2} />
        <ModalBody></ModalBody>
      </Modal>
    </div>
  );
}
