-- =============================================
-- Supabase RLS Policies for Enterprise Dashboard
-- =============================================
-- Run this SQL in your Supabase SQL Editor to fix the infinite recursion error

-- =============================================
-- 1. PROFILES TABLE POLICIES
-- =============================================

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
DROP POLICY IF EXISTS "System can insert profiles" ON profiles;

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all profiles (for the Users page)
CREATE POLICY "Users can view all profiles"
ON profiles
FOR SELECT
TO authenticated
USING (true);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy: Allow system to insert profiles during signup
-- This allows the trigger or signup function to create profiles
CREATE POLICY "System can insert profiles"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- =============================================
-- 2. DATA_RECORDS TABLE POLICIES
-- =============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view all data records" ON data_records;
DROP POLICY IF EXISTS "Admins can insert data records" ON data_records;
DROP POLICY IF EXISTS "Admins can update data records" ON data_records;
DROP POLICY IF EXISTS "Admins can delete data records" ON data_records;

-- Enable RLS on data_records table
ALTER TABLE data_records ENABLE ROW LEVEL SECURITY;

-- Policy: All authenticated users can view data records
CREATE POLICY "Users can view all data records"
ON data_records
FOR SELECT
TO authenticated
USING (true);

-- Policy: Only admins can insert data records
-- You can customize this based on your needs
CREATE POLICY "Admins can insert data records"
ON data_records
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Policy: Only admins can update data records
CREATE POLICY "Admins can update data records"
ON data_records
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Policy: Only admins can delete data records
CREATE POLICY "Admins can delete data records"
ON data_records
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- =============================================
-- 3. CREATE PROFILE ON SIGNUP (TRIGGER)
-- =============================================

-- Function to create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, department, role, status)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', ''),
    COALESCE(new.raw_user_meta_data->>'department', 'General'),
    'viewer', -- default role
    'active' -- default status
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- 4. VERIFICATION QUERIES
-- =============================================

-- Run these queries to verify the setup:
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';
-- SELECT * FROM pg_policies WHERE tablename = 'data_records';
