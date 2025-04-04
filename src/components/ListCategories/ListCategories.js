import { CardImg, CardTitle } from "reactstrap";
import { map } from "lodash";
import { BASE_NAME } from "@/config/constants";
import Link from "next/link";

import styles from "./ListCategories.module.scss";

export function ListCategories(props) {
  const { categories } = props;
  const scale = "c_scale,f_auto/";
  const upload = "image/upload/";

  return (
    <div className={styles.content}>
      <label>CATEGORÍAS</label>
      <div className={styles.list}>
        {map(categories, (category) => (
          <div key={category.id} className={styles.card}>
            {category.image ? (
              <Link href={`/products/${category.slug}`}>
                <CardImg
                  alt="Card image cap"
                  src={
                    BASE_NAME + upload + scale + category.image.split(upload)[1]
                  }                 
                />                          
                    <h6>{category.name}</h6>                            
              </Link>
            ) : (
              <Link href={`/products/${category.slug}`}>
                <CardImg alt="Card image cap" src={category.image_alterna} />             
                    <h2>{category.name}</h2>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
