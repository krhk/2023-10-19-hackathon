import type { RequestHandler } from './$types';
import sdk from "microsoft-cognitiveservices-speech-sdk";

const subscriptionKey = "34744a65b269417b8cf281d8e6a55eb1";
const serviceRegion = "germanywestcentral"; // e.g., "westus"

export const POST = (async ({ request }) => {
    // extract the message for the TTS request
    const { message } = await request.json();
    const sanitizedMessage = sanitizeMessage(message);

    const speechStream = await synthesizeSpeech(sanitizedMessage);

    return new Response(speechStream.audioData);
}) satisfies RequestHandler;

function sanitizeMessage(message: string) {
    // remove all emojis and Markdown formatting from the message.
    const noEmojis = removeEmojis(message);
    const noMarkdown = removeMarkdown(noEmojis);
    return noMarkdown;
}

function removeEmojis(message: string) {
    return message.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        '');
}


function removeMarkdown(message: string) {
    return message
        .replace(/#+\s(.*)/g, '$1') // headings
        .replace(/\*\*(\S(.*?\S)?)\*\*/g, '$1') // bold
        .replace(/\*(\S(.*?\S)?)\*/g, '$1') // italic
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links
        .replace(/`(.*?)`/g, '$1') // inline code
        .replace(/\n$/gm, ''); // trailing newlines
}


function synthesizeSpeech(message: string) {
    const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    speechConfig.speechSynthesisVoiceName = "cs-CZ-VlastaNeural";
    speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;
    const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

    return new Promise<sdk.SpeechSynthesisResult>((resolve, reject) => {
        speechSynthesizer.speakTextAsync(message, resolve, reject);
    });
}