# Shared-server certificate migration — 9 September 2026

Migrated these domains and their existing `www` aliases from ZeroSSL to separate Let's Encrypt certificates:

- `novapets.in`
- `novaceptai.com`
- `novaceptai.in`
- `novaceptai.online`
- `hxn.life`

All ten public hostnames were verified with normal TLS validation: Let's Encrypt issuer, HTTPS 200 and their existing HTTP-to-HTTPS redirects. Initial certificates expire on 8 December 2026. The academy certificate continues working independently.

Certificate files are `/etc/letsencrypt/live/<domain>/fullchain.pem` and `privkey.pem`. Renewal is handled by the existing `certbot.timer`. Each certificate saves this deploy hook:

```sh
/usr/sbin/nginx -t && /usr/bin/systemctl reload nginx
```

HTTP challenge requests are served from `/var/www/letsencrypt/.well-known/acme-challenge/`. Keep inbound port 80 available for renewal.

Changed only challenge handling and the relevant certificate paths in these files:

- `/etc/nginx/sites-available/novaceptai.online`
- `/etc/nginx/sites-available/nova-pet-care.conf`
- `/etc/nginx/sites-available/hxn.life`

Original Nginx files were backed up to `/etc/nginx/certificate-backups/20260909-142622/`. Old ZeroSSL certificate/key files were retained in their original locations. Application roots, proxies and unrelated hosts—including `dev.hxn.life`—were not migrated or modified. Existing Nginx protocol-option warnings predated this migration; configuration validation succeeds.

The old certificates for `novaceptai.in`, `novaceptai.online` and `hxn.life` had already expired; this migration restored valid HTTPS for those names. Avoid restoring those expired certificates as a rollback strategy.

To test a certificate's renewal again:

```sh
sudo certbot renew --cert-name novapets.in --dry-run --run-deploy-hooks --no-random-sleep-on-renew
```

Replace the certificate name for each domain. Test configuration with `sudo nginx -t` before any future Nginx reload.

All five individual renewal simulations passed on 9 September 2026, including the Nginx deploy hook. The shared renewal timer was confirmed active.
