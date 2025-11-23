from django.db import models
import uuid
from django.utils import timezone


class ThreadNode(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    event_name = models.CharField(max_length=255)
    event_type = models.CharField(max_length=20, choices=[
        ("CREDIT", "Credit"),
        ("DEBIT", "Debit")
    ])
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    timestamp = models.DateTimeField(
        auto_now_add=True)            # created timestamp
    updated_at = models.DateTimeField(
        auto_now=True)               # last updated

    # --- Returnable Debit Tracking ---
    is_returnable = models.BooleanField(default=False)

    return_amount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)

    return_status = models.CharField(
        max_length=20,
        choices=[
            ("NONE", "Not Returnable"),
            ("PENDING", "Pending"),
            ("PARTIAL", "Partially Returned"),
            ("CLEARED", "Cleared")
        ],
        default="NONE"
    )

    def __str__(self):
        return f"{self.event_name} ({self.event_type}) — ₹{self.amount}"


class ThreadEdge(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    from_node = models.ForeignKey(
        ThreadNode, related_name="outgoing_edges", on_delete=models.CASCADE)
    to_node = models.ForeignKey(
        ThreadNode, related_name="incoming_edges", on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.from_node.id} → {self.to_node.id}"
