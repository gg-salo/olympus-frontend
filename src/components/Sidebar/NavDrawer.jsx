import { makeStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import NavContent from "./NavContent.jsx";

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

function NavDrawer({ mobileOpen, handleDrawerToggle, address }) {
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      anchor={"left"}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      onClick={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <NavContent address={address} />
    </Drawer>
  );
}

export default NavDrawer;
