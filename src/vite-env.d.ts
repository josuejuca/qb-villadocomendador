/// <reference types="vite/client" />

type ViteEnvString = string;

interface ImportMetaEnv {
  readonly VITE_API_HOST?: ViteEnvString;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
