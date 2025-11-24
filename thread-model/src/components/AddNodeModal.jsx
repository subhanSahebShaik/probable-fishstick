import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { createThreadNode } from "../api/threadApi";

export default function AddNodeModal({ open, close, refresh }) {

    const [form, setForm] = useState({
        event_name: "",
        event_type: "DEBIT",
        amount: "",
        balance: "",
        description: "",
        is_returnable: false,
        return_amount: 0,
        return_status: "NONE",
    });

    // Reset on open
    useEffect(() => {
        if (open) {
            setForm({
                event_name: "",
                event_type: "DEBIT",
                amount: "",
                balance: "",
                description: "",
                is_returnable: false,
                return_amount: 0,
                return_status: "NONE",
            });
        }
    }, [open]);

    function change(k, v) {
        setForm({ ...form, [k]: v });
    }

    async function submit() {
        await createThreadNode(form);
        refresh();
        close();
    }

    const isDebit = form.event_type === "DEBIT";

    return (
        <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
            <DialogTitle>Add Node</DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                    helperText="Enter current balance for this medium after this event"
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
                                    select
                                    label="Return Status"
                                    value={form.return_status}
                                    onChange={e => change("return_status", e.target.value)}
                                >
                                    <MenuItem value="NONE">Not Returnable</MenuItem>
                                    <MenuItem value="PENDING">Pending</MenuItem>
                                    <MenuItem value="PARTIAL">Partially Returned</MenuItem>
                                    <MenuItem value="CLEARED">Cleared</MenuItem>
                                </TextField>
                            </>
                        )}
                    </>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button variant="contained" onClick={submit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
