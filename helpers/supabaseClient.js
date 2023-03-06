import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://blueApp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4eWJma2hoaHZiaHVnaWdmcmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxMTU4OTAsImV4cCI6MTk5MzY5MTg5MH0.ooyFKWQT981vk3kghjTdMI2bvdqTUARGtO6Fr7BpXNc"
)
