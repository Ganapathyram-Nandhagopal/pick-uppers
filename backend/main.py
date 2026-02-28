from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

records = [
    {
        "id": "FIN001",
        "type": "Receivable",
        "party": "Green Grocery Mart",
        "amount": 6750,
        "dueDate": "2026-03-01",
        "status": "Pending",
        "invoiceNumber": "INV-001",
    },
    {
        "id": "FIN002",
        "type": "Receivable",
        "party": "Farm to Table Co-op",
        "amount": 8000,
        "dueDate": "2026-02-24",
        "status": "Overdue",
        "invoiceNumber": "INV-002",
    },
    {
        "id": "FIN003",
        "type": "Receivable",
        "party": "Fresh Express Supermarket",
        "amount": 5500,
        "dueDate": "2026-02-28",
        "status": "Paid",
        "invoiceNumber": "INV-003",
    },
    {
        "id": "FIN004",
        "type": "Payable",
        "party": "Fresh Farms Co.",
        "amount": 16000,
        "dueDate": "2026-03-08",
        "status": "Pending",
        "invoiceNumber": "BILL-001",
    },
    {
        "id": "FIN005",
        "type": "Payable",
        "party": "Green Leaf Suppliers",
        "amount": 8400,
        "dueDate": "2026-03-05",
        "status": "Pending",
        "invoiceNumber": "BILL-002",
    },
    {
        "id": "FIN006",
        "type": "Payable",
        "party": "Bulk Veggie Mart",
        "amount": 20000,
        "dueDate": "2026-03-01",
        "status": "Paid",
        "invoiceNumber": "BILL-003",
    },
    {
        "id": "FIN007",
        "type": "Receivable",
        "party": "Corner Store 24/7",
        "amount": 2065,
        "dueDate": "2026-03-05",
        "status": "Pending",
        "invoiceNumber": "INV-004",
    },
]

@app.get("/api/finance")
def get_finance_data():
    receivables = [r for r in records if r["type"] == "Receivable"]
    payables = [r for r in records if r["type"] == "Payable"]

    total_receivable = sum(r["amount"] for r in receivables)
    total_payable = sum(r["amount"] for r in payables)

    receivable_paid = sum(r["amount"] for r in receivables if r["status"] == "Paid")
    receivable_pending = sum(r["amount"] for r in receivables if r["status"] == "Pending")
    receivable_overdue = sum(r["amount"] for r in receivables if r["status"] == "Overdue")

    payable_paid = sum(r["amount"] for r in payables if r["status"] == "Paid")
    payable_pending = sum(r["amount"] for r in payables if r["status"] == "Pending")

    receivable_chart_data = [
        {"name": "Collected", "value": receivable_paid, "color": "#16A34A"},
        {"name": "Pending", "value": receivable_pending, "color": "#F59E0B"},
        {"name": "Overdue", "value": receivable_overdue, "color": "#EF4444"},
    ]

    payable_chart_data = [
        {"name": "Paid", "value": payable_paid, "color": "#16A34A"},
        {"name": "Pending", "value": payable_pending, "color": "#F59E0B"},
    ]

    return {
        "records": records,
        "receivables": receivables,
        "payables": payables,
        "totals": {
            "totalReceivable": total_receivable,
            "totalPayable": total_payable,
            "receivablePaid": receivable_paid,
            "receivableOverdue": receivable_overdue,
        },
        "receivableChartData": receivable_chart_data,
        "payableChartData": payable_chart_data
    }
