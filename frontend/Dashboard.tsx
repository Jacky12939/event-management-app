import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
} from "@mui/material";
import { Grid } from "@mui/material"; // Importation de la nouvelle Grid de Material UI
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrement des composants requis pour Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const drawerWidth = 240;

export default function Dashboard() {
  // Données fictives pour le graphique Chart.js
  const chartData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Événements créés",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(25, 118, 210, 0.6)", // Couleur primaire Material UI
      },
    ],
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Barre supérieure (AppBar) */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            EventManagement - Tableau de Bord
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Barre latérale (Sidebar Menu) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Dashboard", "Événements", "Utilisateurs", "Paramètres"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton selected={index === 0}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ),
            )}
          </List>
        </Box>
      </Drawer>

      {/* Contenu principal du Dashboard */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        {/* Section 1 : Les indicateurs clés (Cards) */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ borderLeft: "5px solid #1976d2" }}>
              <CardContent>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  gutterBottom
                >
                  TOTAL ÉVÉNEMENTS
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  44
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ borderLeft: "5px solid #2e7d32" }}>
              <CardContent>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  gutterBottom
                >
                  ÉVÉNEMENTS À VENIR
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  12
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ borderLeft: "5px solid #ed6c02" }}>
              <CardContent>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  gutterBottom
                >
                  PARTICIPANTS INSCRITS
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  1,250
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Section 2 : Zone Graphique d'activités */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Statistiques de création d'événements
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Bar
                    data={chartData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
