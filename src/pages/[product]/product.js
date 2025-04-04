import { BasicLayout } from "@/layouts";
import { DetailProduct, FooterApp, Redes, Separator } from "@/components";
import { Footer } from "@/components";

export default function ProductPage(props) {
  const { product, inventory, relate } = props;
  const titel1='Volver'
  const titel2='Inicio'
  const link1='/'


  return (
    <div>
      
      <FooterApp title1={titel1} title2={titel2} link1={link1} />  
      <DetailProduct product={product} relate={relate} productInventory={inventory} />
     
    </div>
  );
}
