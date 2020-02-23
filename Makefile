all:
	@rm -rf build/
	@npm run asbuild
	@wapm run hash

debug:
	@npm run asbuild:debug
	@cp build/debug.wasm build/hash.wasm

build:
	@rm -rf build/
	@npm run asbuild

dev:
	@npm run asbuild:debug
	@cp build/debug.wasm build/hash.wasm
	@wapm run hash
