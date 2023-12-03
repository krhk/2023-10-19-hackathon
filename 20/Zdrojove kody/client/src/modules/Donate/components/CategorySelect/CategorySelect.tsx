import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { category } from "../../types";
import styles from "./CategorySelect.module.css";
import { subCategoriesMock } from "./constants";

interface Props {
  categories: category[];
}

const CategorySelect = (props: Props) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.heading}>Výběr subjektu</h3>
      </div>
      <div className={styles.categoriesContainer}>
        <div className={styles.categorySidebar}>
          {props.categories.map((category: category) => {
            return (
              <div
                onClick={() => {
                  setSelected(true);
                  setCategoryName(category.name);
                }}
                className={styles.categoryItem}
              >
                <div className={styles.categoryItemWrapper}>
                  <Checkbox colorScheme="red" defaultChecked></Checkbox>
                  <p>{category.name}</p>
                </div>
                <img src="./assets/FiChevronRight.svg" role="none" alt="" />
              </div>
            );
          })}
        </div>
        <div className={styles.categoryPreview}>
          <p className={styles.blueParagraph}>
            {categoryName ?? "category.name"}
          </p>
          {selected && (
            <table border={1}>
              <thead>
                <tr className={styles.tableRow}>
                  <th></th>
                  <th className={styles.tableHeading}>Name</th>
                  <th className={styles.tableHeading}>Description</th>
                  <th className={styles.tableHeading}>Action</th>
                </tr>
              </thead>
              <tbody>
                {subCategoriesMock.map((subCategory, index) => {
                  return (
                    <tr key={index} className={styles.tableRow}>
                      <td className={styles.tableData}>
                        <Checkbox colorScheme="red" defaultChecked></Checkbox>
                      </td>
                      <td className={styles.rowHeading}>
                        {subCategory.heading}
                      </td>
                      <td>{subCategory.description}</td>
                      <td>
                        <button className={styles.detailButton}>
                          detail...
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelect;
