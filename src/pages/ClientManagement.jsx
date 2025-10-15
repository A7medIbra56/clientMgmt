import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  Avatar,
  Stack,
  Link,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ClientCard = ({ client, onDelete, onView, onEdit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      py={{ xs: "24px", sm: "24px" }}
      borderBottom="2px solid #eee"
      mx={{ xs: "-16px", sm: "-16px" }}
      px={{ xs: "16px", sm: "16px" }}
      gap={{ xs: "16px", sm: "0px" }}
    >
      <Box 
        display="flex" 
        alignItems="center" 
        gap="16px" 
        width={{ xs: "100%", sm: "auto" }}
      >
        <Avatar sx={{ bgcolor: "#e3f2fd", color: "#1976d2", width: "40px", height: "40px" }}>
          {client.companyName?.[0]?.toUpperCase() || "?"}
        </Avatar>

        <Box flex={1}>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap="8px">
            <Typography 
              fontWeight="bold" 
              sx={{ fontSize: { xs: "15.2px", sm: "16px" } }}
            >
              {client.companyName}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                borderRadius: "10px",
                px: "9.6px",
                py: "2.4px",
                fontWeight: 500,
              }}
            >
              {client.type}
            </Typography>
          </Box>

          <Stack
            paddingTop="8px"
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: "4px", sm: "8px" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ fontSize: { xs: "12px", sm: "14px" } }}
            >
              #{client.id}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ fontSize: { xs: "12px", sm: "14px" } }}
            >
              {client.industry}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ fontSize: { xs: "12px", sm: "14px" } }}
            >
              Created {client.createdAt}
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={{ xs: "16px", sm: "24px", md: "32px" }}
        px={{ xs: "0px", sm: "8px", md: "24px" }}
        width={{ xs: "100%", sm: "auto" }}
        justifyContent={{ xs: "flex-start", sm: "flex-end" }}
      >
        <Link
          color="primary"
          underline="none"
          sx={{ cursor: "pointer", fontSize: { xs: "14px", sm: "16px" } }}
        >
          View
        </Link>
        <Link
          color="inherit"
          underline="none"
          sx={{ cursor: "pointer", fontSize: { xs: "14px", sm: "16px" } }}
          onClick={() => onEdit(client.id)}
        >
          Edit
        </Link>
        <Link
          color="error"
          underline="none"
          sx={{ cursor: "pointer", fontSize: { xs: "14px", sm: "16px" } }}
          onClick={() => onDelete(client.id)}
        >
          Delete
        </Link>
      </Stack>
    </Box>
  );
};

export default function ClientManagement() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Delete Confirmation Dialog State
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    clientId: null,
    clientName: "",
  });

  // Snackbar State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/clients");
      setClients(res.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "⚠️ Error fetching clients data",
        severity: "error",
      });
    }
  };

  const handleDeleteClick = (id) => {
    const client = clients.find((c) => c.id === id);
    setDeleteDialog({
      open: true,
      clientId: id,
      clientName: client?.companyName || "this client",
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/clients/${deleteDialog.clientId}`);
      setSnackbar({
        open: true,
        message: "✅ Client deleted successfully!",
        severity: "success",
      });
      fetchClients();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "⚠️ Error deleting client",
        severity: "error",
      });
    } finally {
      setDeleteDialog({ open: false, clientId: null, clientName: "" });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, clientId: null, clientName: "" });
  };

  const handleView = (id) => navigate(`/view-client/${id}`);
  const handleEdit = (id) => navigate(`/edit-client/${id}`);

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filtered = clients.filter((c) =>
    c.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          mx: { xs: "0px", sm: "16px" },
          backgroundColor: "#f2f2f2",
          borderLeft: { xs: "none", sm: "2px solid #e0e0e0" },
          borderRight: { xs: "none", sm: "2px solid #e0e0e0" },
        }}
      >
        <Header />
        <Box sx={{ p: { xs: "16px", sm: "24px", md: "32px" } }}>
          <Card sx={{ p: { xs: "16px", sm: "24px" }, mb: "24px" }}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              gap="16px"
            >
              <Box>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  sx={{ color: "#e79e34", fontWeight: "bold" }}
                >
                  <Box display="flex" alignItems="center">
                    <PersonIcon sx={{ mr: "8px", verticalAlign: "middle", color: "#416c84ff" }} />
                    Client Management
                  </Box>
                </Typography>
                <Typography 
                  color="text.secondary" 
                  sx={{ fontSize: { xs: "14px", sm: "16px" } }}
                >
                  Manage client profiles, KYC compliance, and billing configuration.
                </Typography>
              </Box>
              <Button
                onClick={() => navigate("/add-client")}
                variant="contained"
                sx={{
                  bgcolor: "#1976d2",
                  height: { xs: "40px", sm: "35px" },
                  width: { xs: "100%", sm: "auto" },
                  fontSize: { xs: "14px", sm: "14px" },
                }}
              >
                + New Client
              </Button>
            </Box>
          </Card>

          <Card sx={{ p: "16px", mb: "24px" }}>
            <TextField
              fullWidth
              placeholder="Search clients by name, number, or industry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size={isMobile ? "small" : "medium"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Card>

          <Card sx={{ p: "16px" }}>
            <Box variant="subtitle1" sx={{ color: "#e79e34", fontWeight: "bold", mb: "16px" }}>
              <Box
                py="16px"
                borderBottom="2px solid #eee"
                mx="-16px"
                px="16px"
                sx={{ fontSize: { xs: "15.2px", sm: "16px" } }}
              >
                Clients ({filtered.length})
              </Box>
            </Box>

            {filtered.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onDelete={handleDeleteClick}
                onView={handleView}
                onEdit={handleEdit}
              />
            ))}
          </Card>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "8px",
            mx: "16px",
          },
        }}
      >
        <DialogTitle sx={{ pb: "8px" }}>
          <Box display="flex" alignItems="center" gap="8px">
            <WarningAmberIcon color="error" />
            <Typography variant="h6" component="span" fontWeight="bold">
              Delete Client
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{deleteDialog.clientName}</strong>?
            <br />
            <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: "24px", pb: "16px" }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="inherit"
            fullWidth={isMobile}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            fullWidth={isMobile}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}