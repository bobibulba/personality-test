# Create Payment Intent Edge Function

This Supabase Edge Function securely creates Stripe payment intents.

## Setup

1. Set the Stripe secret key in your Supabase project:
   ```bash
   supabase secrets set STRIPE_SECRET_KEY=your_stripe_secret_key_here
   ```

2. Deploy the function:
   ```bash
   supabase functions deploy create-payment-intent
   ```

## Usage

POST request to: `https://your-project.supabase.co/functions/v1/create-payment-intent`

Request body:
```json
{
  "amount": 9.99,
  "currency": "usd",
  "description": "Premium Personality Report"
}
```

Response:
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

## Testing Locally

```bash
supabase functions serve create-payment-intent --env-file supabase/.env.local
```

Then test with:
```bash
curl -i --location --request POST 'http://localhost:54321/functions/v1/create-payment-intent' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"amount":9.99,"description":"Test payment"}'
```
