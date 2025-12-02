// AddEdgeModal.jsx
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Autocomplete, TextField
} from "@mui/material";
import { useState } from "react";
import { createThreadEdge } from "../api/threadApi";

export default function AddEdgeModal({ open, close, refresh, nodes }) {
    const [form, setForm] = useState({
        from_node: null,
        to_node: null,
    });

    const submit = async () => {
        await createThreadEdge({
            from_node: form.from_node?.id,
            to_node: form.to_node?.id,
        });
        refresh();
        close();
    };

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ fontWeight: 600 }}>
                Add Edge
            </DialogTitle>

            <DialogContent
                dividers
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
                <Autocomplete
                    options={nodes}
                    getOptionLabel={(option) =>
                        `${option.event_name} (₹${option.amount})`
                    }
                    onChange={(e, v) => setForm({ ...form, from_node: v })}
                    renderInput={(params) => (
                        <TextField {...params} label="From Node" />
                    )}
                />

                <Autocomplete
                    options={nodes}
                    getOptionLabel={(option) =>
                        `${option.event_name} (₹${option.amount})`
                    }
                    onChange={(e, v) => setForm({ ...form, to_node: v })}
                    renderInput={(params) => (
                        <TextField {...params} label="To Node" />
                    )}
                />
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={close} color="secondary">Cancel</Button>
                <Button variant="contained" onClick={submit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
