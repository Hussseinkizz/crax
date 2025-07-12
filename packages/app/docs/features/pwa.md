# Progressive Web App (PWA)

CRAX makes it easy to turn your application into a Progressive Web App (PWA). PWAs are web apps that can be installed on a user's device, providing a more native-like experience.

## Enabling PWA Features

To enable PWA features, you need to configure the `pwa` object in your `crax.config.mjs` file.

```javascript
// crax.config.mjs

export default {
  pwa: {
    enabled: true,
    themeColor: '#ffffff',
    backgroundColor: '#000000',
    iconPath: 'public/logo.png',
  },
};
```

Once you've enabled PWA features, CRAX will automatically generate a web manifest and service worker for your application.

## Benefits of PWAs

- **Installable:** Users can add your app to their home screen.
- **Offline Support:** Your app can work offline or on low-quality networks.
- **Push Notifications:** You can send push notifications to your users to keep them engaged.
