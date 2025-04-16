declare interface Protocol {
  // unique identifier (default: slugified name)
  identifier: string;

  // name of the protocol
  name: string;

  // one liner description not exceeding 360 characters
  description: string;

  // `png` or `svg` format icon in the public folder
  icon: string;

  // supported chains (refer: chain identifier)
  chains: Chain["key"][];

  // supported categories (refer: liquidity modules)
  category: LiquidityModules[];

  // website and docs (format: https://<subdomain|www>.<domain>.<tld>/<path>)
  website: string;
  docs: string;

  // social media links (refer: socials for supported platforms)
  socials: Partial<Record<Socials, string>>;

  // (internal) reference to the liquidity modules
  reference: string[];
}
