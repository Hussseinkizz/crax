# Image Optimization

CRAX provides a built-in `<Image />` component that automatically optimizes your images for performance. It generates responsive `srcset` attributes and uses modern loading techniques out of the box.

## Usage

To use the component, import it from `@crax/image` and use it in place of a standard `<img>` tag. It accepts all standard `<img>` attributes in addition to its own special props.

```tsx
// src/components/Hero.tsx
import { Image } from '@crax/image';
import heroImage from '@/assets/hero-banner.jpg';

export default function Hero() {
  return (
    <div className="hero-section">
      <Image
        src={heroImage}
        alt="A stunning mountain landscape at sunrise."
        className="w-full h-auto object-cover"
        loading="eager" // Override default lazy loading for critical images
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
```

## Key Props

-   `src` (required): The path to your image asset.
-   `alt` (required): Alternative text for accessibility.
-   `widths` (optional): An array of numbers representing the desired widths (in pixels) for the generated `srcset`. If not provided, it defaults to the `deviceSizes` defined in `crax.config.mjs`.
-   `sizes` (optional): A string that specifies the image's size for different viewport widths, helping the browser choose the right image from the `srcset` even before it has rendered the CSS. Defaults to `100vw`.

All other standard `<img>` attributes like `className`, `style`, `loading`, and `decoding` are passed through directly.