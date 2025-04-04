import React, { useEffect, useState } from "react";
import { Categories } from "@/api/category";
import { Products } from "@/api/products";
import { SlidersApi } from "@/api/sliders";
import { ListCategories, Footer, Promotion, Exclusive, Separator, Sliders } from "@/components";

import { BasicLayout } from "../../layouts";

const categoriesCtrl = new Categories();
const productsCtrl = new Products();
const slidersCtrl = new SlidersApi();


export default function HomePage() {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoriesCtrl.getAll();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await videosCtrl.getAll();
  //       setVideos(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);


  useEffect(() => {
    (async () => {
      try {
        const response = await productsCtrl.getProducts();
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      try {
        const response = await slidersCtrl.getAll();
        setSliders(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  


  if (categories !== null) {
    return (
      <>
        <BasicLayout>
         <Separator />

         <Sliders gallery={sliders} /> 

          <ListCategories categories={categories} />

          {/* <ListVideos videos={videos} /> */}

          <Promotion products={products} />
        
          <Exclusive products={products} />

          {/* <FooterApp />*/}
          <Footer /> 
        </BasicLayout>
      </>
    );
  } else {
    return (
      <>
        <BasicLayout>
         <p>Cargando...</p>        
        </BasicLayout>
      </>
    );
  }
}
