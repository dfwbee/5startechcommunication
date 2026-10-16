# Supabase setup (developer, ~10 minutes, one time)

Result: the owner opens `yoursite.com/#admin`, logs in, and can add / edit / delete devices and upload photos himself.

## 1. Create the project
- Go to supabase.com, sign in, click **New project**. Pick a name, a database password (save it), and a nearby region.

## 2. Run the setup SQL
- Supabase dashboard > **SQL Editor** > **New query**.
- Open `supabase/setup.sql`, copy everything, paste, click **Run**.
- This creates the devices table, the photo storage, the security rules, and loads the 56 starting devices.
- Check: **Table Editor** > `uk_devices` should show 56 rows. **Storage** should show a `device-photos` bucket.

## 3. Turn OFF public sign-ups (important)
- **Authentication** > **Sign In / Providers** (or **Settings**) > turn **off** "Allow new users to sign up".
- Why: anyone who is "signed in" can edit devices. With sign-ups off, only the account you create can.

## 4. Create the owner's login
- **Authentication** > **Users** > **Add user** > **Create new user**.
- Enter his email and a strong password. Tick **Auto Confirm User**.
- Give him the email + password. He can change the password later if you add that, or you can reset it here.

## 5. Connect the website
- **Project Settings** > **API**. Copy the **Project URL** and the **anon public** key.
- In the project root create a file named `.env.local`:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

- Restart `npm run dev`. The website now loads devices from Supabase.
- On your host (Vercel/Netlify/etc.) add the same two variables under Environment Variables, then redeploy.
- The anon key is meant to be public. The security rules from step 2 are what protect the data. NEVER use the `service_role` key in this project.

## 6. Test
- Open `http://localhost:3000/#admin`, log in, change a price, refresh the website: it should update.
- Upload a photo on a device: it should appear on that card.

## How the site chooses its data
1. Supabase (if the two variables are set and the query works)
2. `public/uk-used-inventory.csv`
3. The built-in list in `src/data/ukUsedData.ts`

So if Supabase is down or not configured, the website still shows devices.
