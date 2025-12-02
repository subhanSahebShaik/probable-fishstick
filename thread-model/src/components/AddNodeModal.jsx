// AddNodeModal.jsx
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem, Checkbox, FormControlLabel, Button
} from "@mui/material";
import { useState, useEffect } from "react";
import { createThreadNode } from "../api/threadApi";

export default function AddNodeModal({ open, close, refresh }) {

    const emptyForm = {
        event_name: "",
        event_type: "DEBIT",
        amount: "",
        balance: "",
        description: "",
        is_returnable: false,
        return_amount: 0,
        return_status: "PENDING",
        returned_amount: 0,
    };

    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        if (open) setForm(emptyForm);
    }, [open]);

    const change = (k, v) => setForm({ ...form, [k]: v });

    const submit = async () => {
        await createThreadNode(form);
        refresh();
        close();
    };

    const isDebit = form.event_type === "DEBIT";

    return (
        <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 600 }}>Add Node</DialogTitle>

            <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                <TextField
                    label="Event Name"
                    value={form.event_name}
                    onChange={e => change("event_name", e.target.value)}
                />

                <TextField
                    select
                    label="Type"
                    value={form.event_type}
                    onChange={e => change("event_type", e.target.value)}
                >
                    <MenuItem value="DEBIT">Debit</MenuItem>
                    <MenuItem value="CREDIT">Credit</MenuItem>
                </TextField>

                <TextField
                    label="Amount"
                    type="number"
                    value={form.amount}
                    onChange={e => change("amount", e.target.value)}
                />

                <TextField
                    label="Balance"
                    type="number"
                    value={form.balance}
                    onChange={e => change("balance", e.target.value)}
                />

                <TextField
                    label="Description"
                    multiline
                    rows={3}
                    value={form.description}
                    onChange={e => change("description", e.target.value)}
                />

                {isDebit && (
                    <>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={form.is_returnable}
                                    onChange={e => change("is_returnable", e.target.checked)}
                                />
                            }
                            label="Returnable?"
                        />

                        {form.is_returnable && (
                            <>
                                <TextField
                                    label="Return Amount"
                                    type="number"
                                    value={form.return_amount}
                                    onChange={e => change("return_amount", e.target.value)}
                                />

                                <TextField
                                    label="Returned Amount"
                                    type="number"
                                    value={form.returned_amount}
                                    onChange={e => change("returned_amount", e.target.value)}
                                />

                                <TextField
                                    label="Return Status"
                                    select
                                    value={form.return_status}
                                    onChange={e => change("return_status", e.target.value)}
                                >
                                    <MenuItem value="PENDING">Pending</MenuItem>
                                    <MenuItem value="PARTIAL">Partially Returned</MenuItem>
                                    <MenuItem value="CLEARED">Cleared</MenuItem>
                                </TextField>
                            </>
                        )}
                    </>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button color="secondary" onClick={close}>Cancel</Button>
                <Button variant="contained" onClick={submit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
