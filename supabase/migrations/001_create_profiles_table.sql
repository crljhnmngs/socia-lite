-- Create profiles table
CREATE TABLE profiles (
    -- Primary key linking to auth.users
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- User profile data (matching your form fields)
    "firstName" TEXT NOT NULL CHECK (length("firstName") >= 2 AND length("firstName") <= 50),
    "lastName" TEXT NOT NULL CHECK (length("lastName") >= 2 AND length("lastName") <= 50),
    avatar_url TEXT,
    role TEXT DEFAULT 'user',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can insert their own profile (during signup)
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id); 