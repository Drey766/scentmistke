import type { SVGProps } from "react";

export type IconName =
  | "sparkle" | "package" | "message" | "heart" | "flower" | "search"
  | "menu" | "close" | "phone" | "gift" | "check" | "rose" | "leaf"
  | "compass" | "droplet" | "cloud" | "trash" | "card" | "truck" | "bag";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const paths: Record<IconName, JSX.Element> = {
  sparkle: <path d="M12 2l1.4 6.6L20 10l-6.6 1.4L12 18l-1.4-6.6L4 10l6.6-1.4L12 2Zm7 13 .7 3.3L23 19l-3.3.7L19 23l-.7-3.3L15 19l3.3-.7L19 15Z" />,
  package: <path d="m3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 5 9-5V7M12 11v11M7 5l9 4" />,
  message: <path d="M20 4H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h4l4 3 4-3h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-2 6H6m12 4H6" />,
  heart: <path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z" />,
  flower: <path d="M12 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-6c-4.8 0-7.5-2.3-7.5-5.1C4.5 7.4 6.4 6 9 6c1.5 0 2.5.5 3 1.5C12.5 6.5 13.5 6 15 6c2.6 0 4.5 1.4 4.5 3.9C19.5 12.7 16.8 15 12 15Zm0-7.5c0-2.7-1.6-5-3.6-5S5 2.6 5 5.1 7.8 9 12 9Zm0 0c4.2 0 7-1.4 7-3.9S17.6 1.5 15.6 1.5 12 3.8 12 6.5Z" />,
  search: <path d="m20 20-4.5-4.5m2.5-5.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  phone: <path d="M6.6 3.5 9 3l2 4-1.8 1.8a14 14 0 0 0 6 6L17 13l4 2-.5 2.4a3 3 0 0 1-3.2 2.4C10.1 18.9 5.1 13.9 4.2 6.7A3 3 0 0 1 6.6 3.5Z" />,
  gift: <path d="M4 11h16v10H4V11Zm8 0v10M2 7h20v4H2V7Zm10 0H8.5A2.5 2.5 0 1 1 11 4.5V7Zm0 0h3.5A2.5 2.5 0 1 0 12 4.5V7Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  rose: <path d="M12 21V9m0 4c-3.5 0-6-1.8-6-4.2 0-2 1.5-3.3 3.4-3.3 1.4 0 2.4.7 2.6 1.8.2-1.1 1.2-1.8 2.6-1.8 1.9 0 3.4 1.3 3.4 3.3C18 11.2 15.5 13 12 13Zm0-4c-1.7-2.5-1.4-5 .5-6.5" />,
  leaf: <path d="M20 4C10 4 5 8 5 14c0 3 2 5 5 5 6 0 10-5 10-15ZM4 20c3-5 7-8 12-10" />,
  compass: <path d="m15.5 8.5-2.7 5.3-5.3 2.7 2.7-5.3 5.3-2.7Z M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />,
  droplet: <path d="M12 3s7 7 7 12a7 7 0 1 1-14 0c0-5 7-12 7-12Z" />,
  cloud: <path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 11a3.5 3.5 0 0 0 1 7Z" />,
  trash: <path d="M4 7h16m-10 4v6m4-6v6M9 7V4h6v3m-9 0 1 14h10l1-14" />,
  card: <path d="M3 6h18v12H3V6Zm0 4h18M7 15h3" />,
  truck: <path d="M3 6h11v10H3V6Zm11 4h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  bag: <path d="M6 8h12l1 13H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2" />,
};

export default function Icon({ name, size = 20, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      {paths[name]}
    </svg>
  );
}
