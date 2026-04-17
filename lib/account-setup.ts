import { prisma } from "@/lib/prisma";
import { createRawToken, hashToken } from "@/lib/security/tokens";

const SETUP_TOKEN_TTL_MS = 1000 * 60 * 60 * 24;

export async function issuePasswordSetupToken(email: string) {
  const normalizedEmail = email.toLowerCase();
  const rawToken = createRawToken();
  const token = hashToken(rawToken);
  const expires = new Date(Date.now() + SETUP_TOKEN_TTL_MS);

  await prisma.verificationToken.deleteMany({
    where: {
      identifier: normalizedEmail,
    },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: normalizedEmail,
      token,
      expires,
    },
  });

  return {
    rawToken,
    expires,
  };
}

export async function consumePasswordSetupToken(rawToken: string) {
  const hashedToken = hashToken(rawToken);
  const tokenRecord = await prisma.verificationToken.findUnique({
    where: { token: hashedToken },
  });

  if (!tokenRecord || tokenRecord.expires < new Date()) {
    return null;
  }

  await prisma.verificationToken.delete({
    where: { token: hashedToken },
  });

  return tokenRecord.identifier.toLowerCase();
}
