import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import CreateBoard from "../Pages/CreateBoard";
import logoutUser from "./InfoAccount/Logout";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showCreateBoard, setCreateBoard] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleCreateBoard = () => {
    setCreateBoard(!showCreateBoard);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      alert(response); // Show the message in an alert
    } catch (error) {
      alert(error.message); // Show the error message in an alert
    }
  };

  return (
    <AppBar position="static">
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pr.Assistant
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            <Button component={Link} to="/Home" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/Chat" color="inherit">
              Chat
            </Button>
            <Button component={Link} to="/Boards" color="inherit">
              Board
            </Button>
            <Button color="inherit" onClick={toggleCreateBoard}>
              Create Board
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography component={Link} to="/Profile" textAlign="center">
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography component={Link} to="/Account" textAlign="center">
                  Account
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
      {showCreateBoard && (
        <CreateBoard
          show={showCreateBoard}
          onHide={() => setCreateBoard(false)}
        />
      )}
    </AppBar>
  );
}

export default ResponsiveAppBar;
