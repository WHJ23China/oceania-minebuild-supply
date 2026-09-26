# Oceania MineBuild Supply

Static English marketing site for **Oceania MineBuild Supply** — a China sourcing desk for mining & construction site consumables across Australia, New Zealand, PNG and the Pacific.

**Tagline:** Mining & Construction Materials Desk for Australia, New Zealand, PNG & the Pacific

---

## Isolation note / 隔离说明

**EN:** This project is a standalone static site. It is **completely isolated** from other systems (including zhongpeitong / 中配通). Do not mix source trees, deploy pipelines, or credentials. Ready to push to a **separate** GitHub repository later — this folder is not part of any other product repo.

**ZH:** 本项目为独立静态站点，与其他系统（含中配通 / zhongpeitong）**完全隔离**。请勿混用源码目录、部署流水线或凭证。可稍后单独推送到一个 **独立的** GitHub 仓库；本目录不属于其他产品仓库。

---

## Preview / 本地预览

From this directory:

```bash
cd /workspace/oceania-minebuild-supply
python3 -m http.server 8765
```

Open: [http://127.0.0.1:8765/](http://127.0.0.1:8765/)

Or open any `.html` file directly in a browser (mailto form works best via a local server).

---

## Email config / 邮箱配置

Mailto MVP — the quote form opens the user’s email client with a pre-filled RFQ.

| Item | Value |
|------|--------|
| Config file | `js/config.js` |
| Constant | `CONTACT_EMAIL` |
| Placeholder | `josephweng58@gmail.com` |

**Before go-live:** replace `josephweng58@gmail.com` with your real quotes inbox. The About page reads the same constant for the displayed mailto link. Do **not** invent a real address in the repo.

**上线前：** 将 `js/config.js` 中的 `CONTACT_EMAIL` 改为真实询价邮箱。About 页会读取同一常量。请勿在仓库中编造真实邮箱。

---

## Pages / 页面

| Page | File |
|------|------|
| Home | `index.html` |
| Categories | `categories.html` |
| Fleet & Equipment Parts (RFQ only) | `fleet-parts.html` |
| Delivery Corridors | `delivery.html` |
| How Sourcing Works | `how-sourcing-works.html` |
| Request a Quote | `quote.html` |
| About / Contact | `about.html` |

**Categories:** PPE & Safety · Fasteners & Hardware · Hose, Fittings & Valves · Lubricants, Cleaners & Packaging · Temporary Power & Site Lighting (confirmed certifications only).

**Fleet parts:** RFQ-only — no public catalogue.

**Corridors:** Sydney · Auckland · Port Moresby (+ other Oceania ports on request).

---

## Stack / 技术栈

- Static HTML + CSS + minimal JS (no build step, no framework)
- Design: industrial navy / steel / safety-orange, responsive
- Quote form: client validation + `mailto:` MVP

---

## Deploy notes / 部署说明

1. Host the folder contents on any static host (GitHub Pages, Netlify, S3, nginx, etc.).
2. Set `CONTACT_EMAIL` in `js/config.js`.
3. Optional: add a custom domain later (not included in this repo).
4. Push to a **new, separate** GitHub repo when ready — do not commit this into zhongpeitong.

**部署：** 将本目录静态文件托管到任意静态主机；配置 `CONTACT_EMAIL`；需要时再推送到独立 GitHub 仓库，勿并入中配通仓库。

---

## License / ownership

Independent venture marketing site. B2B industrial positioning — not retail automotive.
