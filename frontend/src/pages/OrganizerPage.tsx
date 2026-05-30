import { useState } from "react";
import {
  Box, Typography, Button, Paper, Chip, Divider,
  Grid, Card, CardContent, CardActions, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Alert
} from "@mui/material";
import {
  Add, Edit, Delete, People, Event, TrendingUp,
  Visibility, Close, Save
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Types
interface Participant {
  id: string;
  name: string;
  email: string;
  checkedIn: boolean;
}

interface EventData {
  id: string;
  title: string;
  date: string;
  location: string;
  capacity: number;
  registered: number;
  status: "publié" | "brouillon" | "annulé";
  participants: Participant[];
}

// Données mock
const MOCK_EVENTS: EventData[] = [
  {
    id: "evt-001",
    title: "Concert Jazz Yaoundé",
    date: "2026-06-15",
    location: "Palais des Congrès, Yaoundé",
    capacity: 500,
    registered: 342,
    status: "publié",
    participants: [
      { id: "p1", name: "Alice Mbarga", email: "alice@mail.com", checkedIn: true },
      { id: "p2", name: "Bob Ngono", email: "bob@mail.com", checkedIn: false },
      { id: "p3", name: "Claire Essono", email: "claire@mail.com", checkedIn: true },
    ],
  },
  {
    id: "evt-002",
    title: "Tech Summit Douala 2026",
    date: "2026-07-20",
    location: "Hôtel Akwa Palace, Douala",
    capacity: 200,
    registered: 187,
    status: "publié",
    participants: [
      { id: "p4", name: "David Tamo", email: "david@mail.com", checkedIn: false },
      { id: "p5", name: "Eva Nkolo", email: "eva@mail.com", checkedIn: false },
    ],
  },
  {
    id: "evt-003",
    title: "Atelier Entrepreneuriat",
    date: "2026-08-05",
    location: "CCIMA, Yaoundé",
    capacity: 100,
    registered: 23,
    status: "brouillon",
    participants: [],
  },
];

const statusColor = (s: string) =>
  s === "publié" ? "success" : s === "brouillon" ? "warning" : "error";

export default function OrganizerPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventData[]>(MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "", date: "", location: "", capacity: "", status: "brouillon" as const
  });

  const totalInscrits = events.reduce((s, e) => s + e.registered, 0);
  const totalCapacity = events.reduce((s, e) => s + e.capacity, 0);
  const tauxRemplissage = totalCapacity > 0
    ? Math.round((totalInscrits / totalCapacity) * 100) : 0;

  const openCreate = () => {
    setEditingEvent(null);
    setForm({ title: "", date: "", location: "", capacity: "", status: "brouillon" });
    setShowForm(true);
  };

  const openEdit = (evt: EventData) => {
    setEditingEvent(evt);
    setForm({
      title: evt.title, date: evt.date, location: evt.location,
      capacity: String(evt.capacity), status: evt.status
    });
    setShowForm(true);
  };

  const saveEvent = () => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id
        ? { ...e, ...form, capacity: Number(form.capacity) } : e));
    } else {
      const newEvt: EventData = {
        id: `evt-${Date.now()}`, title: form.title, date: form.date,
        location: form.location, capacity: Number(form.capacity),
        registered: 0, status: form.status, participants: []
      };
      setEvents([...events, newEvt]);
    }
    setShowForm(false);
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100", p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          🎯 Espace Organisateur
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" onClick={() => navigate("/dashboard")}>
            Retour
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={openCreate}>
            Créer un événement
          </Button>
        </Box>
      </Box>

      {/* Statistiques */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: "Événements", value: events.length, icon: "📋", color: "#1976d2" },
          { label: "Total inscrits", value: totalInscrits, icon: "👥", color: "#388e3c" },
          { label: "Taux remplissage", value: `${tauxRemplissage}%`, icon: "📊", color: "#f57c00" },
          { label: "Publiés", value: events.filter(e => e.status === "publié").length, icon: "✅", color: "#7b1fa2" },
        ].map((stat) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography fontSize={30}>{stat.icon}</Typography>
                <Typography variant="h5" fontWeight="bold" color={stat.color}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Liste événements */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>📋 Mes événements</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {events.map((evt) => {
          const taux = Math.round((evt.registered / evt.capacity) * 100);
          return (
            <Paper key={evt.id} sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Typography fontWeight="bold">{evt.title}</Typography>
                    <Chip label={evt.status} color={statusColor(evt.status) as any} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    📅 {new Date(evt.date).toLocaleDateString("fr-FR")} — 📍 {evt.location}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">
                      {evt.registered}/{evt.capacity} inscrits ({taux}%)
                    </Typography>
                    <LinearProgress
                      variant="determinate" value={taux}
                      color={taux > 80 ? "error" : taux > 50 ? "warning" : "primary"}
                      sx={{ mt: 0.5, borderRadius: 1 }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton size="small" color="info"
                    onClick={() => { setSelectedEvent(evt); setShowParticipants(true); }}>
                    <People />
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => openEdit(evt)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => setDeleteConfirm(evt.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>

      {/* Dialog participants */}
      <Dialog open={showParticipants} onClose={() => setShowParticipants(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          👥 Participants — {selectedEvent?.title}
          <IconButton sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={() => setShowParticipants(false)}><Close /></IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedEvent?.participants.length === 0
            ? <Alert severity="info">Aucun participant pour l'instant.</Alert>
            : <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Check-in</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedEvent?.participants.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.email}</TableCell>
                        <TableCell>
                          <Chip label={p.checkedIn ? "✅ Présent" : "⏳ En attente"}
                            color={p.checkedIn ? "success" : "default"} size="small" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          }
        </DialogContent>
      </Dialog>

      {/* Dialog créer/modifier */}
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingEvent ? "✏️ Modifier" : "➕ Créer"} un événement</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField label="Titre" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} fullWidth />
          <TextField label="Date" type="date" value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="Lieu" value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })} fullWidth />
          <TextField label="Capacité" type="number" value={form.capacity}
            onChange={e => setForm({ ...form, capacity: e.target.value })} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Statut</InputLabel>
            <Select value={form.status} label="Statut"
              onChange={e => setForm({ ...form, status: e.target.value as any })}>
              <MenuItem value="brouillon">Brouillon</MenuItem>
              <MenuItem value="publié">Publié</MenuItem>
              <MenuItem value="annulé">Annulé</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)}>Annuler</Button>
          <Button variant="contained" startIcon={<Save />} onClick={saveEvent}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog suppression */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>Voulez-vous vraiment supprimer cet événement ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Annuler</Button>
          <Button color="error" variant="contained"
            onClick={() => deleteEvent(deleteConfirm!)}>Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
