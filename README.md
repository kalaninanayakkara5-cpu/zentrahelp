# Zentra Holdings - Lawn & Landscaping Application

A full-stack web application for Zentra Holdings, a professional lawn care and landscaping company. Built with React, TypeScript, and Tailwind CSS, featuring a complete admin panel for content management.

## Features

### Public Website
- **Homepage** with hero slider and customer testimonials
- **Services** showcase with detailed descriptions
- **Projects** portfolio with before/after galleries
- **Image Gallery** with category filtering
- **About** page with company story and values
- **Blog** with landscaping tips and insights
- **Contact** page with service booking form
- **Responsive design** optimized for all devices

### Admin Panel
- **Dashboard** with analytics and quick actions
- **Booking Management** for service requests
- **Service Management** with image uploads
- **Project Management** with before/after photos
- **Gallery Management** with category organization
- **Testimonial Moderation** with approval workflow
- **Hero Slider Management** for homepage
- **Settings** for admin credentials

### Technical Features
- **Supabase Integration** for database and storage
- **Local Storage Fallback** for demo mode
- **Email Notifications** via Resend API
- **Image Upload** with preview functionality
- **Form Validation** with React Hook Form and Yup
- **Animations** with Framer Motion
- **Toast Notifications** for user feedback
- **Responsive Design** with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (optional - works in demo mode)
- Resend account for email notifications (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zentra-holdings
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup (Optional)**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - `VITE_RESEND_API_KEY` - Your Resend API key for emails
   - `VITE_RESEND_FROM_EMAIL` - From email address
   - `VITE_RESEND_TO_EMAIL` - Admin email address

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Public website: `http://localhost:5173`
   - Admin panel: `http://localhost:5173/admin`
   - Admin credentials: `admin123` / `admin123`

## Database Setup (Optional)

The application works in demo mode with localStorage, but for production use:

1. **Create a Supabase project**
2. **Run the migrations** in the `supabase/migrations` folder
3. **Configure environment variables**
4. **Enable Row Level Security** policies

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, Footer components
│   └── UI/             # Modal, LoadingSpinner, etc.
├── pages/              # Public pages
│   ├── admin/          # Admin panel pages
│   └── ...             # Public pages
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── index.css           # Global styles
```

## Key Technologies

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** with Yup validation
- **Framer Motion** for animations
- **Supabase** for backend services
- **Resend** for email notifications
- **Lucide React** for icons

## Demo Features

The application includes comprehensive demo data:
- Sample services and projects
- Gallery images with categories
- Customer testimonials
- Admin functionality
- Booking system
- Email notifications (when configured)

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
The application is ready for deployment to static hosting platforms. Make sure to:
1. Configure environment variables
2. Set up Supabase database
3. Configure email service (optional)

## Admin Panel Usage

1. **Access**: Navigate to `/admin` and login with `admin123`/`admin123`
2. **Dashboard**: View statistics and recent activity
3. **Bookings**: Manage service booking requests
4. **Content**: Add/edit services, projects, and gallery images
5. **Testimonials**: Approve or reject customer reviews
6. **Settings**: Update admin credentials

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for Zentra Holdings.

## Support

For support or questions, contact the development team or refer to the documentation in the codebase.