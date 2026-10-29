# Safar

Safar is a responsive travel and shared-mobility website concept focused on clearer ride choices, safer pickups, route sharing, and transparent pricing.

## Live website

[safar-smart-rides.akshay-gupta0908.chatgpt.site](https://safar-smart-rides.akshay-gupta0908.chatgpt.site)

## Current features implemented

- Ride-now and scheduled-ride flows
- Pickup and destination entry
- Browser geolocation with an OpenStreetMap preview
- Auto, Mini, Prime, and shared-ride options
- Device-local trip history
- Passenger-count selection
- City selection and intercity planning
- Safety Centre and trusted-contact concepts
- Responsive dark interface with glass-style controls
- Animated loading and hero sequences
- Keyboard-focus and reduced-motion support

## Run locally in system

The project is a buildless static website. From the repository root, start any static file server for the `dist` directory.

Using Python:

```powershell
python -m http.server 8080 --directory dist
```

Then open [http://localhost:8080](http://localhost:8080).

Using Node.js:-- 

```powershell
npx serve dist
```

Opening `dist/index.html` directly may limit browser features such as geolocation. A local HTTP server is recommended.

## Project structure

```text
safar-web/
├── .openai/
│   └── hosting.json       # Sites deployment configuration
├── dist/
│   ├── assets/            # Website imagery
│   ├── index.html         # Page structure
│   ├── app.js             # Booking and interaction logic
│   ├── dark.css           # Base dark theme and loader
│   ├── revamp.css         # Current layout and component styling
│   └── motion-glass.css   # Motion and glass effects
└── README.md
```

## Data and privacy

The current prototype stores trip history in the browser using `localStorage`. Geolocation is requested only after the user selects the location control. Coordinates are displayed in the browser and on an OpenStreetMap embed.

This prototype does not currently provide production authentication, payment processing, driver dispatch, SMS/OTP delivery, or cross-device data synchronization.

## Production integrations information

A production release would require:

- A maps, routing, geocoding, and live-traffic provider
- A secure backend and database
- Passenger and driver authentication
- Driver availability and dispatch services
- A payment gateway for UPI, cards, and wallets
- SMS or push-notification infrastructure
- Production safety, emergency, consent, and privacy workflows

## Deployment

The website is deployed as a static Site using the configuration in `.openai/hosting.json`. Files published to the website are located in `dist/`.

## Disclaimer

Displayed fares, ETAs, vehicle availability, savings, and safety states are illustrative prototype data unless connected to a live provider.
