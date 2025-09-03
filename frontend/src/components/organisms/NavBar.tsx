import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBarFilter from "../molecules/SearchBarFilter";
import { UserType } from "../../types/models/User";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { logout } from "../../services/userService";

const NavBar: React.FC<{
  selectedRole?: UserType | undefined;
  setSelectedRole?: (role: UserType) => void;
  confirmRole?: boolean;
  success?: boolean;
}> = ({ selectedRole, setSelectedRole, confirmRole, success }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const excludedRoutesWithSearch = ["/signup", "/login", "/verify-email"];
  const excludedRoutesButtons = ["/signup", "/login"];

  const showSearchBar = !excludedRoutesWithSearch.includes(location.pathname);
  const showAuthButtons = !excludedRoutesButtons.includes(location.pathname);

  const { user, loading, dispatch } = useAuthContext();

  // Menu state for profile icon
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res) {
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      console.error(error);
    }
    handleCloseMenu();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "transparent",
          color: "black",
          boxShadow: "none",
          border: "none",
          borderBottom: "2px solid #efefef",
        }}
      >
        <Toolbar>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "'Roboto Slab', sans-serif",
              fontWeight: "bold",
            }}
          >
            <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              FreelanceWave
            </span>
          </Typography>
          {loading ? (
            <>loading...</>
          ) : (
            <>
              {showSearchBar && <SearchBarFilter />}

              {!user ? (
                showAuthButtons && (
                  <>
                    <Button
                      color="inherit"
                      sx={{ textTransform: "none", marginLeft: "10px" }}
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      color="inherit"
                      sx={{
                        textTransform: "none",
                        backgroundColor: "#108a00",
                        "&:hover": { backgroundColor: "#0c6a00" },
                        color: "white",
                        marginLeft: "10px",
                      }}
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                )
              ) : (
                <IconButton
                  color="inherit"
                  onClick={handleProfileClick}
                  sx={{ marginLeft: "10px" }}
                >
                  <AccountCircleIcon />
                </IconButton>
              )}
            </>
          )}

          {confirmRole && !success && (
            <>
              <Typography variant="body1">
                {selectedRole === "Client"
                  ? "Looking for work?"
                  : "Here to hire talent?"}
              </Typography>

              <Typography
                component="a"
                href="#"
                sx={{
                  color: "#108a00",
                  textDecoration: "none",
                  cursor: "pointer",
                  marginLeft: "20px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedRole &&
                    setSelectedRole(
                      selectedRole === "Client"
                        ? UserType.Freelance
                        : UserType.Client
                    );
                }}
              >
                Apply as
                {selectedRole === "Client" ? " talent" : " a Client"}
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseMenu}>Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
