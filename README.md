# FixItNow - Home Services Marketplace 🔧

**"Your Trusted Home Service Platform"**

FixItNow is a modern, full-featured web application designed to connect homeowners with verified local service professionals. Whether someone needs plumbing, electrical repairs, home cleaning, or appliance maintenance, this platform makes browsing, booking, and managing services fast and hassle-free.

---

## 🚀 Key Features & Modules

* **Public Marketplace**: Explore a wide range of home services with advanced search, category filters, and top-rated technician profiles.
* **Smart Booking System**: Customers can select specific services, choose available time slots, and book professionals seamlessly.
* **Role-Based Portals**: Custom dashboards tailored specifically for **Customers**, **Technicians**, and **Admins**.
* **Secure Authentication**: JWT-secured login and registration system with role selection (`CUSTOMER` or `TECHNICIAN`).
* **Interactive UI/UX**: Built with responsive layouts, Tailwind CSS styling, status badges, and toast notifications.

---

## 👤 User Roles & Dashboards

1. **Customer Portal (`/dashboard`)**
* View booking history and track live status updates (Requested, Accepted, Paid, In-Progress, Completed).
* Manage payment history and checkouts.
* Leave reviews and ratings after service completion.


2. **Technician Portal (`/technician-dashboard`)**
* View earnings, upcoming jobs, and performance stats.
* Manage incoming client bookings (Accept or Decline requests).
* Update job progress (*Mark In-Progress* / *Mark Completed*) and set availability schedules.


3. **Admin Panel (`/admin-dashboard`)**
* Oversee global platform analytics (Total users, active bookings, revenue).
* Manage platform users with instant **Ban / Activate** action toggles.
* Create, edit, and organize service categories.



---

## 🗺️ Application Routes Summary

| Path | Description |
| --- | --- |
| `/` | Landing page featuring top services and featured technicians |
| `/services` | Browse, search, and filter all available home services |
| `/technicians/[id]` | Comprehensive technician profile view and booking CTA |
| `/login` & `/register` | User authentication pages with role management |
| `/dashboard` | Customer dashboard and personal booking management |
| `/technician-dashboard` | Technician workspace for managing jobs and availability |
| `/admin-dashboard` | Admin control panel for users and category moderation |

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **State & Icons:** React Hooks, Lucide Icons
* **HTTP Client / API:** Fetch API with custom interceptors for Bearer token handling

---

## ⚙️ How to Run Locally

Follow these steps to set up and run the project on your local machine:

1. **Clone the repository:**
```bash
git clone https://github.com/niloyahmadramjan/B7A5.git
cd  b7a5

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env.local` file in the root directory and add your backend API endpoint:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

```


4. **Start the development server:**
```bash
npm run dev

```


5. Open [http://localhost:3000](http://localhost:3000) in your browser to check out the app.