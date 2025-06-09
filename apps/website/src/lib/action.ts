"use server";

import { z } from "zod";
import { generateHTML } from "@workspace/common";

const Payload = z.object({
  url: z.string().url(),
});

export type ActionResponse =
  | {
    ok: true;
    url: string;
    response: string;
  }
  | { ok: false };

export async function action(
  _: unknown,
  data: FormData,
): Promise<ActionResponse> {
  "use server";
  const payload = Payload.parse(Object.fromEntries(data.entries()));
  const response = await generateHTML(payload.url);

  return {
    ok: true,
    url: payload.url,
    response,
  };
}
