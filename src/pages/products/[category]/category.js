import { size } from "lodash";
import { Listproducts, Footer, NotFound, Separator } from "@/components";

import { BasicLayout } from "@/layouts";

export default function Category(props) {
  const { products, category } = props;
  const hasProduct = size(products) > 0;

  return (
    <BasicLayout>
      <Separator />
      
      <br></br>
      {hasProduct ? (
        <Listproducts products={products} title={category.name} />
      ) : (
        <NotFound
          title={"Upppss... No hay productos para mostrar en esta categoría"}
        />
      )}

      <Footer />
    </BasicLayout>
  );
}
