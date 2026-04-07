import { createClient } from "@/lib/supabase/server";
import { AppError } from "../errors/AppError";

export default async function getUserId() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

 
  if (!session) throw new AppError("Unauthorized", 401);

  return session.user.id;
}
