import { z } from "zod";

export const HeroSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  alias: z.string(),
  powers: z.array(z.string()),
  description: z.string(),
  strength: z.number().min(0).max(10),
  intelligence: z.number().min(0).max(10),
  speed: z.number().min(0).max(10),
  durability: z.number().min(0).max(10),
  team: z.string(),
  image: z.string(),
  firstAppearance: z.string(),
  status: z.string(),
  category: z.string(),
  universe: z.string(),
});

export const HeroArraySchema = z.array(HeroSchema);
