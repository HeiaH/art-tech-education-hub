import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

type SubscriptionStatus = {
  status: 'ok' | 'not_configured' | 'error' | 'loading';
  hasAccess: boolean;
  subscriptions: Array<{
    email: string;
    tier: string;
    access_level: number;
    status: string;
    stripe_session_id?: string;
    created_at?: string;
  }>;
  error?: string;
};

/**
 * Hook to check a user's subscription status from the server.
 * Calls api.heiah.de/api/subscription-status via the Vercel proxy.
 * Falls back gracefully if the backend is not configured.
 */
export function useSubscription(email?: string) {
  const { user } = useAuth();
  const userEmail = email || user?.email;
  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    status: 'loading',
    hasAccess: false,
    subscriptions: [],
  });

  useEffect(() => {
    if (!userEmail) {
      setSubscription({
        status: 'not_configured',
        hasAccess: false,
        subscriptions: [],
      });
      return;
    }

    let cancelled = false;

    const check = async () => {
      try {
        const res = await fetch(
          `/api/subscription-status?email=${encodeURIComponent(userEmail)}`
        );
        const data = await res.json();

        if (cancelled) return;

        if (data.status === 'not_configured') {
          // Backend not configured — fall back to localStorage
          const localPurchases = getLocalPurchases();
          setSubscription({
            status: 'not_configured',
            hasAccess: localPurchases.length > 0,
            subscriptions: localPurchases.map((tier: string) => ({
              email: userEmail,
              tier,
              access_level: tier === 'membership' ? 20 : tier === 'coaching' ? 30 : 10,
              status: 'active',
            })),
          });
        } else if (data.status === 'ok') {
          setSubscription({
            status: 'ok',
            hasAccess: data.has_access || false,
            subscriptions: data.subscriptions || [],
          });
        } else {
          setSubscription({
            status: 'error',
            hasAccess: false,
            subscriptions: [],
            error: data.detail || 'Unknown error',
          });
        }
      } catch (err) {
        if (cancelled) return;
        // Network error — fall back to localStorage
        const localPurchases = getLocalPurchases();
        setSubscription({
          status: 'error',
          hasAccess: localPurchases.length > 0,
          subscriptions: localPurchases.map((tier: string) => ({
            email: userEmail,
            tier,
            access_level: tier === 'membership' ? 20 : tier === 'coaching' ? 30 : 10,
            status: 'active',
          })),
          error: String(err),
        });
      }
    };

    check();
    return () => { cancelled = true; };
  }, [userEmail]);

  return subscription;
}

function getLocalPurchases(): string[] {
  try {
    const raw = localStorage.getItem('heiah_purchases');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
