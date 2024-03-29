import { corsHeaders } from "../_shared/cors.ts";
import * as deepl from "npm:deepl-node";
import { TargetLanguageCode } from "npm:deepl-node";
import { SourceLanguageCode } from "npm:deepl-node";

const translate = async (
  text: string,
  sourceLang: SourceLanguageCode,
  targetLang: TargetLanguageCode
) => {
  const authKey = Deno.env.get("TRADUCTOR_API_KEY"); // Replace with your key
  if (!authKey) {
    throw new Error("TRADUCTOR_API_KEY is not set");
  }

  const translator = new deepl.Translator(authKey);
  const translation = await translator.translateText(
    text,
    sourceLang,
    targetLang
  );
  return translation;
};

Deno.serve(async (req) => {
  try {
    console.time("request");
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    const { text, sourceLang, targetLang } = await req.json();

    const translation = await translate(
      text,
      sourceLang as SourceLanguageCode,
      targetLang as TargetLanguageCode
    );
    console.timeEnd("request");
    return new Response(JSON.stringify({ translation }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/traductor-caller' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
