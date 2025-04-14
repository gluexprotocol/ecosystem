enum SocialsEnum {
  discord = "discord",
  email = "email",
  github = "github",
  linkedin = "linkedin",
  telegram = "telegram",
  twitter = "twitter",
}

declare type Socials = keyof typeof SocialsEnum;
