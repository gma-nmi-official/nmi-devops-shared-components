import {
  faFacebookF,
  faInstagram,
  faViber,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLink,
  faMagnifyingGlass,
  faRss,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { PortalHeaderSocialIcon } from "./types";

type FontAwesomeIconData = {
  icon: readonly [number, number, readonly string[], string, string | readonly string[]];
};

const socialIcons: Record<PortalHeaderSocialIcon, FontAwesomeIconData> = {
  facebook: faFacebookF,
  twitter: faXTwitter,
  x: faXTwitter,
  instagram: faInstagram,
  youtube: faYoutube,
  viber: faViber,
  rss: faRss,
  link: faLink,
};

export const portalHeaderControlIcons = {
  close: faXmark,
  search: faMagnifyingGlass,
} as const;

export function PortalHeaderMenuGridGlyph() {
  const positions = [1, 8, 15] as const;

  return (
    <svg
      aria-hidden="true"
      className="gno-portal-header__menu-grid-glyph"
      focusable="false"
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      {positions.flatMap((y) => positions.map((x) => (
        <rect fill="currentColor" height="5" key={`${x}-${y}`} width="5" x={x} y={y} />
      )))}
    </svg>
  );
}

export function PortalHeaderIcon({ icon, className }: { icon: FontAwesomeIconData; className?: string }) {
  const [width, height, , , paths] = icon.icon;
  const pathList = typeof paths === "string" ? [paths] : paths;

  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {pathList.map((path, index) => <path d={path} key={index} />)}
    </svg>
  );
}

export function PortalHeaderSocialIcon({ icon }: { icon: string }) {
  return <PortalHeaderIcon className="gno-portal-header__social-icon" icon={socialIcons[icon as PortalHeaderSocialIcon] ?? faLink} />;
}
