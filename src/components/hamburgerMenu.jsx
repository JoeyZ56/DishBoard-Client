import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebaseClient";
import { signOut } from "firebase/auth";

export default function HamburgerMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = async (navigate) => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error(error.message);
    } finally {
      navigate("/login");
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#FFC107", px: 2, boxShadow: 2 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              color: "#000",
              fontWeight: "bold",
              fontSize: { xs: "20px", sm: "28px" }, // Shrink on xs
              textDecoration: "none",
              whiteSpace: "nowrap",
            }} // FlexGrow makes it align left
          >
            DishBoard
          </Typography>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ color: "#795548" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#FFF3E0", // Set the background color of the entire drawer
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/" sx={{ py: 1.5 }}>
            <ListItemText primary="Home" sx={{ color: "#000" }} />
          </ListItem>
          <ListItem button component={Link} to="/breakfast" sx={{ py: 1.5 }}>
            <ListItemText primary="Breakfast Recipes" sx={{ color: "#000" }} />
          </ListItem>
          <ListItem button component={Link} to="/lunch" sx={{ py: 1.5 }}>
            <ListItemText primary="Lunch Recipes" sx={{ color: "#000" }} />
          </ListItem>
          <ListItem button component={Link} to="/dinner" sx={{ py: 1.5 }}>
            <ListItemText primary="Dinner Recipes" sx={{ color: "#000" }} />
          </ListItem>
          <ListItem button component={Link} to="/dessert" sx={{ py: 1.5 }}>
            <ListItemText primary="Dessert Recipes" sx={{ color: "#000" }} />
          </ListItem>
          {/*Show sections if logged in. If not do not show */}
          {auth.currentUser ? (
            <>
              <ListItem
                button
                component={Link}
                to="/recipe-form"
                sx={{ py: 1.5 }}
              >
                <ListItemText primary="Create Recipe" sx={{ color: "#000" }} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/user-account"
                sx={{ py: 1.5 }}
              >
                <ListItemText primary="User Account" sx={{ color: "#000" }} />
              </ListItem>
              <ListItem
                button
                onClick={() => handleLogout(navigate)}
                sx={{ py: 1.5 }}
              >
                <ListItemText
                  primary="Log out"
                  sx={{ color: "#000", cursor: "pointer" }}
                />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/signup">
                <ListItemText primary="Sign Up" sx={{ color: "#000" }} />
              </ListItem>
              <ListItem button component={Link} to="/login">
                <ListItemText primary="Log In" sx={{ color: "#000" }} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}
