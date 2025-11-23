import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
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
        <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
            <DialogTitle>Add Edge</DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>

                {/* FROM NODE */}
                <Autocomplete
                    options={nodes}
                    getOptionLabel={(option) =>
                        `${option.event_name} (₹${option.amount})`
                    }
                    onChange={(e, value) => setForm({ ...form, from_node: value })}
                    renderInput={(params) => (
                        <TextField {...params} label="From Node" />
                    )}
                />

                {/* TO NODE */}
                <Autocomplete
                    options={nodes}
                    getOptionLabel={(option) =>
                        `${option.event_name} (₹${option.amount})`
                    }
                    onChange={(e, value) => setForm({ ...form, to_node: value })}
                    renderInput={(params) => (
                        <TextField {...params} label="To Node" />
                    )}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button variant="contained" onClick={submit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
