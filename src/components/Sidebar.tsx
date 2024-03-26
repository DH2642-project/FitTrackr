import { Menu } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function Sidebar({
  isMobile,
  pages,
}: {
  isMobile: boolean;
  pages: { path: string; text: string; icon: JSX.Element; disabled?: boolean }[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu button */}
      {isMobile && (
        <IconButton
          size="large"
          onClick={() => setSidebarOpen(true)}
          sx={{
            color: "primary.contrastText",
            top: 0,
            left: 0,
            position: "fixed",
            zIndex: 1000,
            bgcolor: "primary.main",
            borderRadius: "0 0 30px 0",
          }}
        >
          <Menu />
        </IconButton>
      )}
      <Drawer
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            bgcolor: "#535353",
            color: "white",
            width: 240,
            boxSizing: "border-box",
          },
          "& .MuiListItemIcon-root": {
            // for icons
            color: "white",
          },
        }}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
      >
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
            }}
          >
            FitTrackr
          </Typography>
        </Toolbar>
        <List>
          {pages.map((page, index) => (
            <ListItemButton
              key={index}
              component={Link}
              to={page.path}
              sx={{
                borderRadius: "30px",
                "&.active": {
                  backgroundColor: "primary.main",
                },
              }}
              disabled={page.disabled}
              onClick={() => setSidebarOpen(false)} // close mobile sidebar on click
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={<Typography variant="h6">{page.text}</Typography>} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
