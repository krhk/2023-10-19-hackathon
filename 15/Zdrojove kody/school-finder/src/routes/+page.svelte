<script lang="ts">
	import {
		PaperAirplane,
		ChatBubbleOvalLeftEllipsis,
		User,
		ExclamationTriangle
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { fade, slide } from 'svelte/transition';
	import type { ChatMessage, SchoolType } from '$lib/types';
	import {afterUpdate, onMount} from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import Link from "./Link.svelte";
	import {page} from "$app/stores";
	import {browser} from "$app/environment";

	let input: string;
	let isLoading = false;
	let schoolType: SchoolType = 'none';
	let showOnboarding = 0; // 0 - není chat, jen tlačítka, 1 - máš chat na středu, 2 - chat na straně
	let div: HTMLElement;
	let audioElement: HTMLAudioElement;
	let error: string | null = null;
	let allowAudio = true;

	let nactenaSkola: any = undefined;

	$: loadSchool($page.url.searchParams);



	async function loadSchool(queryParams: URLSearchParams) {
		console.log("trying to load school");
		if(!browser) return;
		if(queryParams.get("skola") === null || queryParams.get("obor") === null) return;
		if(nactenaSkola !== undefined) return;
		let skola = queryParams.get("skola");
		let obor = queryParams.get("obor");
		const response = await fetch('/api/school', {
			method: 'POST',
			body: JSON.stringify({ skola, obor }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const status = response.status;
		if (status !== 200) {
			console.error('Error while sending message to API');
			error = 'Něco se pokazilo, zkuste to prosím znovu.';
			isLoading = false;
			return;
		}

		console.log(response);

		const data = await response.json();
		console.log(data);
		nactenaSkola = data;
		showOnboarding = 2;
	}

	async function handleSubmit() {
		const message = input;
		isLoading = true;
		messages = [...messages, { role: 'user', content: message }];
		input = '';
		const response = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({ messages, schoolType }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const status = response.status;
		if (status !== 200) {
			console.error('Error while sending message to API');
			error = 'Něco se pokazilo, zkuste to prosím znovu.';
			isLoading = false;
			return;
		}

		const data = await response.json();
		console.log(data);
		messages = [...messages, { role: 'assistant', content: data.output }];
		isLoading = false;
		setTimeout(() => {
			div.scrollTo({
				top: div.scrollHeight,
				behavior: 'smooth'
			})
		}, 200);

		const audioResponse = await fetch('/api/voice', {
			method: 'POST',
			body: JSON.stringify({ message: data.output }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const audioStatus = audioResponse.status;
		if (audioStatus !== 200) {
			console.error('Error while sending message to API');
			error = 'Něco se pokazilo, zkuste to prosím znovu.';
			isLoading = false;
			return;
		}

		const audioData = await audioResponse.arrayBuffer();
		const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });
		const audioUrl = URL.createObjectURL(audioBlob);
		playAudio(audioUrl);
	}

	afterUpdate(() => {
		if (isLoading) {
			div.scrollTo({
				top: div.scrollHeight,
				behavior: 'smooth'
			});
		}
	});

	onMount(() => {
		if(!browser) return;
		if($page.url.searchParams.has("skola")) {
			showOnboarding = 2;
			loadSchool($page.url.searchParams);
		}
	})

	function playAudio(url: string) {
		if(!allowAudio) return;
		audioElement.pause();
		audioElement.src = url;
		audioElement.play();
	}

	const introMessage =
		'Ahoj, jmenuji se Péťa a jsem tu, abych ti pomohla vybrat {schoolType} školu. Jaké jsou tvé zájmy a představy o studiu? 🙂';

	function chooseSchool(type: SchoolType) {
		showOnboarding = 1;
		schoolType = type;
		let schoolTypeFormatted = schoolType === 'vysoka' ? 'vysokou' : 'střední';
		let introMessageFormatted = introMessage.replace('{schoolType}', schoolTypeFormatted);
		messages = [...messages, { role: 'assistant', content: introMessageFormatted }];
		setTimeout(() => {
			const onboardingAudio = `/onboard-${schoolType}.mp3`;
			playAudio(onboardingAudio);
		}, 1000);
	}

	let messages: ChatMessage[] = [];
</script>

{#if showOnboarding !== 0}
	<div
		class="bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-fixed grid place-items-center"
	>
		<audio bind:this={audioElement} src="" class="invisible" />
		<div
			class={`px-6 xl:px-0 ${
				showOnboarding === 1 ? 'lg:max-w-screen-sm' : ''
			} lg:mx-8 mx-auto min-h-screen py-8 flex flex-col gap-6 lg:justify-center items-center`}
		>
			<div class="bg-slate-50 rounded-xl px-4 py-2">
				<img src="/schoolFinderLogo.svg" alt="VyberŠkolu logo" class="h-12 w-auto" />
			</div>
			{#if showOnboarding !== 0}
				<div class={`h-full w-full ${showOnboarding === 2 ? 'grid lg:grid-cols-3' : ''} gap-6`}>
					<div
						class={`${
							showOnboarding === 1 ? 'col-start-2' : ''
						} p-6 rounded-2xl bg-slate-100 flex flex-col h-[80vh] lg:h-[80vh]`}
						id="ai-popup"
						transition:slide={{ axis: 'x' }}
					>
						<div
							class="grow h-full w-full overflow-y-auto flex flex-col gap-4 px-3"
							bind:this={div}
						>
							{#each messages as message}
								<div
									class={`px-4 py-3 rounded-xl min-w-[40%] max-w-[70%] bg-gradient-to-br shadow-sm ${
										message.role === 'user'
											? 'self-end from-blue-500 to-blue-600'
											: 'self-start from-white to-gray-50'
									} flex flex-col gap-1`}
								>
									<div
										class={`text-sm font-semibold flex items-center flex-row gap-1 ${
											message.role === 'user' ? 'text-gray-50' : 'text-gray-700'
										}`}
									>
										{#if message.role === 'user'}
											<Icon src={User} class="h-4 w-4" /> Vy
										{:else}
											<Icon src={ChatBubbleOvalLeftEllipsis} class="h-4 w-4" /> Péťa
										{/if}
									</div>
									<div class={`${message.role === 'user' ? 'text-gray-100' : 'text-gray-600'}`}>
										<SvelteMarkdown source={message.content} renderers={{link: Link}} />
									</div>
								</div>
							{/each}
							{#if isLoading}
								<div class="pl-4 text-blue-500 font-medium flex flex-row items-center gap-5">
									<div class="spinner">
										<div />
										<div />
										<div />
										<div />
									</div>
									Přemýšlím...
								</div>
							{/if}
							{#if error !== null}
								<div
									class="text-center text-sm text-red-500 flex flex-row justify-center items-center gap-1"
								>
									<Icon src={ExclamationTriangle} class="h-4 w-4" />
									<p>{error}</p>
								</div>
							{/if}
						</div>
						<!-- abychom to viděli tak random barva -->
						<div
							class="w-full bg-white rounded-2xl py-2 mt-6 px-4"
							in:fade={{ delay: 400, duration: 400 }}
							out:fade={{ duration: 50 }}
						>
							<form class="flex gap-2 justify-around items-center" on:submit={handleSubmit}>
								<input
									class="w-full py-1 px-1 placeholder-slate-400 break-words bg-transparent outline-none border-y-2 border-transparent focus:border-b-blue-500 text-gray-700"
									placeholder="Zeptej se mě..."
									maxlength="500"
									bind:value={input}
								/>
								<button
									class="flex p-2.5 justify-around rounded-xl bg-gradient-to-br from-blue-500 to-blue-600"
									type="submit"
								>
									<Icon src={PaperAirplane} class="h-6 w-6 text-white" />
								</button>
							</form>
						</div>
					</div>
					{#if showOnboarding === 2 && nactenaSkola !== undefined}
					<div
						class={`lg:col-span-2 rounded-xl p-6 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-200/30 flex flex-col gap-2 lg:grid lg:grid-cols-2`}
					>
						<div>
							<h2 class="text-3xl font-medium text-gray-50">{nactenaSkola.properties.nazev}</h2>
							<ul>
								{#each Object.entries(nactenaSkola.properties) as [key, value]}
								<li class="text-gray-50">{key}: <strong class="font-semibold">{value}</strong></li>
									{/each}
							</ul>
						</div>
						<div>
							<img src="/school-placeholder.jpeg" alt="Škola" class="rounded-xl" />
						</div>
					</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div
		class="px-6 min-h-screen w-full bg-slate-50 flex flex-col justify-center items-center gap-12 absolute top-0 left-0 bottom-0 right-0 z-50"
		transition:fade={{ duration: 500 }}
	>
		<h1 class="hidden">VyberŠkolu</h1>
		<img src="/schoolFinderLogo.svg" alt="VyberŠkolu logo" class="w-full max-w-xl h-auto px-4" />
		<div class="flex flex-col w-full max-w-screen-md gap-6">
			<div class="bubble">
				<div class="flex items-center gap-1 text-xl ml-1 text-gray-700">
					<Icon src={ChatBubbleOvalLeftEllipsis} class="h-8 w-8" /> Péťa
				</div>
				<div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-950">Jakou hledáš školu? 😊</div>
			</div>
			<div class="bubble self-end">
				<div class="flex items-center gap-1 text-xl ml-1">
					<Icon src={User} class="h-8 w-8" /> Vy
				</div>
				<div class="flex justify-center items-center gap-4 mt-1 text-gray-700">
					<button class="btn-l" on:click={() => chooseSchool('stredni')}>Hledám střední</button>
					<button class="btn-l" on:click={() => chooseSchool('vysoka')}>Hledám vysokou</button>
				</div>
			</div>
			<div class="self-center text-xl mt-2 flex items-center gap-2">Zvuk
				<label class="switch">
					<input type="checkbox" checked bind:value={allowAudio}>
					<span class="slider round"></span>
				</label></div>
		</div>
		<footer class="text-center text-sm text-gray-600 flex flex-col gap-1">
			<div>
				Vytvořeno během <strong>3. ročníku Hackathonu Královéhradeckého kraje</strong>
			</div>
			<div>Autoři: Tomáš Kubišta, Jakub Doležal, Hynek Fišera, Jakub Kyzr</div>
		</footer>
	</div>
{/if}

<style>
	.spinner {
		width: 4.8px;
		height: 4.8px;
		animation: spinner-o824ag 1s infinite linear;
	}

	.spinner div {
		position: absolute;
		width: 100%;
		height: 100%;
		@apply bg-blue-500;
		border-radius: 50%;
		animation: spinner-vse6n7 1.25s infinite ease;
	}

	.spinner div:nth-child(1) {
		--rotation: 90;
	}

	.spinner div:nth-child(2) {
		--rotation: 180;
	}

	.spinner div:nth-child(3) {
		--rotation: 270;
	}

	.spinner div:nth-child(4) {
		--rotation: 360;
	}

	@keyframes spinner-vse6n7 {
		0%,
		100% {
			transform: rotate(calc(var(--rotation) * 1deg)) translateY(0);
		}

		50% {
			transform: rotate(calc(var(--rotation) * 1deg)) translateY(300%);
		}
	}

	@keyframes spinner-o824ag {
		to {
			transform: rotate(360deg);
		}
	}

	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		@apply bg-gray-500;
		-webkit-transition: .4s;
		transition: .4s;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: .4s;
		transition: .4s;
	}

	input:checked + .slider {
		@apply bg-blue-600;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #2196F3;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
