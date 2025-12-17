// Chat Widget Script
(function () {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            --chat--font-size: var(--n8n-chat-font-size, 14px);
            --chat--width: var(--n8n-chat-width, 380px);
            --chat--height: var(--n8n-chat-height, 600px);
            --chat--max-width: var(--n8n-chat-max-width, 90vw);
            --chat--max-height: var(--n8n-chat-max-height, 80vh);
            --chat--max-height: var(--n8n-chat-max-height, 80vh);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            box-sizing: border-box;
        }

        .n8n-chat-widget *, .n8n-chat-widget *::before, .n8n-chat-widget *::after {
            box-sizing: inherit;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 0;
            right: 0;
            z-index: 1000;
            display: none;
            width: var(--chat--width);
            height: var(--chat--height);
            max-width: var(--chat--max-width);
            max-height: var(--chat--max-height);
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
        }

        /* Desktop positioning */
        @media (min-width: 481px) {
            .n8n-chat-widget .chat-container {
                bottom: 20px;
                right: 20px;
            }
            
            .n8n-chat-widget .chat-container.position-left {
                right: auto;
                left: 20px;
            }
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .new-conversation {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .n8n-chat-widget .new-conversation-content {
            margin: auto;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
        }

        .n8n-chat-widget .new-conversation-content.prechat-mode {
            gap: 12px;
        }

        .n8n-chat-widget .new-conversation::-webkit-scrollbar {
            width: 6px;
        }

        .n8n-chat-widget .new-conversation::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .new-conversation::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 3px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            line-height: 1.3;
            margin: 0;
            text-align: center;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: auto;
            min-width: 200px;
            padding: 16px 32px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: scale(1.02);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            padding: 8px 12px;
            margin: 6px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: var(--chat--font-size);
            line-height: 1.4;
            word-wrap: break-word;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2);
            border: none;
            white-space: pre-wrap;
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            white-space: normal;
        }

        /* Markdown styling for bot messages */
        .n8n-chat-widget .chat-message.bot h1,
        .n8n-chat-widget .chat-message.bot h2,
        .n8n-chat-widget .chat-message.bot h3,
        .n8n-chat-widget .chat-message.bot h4,
        .n8n-chat-widget .chat-message.bot h5,
        .n8n-chat-widget .chat-message.bot h6 {
            margin: 1em 0 0.5em 0;
            font-weight: 600;
        }

        .n8n-chat-widget .chat-message.bot ul,
        .n8n-chat-widget .chat-message.bot ol {
            margin: 0.8em 0;
            padding-left: 1.2em;
        }

        .n8n-chat-widget .chat-message.bot p {
            margin: 0.8em 0;
        }

        .n8n-chat-widget .chat-message.bot p:first-child {
            margin-top: 0 !important;
        }

        .n8n-chat-widget .chat-message.bot p:last-child {
            margin-bottom: 0 !important;
        }

        .n8n-chat-widget .chat-message.bot code {
            background: rgba(133, 79, 255, 0.1);
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
        }

        .n8n-chat-widget .chat-message.bot pre {
            background: rgba(133, 79, 255, 0.1);
            padding: 0.8em;
            border-radius: 6px;
            overflow-x: auto;
            margin: 0.3em 0;
        }

        .n8n-chat-widget .chat-message.bot pre code {
            background: none;
            padding: 0;
        }

        .n8n-chat-widget .chat-message.bot a {
            color: var(--chat--color-primary);
            text-decoration: underline;
        }

        .n8n-chat-widget .chat-message.bot blockquote {
            border-left: 3px solid var(--chat--color-primary);
            padding-left: 0.8em;
            margin: 0.3em 0;
            opacity: 0.8;
        }

        /* Remove default margins from first and last child elements */
        .n8n-chat-widget .chat-message.bot > *:first-child {
            margin-top: 0;
        }

        .n8n-chat-widget .chat-message.bot > *:last-child {
            margin-bottom: 0 !important;
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: var(--chat--font-size);
            /* min-height: 44px; */
            /* height: 44px; */
            line-height: 1.4; 
            overflow-y: hidden; 
            transition: height 0.1s ease; 
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .chat-input textarea:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0 20px;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: inherit;
            font-weight: 500;
            height: 44px;
            /* min-height: 44px; */
            align-self: flex-end;
        }

        .n8n-chat-widget .chat-input button:hover:not(:disabled) {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-input button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }

        /* Typing indicator styles */
        .n8n-chat-widget .typing-indicator {
            display: flex;
            align-items: center;
            padding: 12px 16px;
        }

        .n8n-chat-widget .typing-indicator span {
            height: 8px;
            width: 8px;
            background-color: var(--chat--color-primary);
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
            animation: typing 1.4s infinite ease-in-out;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(1) {
            animation-delay: -0.32s;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(2) {
            animation-delay: -0.16s;
        }

        @keyframes typing {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
            .n8n-chat-widget .chat-container {
                width: min(var(--chat--width), calc(100vw - 40px));
                height: min(var(--chat--height), calc(100vh - 100px));
            }
        }

        /* Mobile fullscreen styles */
        @media (max-width: 480px) {
            .n8n-chat-widget .chat-container {
                width: 100%;
                height: 100vh;
                height: -webkit-fill-available;
                max-width: 100%;
                max-height: 100%;
                bottom: 0;
                right: 0;
                left: 0;
                top: 0;
                border-radius: 0;
            }
            
            .n8n-chat-widget .chat-container.position-left {
                left: 0;
                right: 0;
            }
            
            /* When keyboard is open */
            .n8n-chat-widget .chat-container.keyboard-open {
                height: var(--viewport-height, 100vh);
            }
            
            .n8n-chat-widget .chat-interface.keyboard-open .chat-messages {
                flex: 1;
                min-height: 0;
            }
            
            .n8n-chat-widget .chat-interface.keyboard-open .chat-input {
                position: relative;
                bottom: 0;
                padding-bottom: env(safe-area-inset-bottom, 16px);
            }
            
            .n8n-chat-widget .chat-toggle {
                bottom: 10px;
                right: 10px;
                width: 50px;
                height: 50px;
            }
            
            .n8n-chat-widget .chat-toggle.position-left {
                left: 10px;
                right: auto;
            }
        }

        /* Pre-chat form styles */
        /* Pre-chat form styles */
        .n8n-chat-widget .prechat-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
            max-width: 300px; /* Limit width for better aesthetics */
            padding: 0 16px; /* Add some horizontal padding */
        }

        .n8n-chat-widget .prechat-form .new-chat-btn {
            width: 100%;
            margin-top: 8px;
        }

        .n8n-chat-widget .prechat-field {
            display: flex;
            flex-direction: column;
            gap: 6px;
            text-align: left;
        }

        .n8n-chat-widget .prechat-label {
            font-size: 14px;
            font-weight: 500;
            color: var(--chat--color-font);
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .n8n-chat-widget .prechat-label.spread {
            justify-content: space-between;
            gap: 0;
        }

        .n8n-chat-widget .prechat-required-marker {
            font-size: 12px;
            opacity: 0.7;
            font-weight: 400;
        }

        .n8n-chat-widget .prechat-input {
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            font-family: inherit;
            font-size: 14px;
            transition: border-color 0.2s;
        }

        .n8n-chat-widget .prechat-input:focus {
            border-color: var(--chat--color-primary);
            outline: none;
        }
    `;

    // Load dependencies
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Load Marked.js for markdown parsing
    const markedScript = document.createElement('script');
    markedScript.src = 'https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js';
    document.head.appendChild(markedScript);

    // Load DOMPurify for sanitizing HTML
    const purifyScript = document.createElement('script');
    purifyScript.src = 'https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js';
    document.head.appendChild(purifyScript);

    // Wait for scripts to load
    Promise.all([
        new Promise(resolve => markedScript.onload = resolve),
        new Promise(resolve => purifyScript.onload = resolve)
    ]).then(() => {
        initializeWidget();
    });

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    function initializeWidget() {
        // Default configuration
        const defaultConfig = {
            webhook: {
                url: '',
                route: ''
            },
            branding: {
                logo: '',
                name: '',
                welcomeText: '',
                responseTimeText: '',
                poweredBy: {
                    text: 'Powered by LowCode',
                    text: 'Powered by LowCode',
                    link: 'https://www.lowcode.agency'
                },
                chatInputPlaceholder: 'Type your message here...'
            },
            style: {
                primaryColor: '',
                secondaryColor: '',
                position: 'right',
                backgroundColor: '#ffffff',
                fontColor: '#333333',
                fontSize: '14px',
                dimensions: {
                    width: '380px',
                    height: '600px',
                    maxWidth: '90vw',
                    maxHeight: '80vh'
                }
            },
            markdown: {
                enabled: true,
                sanitize: true
            },
            prechat: {
                enabled: false,
                title: "Let's start",
                titleFontSize: "24px",
                submitLabel: "Continue to chat",
                requiredFieldMarking: "*",
                inputs: [
                    { id: 'name', label: 'Name', type: 'text', required: true },
                    { id: 'email', label: 'Email', type: 'email', required: true }
                ]
            }
        };

        // Merge user config with defaults
        const config = window.ChatWidgetConfig ?
            {
                webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
                branding: {
                    ...defaultConfig.branding,
                    ...window.ChatWidgetConfig.branding,
                    poweredBy: { ...defaultConfig.branding.poweredBy, ...(window.ChatWidgetConfig.branding?.poweredBy || {}) }
                },
                style: {
                    ...defaultConfig.style,
                    ...window.ChatWidgetConfig.style,
                    dimensions: { ...defaultConfig.style.dimensions, ...(window.ChatWidgetConfig.style?.dimensions || {}) }
                },
                markdown: { ...defaultConfig.markdown, ...(window.ChatWidgetConfig.markdown || {}) },
                prechat: {
                    ...defaultConfig.prechat,
                    ...(window.ChatWidgetConfig.prechat || {}),
                    requiredFieldMarking: window.ChatWidgetConfig.prechat?.requiredFieldMarking || defaultConfig.prechat.requiredFieldMarking,
                    inputs: (window.ChatWidgetConfig.prechat?.inputs || defaultConfig.prechat.inputs).slice(0, 5)
                }
            } : defaultConfig;

        // Prevent multiple initializations
        if (window.N8NChatWidgetInitialized) return;
        window.N8NChatWidgetInitialized = true;

        let currentSessionId = '';

        // Create widget container
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'n8n-chat-widget';

        // Set CSS variables
        widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
        widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
        widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
        widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);
        widgetContainer.style.setProperty('--n8n-chat-font-size', config.style.fontSize || '14px');

        // Set dimension variables
        if (config.style.dimensions) {
            widgetContainer.style.setProperty('--n8n-chat-width', config.style.dimensions.width || '380px');
            widgetContainer.style.setProperty('--n8n-chat-height', config.style.dimensions.height || '600px');
            widgetContainer.style.setProperty('--n8n-chat-max-width', config.style.dimensions.maxWidth || '90vw');
            widgetContainer.style.setProperty('--n8n-chat-max-height', config.style.dimensions.maxHeight || '80vh');
        }

        const chatContainer = document.createElement('div');
        chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;

        const newConversationHTML = `
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <button class="close-button">×</button>
            </div>
            <div class="new-conversation">
                <div class="new-conversation-content${config.prechat.enabled ? ' prechat-mode' : ''}">
                    ${config.prechat.enabled && config.prechat.title ? `
                        <h2 class="welcome-text" style="font-size: ${config.prechat.titleFontSize || '24px'}">${config.prechat.title}</h2>
                    ` : (!config.prechat.enabled ? `<h2 class="welcome-text">${config.branding.welcomeText}</h2>` : '')}
                    
                    ${config.prechat.enabled ? `
                        <form class="prechat-form">
                            ${config.prechat.inputs.map(input => `
                                <div class="prechat-field">
                                    <label for="prechat-${input.id}" class="prechat-label${config.prechat.requiredFieldMarking !== '*' ? ' spread' : ''}">
                                        ${input.label}
                                        ${input.required ? `<span class="prechat-required-marker">${config.prechat.requiredFieldMarking}</span>` : ''}
                                    </label>
                                    <input 
                                        type="${input.type}" 
                                        id="prechat-${input.id}" 
                                        name="${input.id}" 
                                        class="prechat-input" 
                                        ${input.required ? 'required' : ''}
                                        placeholder="${input.placeholder || ''}"
                                    >
                                </div>
                            `).join('')}
                            <button type="submit" class="new-chat-btn">
                                ${config.prechat.submitLabel}
                            </button>
                        </form>
                    ` : `
                        <button class="new-chat-btn">
                            <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                            </svg>
                            Send us a message
                        </button>
                    `}
                    <p class="response-text">${config.branding.responseTimeText}</p>
                </div>
            </div>
        `;

        const chatInterfaceHTML = `
            <div class="chat-interface">
                <div class="brand-header">
                    <img src="${config.branding.logo}" alt="${config.branding.name}">
                    <span>${config.branding.name}</span>
                    <button class="close-button">×</button>
                </div>
                <div class="chat-messages"></div>
                <div class="chat-input">
                    <textarea placeholder="${config.branding.chatInputPlaceholder}" rows="1"></textarea>
                    <button type="submit">Send</button>
                </div>
                <div class="chat-footer">
                    <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
                </div>
            </div>
        `;

        chatContainer.innerHTML = newConversationHTML + chatInterfaceHTML;

        const toggleButton = document.createElement('button');
        toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
        toggleButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
            </svg>`;

        widgetContainer.appendChild(chatContainer);
        widgetContainer.appendChild(toggleButton);
        document.body.appendChild(widgetContainer);

        const newChatBtn = chatContainer.querySelector('.new-chat-btn');
        const chatInterface = chatContainer.querySelector('.chat-interface');
        const messagesContainer = chatContainer.querySelector('.chat-messages');
        const textarea = chatContainer.querySelector('textarea');
        const sendButton = chatContainer.querySelector('.chat-input button[type="submit"]');

        // Mobile keyboard handling
        let viewportHeight = window.innerHeight;
        let initialHeight = window.innerHeight;

        // Store initial viewport height when page loads
        function updateViewportHeight() {
            viewportHeight = window.innerHeight;
            chatContainer.style.setProperty('--viewport-height', `${viewportHeight}px`);
        }

        // Initial set
        updateViewportHeight();

        // Use VisualViewport API if available (best solution)
        if ('visualViewport' in window) {
            const MIN_KEYBOARD_HEIGHT = 300; // Typical minimum keyboard height

            function handleViewportChange() {
                const isMobile = window.innerWidth < 768;
                const isKeyboardOpen = isMobile && window.screen.height - MIN_KEYBOARD_HEIGHT > window.visualViewport.height;

                if (isKeyboardOpen) {
                    chatContainer.classList.add('keyboard-open');
                    chatInterface.classList.add('keyboard-open');
                } else {
                    chatContainer.classList.remove('keyboard-open');
                    chatInterface.classList.remove('keyboard-open');
                }
            }

            window.visualViewport.addEventListener('resize', handleViewportChange);
            window.visualViewport.addEventListener('scroll', handleViewportChange);
        } else {
            // Fallback for browsers without VisualViewport API
            // Detect keyboard by focus/blur and resize events
            let focusedTime = 0;

            textarea.addEventListener('focus', () => {
                focusedTime = Date.now();
                // Store height before keyboard appears
                if (window.innerWidth <= 480) {
                    initialHeight = window.innerHeight;
                }
            });

            textarea.addEventListener('blur', () => {
                setTimeout(() => {
                    chatContainer.classList.remove('keyboard-open');
                    chatInterface.classList.remove('keyboard-open');
                }, 100);
            });

            // When virtual keyboard is open, it fires windows resize event
            window.addEventListener('resize', () => {
                if (window.innerWidth <= 480 && focusedTime) {
                    const timeSinceFocus = Date.now() - focusedTime;
                    // Check if resize happened shortly after focus
                    if (timeSinceFocus < 1000) {
                        const heightDiff = initialHeight - window.innerHeight;
                        // If height decreased significantly, keyboard is probably open
                        if (heightDiff > 100) {
                            chatContainer.classList.add('keyboard-open');
                            chatInterface.classList.add('keyboard-open');
                        }
                    }
                }
            });
        }

        // Ensure input stays visible when focused on mobile
        textarea.addEventListener('focus', () => {
            if (window.innerWidth <= 480) {
                setTimeout(() => {
                    textarea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    // Also scroll the messages to bottom to see latest
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 300); // Delay for keyboard animation
            }
        });

        function generateUUID() {
            return crypto.randomUUID();
        }

        function makeLinksOpenInNewTab(container) {
            const links = container.querySelectorAll('a');
            links.forEach(link => {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            });
        }

        // Function to process message content (markdown or plain text)
        function processMessageContent(content, isBot = true) {
            // Trim whitespace from content
            content = content.trim();

            if (!isBot || !config.markdown.enabled) {
                // For user messages or when markdown is disabled, return plain text
                return { type: 'text', content: content };
            }

            // For bot messages with markdown enabled
            try {
                // Parse markdown to HTML
                const rawHtml = marked.parse(content, { breaks: true, gfm: true });

                // Sanitize HTML if enabled
                let finalHtml = config.markdown.sanitize ?
                    DOMPurify.sanitize(rawHtml) : rawHtml;

                // Remove trailing empty paragraphs and line breaks
                finalHtml = finalHtml.trim()
                    .replace(/<p>\s*<\/p>\s*$/gi, '')
                    .replace(/<br\s*\/?>\s*$/gi, '');

                return { type: 'html', content: finalHtml };
            } catch (error) {
                console.error('Error parsing markdown:', error);
                return { type: 'text', content: content };
            }
        }

        async function startNewConversation(initialMessage = null) {
            currentSessionId = generateUUID();

            chatContainer.querySelector('.brand-header').style.display = 'none';
            chatContainer.querySelector('.new-conversation').style.display = 'none';
            chatInterface.classList.add('active');

            if (initialMessage) {
                await sendMessage(initialMessage, true);
                return;
            }

            const data = [{
                action: "loadPreviousSession",
                sessionId: currentSessionId,
                route: config.webhook.route,
                metadata: {
                    userId: ""
                }
            }];

            try {
                const response = await fetch(config.webhook.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const responseData = await response.json();

                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot';

                // Process the message content
                const messageContent = Array.isArray(responseData) ? responseData[0].output : responseData.output;
                const processed = processMessageContent(messageContent, true);

                if (processed.type === 'html') {
                    botMessageDiv.innerHTML = processed.content;
                } else {
                    botMessageDiv.textContent = processed.content;
                }

                messagesContainer.appendChild(botMessageDiv);
                makeLinksOpenInNewTab(botMessageDiv);
                botMessageDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } catch (error) {
                console.error('Error:', error);
            }
        }

        async function sendMessage(message, hidden = false) {
            // Disable send button and textarea
            sendButton.disabled = true;
            textarea.disabled = true;
            sendButton.style.opacity = '0.6';
            sendButton.style.cursor = 'not-allowed';

            // Optional: Change button text to show loading
            const originalButtonText = sendButton.textContent;
            sendButton.textContent = 'Send';

            const messageData = {
                action: "sendMessage",
                sessionId: currentSessionId,
                route: config.webhook.route,
                chatInput: message,
                metadata: {
                    userId: ""
                }
            };

            if (!hidden) {
                const userMessageDiv = document.createElement('div');
                userMessageDiv.className = 'chat-message user';
                userMessageDiv.textContent = message;
                messagesContainer.appendChild(userMessageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            // Add typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chat-message bot typing-indicator';
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            messagesContainer.appendChild(typingIndicator);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            try {
                const response = await fetch(config.webhook.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(messageData)
                });

                const data = await response.json();

                // Remove typing indicator
                typingIndicator.remove();

                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot';

                // Process the message content
                const messageContent = Array.isArray(data) ? data[0].output : data.output;
                const processed = processMessageContent(messageContent, true);

                if (processed.type === 'html') {
                    botMessageDiv.innerHTML = processed.content;
                } else {
                    botMessageDiv.textContent = processed.content;
                }

                messagesContainer.appendChild(botMessageDiv);
                makeLinksOpenInNewTab(botMessageDiv);
                botMessageDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } catch (error) {
                console.error('Error:', error);
                // Remove typing indicator
                typingIndicator.remove();

                // Show error message to the user
                const errorDiv = document.createElement('div');
                errorDiv.className = 'chat-message bot';
                errorDiv.textContent = 'Sorry, there was an error processing your message. Please try again.';
                messagesContainer.appendChild(errorDiv);
                makeLinksOpenInNewTab(errorDiv);
                errorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } finally {
                // Re-enable send button and textarea
                sendButton.disabled = false;
                textarea.disabled = false;
                sendButton.style.opacity = '1';
                sendButton.style.cursor = 'pointer';
                sendButton.textContent = originalButtonText;
                textarea.focus(); // Return focus to textarea for better UX
            }
        }

        if (config.prechat.enabled) {
            const prechatForm = chatContainer.querySelector('.prechat-form');
            if (prechatForm) {
                prechatForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = new FormData(prechatForm);
                    let messageText = '**Form Submission**\n\n';

                    for (const [key, value] of formData.entries()) {
                        const label = config.prechat.inputs.find(i => i.id === key)?.label || key;
                        messageText += `** ${label}:** ${value} \n`;
                    }

                    startNewConversation(messageText);
                });
            }
        } else {
            if (newChatBtn) {
                newChatBtn.addEventListener('click', () => startNewConversation());
            }
        }

        sendButton.addEventListener('click', () => {
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                textarea.value = '';
                textarea.style.height = 'auto'; // Reset height after sending
            }
        });

        textarea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const message = textarea.value.trim();
                if (message) {
                    sendMessage(message);
                    textarea.value = '';
                    textarea.style.height = 'auto'; // Reset height
                }
            }
        });

        // Auto-resize textarea
        textarea.addEventListener('input', () => {
            // Count the number of line breaks
            const lines = textarea.value.split('\n').length;

            // Only start resizing if there's more than one line
            if (lines > 1 || textarea.scrollHeight > textarea.clientHeight) {
                textarea.style.height = 'auto';
                textarea.style.height = Math.min(textarea.scrollHeight, 44) + 'px';
            } else {
                // Keep it at the default height for single line
                textarea.style.height = ''; // Reset to CSS default
            }
        });

        toggleButton.addEventListener('click', () => {
            chatContainer.classList.toggle('open');
            // Update viewport height when opening chat on mobile
            if (chatContainer.classList.contains('open') && window.innerWidth <= 480) {
                updateViewportHeight();
            }
        });

        // Add close button handlers
        const closeButtons = chatContainer.querySelectorAll('.close-button');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                chatContainer.classList.remove('open');
            });
        });

        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                if (chatContainer.classList.contains('open') && window.innerWidth <= 480) {
                    updateViewportHeight();
                }
            }, 500);
        });
    }
})();
