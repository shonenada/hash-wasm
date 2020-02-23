all:
	@rm -rf build/
	@npm run asbuild

debug:
	@npm run asbuild:debug
	@cp build/debug.wasm build/hash.wasm
