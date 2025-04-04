import React, { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { size, map } from "lodash";
import { Categories } from "@/api";
// import { u }
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import {
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import Link from "next/link";

import styles from "./TopBar.module.scss";
import { Redes } from "@/components/Redes";

const categoriesCtrl = new Categories();

export function TopBar() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { total } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await categoriesCtrl.getAll();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function handleClickAdmin() {
    router.push(
      "https://wonderarthome.workhard.site/admin-dashboard/"
    );
  }

  return (
    <div className={styles.topbar}>
      <div className={styles.topbar_component}>
        <div className={styles.right}>
          <div onClick={() => toggleModal()}>
            <BiMenu size={30} color="#8f7221" />
          </div>
          
        </div>

        <Link href="/">
          <CardImg src="/image/header2.png" alt="No hay logo" />{" "}
        </Link>

        <div className={styles.right}>
          <div onClick={() => router.push("/featured")}>
            <BsSearch size={25} color="#8f7221" />
          </div>

          <div className={styles.cart} onClick={() => router.push("/cart")}>
            <p> {total > 0 ? total : ""}</p>
            <AiOutlineShoppingCart size={25} color="#8f7221" />
          </div>
        </div>
      </div>

      <Redes />

      <div className={styles.topbar_category}>
        <p>
          <Link href="\"> Inicio </Link>
        </p>

        {map(categories, (category) => (
          <p key={category.id}>
            <Link href={`/products/${category.slug}`}> {category.name} </Link>
          </p>
        ))}
      </div>

      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Selección</ModalHeader>

        <ModalBody>
          <FormGroup>
            <p onClick={() => handleClickAdmin()}>Admin</p>

            {/* <Link href="/">
              <p>Ir a...</p>
            </Link>
            <Link href="/">
              <p>Ir a...</p>
            </Link>
            <Link href="/">
              <p>Ir a...</p>
            </Link> */}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={toggleModal}></Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
