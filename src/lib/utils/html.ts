import { type Handler, Parser } from 'htmlparser2';
export async function parseStream(source: ReadableStream<Uint8Array>, handler: Partial<Handler>) {
	const reader = source.getReader();
	const decoder = new TextDecoder();
	const parser = new Parser(handler);

	let chunk: ReadableStreamReadResult<Uint8Array>;
	while (!(chunk = await reader.read()).done) {
		parser.write(decoder.decode(chunk.value));
	}
	parser.end();
}
