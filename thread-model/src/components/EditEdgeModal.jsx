import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { updateThreadEdge } from "../api/threadApi";

export default function EditEdgeModal({ edge, nodes, close, refresh }) {
    const [form, setForm] = useState({
        from_node: nodes.find(n => n.id === edge.source) || null,
        to_node: nodes.find(n => n.id === edge.target) || null,
    });

    async function submit() {
        await updateThreadEdge(edge.id, {
            from_node: form.from_node?.id,
            to_node: form.to_node?.id,
        });
        refresh();
        close();
    }

    return (
        <Dialog open={true} onClose={close} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Edge</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>

                <Autocomplete
                    options={nodes}
                    getOptionLabel={(option) => option.event_name}
                    value={form.from_node}
                    onChange={(e, value) => setForm({ ...form, from_node: value })}
                    renderInput={(params) => <TextField {...params} label="From Node" />}
                />

                <Autocomplete
                    options={nodes}
                    getOptionLabel={(option) => option.event_name}
                    value={form.to_node}
                    onChange={(e, value) => setForm({ ...form, to_node: value })}
                    renderInput={(params) => <TextField {...params} label="To Node" />}
                />

            </DialogContent>

            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button variant="contained" onClick={submit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
