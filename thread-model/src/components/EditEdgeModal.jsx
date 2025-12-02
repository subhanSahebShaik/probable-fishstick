// EditEdgeModal.jsx
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Autocomplete, TextField, Button
} from "@mui/material";
import { useState } from "react";
import { updateThreadEdge } from "../api/threadApi";

export default function EditEdgeModal({ edge, nodes, close, refresh }) {

    const [form, setForm] = useState({
        from_node: nodes.find(n => n.id === edge.source) || null,
        to_node: nodes.find(n => n.id === edge.target) || null,
    });

    const submit = async () => {
        await updateThreadEdge(edge.id, {
            from_node: form.from_node?.id,
            to_node: form.to_node?.id,
        });
        refresh();
        close();
    };

    return (
        <Dialog open={true} onClose={close} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 600 }}>Edit Edge</DialogTitle>

            <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                <Autocomplete
                    options={nodes}
                    getOptionLabel={(o) => `${o.event_name} (₹${o.amount})`}
                    value={form.from_node}
                    onChange={(e, v) => setForm({ ...form, from_node: v })}
                    renderInput={(p) => <TextField {...p} label="From Node" />}
                />

                <Autocomplete
                    options={nodes}
                    getOptionLabel={(o) => `${o.event_name} (₹${o.amount})`}
                    value={form.to_node}
                    onChange={(e, v) => setForm({ ...form, to_node: v })}
                    renderInput={(p) => <TextField {...p} label="To Node" />}
                />

            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button color="secondary" onClick={close}>Cancel</Button>
                <Button variant="contained" onClick={submit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
