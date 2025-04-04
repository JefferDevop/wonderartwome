import {
  Footer,
  FooterApp,
  SearchTable,
  NotFound,
  Redes,
} from "@/components";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import React from "react";

export default function FeaturedPage(props) {
  const { products } = props;
  const hasProduct = size(products) > 0;

  return (
    <>   
        {hasProduct ? (
          <SearchTable products={products} />
        ) : (
          <NotFound
            title={"No se encontraron productos"}
          />
        )}
     
    </>
  );
}
