 🚀 n8n Blog Automation - Complete Implementatie Plan

  📋 Overzicht

  Doel: Automatisch blog posts genereren in Adam Enfroy stijl wanneer je nieuwe platforms toevoegt aan Google Sheets.

  Workflow: Google Sheet → Short.io → Screenshot → Claude AI → Draft Post → Email Notificatie

  ROI:
  - ⏱️ Tijd bespaard: 15-20 uur/maand
  - 💰 Kosten: ~€0.20-0.80/maand
  - 📈 Output: 20-40 posts/maand mogelijk

  ---
  🎯 De 6-Stappen Workflow

  Stap 1: Google Sheets Trigger 📊

  Wat: Nieuwe rij toegevoegd aan spreadsheet triggert workflow

  Benodigde Kolommen:
  A: program_name         (bijv. "Upwork")
  B: affiliate_link       (bijv. "go.skilllinkup.com/upwork")
  C: description          (korte omschrijving)
  D: commission_type      (percentage/fixed/recurring/cpa)
  E: commission_value     (bijv. "30%" of "$150")
  F: cookie_duration      (bijv. 90 dagen)
  G: avg_earnings         (bijv. "$500/year")
  H: unique_benefits      (comma-separated, bijv. "High rates, Professional, Secure")
  I: category             (bijv. "General Freelance")

  ---
  Stap 2: Short.io API - Get Original URL 🔗

  Waarom: Om de originele platform URL te krijgen voor screenshot

  API Call:
  GET https://api.short.io/links/expand
  Authorization: YOUR_SHORTIO_KEY

  Body:
  {
    "domain": "go.skilllinkup.com",
    "path": "/upwork"
  }

  Response:
  {
    "originalURL": "https://www.upwork.com/..."
  }

  n8n Node: HTTP Request
  - Method: GET
  - URL: https://api.short.io/links/expand
  - Headers: Authorization: {{SHORTIO_KEY}}
  - Body: JSON met domain + path uit affiliate_link

  ---
  Stap 3: Playwright Screenshot 📸

  Waarom: Visuele content voor blog post

  Screenshot Specs:
  - URL: {{originalURL}} van Short.io
  - Viewport: 1920x1080
  - Wait: networkidle (fully loaded)
  - Clip: {x:0, y:0, width:1920, height:900}
  - Format: PNG
  - Filename: {{program_name_slug}}-{{timestamp}}.png

  Save Locations (beide!):
  /home/marvin/Documenten/skillLinkup/public/images/posts/
  /home/marvin/Documenten/skillLinkup-admin/public/images/posts/

  n8n Implementatie Opties:

  Optie A - Playwright MCP (Recommended):
  Je hebt al Playwright MCP! Gebruik deze via custom n8n node:
  // n8n Execute Command node
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }});
  await page.goto('{{originalURL}}', { waitUntil: 'networkidle' });
  await page.screenshot({
    path: '/path/to/screenshot.png',
    clip: { x: 0, y: 0, width: 1920, height: 900 }
  });
  await browser.close();

  Optie B - External Screenshot Service:
  - https://screenshotapi.net
  - https://urlbox.io
  - Kost ~$0.01-0.05 per screenshot

  ---
  Stap 4: Claude API - Generate Content ✍️

  Waarom: Adam Enfroy stijl content in seconds

  API Call:
  POST https://api.anthropic.com/v1/messages
  x-api-key: YOUR_ANTHROPIC_KEY
  anthropic-version: 2023-06-01
  Content-Type: application/json

  Body:
  {
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [{
      "role": "user",
      "content": "[See prompt below]"
    }]
  }

  Claude Prompt Template:
  Write a blog post section for {{program_name}} affiliate program in Adam Enfroy's conversational style.

  **Platform Data:**
  - Name: {{program_name}}
  - Description: {{description}}
  - Commission: {{commission_value}} ({{commission_type}})
  - Cookie Duration: {{cookie_duration}} days
  - Average Earnings: {{avg_earnings}}
  - Unique Benefits: {{unique_benefits}}
  - Affiliate Link: {{affiliate_link}}

  **Writing Style Requirements:**
  1. Conversational tone (use "they've got", "doesn't mess around", "let's be real")
  2. Short paragraphs (2-3 sentences maximum)
  3. **Bold** important numbers and features (markdown syntax)
  4. Include 1-2 rhetorical questions for engagement
  5. Personal touch ("Yeah, you heard that right", "Not gonna lie")
  6. Length: 250-350 words
  7. Write in ENGLISH

  **Structure:**
  1. **Opening Hook** (1-2 sentences)
     - Start with inline affiliate link: [{{program_name}}]({{affiliate_link}})
     - Add one-sentence "wow" description

  2. **Commission Details** (2-3 sentences)
     - Highlight the money (**bold the numbers**)
     - Explain commission type clearly
     - Add personal commentary

  3. **Earnings Potential** (2 sentences)
     - Mention average affiliate earnings
     - Make it relatable ("That's __ per month on autopilot")
     
  4. **Cookie Duration** (1-2 sentences)
     - Explain the {{cookie_duration}} day cookie window
     - Why longer cookies = more money
     
  5. **Unique Benefits** (3-4 bullet points or sentences)
     - List the {{unique_benefits}}
     - Keep each benefit to 1 sentence
     - Use **bold** for key features
     
  6. **Closing Take** (1-2 sentences)
     - Personal recommendation
     - Call to action (subtle, not pushy)

  **Output Format: MARKDOWN**
  - Use ### for heading: "### {{program_name}} Affiliate Program"
  - Use **bold** for emphasis
  - Use [text](url) for links
  - Add image at top: ![{{program_name}} Platform](/images/posts/{{screenshot_filename}})

  Example opening:
  "[Upwork](go.skilllinkup.com/upwork) is the **800-pound gorilla** of freelance marketplaces. They've got **12 million 
  freelancers** and **5 million clients**—yeah, those numbers are real."

  Cost: ~$0.01 per post (1K input + 1K output tokens)

  ---
  Stap 5: Create Draft Post in Admin 📝

  Waarom: Review voordat het live gaat

  API Endpoint:
  POST http://localhost:3002/api/posts

  Headers:
  Content-Type: application/json

  Body:
  {
    "title": "{{program_name}} Affiliate Program Review 2025",
    "slug": "{{program_name_slug}}-affiliate-program",
    "content": "{{generated_content}}",
    "feature_img": "/images/posts/{{screenshot_filename}}",
    "category_id": "{{category_id}}",
    "status": "draft",
    "author_name": "Marvin",
    "meta_description": "{{program_name}} affiliate program offers {{commission_value}} commission. Learn how to earn with this
  platform.",
    "tags": ["affiliate marketing", "{{program_name}}", "freelance platforms"]
  }

  n8n Node: HTTP Request
  - Method: POST
  - URL: http://localhost:3002/api/posts
  - Body: JSON (zie boven)

  ---
  Stap 6: Email Notification 📧

  Waarom: Je weet meteen dat er een nieuwe draft is

  Email Content:
  Subject: 🎉 New Blog Post Draft Ready: {{program_name}}

  Hey Marvin,

  I just generated a new blog post for the {{program_name}} affiliate program!

  📝 Title: {{program_name}} Affiliate Program Review 2025
  💰 Commission: {{commission_value}}
  🔗 Short Link: {{affiliate_link}}

  ✏️ Review & Edit:
  http://localhost:3002/posts/{{post_id}}/edit

  The post is in DRAFT status. Review the content, make any tweaks, and hit publish when ready!

  Cheers,
  Your n8n Bot 🤖

  n8n Node: Send Email (Gmail)
  - To: info@staycoolairco.nl
  - Subject: Template above
  - Body: HTML template

  ---
  🛠️ Implementatie Stappen

  Phase 1: Setup (30 min)

  1. n8n Cloud Account Setup
  - ✅ Ga naar https://n8n.cloud
  - ✅ Maak account (€20/maand starter plan)
  - ✅ Of self-host (gratis, maar meer werk)

  2. Google Sheets Setup (5 min)
  1. Maak nieuwe Google Sheet: "SkillLinkup Affiliate Programs"
  2. Voeg kolommen toe (A-I, zie boven)
  3. Voeg 1 test rij toe (bijv. Upwork)
  4. Deel sheet met n8n service account

  3. API Keys Verzamelen (10 min)
  ✅ Short.io API Key
     → https://app.short.io/settings/integrations/api-key

  ✅ Anthropic API Key (Claude)
     → https://console.anthropic.com/settings/keys
     → Gratis tier: $5 credit

  ✅ Admin Dashboard (optional)
     → Geen auth nodig voor localhost
     → Voor productie: voeg API key toe

  4. Credentials in n8n (10 min)
  n8n → Credentials → Add Credential:
  1. Google Sheets OAuth (connect account)
  2. HTTP Header Auth (Short.io key)
  3. HTTP Header Auth (Anthropic key)
  4. Gmail OAuth (notifications)

  ---
  Phase 2: Build Workflow (60 min)

  1. Import Workflow Blueprint
  1. Open n8n Cloud
  2. Click "Import from URL" of "Import from File"
  3. Upload: /docs/automation/n8n-blog-automation-workflow.json
  4. Workflow opens met alle notes

  2. Add Real Nodes (vervang notes met echte nodes):

  Node 1: Google Sheets Trigger
  Type: Google Sheets Trigger
  Sheet: SkillLinkup Affiliate Programs
  Trigger On: Row Added
  Columns: A-I (all)

  Node 2: HTTP Request (Short.io)
  Type: HTTP Request
  Method: GET
  URL: https://api.short.io/links/expand
  Authentication: Header Auth (Short.io credential)
  Body:
  {
    "domain": "go.skilllinkup.com",
    "path": "{{$json["affiliate_link"].split('/').pop()}}"
  }

  Node 3: Code Node (Playwright Screenshot)
  Type: Code (JavaScript)
  const puppeteer = require('puppeteer');

  // Get original URL from previous node
  const url = items[0].json.originalURL;
  const programName = items[0].json.program_name;
  const slug = programName.toLowerCase().replace(/\s+/g, '-');
  const filename = `${slug}-${Date.now()}.png`;

  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Navigate and screenshot
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  const screenshot = await page.screenshot({
    type: 'png',
    clip: { x: 0, y: 0, width: 1920, height: 900 }
  });

  await browser.close();

  // Save to both locations
  const fs = require('fs');
  const path1 = `/home/marvin/Documenten/skillLinkup/public/images/posts/${filename}`;
  const path2 = `/home/marvin/Documenten/skillLinkup-admin/public/images/posts/${filename}`;

  fs.writeFileSync(path1, screenshot);
  fs.writeFileSync(path2, screenshot);

  return [{ json: { ...items[0].json, screenshot_filename: filename }}];

  Node 4: HTTP Request (Claude API)
  Type: HTTP Request
  Method: POST
  URL: https://api.anthropic.com/v1/messages
  Authentication: Header Auth (Anthropic credential)
  Headers:
    - anthropic-version: 2023-06-01
  Body:
  {
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [{
      "role": "user",
      "content": "{{$json["claude_prompt"]}}"
    }]
  }

  Node 5: Set Variables (Prepare Post Data)
  Type: Set
  Values:
    post_title: "{{$json["program_name"]}} Affiliate Program Review 2025"
    post_slug: "{{$json["program_name"].toLowerCase().replace(/\s+/g, '-')}}-affiliate-program"
    post_content: "{{$json["content"][0]["text"]}}"
    post_feature_img: "/images/posts/{{$json["screenshot_filename"]}}"

  Node 6: HTTP Request (Create Draft)
  Type: HTTP Request
  Method: POST
  URL: http://localhost:3002/api/posts
  Body: (see Step 5 above)

  Node 7: Send Email
  Type: Gmail
  To: info@staycoolairco.nl
  Subject: "New Draft: {{$json["post_title"]}}"
  Body: (see Step 6 email template above)

  3. Connect Nodes
  Google Sheets → Short.io → Screenshot → Claude → Set → Create Post → Email

  4. Test with Sample Data
  1. Add test row to Google Sheet
  2. Watch n8n execution
  3. Check screenshots saved
  4. Check draft created in admin (port 3002)
  5. Check email received

  ---
  Phase 3: Go Live (15 min)

  1. Error Handling
  Add Error Workflow:
  - Catch HTTP errors (API failures)
  - Log to Google Sheet "Errors" tab
  - Send error email

  2. Activate Workflow
  1. n8n → Workflow Settings → Active: ON
  2. Test live: Add real platform to sheet
  3. Monitor first 5 executions

  3. Monitor & Optimize
  Week 1: Check every post manually
  Week 2: Adjust Claude prompt if needed
  Week 3: Full automation, spot check only

  ---
  💰 Cost Breakdown

  Monthly Costs:

  | Service    | Cost          | Usage            |
  |------------|---------------|------------------|
  | n8n Cloud  | €20/maand     | Starter plan     |
  | Claude API | €0.20-0.80    | 20-40 posts      |
  | Short.io   | €0            | Included in plan |
  | Playwright | €0            | Self-hosted      |
  | Total      | ~€20-21/maand | Full automation  |

  Alternative (Self-Host n8n):
  - n8n: €0 (Docker on VPS)
  - Claude: €0.20-0.80
  - Total: ~€1/maand (+ VPS kosten)

  ---
  📊 ROI Analysis

  Manual Process (current):
  - Time per post: 45-60 min
  - 20 posts/maand = 15-20 uur
  - Your hourly rate: ~€50/uur
  - Cost: €750-1000/maand in tijd

  Automated Process:
  - Time per post: 5 min review
  - 20 posts/maand = 100 min (1.7 uur)
  - Cost: €20-21/maand
  - Savings: €730-980/maand!

  Break-even: Day 1 🎉

  ---
  ✅ Quick Start Checklist

  Before You Start:

  - n8n account (Cloud of self-host)
  - Google Sheet created with kolommen
  - Short.io API key
  - Anthropic API key ($5 gratis credit)
  - Gmail voor notifications

  Implementation:

  - Import workflow blueprint
  - Add credentials to n8n
  - Replace notes met real nodes
  - Connect all nodes
  - Test with 1 sample platform
  - Verify draft created correctly
  - Check email notification
  - Activate workflow
  - Add 3-5 real platforms

  Week 1 Monitoring:

  - Check first 5 posts manually
  - Adjust Claude prompt if needed
  - Verify screenshots quality
  - Test affiliate links work
  - Monitor error rate

  ---
  🚨 Common Issues & Solutions

  Issue 1: Playwright Fails

  Symptom: Screenshot node errors
  Fix:
  - Increase timeout to 60s
  - Add retry logic (3 attempts)
  - Fallback: Use screenshot API service

  Issue 2: Claude Content Too Long/Short

  Symptom: Posts niet consistent
  Fix:
  - Adjust max_tokens (512-2048)
  - Refine prompt with examples
  - Add length validation

  Issue 3: Drafts Not Appearing

  Symptom: API call succeeds but no post
  Fix:
  - Check admin dashboard API route
  - Verify database connection
  - Check tenant_id if applicable

  Issue 4: Short.io URL Expansion Fails

  Symptom: Can't get original URL
  Fix:
  - Verify API key correct
  - Check domain exact match
  - Test API manually with Postman

  ---
  🎯 Next Steps

  Immediate (This Week):
  1. ✅ Setup n8n Cloud account
  2. ✅ Create Google Sheet
  3. ✅ Get API keys
  4. ✅ Import workflow
  5. ✅ Test with 1 platform

  Short Term (Week 2):
  6. ✅ Add 10-15 platforms to sheet
  7. ✅ Review generated posts
  8. ✅ Publish best ones
  9. ✅ Tweak prompt based on results

  Long Term (Month 2+):
  10. ✅ Add 5-10 platforms/week
  11. ✅ Monitor SEO performance
  12. ✅ Track affiliate conversions
  13. ✅ Scale to 40+ posts/maand

  ---
  📞 Support & Resources

  n8n Docs: https://docs.n8n.io
  Claude API: https://docs.anthropic.com/claude/reference
  Short.io API: https://developers.short.io
  Playwright: https://playwright.dev

  Workflow File: /docs/automation/n8n-blog-automation-workflow.json

  ---
  Wil je dat ik:
  1. Help met n8n setup (stap-voor-stap)?
  2. De Playwright screenshot node maak?
  3. Een test Google Sheet template maak?
  4. De exacte Claude prompt verder optimize?

  Laat maar weten waar je wilt beginnen! 🚀

● Perfect! Daar is je complete n8n blog automation plan! 🎉

  Het is nu helemaal uitgewerkt met:
  - ✅ Complete 6-stappen workflow
  - ✅ Exacte API calls en code
  - ✅ ROI analysis (€730-980/maand bespaard!)
  - ✅ Implementation checklist
  - ✅ Troubleshooting guide
  - ✅ Cost breakdown (€20-21/maand all-in)

  De workflow doet letterlijk alles automatisch: Van Google Sheet row → Screenshot → AI content → Draft post → Email naar jou!

  Wil je ergens mee starten? Ik kan helpen met:
  1. n8n account setup
  2. Google Sheet template maken
  3. Playwright screenshot code testen
  4. Claude prompt verfijnen

  Laat maar weten! 🚀
