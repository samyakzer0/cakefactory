# 🎂 3D Cake Shop - Database & Shareable Links Setup

## Prerequisites

1. **Supabase Account**: Sign up at [https://supabase.com](https://supabase.com)
2. **Node.js**: Make sure you have Node.js installed

## Setup Instructions

### 1. Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details and wait for it to be created

### 2. Set Up Database

1. In your Supabase project dashboard, go to the **SQL Editor**
2. Create a new query
3. Copy and paste the contents of `supabase-schema.sql` from this project
4. Click "Run" to execute the SQL and create the `cakes` table

### 3. Configure Environment Variables

1. In your Supabase project, go to **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Create a `.env` file in the project root (you can copy `.env.example`):

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Replace the placeholder values with your actual Supabase credentials

### 4. Install Dependencies & Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Features

### ✨ Database Integration
- **Persistent Storage**: All cake designs are saved to Supabase
- **Unique IDs**: Each cake gets a unique UUID for sharing
- **Mock Mode**: App works without Supabase (generates mock IDs)

### 🔗 Shareable Links
- **Copy to Clipboard**: One-click link copying with visual feedback
- **Social Sharing**: Share directly to Twitter, Facebook, and WhatsApp
- **Direct URLs**: Access any cake via `yourdomain.com/{cake-id}`

### 🎨 User Experience
- **Loading States**: Smooth loading animations while saving/loading
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works beautifully on mobile and desktop

## How It Works

1. **Create a Cake** (`/create`):
   - Customize your cake with colors, text, candles, etc.
   - Click "Bake Now!" to save to database
   - Automatically redirected to shareable URL

2. **Share Your Cake** (`/{cake-id}`):
   - View your saved cake design
   - Copy link or share on social media
   - Anyone with the link can view your cake

3. **Mock Mode**:
   - If Supabase credentials are not configured, the app runs in mock mode
   - Generates temporary IDs (won't persist between sessions)
   - Perfect for testing without a database

## Database Schema

The `cakes` table stores:
- Cake configuration (colors, text, candles, etc.)
- Creation timestamp
- View counter (future feature)
- UUID for unique identification

## Troubleshooting

### "Cake not found" Error
- The cake ID may be invalid or the cake was deleted
- If using mock mode, IDs don't persist between sessions

### Save Button Not Working
- Check browser console for errors
- Verify Supabase credentials in `.env`
- Ensure the `cakes` table was created correctly

### Share Button Not Copying
- Some browsers require HTTPS for clipboard API
- Fallback method should work in most cases
- Try using the social share buttons instead

## Tech Stack

- **Frontend**: React + Three.js + React Three Fiber
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router

## Next Steps

- [ ] Add view counter functionality
- [ ] Implement cake gallery page
- [ ] Add user authentication
- [ ] Enable cake editing after creation
- [ ] Add cake deletion feature

---

Made with ❤️ and 🍰
