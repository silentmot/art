---
applyTo: "**"
---

# GZANSP × AOC — Content‑Agnostic Agent Contract (Method‑First, Zero‑Legacy)

> **Purpose:** A universal, stack‑agnostic contract that merges the Global Zero‑Assumption, No‑Skipping Protocol (GZANSP) with a Method‑First Agent Operating Contract (AOC). It prevents legacy leakage, blocks hidden defaults, enforces centralized constants, and mandates full‑scope coverage with verifiable sources. All examples below are patterns, not stack‑bindings.

**No-Any Rule (for Copilot/Agents)**

## RULE: ABSOLUTELY NO USAGE OF `any` TYPE

- Do not use `any` in type annotations, assertions, generics, or anywhere in the codebase.
- All types must be explicit, concrete, and as narrow as possible.
- If a type cannot be determined, use `unknown` and type-guard as needed, or declare a TODO (never `any`).
- Any code containing `any` will be considered incomplete and must be refactored before acceptance.

---

## 0) AI Agent Oath (must precede any work)

- I MUST follow GZANSP × AOC verbatim in EVERY response within the declared scope.
- I WILL NOT assume, invent, skip, or deviate.
- Violation (e.g., adding random data) INVALIDATES my output — restart required.
- Confirmation line (mandatory): `GZANSP Adhered: Sources listed, no inventions.`

## Naming Conventions

- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (\_)
- Use ALL_CAPS for constants

## Error Handling

- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information

---

## 1) Critical Requirements (apply to ALL content)

- Centralized constants only. Never duplicate; always import from the single source of truth.
- Change flow is logged: when constants or configs change, record the exact file path and diff in the work log.
- No API versioning in paths. Endpoints follow `/api/[module]/[resource]`. Forbid `/api/v1/...` or `/api/v2/...`.
- Forbidden terminology (ban in names, copy, commits, UI, comments, docs):
  Comprehensive, Enhanced, Advanced, Corrected, Fixed, Implemented, Future, Final, Improved, Upgraded, Perfected, Complete, Newer, Refined, Optimized, Best, Ideal, Flawless, Optimal, Executive, New, Old, Updated, Modified, Migrated
- File handling rule. Adjusted artifacts replace originals in place — no suffixes or prefixes (not `*_New.*`, not `*V2*`).
- No random data. Use only what exists in the request, supplied sources, code, docs, datasets, or constants. Creative content is opt‑in and must be labeled.
- Follow the request exactly. No unrequested add‑ons.

---

## 2) Method‑First Integration Rules (AOC core)

- Adapter selection is explicit. A single flag like `IO_METHOD` selects one adapter per operation (examples: socket, http, serial, mq).
- Zero legacy leakage. Do not import legacy names or values. Legacy may inform the method category only, never names or defaults.
- No baked‑in defaults. Code must not hardcode numeric or string fallbacks for env or config. Use placeholders in config and throw if placeholders persist at runtime.
- Resolver‑driven endpoints. Targets such as host, port, URL, queue, or device path come from a resolver (database, registry, config server, secrets manager), not from hardcoded lists.
- Validation before run. Bootstrap fails fast if required knobs are missing or placeholders remain.
- Separation of concerns: resolver (returns target and params), adapter (performs the I O), parser (extracts values and enforces thresholds).
- Security. Never log secrets. Only publish non‑secret browser configs.

---

## 3) Scope Declaration (must be written before any analysis or work)

Use this exact shape; scope is immutable unless fully re‑declared.

Scope:

- Files: list every file
- Endpoints: list every endpoint
- Sections or Screens: list every item
- Datasets or Sheets: list every dataset
- Assets: list every design or media asset

Each item must receive one of: Reviewed — No Issues; Reviewed — Issues: details; Reviewed — Irrelevant, No Changes Needed. End of work: print a coverage table with 100 percent of items accounted for.

---

## 4) Assumption Policy (zero‑assumption)

Every decision must cite a source fragment (request text, constants, code lines, spec pages, dataset cells, documented requirements).

Process per decision: identify the source location; quote the minimal relevant fragment; apply it without alteration.

Mandatory line: `Assumption Check: Zero assumptions made — Sources: [enumerate exact sources or paths or lines or sections].`

If a datum is missing: halt and request it, or switch to Creative Mode only when explicitly authorized.

---

## 5) Content Modes (pick exactly one and label it)

- Factual Mode: no fabrication; external facts require provided sources.
- Procedural Mode: steps or scripts strictly from sources or request.
- Transformation Mode: transform the provided input; minimal connective phrasing.
- Creative Mode (opt‑in): only if explicitly requested; label as Creative Mode; no real‑world claims as facts.

---

## 6) Execution Workflow (single deterministic pass)

1. Oath and Scope Declaration.
2. Source Inventory: enumerate all usable sources supplied.
3. Mode Selection.
4. Item‑by‑Item Review with inline source citations.
5. Apply constants from the S O T only; no local copies.
6. Endpoint audit: verify `/api/[module]/[resource]` only.
7. Forbidden‑term sweep across outputs, names, commits, comments.
8. File‑handling rule enforced (replace in place).
9. Assumption Check plus Coverage table printed.
10. Deliver artifacts exactly as requested.

---

## 7) Config Pattern (placeholders only; stack‑agnostic)

Use placeholders; adapters validate and throw if placeholders remain. The same pattern applies to env files, yaml or json, or secret stores.

- Adapter selection: `IO_METHOD = {socket|http|serial|mq}`
- Socket adapter knobs: `TARGET_DEFAULT = {host:port}`, `TIMEOUT_MS = {ms}`, `READ_ATTEMPTS = {count}`, `READ_INTERVAL_MS = {ms}`, `PARSE_PATTERN = {pattern}`, `MIN_ACCEPTABLE = {number}`, optional `SLICE_START` and `SLICE_END`.
- HTTP adapter knobs: `BASE_URL = {url}`, `AUTH_TOKEN = {token}`, `PATH = {path}`, `TIMEOUT_MS = {ms}`, optional `SCHEMA_REF`.
- Serial and MQ knobs if applicable: `PORT = {device}`, `BAUD = {baud}`, `BROKER_URL = {url}`, `TOPIC = {name}`.

Do not embed device lists here; the resolver supplies concrete endpoints per request or entity.

---

## 8) Validation Layer (stack‑agnostic)

Use a schema or validator suitable to your language. Validation must fail on placeholders, ensure types are correct, and enforce adapter‑specific required fields when the selected adapter is in use.

---

## 9) Resolver and Adapter Contracts (generic)

Resolver interface (conceptual): `resolveEndpoint(subjectId) -> { target, params }` where target is host and port, URL, device path, or broker and topic; params are optional adapter‑specific settings.

Adapter responsibilities: open the connection for the selected method; acquire frames or messages; apply the parser to extract values; enforce acceptance thresholds or windows; return a normalized result or raise explicit errors.

---

## 10) Guardrails — Pre‑commit and CI (cross‑stack patterns)

- Maintain a project owned banned lexicon file at `.guard/banned_lexicon.txt`. The hook blocks additions of these tokens in diffs (case‑insensitive, whole‑word where practical).
- Block hardcoded env fallbacks such as `process.env.VAR ?? 'value'` or `os.getenv('VAR', 'value')` using language appropriate scanners.
- Block versioned endpoints in changed lines by rejecting any path that matches `/api/.../v[digits]/`.
- In CI, run the same guards as a required job.

Example pre‑commit (POSIX shell):

```
#!/usr/bin/env bash
set -euo pipefail
# block versioned endpoints
if git diff --cached -U0 | grep -E "/api/.*/v[0-9]+/" -q; then
  echo "GZANSP: Versioned API path detected. Use /api/[module]/[resource]." >&2
  exit 1
fi
# banned lexicon
LEX=.guard/banned_lexicon.txt
[ -f "$LEX" ] || exit 0
PATTERN=$(tr '
' '|' < "$LEX")
if git diff --cached -U0 | grep -Eio "($PATTERN)" -q; then
  echo "GZANSP: Banned tokens found (see $LEX)." >&2
  exit 1
fi
```

---

## 11) Agent Prompt Template (paste into any code LLM)

Role: You operate under GZANSP × AOC. You must comply or stop.

Hard Rules:

1. Use exactly one method adapter per operation.
2. Resolve endpoints via a resolver; do not hardcode or list devices in env or code.
3. No legacy leakage: methods only, no legacy names or values.
4. No baked‑in defaults: placeholders in config; throw if placeholders persist at runtime.
5. Validate env or config via schema; abort on placeholders or type errors.
6. Centralized constants only; import from the S O T module or file.
7. Public or browser configs must be non‑secret only.

Tasks: implement or update resolver, selected adapter, and parser; update tests and smoke scripts; produce a report using the Reporting Template.

Exit criteria: all guards pass and tests are green.

---

## 12) Reporting Template (include in outputs or PRs)

GZANSP Adhered: Sources listed, no inventions.

Mode: Factual or Procedural or Transformation or Creative (opt‑in)
Sources: list of paths or ids with a short quoted fragment for each

Scope: list all files, endpoints, and assets (immutable; if changed, re‑declare)

Per‑Item Review: for each item, mark status and include sources

Endpoint Audit: allowed only `/api/[module]/[resource]`; violations listed

Constants: imported from; changes and rationale quoted from source

Forbidden Terminology Sweep: violations listed or none

File Handling Rule: replacements done in place; originals deleted

Assumption Check: Zero assumptions made — sources listed

Coverage: total items, reviewed count showing 100 percent

---

## 13) Quick‑Start Checklist

- Oath line printed
- Scope declared (immutable)
- Mode selected
- Constants imported (no duplicates)
- Endpoint audit (no versions)
- Forbidden terms sweep clear
- File handling rule enforced
- Assumption Check included
- Coverage table shows 100 percent

---

Outcome: This protocol is portable, testable, and enforceable. It generalizes across stacks, prevents legacy drift, blocks hidden defaults, mandates resolver driven endpoints, and guarantees full‑scope, source‑backed outputs.
