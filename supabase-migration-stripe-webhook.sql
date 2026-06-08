-- ============================================================
-- Supabase SQL Migration: Create subscriptions table
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- Create subscriptions table for Stripe webhook sync
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    tier TEXT NOT NULL CHECK (tier IN ('course', 'membership', 'coaching')),
    access_level INTEGER NOT NULL DEFAULT 0,
    stripe_session_id TEXT,
    stripe_customer_id TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled', 'expired')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON public.subscriptions(email);

-- Index for user_id lookup
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);

-- Unique constraint to prevent duplicate active subscriptions per email
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_email_tier_active 
    ON public.subscriptions(email, tier) WHERE status = 'active';

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: authenticated users can read their own subscriptions
CREATE POLICY "Users can read own subscriptions"
    ON public.subscriptions
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: service_role can do everything (used by webhook)
-- (service_role bypasses RLS by default, no policy needed)

-- ============================================================
-- Optional: Add subscription check helper view
-- ============================================================
CREATE OR REPLACE VIEW public.user_access AS
SELECT 
    email,
    user_id,
    bool_or(status = 'active') AS has_active_subscription,
    MAX(access_level) FILTER (WHERE status = 'active') AS max_access_level,
    array_agg(tier) FILTER (WHERE status = 'active') AS active_tiers
FROM public.subscriptions
GROUP BY email, user_id;

-- ============================================================
-- Note: After running this migration,
-- create the trigger or use Supabase Dashboard → Database → Replication
-- to auto-set user_id when a user signs up with matching email.
-- Or run this AFTER the webhook processes a checkout:
--   UPDATE public.subscriptions 
--   SET user_id = (SELECT id FROM auth.users WHERE email = subscriptions.email)
--   WHERE user_id IS NULL;
-- ============================================================
