import { site } from "./site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.website;
