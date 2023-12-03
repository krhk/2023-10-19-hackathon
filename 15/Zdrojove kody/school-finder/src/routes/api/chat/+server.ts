import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { Calculator } from 'langchain/tools/calculator';

// You may want to replace the above with a static private env variable
// for dead-code elimination and build-time type-checking:
import { OPENAI_API_KEY } from '$env/static/private';

import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { ChatMessageHistory } from 'langchain/memory';
import { createRetrieverTool, OpenAIAgentTokenBufferMemory } from 'langchain/agents/toolkits';
import { AIMessage, ChatMessage, HumanMessage } from 'langchain/schema';
import { RedisVectorStore } from 'langchain/vectorstores/redis';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { getClient } from '$lib/redis';
import { Document } from 'langchain/document';
import { data } from 'autoprefixer';
const datasets = import.meta.glob('$lib/datasets/*.geojson', { as: 'raw' });
import { StructuredTool } from 'langchain/tools';
import { z } from 'zod';


const convertChatMessageToLangChainMessage = (message: ChatMessage) => {
	if (message.role === 'user') {
		return new HumanMessage(message.content);
	} else if (message.role === 'assistant') {
		return new AIMessage(message.content);
	} else {
		return new ChatMessage(message.content, message.role);
	}
};

const SYSTEM_PROMPT =
	'Assistant je chatovací bot, který má za úkol pomoct vybrat uživateli školu. Jmenuješ se Péťa. Zjisti od uživatele jeho zájmy a pomoz mu vybrat školu, střední nebo vysokou, podle toho, co si vybral. Navrhni mu více možností. Používej funkce pro zjištění informací.\n' +
	'\n' +
	'Způsob odpovědí:\n' +
	'-\tPoužívej spoustu emotikonů, uživatelé je mají rádi.\n' +
	'-\tDrž se tématu škol.\n' +
	'-\tNeodpovídej na věci netýkající se škol.\n' +
	'-\tNeodpovídej na věci, co nezjistíš z funkcí.\n' +
	'-\tFormátuj svoji odpověď v markdownu.\n' +
	'-\tPokud při hledání narazíš na více záznamů o stejné škole, tak je můžeš spojit v jednom výpisu.\n' +
	'-\tPoužívej funkci na generování odkazů v [] za názvem školy jak je vidět v příkladu, nevymýšlej si dokazy.\n' +
	'\n' +
	'Příklad konverzace:\n' +
	'Assistant: Ahoj, jmenuji se Péťa a jsem tu, abych ti pomohla vybrat vysokou školu. Jaké jsou tvé zájmy a představy o studiu? 🙂\n' +
	'User: Ahoj, chtěl bych studovat informatiku.\n' +
	'Assistant: Skvělá volba! 😃 Mohla bych se zeptat odkud přibližně jsi? 🤔\n' +
	'User: Jsem ze Všestar.\n' +
	'Assistant: Dobře, tady máš nějaké návrhy na vysoké školy s oborem informatika. 😊\n' +
	'\n' +
	'1.\tUniverzita Hradec Králové – Fakulta informatiky a managementu – aplikovaná informatika 🏫 [/?skola=Univerzita%20Hradec%20Králové&obor=Aplikovaná%20informatika]\n' +
	'2.\tUniverzita Hradec Králové – Fakulta informatiky a managementu – informační management🏫 [/?skola=Univerzita%20Hradec%20Králové&obor=Informační%20management]\n' +
	'3.\tStřední škola a vyšší odborná škola aplikované kybernetiky s.r.o. – programování 🏫 [/?skola=Střední%20škola%20a%20vyšší%20odborná%20škola%20aplikované%20kybernetiky%20s.r.o.&obor=programování]\n' +
	'4.\tStřední škola a vyšší odborná škola aplikované kybernetiky s.r.o. – počítačová grafika 🏫 [/?skola=Střední škola a vyšší odborná škola%20aplikované%20kybernetiky%20s.r.o.é&obor=počítačová%20grafika]\n' +
	'/n' +
	'User: Vygeneruj mi odkaz pro 1' +
	'Assistant: Zde je odkaz pro Univerzita Hradec Králové – Fakulta informatiky a managementu – aplikovaná informatika 🏫 [/?skola=Univerzita Hradec Králové&obor=Aplikovaná informatika]';



export const POST = (async ({ request, url }) => {
	// Extract the `prompt` from the body of the request
	const { messages, schoolType } = await request.json();
	const origin = url.origin;

	const previousMessages = messages.slice(0, messages.length - 1);
	const lastUserMessage = messages[messages.length - 1];
	const lastMessageContent = lastUserMessage.content;
	const chatHistory = new ChatMessageHistory(
		previousMessages.map(convertChatMessageToLangChainMessage)
	);

	const client = await getClient();

	console.log(chatHistory);

	const vectorStoreName = `datasets-${schoolType}`;

	const vectorStore = new RedisVectorStore(new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }), {
		redisClient: client,
		indexName: vectorStoreName
	});

	const vectorStoreExists = await vectorStore.checkIndexExists();

	if (!vectorStoreExists) {
		const allProperties = [];
		const filteredDatasets = Object.fromEntries(
			Object.entries(datasets).filter(([path, dataset]) => schoolTypeFilter(path, schoolType))
		);
		console.log(filteredDatasets);
		for (const path in filteredDatasets) {
			const dataset = await datasets[path]();
			const datasetObject = JSON.parse(dataset);
			allProperties.push(...datasetObject.features);
		}

		const documents = allProperties.map((property) => {
			return new Document({
				pageContent: JSON.stringify(property)
			});
		});

		await vectorStore.addDocuments(documents);

		console.log(`Vector store ${vectorStoreName} created`);
	} else {
		console.log(`Vector store ${vectorStoreName} exists`);
	}

	const retriever = vectorStore.asRetriever();
	const retrieverTool = createRetrieverTool(retriever, {
		name: 'search_school_dataset',
		description: 'Prohledá dataset škol pro specifickou školu nebo jinou informaci'
	});

	const tools = [new Calculator(), retrieverTool, new GenerateSchoolLinkTool(origin)];
	const chat = new ChatOpenAI({
		modelName: 'gpt-3.5-turbo-16k-0613',
		temperature: 0.3,
		openAIApiKey: OPENAI_API_KEY
	});

	const memory = new OpenAIAgentTokenBufferMemory({
		llm: chat,
		memoryKey: 'chat_history',
		outputKey: 'output',
		inputKey: 'input',
		chatHistory
	});

	const executor = await initializeAgentExecutorWithOptions(tools, chat, {
		agentType: 'openai-functions',
		verbose: true,
		returnIntermediateSteps: true,
		memory,
		agentArgs: {
			prefix: SYSTEM_PROMPT
		}
	});

	const result = await executor.call({ input: lastMessageContent });
	return json(result);
}) satisfies RequestHandler;

class GenerateSchoolLinkTool extends StructuredTool {
	schema = z.object({
		skola: z.string(),
		obor: z.string()
	});
	origin: string;

	constructor(origin: string) {
		super();
		this.origin = origin;
	}

	async _call({ skola, obor }: z.infer<typeof this.schema>): Promise<string> {
		const link = `${this.origin}/?skola=${skola}&obor=${obor}`;

		return encodeURI(link);
	}
	name = 'generate-school-link';
	description = 'Vygeneruje absolutní odkaz na více informaci o škole. Používej ji, pro vytvoření odkazu na doporučené školy.';
}

function schoolTypeFilter(file: string, schoolType: string) {
	if (file.includes(schoolType)) {
		return true;
	} else if (file.includes('all')) {
		return false;
	}
	return false;
}
