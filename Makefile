all:
	@rm -rf build/
	@npm run asbuild

debug:
	@npm run asbuild:debug
	@cp build/debug.wasm build/hash.wasm

dev:
	@npm run asbuild:debug
	@cp build/debug.wasm build/hash.wasm
	@wasmer build/debug.wasm
