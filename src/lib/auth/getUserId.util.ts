import { createClient } from "@/lib/supabase/server";
import { AppError } from "../errors/AppError";

export default async function getUserId() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new AppError(error.message);
  if (!user) throw new AppError("Unauthorized", 401);

  return user.id;
}
