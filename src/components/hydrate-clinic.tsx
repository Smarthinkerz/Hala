import { useEffect } from "react";
import { useClinic } from "@/lib/store";

export function HydrateClinic() {
  useEffect(() => {
    void useClinic.persist.rehydrate();
  }, []);
  return null;
}
