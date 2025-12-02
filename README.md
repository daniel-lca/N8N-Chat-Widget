# N8N Chat Widget

A minimal, highly customizable chat widget designed for easy embedding on any website. It connects to your **n8n automation flows** via a webhook, making it simple to build AI-powered conversational experiences.

---

## Quick Usage (CDN)

To add the chat widget to your website, include the configuration and the script directly from jsDelivr.

### The Installation Template

Use the following code block in your HTML, preferably right before the closing `</body>` tag.

**Remember to replace the placeholders!**
# N8N Chat Widget

A minimal, highly customizable chat widget designed for easy embedding on any website. It connects to your **n8n automation flows** via a webhook, making it simple to build AI-powered conversational experiences.

---

## Quick Usage (CDN)

To add the chat widget to your website, include the configuration and the script directly from jsDelivr.

### The Installation Template

Use the following code block in your HTML, preferably right before the closing `</body>` tag.

**Remember to replace the placeholders!**

```html
<!-- Widget Configuration -->
<script>
  window.ChatWidgetConfig = {
    webhook: {
      url: 'YOUR_N8N_WEBHOOK_URL_HERE',
      route: 'general'
    },
    branding: {
      logo: 'YOUR_LOGO_URL_HERE',
      name: 'LowCode Agency',
      welcomeText: 'Hi, how can we help?',
      responseTimeText: 'Our virtual assistant works 24/7'
    },
    style: {
      primaryColor: '#705cf6',
      secondaryColor: '#382e7b',
      position: 'right',
      backgroundColor: '#ffffff',
      fontColor: '#333333',
      fontSize: '14px',
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
```

## Configuration Reference

The `window.ChatWidgetConfig` object allows you to customize every aspect of the widget.

### Webhook Configuration
| Property | Description |
|----------|-------------|
| `webhook.url` | **Required**. Your n8n production webhook URL. |
| `webhook.route` | Optional. A route identifier to handle different flows in your n8n workflow (default: 'general'). |

### Branding
| Property | Description |
|----------|-------------|
| `branding.logo` | URL to your logo image (PNG, SVG, etc.). |
| `branding.name` | Your company or bot name. |
| `branding.welcomeText` | The message shown on the welcome screen (when pre-chat form is disabled). |
| `branding.responseTimeText` | Subtitle text on the welcome screen (e.g., "We reply instantly"). |
| `branding.poweredBy` | Object with `text` and `link` to customize the footer. |

### Styling
| Property | Description |
|----------|-------------|
| `style.primaryColor` | Main color for buttons and user messages. |
| `style.secondaryColor` | Secondary color for gradients. |
| `style.position` | 'right' or 'left'. |
| `style.backgroundColor` | Widget background color. |
| `style.fontColor` | Text color. |
| `style.fontSize` | Base font size. |
| `style.dimensions` | Object with `width`, `height`, `maxWidth`, `maxHeight`. |

### Pre-Chat Form
You can enable a form to collect user information before the chat starts.

```javascript
prechat: {
  enabled: true, // Enable the pre-chat form
  title: "Let's start", // Title on the form screen (leave empty to hide)
  titleFontSize: "24px", // Font size of the title
  submitLabel: "Start Chat", // Text for the submit button
  inputs: [
    // Array of input fields (max 5)
    { 
      id: "name", 
      label: "Full Name", 
      type: "text", 
      required: true,
      placeholder: "Enter your name" 
    },
    { 
      id: "email", 
      label: "Email Address", 
      type: "email", 
      required: true,
      placeholder: "name@example.com" 
    }
  ]
}
```

| Property | Description |
|----------|-------------|
| `enabled` | Set to `true` to show the form instead of the default welcome button. |
| `title` | Title displayed above the form. Set to `""` to remove it. |
| `titleFontSize` | CSS font-size value for the title (e.g., "20px", "1.5rem"). |
| `submitLabel` | Text for the submit button. |
| `inputs` | Array of input objects. |

**Input Object Properties:**
- `id`: Unique identifier for the field (used in the message sent to n8n).
- `label`: Label displayed to the user.
- `type`: HTML input type (e.g., 'text', 'email', 'tel', 'number').
- `required`: `true` or `false`.
- `placeholder`: Placeholder text (optional).
