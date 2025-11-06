# Stripe Integration Setup Guide

This guide will help you complete the Stripe integration for your personality quiz app.

## Prerequisites

1. A Stripe account (sign up at [stripe.com](https://stripe.com))
2. Supabase CLI installed (`npm install -g supabase`)
3. Your Supabase project linked locally

## Step 1: Get Your Stripe Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
4. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)

⚠️ **Important**: Never commit your secret key to version control!

## Step 2: Configure Environment Variables

### Frontend (.env file)
Update your `.env` file with your Stripe publishable key:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### Backend (Supabase Secrets)
Set your Stripe secret key in Supabase:

```bash
# Login to Supabase CLI
supabase login

# Link your project (if not already linked)
supabase link --project-ref your-project-ref

# Set the Stripe secret key
supabase secrets set STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

## Step 3: Deploy the Edge Function

Deploy the payment intent creation function:

```bash
supabase functions deploy create-payment-intent
```

Verify deployment:
```bash
supabase functions list
```

## Step 4: Test the Integration

### Test Cards (Use in Test Mode)

- **Success**: `4242 4242 4242 4242`
- **Requires Authentication**: `4000 0025 0000 3155`
- **Declined**: `4000 0000 0000 9995`

Use any future expiry date, any 3-digit CVC, and any postal code.

### Testing Locally

1. Start Supabase locally:
   ```bash
   supabase start
   ```

2. Serve the function locally:
   ```bash
   supabase functions serve create-payment-intent --env-file supabase/.env.local
   ```

3. Test with curl:
   ```bash
   curl -i --location --request POST 'http://localhost:54321/functions/v1/create-payment-intent' \
     --header 'Authorization: Bearer YOUR_ANON_KEY' \
     --header 'Content-Type: application/json' \
     --data '{"amount":9.99,"description":"Test payment"}'
   ```

## Step 5: Production Checklist

Before going live:

- [ ] Switch to live Stripe keys (pk_live_ and sk_live_)
- [ ] Update VITE_STRIPE_PUBLISHABLE_KEY in production environment
- [ ] Update STRIPE_SECRET_KEY in Supabase production secrets
- [ ] Test payment flow end-to-end
- [ ] Set up Stripe webhooks for payment confirmations (optional)
- [ ] Review Stripe's security best practices

## Troubleshooting

### "Stripe publishable key is not set"
- Check that VITE_STRIPE_PUBLISHABLE_KEY is set in your .env file
- Restart your dev server after updating .env

### "Failed to create payment intent"
- Verify STRIPE_SECRET_KEY is set in Supabase secrets
- Check Edge Function logs: `supabase functions logs create-payment-intent`
- Ensure your Stripe account is activated

### CORS errors
- The Edge Function includes CORS headers
- If issues persist, check your Supabase project settings

### Payment not confirming
- Check browser console for errors
- Verify the clientSecret is being returned from the Edge Function
- Test with different test cards

## Security Notes

✅ **Good Practices:**
- Secret key stored in Supabase secrets (server-side only)
- Publishable key in frontend (safe to expose)
- Payment intents created server-side
- CORS properly configured

❌ **Never Do:**
- Commit secret keys to git
- Expose secret keys in frontend code
- Skip server-side validation
- Use test keys in production

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Stripe Test Cards](https://stripe.com/docs/testing)

## Next Steps

Consider adding:
- Payment history tracking in Supabase database
- Stripe webhooks for payment confirmations
- Email receipts via Stripe
- Subscription support for recurring payments
