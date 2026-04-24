#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const ENV_FILES = [".env.vercel.production", ".env.local", ".env", ".env.production"];
const DEFAULT_EMAIL = "admin-test@kah-digital.io";
const DEFAULT_PASSWORD = "KahDigital-Test-2026!";

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function loadLocalEnv() {
  for (const file of ENV_FILES) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;

    const lines = readFileSync(path, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) continue;

      const [, key, rawValue] = match;
      if (process.env[key] === undefined) {
        process.env[key] = stripQuotes(rawValue);
      }
    }
  }
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Variable manquante: ${name}`);
  }
  return value;
}

async function findUserByEmail(supabase, email) {
  const wanted = email.toLowerCase();
  let page = 1;

  while (page <= 20) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 1000,
    });

    if (error) {
      throw error;
    }

    const user = data?.users?.find((item) => item.email?.toLowerCase() === wanted);
    if (user) {
      return user;
    }

    if (!data?.users?.length || data.users.length < 1000) {
      return null;
    }

    page += 1;
  }

  return null;
}

async function main() {
  loadLocalEnv();

  const url = process.env.SUPABASE_URL?.trim() || requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const email = process.env.ADMIN_TEST_EMAIL?.trim() || DEFAULT_EMAIL;
  const password = process.env.ADMIN_TEST_PASSWORD?.trim() || DEFAULT_PASSWORD;

  if (password.length < 12) {
    throw new Error("ADMIN_TEST_PASSWORD doit contenir au moins 12 caracteres.");
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const existingUser = await findUserByEmail(supabase, email);
  const appMetadata = {
    ...(existingUser?.app_metadata ?? {}),
    role: "admin",
  };
  const userMetadata = {
    ...(existingUser?.user_metadata ?? {}),
    name: "Admin Test",
  };

  if (existingUser) {
    const { error } = await supabase.auth.admin.updateUserById(existingUser.id, {
      email,
      password,
      email_confirm: true,
      app_metadata: appMetadata,
      user_metadata: userMetadata,
    });

    if (error) {
      throw error;
    }

    console.log("Admin de test reinitialise.");
  } else {
    const { error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: appMetadata,
      user_metadata: userMetadata,
    });

    if (error) {
      throw error;
    }

    console.log("Admin de test cree.");
  }

  console.log(`Email: ${email}`);
  console.log(`Mot de passe: ${password}`);
  console.log("Role: admin");
}

main().catch((error) => {
  console.error(`Erreur: ${error.message}`);
  process.exit(1);
});
