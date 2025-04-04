import React, { useEffect, useState } from "react";
import { useCart, useAuth } from "@/hooks";
import { Products, Address } from "@/api";

import {
  Separator,
  NotFound,
  Footer,
  ListPayment,
  FooterApp,
} from "@/components";
import { BasicLayout } from "@/layouts";
import { size } from "lodash";

const productCtrl = new Products();
const addressCtrl = new Address();

export default function PaymentPage() {
  const { user, accesToken } = useAuth();
  const { cart } = useCart();
  const [product, setProduct] = useState("");
  const [address, setAddress] = useState("");
  const [change, setChange] = useState(false);
  const [load, setLoad] = useState(true);
  const hasProduct = size(product) > 0;

  if (!user) {
    window.location.replace("/join/login");
    return null;
  }  


  const addChange = () => {
    setChange(!change);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          const response = await productCtrl.getProductByCode(item.id);
          data.push({ ...response, quantity: item.quantity });
        }
        setProduct(data);
        setLoad(false);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    })();
  }, [cart]);

  useEffect(() => {
    (async () => {
      try {
         const response = await addressCtrl.getAddress(accesToken, user.id);

         setAddress(response);
         setLoad(false);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    })();
  }, [change]);


  // useEffect(() => {
  //   (async () => {
  //     try {
  //        const response = await addressCtrl.getAddress(accesToken, user.id);

  //        setAddress(response);
  //        setLoad(false);
  //     } catch (error) {
  //       console.error(`Error: ${error}`);
  //     }
  //   })();
  // }, []);





  return (
    <BasicLayout>
      <Separator />
      {load ? (
        <h1>Cargando ...</h1>
      ) : (
        <>
          {hasProduct ? (
            <>
              <ListPayment addChange={addChange} product={product} address={address} payMethod={'payMethod'} />
          
              <Footer />
            </>
          ) : (
            <NotFound
              title={"Uppss... en este momento no hay productos para pagar"}
            />
          )}
        </>
      )}
    </BasicLayout>
  );
}
