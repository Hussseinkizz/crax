# Image Optimization with the `<Image />` Component

CRAX provides a built-in `<Image />` component that automatically optimizes your images for performance. This helps improve your application's loading speed and overall user experience by serving appropriately sized images to different devices.

## Why Image Optimization?

Large, unoptimized images are a common cause of slow website loading times. The `<Image />` component addresses this by:

-   **Responsive Images:** Generating multiple image sizes (a `srcset`) so the browser can choose the most suitable one based on the user's screen resolution and device pixel ratio.
-   **Efficient Loading:** Leveraging browser-native features like `loading="lazy"` (default) and `decoding="async"` to load images efficiently.

## Usage

To use the `<Image />` component, import it from `@crax/image` and use it in place of a standard `<img>` tag. It accepts most standard `<img>` attributes.

```tsx
import { Image } from '@crax/image';
import heroImage from '@/assets/hero.jpg'; // Example: importing an image asset

export default function HeroSection() {
  return (
    <div className="hero-container">
      <Image
        src={heroImage}
        alt="A beautiful landscape"
        className="w-full h-auto object-cover"
        // Optional: specify custom widths for srcset generation
        // widths={[400, 800, 1200, 1600]}
        // Optional: specify sizes attribute for responsive images
        // sizes="(max-width: 768px) 100vw, 50vw"
      />
      <h2>Welcome to our site!</h2>
    </div>
  );
}
```

### Props

The `<Image />` component accepts the following key props:

-   `src` (required): The path to your image asset.
-   `alt` (required): Alternative text for the image, important for accessibility.
-   `widths` (optional): An array of numbers representing the desired widths (in pixels) for the generated `srcset`. If not provided, it defaults to the `deviceSizes` defined in `crax.config.mjs`.
-   `sizes` (optional): A string that specifies image sizes for different viewport widths, similar to the native `sizes` attribute. If not provided, it defaults to `defaultProps.sizes` from `crax.config.mjs`.
-   All other standard `<img>` attributes (e.g., `className`, `style`, `onClick`, `loading`, `decoding`).

## Configuration

The default behavior of the `<Image />` component is controlled by the `images` section in your `crax.config.mjs` file. Here, you can define:

-   `deviceSizes`: An array of default widths to generate for `srcset` if `widths` prop is not provided.
-   `formats`: An array of image formats (e.g., `['webp', 'jpeg']`) to generate. This allows browsers to pick the most efficient format they support.
-   `defaultProps`: Default values for `loading` (e.g., `'lazy'`) and `decoding` (e.g., `'async'`) attributes.

**Example `crax.config.mjs` snippet for images:**

```javascript
// crax.config.mjs
const config = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['webp', 'jpeg'],
    defaultProps: {
      loading: 'lazy',
      decoding: 'async',
      sizes: '100vw', // Default sizes attribute
    },
  },
  // ... other configurations
};

export default config;
```

## Under the Hood

The `<Image />` component works by constructing a `srcset` URL using the `src`, `widths`, and `formats` defined. This URL is then processed by Vite (via `vite-imagetools` or similar internal mechanisms) during the build process to generate the actual optimized image files in various sizes and formats. When the browser encounters the `srcset`, it intelligently selects and downloads the most appropriate image variant, ensuring optimal performance for each user.
