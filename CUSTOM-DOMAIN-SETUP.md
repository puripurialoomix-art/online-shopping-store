# Custom Domain Setup Guide
## Domain: bigwinoffer.com.tr

### Step 1: Add Domain in Cloudflare Pages

1. Go to: https://dash.cloudflare.com/
2. Click on **Workers & Pages**
3. Select your project: **online-shopping-store**
4. Click on **Custom domains** tab
5. Click **Set up a custom domain**
6. Enter: `bigwinoffer.com.tr`
7. Click **Continue**

Cloudflare will show you DNS records to add.

---

### Step 2: Add DNS Records in Your Domain Registrar

Go to your domain registrar's DNS management panel and add these records:

#### For Root Domain (bigwinoffer.com.tr):

**Option A - If CNAME is allowed for root:**
```
Type: CNAME
Host Name: @ (or leave empty or bigwinoffer.com.tr)
Points to: online-shopping-store.pages.dev
TTL: 3600 (or Auto)
```

**Option B - If only A records allowed for root:**

First, get the Cloudflare Pages IP addresses by running this command:
```bash
nslookup online-shopping-store.pages.dev
```

Then add A records with those IPs:
```
Type: A
Host Name: @ (or leave empty)
IP Address: [IP from Cloudflare]
TTL: 3600
```

#### For WWW Subdomain:
```
Type: CNAME
Host Name: www
Points to: online-shopping-store.pages.dev
TTL: 3600 (or Auto)
```

---

### Step 3: Alternative - Use Cloudflare Nameservers (RECOMMENDED)

**Best Option:** Transfer your domain's nameservers to Cloudflare for automatic DNS management.

1. Go to Cloudflare Dashboard
2. Click **Add a Site**
3. Enter: `bigwinoffer.com.tr`
4. Choose **Free Plan**
5. Cloudflare will scan your DNS records
6. Click **Continue**
7. Cloudflare will give you 2 nameservers like:
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`

8. Go to your domain registrar
9. Find **Nameserver Settings** or **DNS Management**
10. Change nameservers to Cloudflare's nameservers
11. Wait 4-48 hours for propagation

Once nameservers are changed, Cloudflare will automatically manage all DNS records!

---

### Step 4: Verify Setup

After adding DNS records, wait 5-30 minutes and check:

1. Visit: https://bigwinoffer.com.tr
2. Visit: https://www.bigwinoffer.com.tr
3. Check SSL certificate (should be automatic)

---

### Troubleshooting

**If site doesn't load:**
- Wait longer (DNS can take up to 48 hours)
- Check DNS propagation: https://dnschecker.org/
- Verify DNS records are correct
- Check Cloudflare Pages dashboard for any errors

**Current Cloudflare Pages URL:**
https://aa8a1089.online-shopping-store.pages.dev

This will continue to work even after custom domain is added.
