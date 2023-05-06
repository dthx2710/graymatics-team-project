import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xqybgvghopxoczhciphb.supabase.co'
const supabaseKey : string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxeWJndmdob3B4b2N6aGNpcGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM0NzY5ODMsImV4cCI6MTk4OTA1Mjk4M30.jU0-ICMLOiaVs9_VifMXG42YYd2kFttCMeydLTFzB_o"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;