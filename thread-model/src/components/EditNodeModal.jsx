// EditNodeModal.jsx
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem, Checkbox, FormControlLabel, Button
} from "@mui/material";
import { useState } from "react";
import { updateThreadNode } from "../api/threadApi";

export default function EditNodeModal({ node, close, refresh }) {

    const [form, setForm] = useState({
        event_name: node.event_name,
        event_type: node.event_type,
        amount: node.amount,
        balance: node.balance ?? 0,
        description: node.description ?? "",
        is_returnable: node.is_returnable,
        return_amount: node.return_amount ?? 0,
        returned_amount: node.returned_amount ?? 0,
        return_status: node.return_status,
    });

    const change = (k, v) => setForm({ ...form, [k]: v });

    const isDebit = form.event_type === "DEBIT";

    const submit = async () => {
        await updateThreadNode(node.id, form);
        refresh();
        close();
    };

    return (
        <Dialog open={true} onClose={close} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 600 }}>Edit Node</DialogTitle>

            <DialogContent
                dividers
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
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
