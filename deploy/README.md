# Deploy academy.novaceptai.com

Deployed on 9 September 2026 at https://academy.novaceptai.com. The production build is served from `/var/www/novaai-academy`; the dedicated host is `/etc/nginx/sites-available/academy.novaceptai.com`, enabled through `sites-enabled`. Let’s Encrypt issued the initial certificate on 9 September 2026, expiring 8 December 2026. Renewal uses the existing Certbot timer and the saved Nginx validation/reload hook.

The following steps document the initial deployment. Do not rerun the HTTP bootstrap over the working HTTPS host for routine content updates.

## 1. DNS

In the DNS zone for `novaceptai.com`, create:

| Type | Name    | Value         | TTL                             |
| ---- | ------- | ------------- | ------------------------------- |
| A    | academy | 44.218.41.180 | 600 seconds or provider default |

The inspected domain uses `ns51.domaincontrol.com` and `ns52.domaincontrol.com` (consistent with GoDaddy DNS). The server's public IPv4 matches the existing parent-domain A record. Confirm this is the intended stable public IP before adding the record. Do not add an AAAA record unless this server has working public IPv6. Leave existing DNS records unchanged.

Confirm propagation with `dig +short academy.novaceptai.com A`. It should return `44.218.41.180`. Inbound TCP 80 and 443 must reach Nginx through the server firewall and cloud security group. HTTP-01 validation and subsequent renewals require port 80.

## 2. Build and install the static files

Run as the repository owner, using sudo only for the production directories. No Node service, PM2 process or Vite server is needed in production.

```sh
cd /srv/novaai-academy
npm ci
npm run lint
npm run typecheck
npm run build
sudo install -d -m 755 /var/www/novaai-academy /var/www/letsencrypt/.well-known/acme-challenge
sudo cp -R dist/. /var/www/novaai-academy/
sudo find /var/www/novaai-academy -type d -exec chmod 755 {} +
sudo find /var/www/novaai-academy -type f -exec chmod 644 {} +
```

For future updates, back up the current academy webroot first. Copy hashed assets before replacing `index.html`, and retain old assets temporarily so existing browser sessions still work.

## 3. Enable HTTP for certificate validation

The existing default Nginx host drops unknown hostnames, so DNS alone will not serve the academy. Install only this dedicated host. If either destination already exists, inspect and back it up before proceeding.

```sh
sudo install -m 644 deploy/nginx/academy.http.conf /etc/nginx/sites-available/academy.novaceptai.com
sudo ln -s /etc/nginx/sites-available/academy.novaceptai.com /etc/nginx/sites-enabled/academy.novaceptai.com
sudo nginx -t && sudo systemctl reload nginx
```

Verify the ACME path from outside the server before requesting a certificate:

```sh
printf 'academy-acme-check\n' | sudo tee /var/www/letsencrypt/.well-known/acme-challenge/academy-check
curl --fail http://academy.novaceptai.com/.well-known/acme-challenge/academy-check
sudo rm /var/www/letsencrypt/.well-known/acme-challenge/academy-check
```

The response must be `academy-acme-check`. If testing locally, also verify from another network. Stop and resolve DNS/firewall/routing errors before continuing.

## 4. Request a free Let's Encrypt certificate

Certbot 2.9.0 is installed and the existing `certbot.timer` is active. The webroot method follows the existing server pattern and does not stop Nginx or automatically edit unrelated hosts. The current `novaceptai.com` certificate covers only the root and `www`, so this subdomain needs its own certificate.

```sh
sudo certbot certonly --webroot \
  -w /var/www/letsencrypt \
  -d academy.novaceptai.com \
  --cert-name academy.novaceptai.com \
  --deploy-hook '/usr/sbin/nginx -t && /usr/bin/systemctl reload nginx'
```

Use an existing ACME account when prompted, or supply an owner-controlled email and accept the subscriber agreement interactively. No contact email is invented in this configuration. Certbot saves the deploy hook for renewal so Nginx picks up renewed certificates.

## 5. Enable HTTPS and verify renewal

Only proceed when certificate issuance succeeds:

```sh
sudo install -m 644 deploy/nginx/academy.https.conf /etc/nginx/sites-available/academy.novaceptai.com
sudo nginx -t && sudo systemctl reload nginx
curl -I https://academy.novaceptai.com/
curl -I http://academy.novaceptai.com/
sudo certbot renew --cert-name academy.novaceptai.com --dry-run --run-deploy-hooks --no-random-sleep-on-renew
systemctl list-timers --all certbot.timer
```

Expect HTTPS 200 and HTTP 301 to HTTPS. Confirm the browser shows a valid certificate for `academy.novaceptai.com`, assets load, mobile navigation works and the enquiry builds the correct WhatsApp message. Renewal dry-run uses the staging CA, and `--run-deploy-hooks` checks the reload hook too. No additional renewal cron job is needed while the existing timer is active.

If HTTPS configuration validation fails, restore `academy.http.conf` to the dedicated site file, test again and reload only after validation succeeds. Other applications' configuration files should never be replaced. Keep the academy ACME location reachable for future renewals.

References: [Certbot webroot and renewal documentation](https://eff-certbot.readthedocs.io/en/stable/using.html#webroot), [Let's Encrypt HTTP-01 requirements](https://letsencrypt.org/docs/challenge-types/).
