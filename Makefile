debug:
	@npm run asbuild:debug
	@cp build/debug.wasm build/hash.wasm
	@wapm run hash

all:
	@npm run asbuild
	@wapm run hash
