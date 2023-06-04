import { FC, forwardRef, useEffect, useMemo, useRef, useState } from "react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  IconButton,
  Modal,
  Paper,
  Rating,
  Slide,
  Typography
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import { getProducts } from "../../api/product";
import { ProductResponse } from "../../api/product/types";
import { uploadReview } from "../../api/review";
import { Role } from "../../api/roles/types";
import { useBasketContext } from "../../contexts/basket-context";
import { useUserContext } from "../../contexts/user-context";
import { useIsMobile } from "../../hooks/isMbile";
import { calculateAverageRating } from "../../utils/rating";
import { EditProductPopup } from "../edit-product-popup";
import { PriceWithSale } from "../price-with-sale";
import { ProductInfo } from "../product-info";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  maxHeight: "90vh",
  overflow: "auto",
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type ProductListProps = {};

const EDIT_ROLES: Role[] = ["Admin", "Manager"];

export const ProductList: FC<ProductListProps> = ({}) => {
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const productToDialogRef = useRef<ProductResponse | null>(null);
  const [open, setOpen] = useState(false);
  const productIdRef = useRef<number | null>(null);
  const { user } = useUserContext();
  const { addToBasket } = useBasketContext();

  const hasEdit = useMemo(() => {
    if (!user) return false;

    const result = user.roles.some((r) => EDIT_ROLES.includes(r.value));

    return result;
  }, [user]);

  const handleOpen = (id: number) => {
    productIdRef.current = id;
    setOpen(true);
  };
  const handleClose = () => {
    productIdRef.current = null;
    setOpen(false);
  };

  const handleOpenDialog = (dialogProduct: ProductResponse) => {
    productToDialogRef.current = dialogProduct;
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    productToDialogRef.current = null;
    setOpenDialog(false);
  };

  const handleSubmit = (product: ProductResponse) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  };

  const handleUploadReview = async (productId: number, rating: number) => {
    if (!user?.id) return;

    await uploadReview({
      productId,
      rating,
      userId: user.id,
    });
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getProducts();
      setProducts(res.data);
    };
    fetch();
  }, []);

  return (
    <Box
      sx={{
        padding: isMobile ? "8px" : "16px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, 345px)",
        gap: isMobile ? "8px" : "16px",
        placeItems: "center",
        justifyContent: "center",
      }}
    >
      {products.map((product) => (
        <Card
          sx={{
            maxWidth: isMobile ? 150 : 345,
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          key={product.id}
        >
          {hasEdit && (
            <IconButton
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
              size="small"
              color="secondary"
              onClick={() => handleOpen(product.id)}
            >
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
            }}
            color="primary"
            size="small"
            onClick={() => handleOpenDialog(product)}
          >
            <InfoIcon />
          </IconButton>
          <CardMedia
            component="img"
            height={isMobile ? "100" : "140"}
            image={`${process.env.REACT_APP_DEVELOPMENT_HOST}/${product.image?.src}`}
          />
          <CardContent
            sx={{
              padding: isMobile ? "8px" : "16px",
              paddingBottom: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              height: "inherit",
            }}
          >
            <Typography
              gutterBottom
              variant={isMobile ? "caption" : "h5"}
              component="div"
              align="center"
            >
              {product.type.name} {product.name} ({product.weight}{" "}
              {product.weightType})
            </Typography>

            {!isMobile && (
              <Typography
                align="center"
                variant="body2"
                color="text.secondary"
                sx={{
                  width: "100%",
                  display: "-webkit-inline-box",
                  height: "min-content",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.description}
              </Typography>
            )}
            <PriceWithSale price={product.price} sale={product.sale} />
            <Rating
              disabled={!user}
              defaultValue={calculateAverageRating(product.reviews)}
              precision={0.5}
              onChange={(_e, v) => {
                handleUploadReview(product.id, Number(v));
              }}
            />
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "auto",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              size="small"
              onClick={() => {
                addToBasket(product);
              }}
              disabled={product.availableQuantity === 0}
            >
              {isMobile ? (
                <AddShoppingCartIcon fontSize="small" />
              ) : (
                "Додати до кошика"
              )}
            </Button>
          </CardActions>
        </Card>
      ))}
      <Modal open={open} onClose={handleClose}>
        <Paper sx={style}>
          <EditProductPopup
            onSubmit={handleSubmit}
            productId={productIdRef.current}
          />
        </Paper>
      </Modal>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <ProductInfo product={productToDialogRef.current} />
      </Dialog>
    </Box>
  );
};
