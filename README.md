# N8N Chat Widget

A minimal, highly customizable chat widget designed for easy embedding on any website. It connects to your **n8n automation flows** via a webhook, making it simple to build AI-powered conversational experiences.

---

## 🚀 Quick Usage (CDN)

To add the chat widget to your website, include the configuration and the script directly from jsDelivr.

### 1. The Installation Template

Use the following code block in your HTML, preferably right before the closing `</body>` tag.

**Remember to replace the placeholders!**

```html
<!-- Widget Configuration -->
<script>
  window.ChatWidgetConfig = {
    webhook: {
      url: 'YOUR_N8N_WEBHOOK_URL_HERE', // Your n8n production webhook URL.
      route: 'general'
    },
    branding: {
      logo: 'YOUR_LOGO_URL_HERE', // URL to your logo (e.g., a PNG or SVG).
      name: 'LowCode Agency', // Your company/brand name
      welcomeText: 'Hi, how can we help?', // Initial welcome message shown to users
      responseTimeText: 'Our virtual assistant works 24/7' // Response time information
    },
    style: {
      primaryColor: '#705cf6', // Primary color for user messages and buttons
      secondaryColor: '#382e7b', // Secondary color for gradients
      position: 'right', // Widget position on screen: 'left' or 'right'
      backgroundColor: '#ffffff', // Background color of the chat widget container
      fontColor: '#333333', // Default text color
      fontSize: '14px', // Chat messages font size
      dimensions: {
            width: '380px',
            height: '600px',
            maxWidth: '95vw',
            maxHeight: '90vh'
      }
    }
  };
</script>

<script src="https://cdn.jsdelivr.net/gh/daniel-lca/N8N-Chat-Widget@master/chat-widget.js"></script>
<!-- End Widget Configuration -->





