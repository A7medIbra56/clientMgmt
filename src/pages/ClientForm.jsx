import React, { useEffect, useState } from "react";
import "../styles/ClientForm.css";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Card,
  TextField,
  Grid,
  MenuItem,
  IconButton,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ClientForm.css";
import SnackbarClient from "../components/common/SnackbarClient.jsx";

export default function ClientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const [clientType, setClientType] = useState("Corporate");
  const [isEdit, setIsEdit] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [form, setForm] = useState({
    companyName: "",
    legalName: "",
    registrationNumber: "",
    taxNumber: "",
    website: "",
    annualRevenue: "",
    employeeCount: "",
  });

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      axios
        .get(`http://localhost:5000/clients/${id}`)
        .then((res) => {
          const data = res.data;
          setForm({
            companyName: data.companyName || "",
            legalName: data.legalName || "",
            registrationNumber: data.registrationNumber || "",
            taxNumber: data.taxNumber || "",
            website: data.website || "",
            annualRevenue: data.annualRevenue || "",
            employeeCount: data.employeeCount || "",
          });
          setClientType(data.type || "Corporate");
        })
        .catch((err) => {
          console.error("Error fetching client data:", err);
          setSnackbar({
            open: true,
            message: "⚠️ Error fetching client data.",
            severity: "error",
          });
        });
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.companyName.trim()) {
      setSnackbar({
        open: true,
        message: "⚠️ Company Name is required.",
        severity: "warning",
      });
      return;
    }

    const clientData = {
      id: isEdit
        ? id
        : (clientType === "Corporate" ? "C" : "I") +
          Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0"),
      type: clientType,
      companyName: form.companyName,
      legalName: form.legalName,
      registrationNumber: form.registrationNumber,
      taxNumber: form.taxNumber,
      website: form.website,
      annualRevenue: form.annualRevenue,
      employeeCount: form.employeeCount,
      industry: clientType === "Corporate" ? "Technology" : "Tech",
      createdAt: new Date().toISOString().split("T")[0],
    };

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/clients/${id}`, clientData);
        setSnackbar({
          open: true,
          message: "✅ Client updated successfully!",
          severity: "success",
        });
      } else {
        await axios.post("http://localhost:5000/clients", clientData);
        setSnackbar({
          open: true,
          message: "✅ Client added successfully!",
          severity: "success",
        });
      }
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "⚠️ Error saving data. Check console.",
        severity: "error",
      });
      console.error(err);
    }
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
     className="client-form-container"
      sx={{
        backgroundColor: "#f2f2f2",
        display: "flex",
        pt: 3,
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Header Card */}
        <Card
          sx={{
            p: 3,
            mb: 3,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            backgroundColor: "#f2f2f2",
            border: "solid 2px",
            borderRadius: "8px",
          }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton onClick={() => navigate("/")}>
              <ArrowBackIcon color="primary" />
            </IconButton>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", ml: -1 }}
              onClick={() => navigate("/")}
            >
              Back to Clients
            </Typography>
            <Box sx={{ paddingLeft: "20px" }}>
              <Typography mb={2} variant="h6" sx={{ fontWeight: "bold", color: "#e79e34" }}>
                {isEdit ? "Edit Client" : "Create New Client"}
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={2}>
                {isEdit
                  ? "Modify client details and update information."
                  : "Add a new client to your legal practice management system."}
              </Typography>
            </Box>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
            }}
          >
            <Tab label="Basic Info" />
            <Tab label="Classification" />
            <Tab label="Relationship" />
            <Tab label="Additional" />
            <Tab label="Billing" />
          </Tabs>
        </Card>

        {/* Form Card */}
        <Card
          sx={{
            p: 3,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            backgroundColor: "#f2f2f2",
            border: "solid 2px",
            borderRadius: "8px",
            "& .MuiInputBase-root": { backgroundColor: "#fff" },
          }}
        >
          {/* Client Type */}
          <TextField
            fullWidth
            name="ClientType"
            label="Client Type "
            select
            value={clientType}
            onChange={(e) => setClientType(e.target.value)}
            InputProps={{
              startAdornment: <BusinessIcon sx={{ mr: 1, color: "action.active" }} />,
            }}
            sx={{ mb: 3 }}
          >
            <MenuItem value="Corporate">Corporate</MenuItem>
            <MenuItem value="Individual">Individual</MenuItem>
          </TextField>

          {/* Fields */}
          <Grid container spacing={2}>
            <TextField
              fullWidth
              name="companyName"
              label="Company Name *"
              value={form.companyName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="legalName"
              label="Legal Name"
              value={form.legalName}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              name="registrationNumber"
              label="Registration Number"
              value={form.registrationNumber}
              onChange={handleChange}
              sx={{ flex: 12 }}
            />

            <TextField
              fullWidth
              name="taxNumber"
              label="Tax Number"
              value={form.taxNumber}
              onChange={handleChange}
              sx={{ flex: 12 }}
            />

            <TextField
              fullWidth
              name="website"
              label="Website URL"
              value={form.website}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="annualRevenue"
              label="Annual Revenue"
              value={form.annualRevenue}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              name="employeeCount"
              label="Employee Count"
              value={form.employeeCount}
              onChange={handleChange}
            />
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" color="inherit" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ bgcolor: "#1976d2" }} onClick={handleSubmit}>
              {isEdit ? "Update Client" : "Save Client"}
            </Button>
          </Box>
        </Card>
      </Box>
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