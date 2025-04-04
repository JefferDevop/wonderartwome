import Ract, {useState} from "react";
import { map } from "lodash";
import styles from "./ListProduts.module.scss";
import { Available } from "./Available";
import { SoldOut } from "./SoldOut";
import { Stokend } from "./Stokend";

export function Listproducts(props) {
  const { products, title } = props;
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);


  const tallas = [...new Set(products.map(item => item.talla))];
  const colores = [...new Set(products.map(item => item.color))];

  // Filtrar los colores disponibles según la talla seleccionada
  const availableColors = selectedTalla
    ? [...new Set(products.filter(item => item.talla === selectedTalla).map(item => item.color))]
    : colores;

  // Filtrar las tallas disponibles según el color seleccionado
  const availableTallas = selectedColor
    ? [...new Set(products.filter(item => item.color === selectedColor).map(item => item.talla))]
    : tallas;

  const handleTallaClick = (talla) => {
    setSelectedTalla(talla);
    setSelectedColor(null); // Reiniciar el color cuando se selecciona una nueva talla
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setSelectedTalla(null); // Reiniciar la talla cuando se selecciona un nuevo color
  };


  return (
    <div className={styles.listProduct}>  
     
      <div className={styles.product}>                   
                  <Available products={products} />      
      </div>
    </div>
  );
}
