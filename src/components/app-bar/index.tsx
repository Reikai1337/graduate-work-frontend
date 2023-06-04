import { FC, MouseEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/ShoppingBasket";
import YardIcon from "@mui/icons-material/Yard";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";

import { useBasketContext } from "../../contexts/basket-context";
import { useUserContext } from "../../contexts/user-context";
import { useIsMobile } from "../../hooks/isMbile";
import {
  ADMIN_PAGE_ROUTE,
  CONTRACTS_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  lOGIN_PAGE_ROUTE,
  MANAGEMENT_PAGE_ROUTE,
  OFFER_PAGE_ROUTE,
  PRODUCT_PAGE_ROUTE,
  SHOPPING_PAGE_ROUTE
} from "../../routes/dictionary";

export type HeaderProps = {};

const settings = ["Кошик", "Вийти"];

export const Header: FC<HeaderProps> = ({}) => {
  const isMobile = useIsMobile();
  const { user, setUserData } = useUserContext();
  const { clearBasket } = useBasketContext();
  const navigate = useNavigate();

  const { pages } = useMemo(() => {
    const pages = ["Продукція"];

    if (!user) return { pages };

    if (user.roles.find((r) => r.value === "Manager")) pages.push("Управління");
    if (user.roles.find((r) => r.value === "User")) {
      pages.push("Запропонувати сировину");
      pages.push("Контракти");
    }
    if (user.roles.find((r) => r.value === "Admin")) {
      pages.push("Адміністрування");
      pages.push("Управління");
    }

    return { pages };
  }, [user]);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e: any) => {
    switch (e.target.innerText) {
      case "Продукція":
        navigate(PRODUCT_PAGE_ROUTE);
        break;
      case "ПРОДУКЦІЯ":
        navigate(PRODUCT_PAGE_ROUTE);
        break;

      case "Управління":
        navigate(MANAGEMENT_PAGE_ROUTE);
        break;
      case "УПРАВЛІННЯ":
        navigate(MANAGEMENT_PAGE_ROUTE);
        break;
      case "Адміністрування":
        navigate(ADMIN_PAGE_ROUTE);
        break;

      case "АДМІНІСТРУВАННЯ":
        navigate(ADMIN_PAGE_ROUTE);
        break;

      case "Запропонувати сировину":
        navigate(OFFER_PAGE_ROUTE);
        break;

      case "ЗАПРОПОНУВАТИ СИРОВИНУ":
        navigate(OFFER_PAGE_ROUTE);
        break;

      case "КОНТРАКТИ":
        navigate(CONTRACTS_PAGE_ROUTE);
        break;

      case "Контракти":
        navigate(CONTRACTS_PAGE_ROUTE);
        break;

      default:
        break;
    }

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e: any) => {
    switch (e.target.innerHTML) {
      case "Вийти":
        navigate(lOGIN_PAGE_ROUTE);
        setUserData(undefined);
        clearBasket();
        break;
      case "Кошик":
        navigate(SHOPPING_PAGE_ROUTE);
        break;

      default:
        break;
    }

    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <YardIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            onClick={() => {
              navigate(HOME_PAGE_ROUTE);
            }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Пирятин
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <YardIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            onClick={() => {
              navigate(HOME_PAGE_ROUTE);
            }}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Пирятин
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {user ? (
            <>
              <Stack
                sx={{ flexGrow: 0 }}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                {!isMobile && (
                  <Typography>
                    {user.name} {user.lastName}
                  </Typography>
                )}
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <ListItemIcon>
                        {setting === "Вийти" ? (
                          <LoginIcon fontSize="small" />
                        ) : (
                          <AddShoppingCartIcon fontSize="small" />
                        )}
                      </ListItemIcon>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
            </>
          ) : (
            <Stack direction="row">
              <IconButton
                onClick={() => navigate(lOGIN_PAGE_ROUTE)}
                color="inherit"
              >
                <LoginIcon />
              </IconButton>
              <IconButton
                onClick={() => navigate(SHOPPING_PAGE_ROUTE)}
                color="inherit"
              >
                <AddShoppingCartIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
