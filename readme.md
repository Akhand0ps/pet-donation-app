# Pet Shelter Donation Portal (MERN)

A full-stack MERN application for a pet shelter donation system. Users can browse animals, donate securely, and admins can manage animals and view donations.

**🌐 Live Demo:** [https://aidforpaws.vercel.app/](https://aidforpaws.vercel.app/)

---

## 📸 Screenshots

### 🏠 Homepage
![Homepage](https://res.cloudinary.com/djhhijldt/image/upload/v1752701015/Screenshot_2025-07-17_024435_c5ydbd.png)
*Vibrant gradient homepage with hero section, search functionality, and animal cards. Features a modern design with floating elements and smooth animations.*

### 🐾 Animal Donation Page
![Donation Page](https://res.cloudinary.com/djhhijldt/image/upload/v1752701041/Screenshot_2025-07-17_024530_sgzx9d.png)
*Individual animal donation page showing "pinky" - a dog with a red bandage. Clean two-column layout with animal details and donation form.*

### 💳 Payment Success
![Payment Success](https://res.cloudinary.com/djhhijldt/image/upload/v1752701052/Screenshot_2025-07-17_024631_mkgmy6.png)
*Razorpay payment confirmation overlay showing successful transaction with green checkmark and payment details.*

### 📊 Admin Dashboard - Donations
![Admin Dashboard](https://res.cloudinary.com/djhhijldt/image/upload/v1752701066/Screenshot_2025-07-17_024831_r8ubmc.png)
*Admin donations management page displaying total amount (₹7,610), total donations (7), average donation (₹1,087), and detailed donation table.*

---

## Features

- **Public Portal**
  - Browse all animals (name, image, description)
  - Search, filter, and responsive grid/list views
  - "Donate Now" button for each animal
  - Secure payment via Razorpay (test mode supported)
  - Success page and confirmation

- **Admin Dashboard**
  - Secure login (JWT-based)
  - Add, edit, delete animals (with image upload via Cloudinary)
  - View all donations and stats
  - Responsive, modern UI

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Axios, Razorpay (client), Cloudinary (client), React Toastify
- **Backend:** Node.js, Express, MongoDB, Mongoose, Zod, Razorpay Node SDK, JWT, dotenv

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud)
- Razorpay test account
- Cloudinary account (for image uploads)

---

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pet
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
MONGO_URL=mongodb://localhost:27017/pet-shelter
PORT=8000
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:

```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

Start the frontend dev server:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

---

## Folder Structure

```
pet/
  backend/
    src/
      models/
      routes/
      controller/
      services/
      middleware/
      config/
    package.json
    .env
  frontend/
    src/
      components/
      contexts/
      pages/
      services/
      utils/
      App.jsx
      main.jsx
    package.json
    .env
```

---

## MongoDB Schemas

### Animal

```js
{
  name: String,
  description: String,
  imageUrl: String,
  type: String,
  category: String (optional)
}
```

### Donation

```js
{
  donorName: String,
  donorEmail: String,
  amount: Number,
  animal: ObjectId (ref: Animal),
  paymentId: String,
  createdAt: Date
}
```

---

## API Endpoints

### Animals

- `GET /api/animals` – List all animals (public)
- `GET /api/animals/:id` – Get animal by ID (public)
- `POST /api/animals` – Add animal (admin only)
- `PUT /api/animals/:id` – Update animal (admin only)
- `DELETE /api/animals/:id` – Delete animal (admin only)

### Donations

- `GET /api/donations` – List all donations (admin only)
- `POST /api/donations` – Create donation record

### Payments

- `POST /api/payment/orders` – Create Razorpay order
- `POST /api/payment/verify` – Verify payment and record donation

### Admin

- `POST /api/admin/login` – Admin login (returns JWT)

---

## Payment Testing

- Use UPI ID: `success@razorpay` for successful test payments.
- See Razorpay docs for more test options.

---

## Admin Credentials (Demo)

- Username: `admin`
- Password: `admin123`

---

## Deployment

### Backend (Render)
- **URL:** https://your-backend.onrender.com/
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

### Frontend (Vercel)
- **URL:** https://aidforpaws.vercel.app/
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

## License

MIT

---

**For any issues, please open an issue.**
