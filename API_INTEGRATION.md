
# API Integration Documentation

This document outlines the API integration strategy for the **FixItNow** Next.js platform. It maps the frontend views and user flows to the backend REST API endpoints, detailing required request methods, payloads, query parameters, and response structures.

---

## 🌐 Global & Public Routes

### 1. Home Page (`/`)

* **Components:** Hero, Featured Services Grid, Top-Rated Technicians Section, How It Works.
* **Endpoints Consumed:**
* `GET /api/services?limit=6&featured=true`
* **Response:** Array of featured service objects.


* `GET /api/technicians?limit=4&topRated=true`
* **Response:** Array of top-rated technician profile objects.





### 2. Browse Services & Technicians (`/services`, `/technicians`)

* **Components:** Search Bar, Filter Sidebar (Category, Price Range, Location, Rating), Service Cards Grid, Technician Cards Grid.
* **Endpoints Consumed:**
* `GET /api/services`
* **Query Params:** `category`, `search`, `minPrice`, `maxPrice`, `sort`
* **Response:** Filtered list of services.


* `GET /api/technicians`
* **Query Params:** `serviceId`, `location`, `rating`, `search`
* **Response:** Filtered list of technicians.


* `GET /api/categories`
* **Response:** List of all available service categories for filter dropdowns.





### 3. Technician Profile View (`/technicians/[id]`)

* **Components:** Technician Bio, Portfolio, Skills Badges, Reviews List, Interactive Booking / Slot Picker CTA.
* **Endpoints Consumed:**
* `GET /api/technicians/:id`
* **Response:** Detailed technician profile, pricing, and nested reviews.


* `GET /api/technicians/:id/availability`
* **Query Params:** `date` (YYYY-MM-DD)
* **Response:** Available time slots for the selected date.





---

## 🔐 Authentication Routes

### 1. Registration (`/auth/register`)

* **Components:** Registration Form (Name, Email, Password, Role Selection: `CUSTOMER` | `TECHNICIAN`).
* **Endpoints Consumed:**
* `POST /api/auth/register`
* **Payload:** `{ name, email, password, role }`
* **Response:** `{ success, token, data: { id, name, email, role } }`





### 2. Login (`/auth/login`)

* **Components:** Login Form (Email, Password).
* **Endpoints Consumed:**
* `POST /api/auth/login`
* **Payload:** `{ email, password }`
* **Response:** `{ success, token, data: { id, name, email, role } }`





---

## 🛒 Customer Portal Routes

### 1. Customer Dashboard & History (`/dashboard`)

* **Components:** Overview Metrics, Bookings Table with Status Badges, Payment History.
* **Endpoints Consumed:**
* `GET /api/bookings`
* **Headers:** `Authorization: Bearer <token>`
* **Response:** List of customer bookings with status fields (`REQUESTED`, `ACCEPTED`, `PAID`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).


* `GET /api/payments`
* **Headers:** `Authorization: Bearer <token>`
* **Response:** Payment history logs and transaction references.





### 2. Booking Creation & Payment Flow (`/services/[id]/book`, `/dashboard/customer/bookings/[id]/pay`)

* **Components:** Time-Slot Selector, Summary Card, Stripe / SSLCommerz Gateway Redirect.
* **Endpoints Consumed:**
* `POST /api/bookings`
* **Headers:** `Authorization: Bearer <token>`
* **Payload:** `{ serviceId, technicianId, bookingDate, timeSlot }`
* **Response:** Created booking object (Status: `REQUESTED`).


* `POST /api/payments/create`
* **Headers:** `Authorization: Bearer <token>`
* **Payload:** `{ bookingId, gateway: 'stripe' | 'sslcommerz' }`
* **Response:** `{ paymentUrl, sessionId }` (Redirects user to gateway).





### 3. Payment Outcome Handlers (`/payment/success`, `/payment/cancel`)

* **Components:** Success / Cancellation Notification UI.
* **Endpoints Consumed:**
* `PATCH /api/payments/verify` (Handled via URL query params/session return from gateway)
* **Query Params:** `session_id`, `bookingId`
* **Response:** Updated booking status (`PAID`).





---

## 🛠️ Technician Portal Routes

### 1. Technician Dashboard (`/dashboard/technician`)

* **Components:** Earnings Widget, Active Jobs Counter, Quick Action Panel.
* **Endpoints Consumed:**
* `GET /api/technician/profile`
* **Headers:** `Authorization: Bearer <token>`
* **Response:** Technician profile details, skills, and current rates.


* `GET /api/technician/availability`
* **Headers:** `Authorization: Bearer <token>`
* **Response:** Working hours schedule and blocked slots configuration.





### 2. Booking Management (`/dashboard/technician/bookings`)

* **Components:** Incoming Bookings Table, Status Transition Actions ("Accept", "Decline", "Mark In-Progress", "Mark Completed").
* **Endpoints Consumed:**
* `GET /api/technician/bookings`
* **Headers:** `Authorization: Bearer <token>`
* **Response:** List of bookings assigned to the technician.


* `PATCH /api/technician/bookings/:id`
* **Headers:** `Authorization: Bearer <token>`
* **Payload:** `{ status: 'ACCEPTED' | 'DECLINED' | 'IN_PROGRESS' | 'COMPLETED' }`
* **Response:** Updated booking entity.





---

## 📊 Admin Portal Routes

### 1. Admin Overview & User Management (`/dashboard/admin`)

* **Components:** Global Analytics Metric Cards, User Management Table with Search/Pagination, Ban/Unban Actions.
* **Endpoints Consumed:**
* `GET /api/admin/users`
* **Headers:** `Authorization: Bearer <token>` (Admin Role Required)
* **Query Params:** `search`, `role`, `page`, `limit`
* **Response:** Paginated list of platform users.


* `PATCH /api/admin/users/:id/status`
* **Headers:** `Authorization: Bearer <token>`
* **Payload:** `{ isBanned: boolean }`
* **Response:** Updated user state.





### 2. Service Category Management (`/dashboard/admin/categories`)

* **Components:** Categories Table, Create/Edit Category Modal Form.
* **Endpoints Consumed:**
* `GET /api/admin/categories`
* **Headers:** `Authorization: Bearer <token>`
* **Response:** Full list of active and archived categories.


* `POST /api/admin/categories`
* **Headers:** `Authorization: Bearer <token>`
* **Payload:** `{ name, description, icon }`
* **Response:** Newly created category object.





---

## 🚦 Error Handling & Interceptors Standard

All frontend API request wrappers (e.g., using `fetch` clients) must implement:

1. **Request Interceptor:** Automatically attach the Bearer token from local storage / secure cookies when available.
2. **Response Interceptor:** Handle `401 Unauthorized` responses by clearing local session caches and redirecting users to `/auth/login`. Handle `403 Forbidden` actions by routing users to error fallback pages.