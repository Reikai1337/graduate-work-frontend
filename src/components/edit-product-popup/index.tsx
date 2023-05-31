import { FC, useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";

import { getProduct } from "../../api/product";
import { ProductResponse } from "../../api/product/types";
import { EditProductForm } from "../edit-product-form";

function convertImageSrcToFile(src: string, fileName: string) {
  return fetch(`${process.env.REACT_APP_DEVELOPMENT_HOST}/${src}`)
    .then((response) => response.blob())
    .then((blob) => new File([blob], fileName, { type: blob.type }));
}

export type EditProductPopupProps = {
  productId: number | null;
  onSubmit: (product: ProductResponse) => void;
};

export const EditProductPopup: FC<EditProductPopupProps> = ({
  productId,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<
    (ProductResponse & { imageFile: File }) | null
  >(null);

  useEffect(() => {
    if (!productId) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getProduct(productId);
        const imageSrc = res.data.image?.src || "";
        setProduct({
          ...res.data,
          imageFile: await convertImageSrcToFile(imageSrc, imageSrc),
        });
      } catch (error) {}
      setLoading(false);
    };

    fetch();
  }, [productId]);

  if (loading || !product) return <CircularProgress />;

  return (
    <EditProductForm
      onSubmit={onSubmit}
      imageFile={product.imageFile}
      product={product}
    />
  );
};
