# 🐟 probable-fishstick

A visually intuitive thread-based financial tracker to help you catch the “big expenses” hiding in your money flow.

<br>

## 🎯 What Is This?

probable-fishstick is a personal finance visualizer based on a completely unique concept called the Thread Model.

Instead of spreadsheets or monthly summaries, you get:

- 🧵 Threads representing the flow of your money

- 🔗 Edges connecting related financial events

- 💸 Nodes representing credits, debits & returnable transactions

- 🧠 A clean, visual graph that lets you spot patterns, leaks, debts, and cash flow paths instantly

It’s like a mind-map for your finances.

Except funnier. And smarter. And shaped like an aquarium full of money-fish. 🐠

## 🧵 The Thread Model — The Core Idea

Traditional apps show money as rows and columns.
This app shows money as stories, sequences, paths, and connections.

A “Thread” begins where the money enters:

- salary

- loan

- gift

- refund

Then it branches as you spend.

Then merges when you mix accounts.

And eventually lets you see:

- Where your money actually goes

- How many branches your finances split into

- Which expenses grow into “big fish”

- How much returnable money is still pending

- Your overall flow & spending personality

The goal is simple:

👉 Follow the thread → find the fish → catch financial clarity 🐟

## ✨ Features

### 🔑 Secure Authentication (JWT)

- Uses your Django superuser credentials

- All endpoints protected

- No one can access your financial data

### 📊 Beautiful Visual Graph (ReactFlow + Dagre)

- Auto-arranged top-to-bottom graph layout

- Smooth custom nodes

- Custom edges

- Mini-map & graph controls

- Click nodes to reveal details

- Real-time updates on add/edit

### 🧵 Advanced Transaction Model

Each ThreadNode supports:

- Credit / Debit

- Amount

- Returnable flag

- Return status

- Return amount

- Timestamps

- Editable fields

### 🔗 Thread Edges

Connects one transaction to the next:

- Receipts

- Transfers

- Expense splits

- Chains of spending

- Visual relationships

### 📝 Modals for Add/Edit

- Add Node

- Edit Node

- Add Edge

- Edit Edge

- Clean MUI forms

### 🧭 Navigation

- Dashboard

- Thread Flow

- NavBar auto-hides buttons depending on route

### 🚀 Backend

- Django

- Django REST Framework

- SimpleJWT Authentication

- PostgreSQL support

- CORS Enabled

### ⚛️ Frontend

- React + React Router

- ReactFlow graph engine

- Material-UI (MUI) for UI components

- JWT stored securely

- Protected routes

- Auto-refresh ready architecture

## 🛠️ Tech Stack

### Frontend

- React

- React Router

- ReactFlow

- Material-UI

- Fetch API

- JWT Auth Interceptors

### Backend

- Django

- Django REST Framework

- SimpleJWT

- PostgreSQL (Aiven)

- CORS Headers

## 📦 Project Structure

### Backend

```
threadModel/
│
├── threadApp/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── serializers.py
│
├── threadModel/
│   ├── settings.py
│   └── urls.py
```

### Frontend

```
src/
│
├── api/
│   └── threadApi.js
│
├── components/
│   ├── NavBar.jsx
│   ├── PrivateRoute.jsx
│   ├── RightPanel.jsx
│   └── ...
│
├── graph/
│   ├── ThreadGraph.jsx
│   ├── ThreadNode.jsx
│   ├── ThreadEdge.jsx
│   └── ...
│
├── pages/
│   ├── Login.jsx
│   ├── ThreadFlow.jsx
│   ├── Dashboard.jsx
│   └── ...
└── App.js
```

## 🚀 How to Run Locally

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/subhanSahebShaik/probable-fishstick
cd probable-fishstick
```

### 🐍 2️⃣ Backend Setup

```bash
cd ThreadModel
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000/
```

### ⚛️ 3️⃣ Frontend Setup

```bash
cd thread-model
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000/
```

### 🔐 4️⃣ Login

Use your Django superuser credentials.

All routes except /login are protected.

## 🧠 Why “probable-fishstick”?

Because:

- You follow threads → find financial patterns

- These patterns → reveal “big fish” expenses

- And you stick them onto your board to track

- Hence → probable-fishstick 🐟😂

It’s funny.

It’s clever.

And it makes people read the README.

## 🧭 Roadmap (Future Plans)

✔ Add categories

✔ Add analytics dashboard

✔ Monthly heatmaps

✔ Loan progress tracker

✔ Returnable-money tracker

✔ Import/Export threads

✔ Mobile-friendly UI

✔ Offline-first local encryption

✔ Dark mode

## 🤝 Contributions

This is a personal project, but improvements, ideas, and pull requests are welcome.

Especially if you want to help me catch bigger financial fish 🐟.

## 🐟 Final Note

If this little fish-themed thread model helps even one person understand their finances better,
then the name probable-fishstick has served its destiny.
