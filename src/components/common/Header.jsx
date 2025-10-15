import React from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, Breadcrumbs, Link, useTheme, useMediaQuery } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "black",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Toolbar sx={{ 
        justifyContent: "space-between",
        px: { xs: 1, sm: 2 },
        minHeight: { xs: 56, sm: 64 }
      }}>
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2, md: 3 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar sx={{ 
              bgcolor: "#1976d2", 
              width: { xs: 24, sm: 28 }, 
              height: { xs: 24, sm: 28 }, 
              fontSize: { xs: 14, sm: 16 },
              borderRadius: 2
            }}>
              A
            </Avatar>
            <Typography variant="h6" sx={{ 
              fontWeight: "bold", 
              color: "#1976d2",
              fontSize: { xs: "1rem", sm: "1.25rem" },
              display: { xs: "none", sm: "block" }
            }}>
              Adsero
            </Typography>
          </Box>

          <Breadcrumbs 
            separator=" / " 
            aria-label="breadcrumb"
            sx={{ 
              display: { xs: "none", md: "flex" },
              fontSize: { sm: "0.875rem", md: "1rem" }
            }}
          >
            <Link underline="hover" color="#1976d2" href="#">
              Home
            </Link>
            <Link underline="hover" color="#1976d2" href="#">
              App
            </Link>
            <Typography color="text.primary">Client Mgmt</Typography>
          </Breadcrumbs>
        </Box>

        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
          <IconButton size={isMobile ? "small" : "medium"}>
            <NotificationsIcon sx={{ 
              color: "black",
              fontSize: { xs: 20, sm: 24 }
            }} />
          </IconButton>
          <Avatar sx={{ 
            bgcolor: "#1976d2", 
            width: { xs: 24, sm: 28 }, 
            height: { xs: 24, sm: 28 }
          }}>
            <AccountCircleIcon sx={{ 
              fontSize: { xs: 16, sm: 18 }, 
              color: "white" 
            }} />
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}