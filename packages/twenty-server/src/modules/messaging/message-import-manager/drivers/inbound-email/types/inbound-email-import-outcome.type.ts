export type InboundEmailImportOutcome =
  | { kind: 'imported'; workspaceId: string; messageChannelId: string }
  | { kind: 'unmatched'; recipient: string | null }
  | { kind: 'loop_dropped'; workspaceId: string }
  | { kind: 'unconfigured' }
  | { kind: 'parse_failed'; error: string }
  | { kind: 'persist_failed'; error: string };
