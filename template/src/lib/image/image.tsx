import config from '../../../crax.config';
import { type ImgHTMLAttributes } from 'react';

type Props = {
  src: string;
  alt: string;
  widths?: number[];
  sizes?: string;
} & Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'sizes' | 'srcSet'
>;

export function Image({
  src,
  alt,
  widths = config.images.deviceSizes,
  sizes,
  ...props
}: Props) {
  const params = `?w=${widths.join(';')}&format=${config.images.formats.join(
    ';'
  )}&as=srcset`;
  const srcset = new URL(src + params, import.meta.url).href;

  return (
    <img
      srcSet={srcset}
      sizes={sizes ?? config.images.defaultProps.sizes}
      src={src}
      alt={alt}
      loading={config.images.defaultProps.loading}
      decoding={config.images.defaultProps.decoding}
      {...props}
    />
  );
}
