# Pet Shelter Donation Portal

A full-featured React frontend application for a pet shelter donation system with admin dashboard and public donation portal.

## Features

### Public Portal
- Browse all animals available for donation
- View detailed animal information
- Secure donation processing with Razorpay
- Responsive design for all devices

### Admin Dashboard
- Secure admin authentication
- Animal management (CRUD operations)
- Image upload with Cloudinary integration
- Donation tracking and analytics
- Responsive admin interface

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Payment**: Razorpay Integration
- **Image Upload**: Cloudinary
- **Notifications**: React Toastify
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API server running
- Razorpay test account
- Cloudinary account

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd pet-shelter-portal
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Create environment file
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update environment variables in `.env`:
\`\`\`env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
\`\`\`

5. Start the development server
\`\`\`bash
npm run dev
\`\`\`

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── AnimalCard.jsx
│   ├── ConfirmDialog.jsx
│   ├── Loading.jsx
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── contexts/           # React contexts
│   └── AuthContext.jsx
├── pages/             # Page components
│   ├── admin/         # Admin dashboard pages
│   │   ├── AnimalForm.jsx
│   │   ├── AnimalsList.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DonationsList.jsx
│   │   └── Login.jsx
│   ├── DonatePage.jsx
│   ├── HomePage.jsx
│   └── SuccessPage.jsx
├── services/          # API service layers
│   ├── animalAPI.js
│   ├── api.js
│   ├── cloudinaryAPI.js
│   ├── donationAPI.js
│   └── paymentAPI.js
├── utils/             # Utility functions
│   └── validation.js
├── App.jsx           # Main app component
├── index.css         # Global styles
└── main.jsx          # App entry point
\`\`\`

## API Endpoints

The frontend expects the following backend API endpoints:

### Animals
- `GET /api/animals` - Get all animals
- `GET /api/animals/:id` - Get single animal
- `POST /api/animals` - Create new animal
- `PUT /api/animals/:id` - Update animal
- `DELETE /api/animals/:id` - Delete animal

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create donation record

### Payments
- `POST /api/payment/orders` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

## Admin Credentials

For demo purposes, the admin login uses hardcoded credentials:
- **Username**: admin
- **Password**: admin123

## Features Implementation

### Payment Integration
- Razorpay test mode integration
- Secure payment verification
- Order creation and payment processing
- Success/failure handling

### Image Upload
- Cloudinary integration for image storage
- File validation (type and size)
- Image preview functionality
- Drag and drop support

### Authentication
- Simple token-based authentication
- Protected routes for admin
- Persistent login state

### Form Validation
- Client-side validation
- Email format validation
- Required field validation
- Amount validation

## Build and Deployment

### Build for production
\`\`\`bash
npm run build
\`\`\`

### Preview production build
\`\`\`bash
npm run preview
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
