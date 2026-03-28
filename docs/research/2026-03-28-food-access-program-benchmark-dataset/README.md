# Food Access Program Benchmark Dataset

Date captured: 2026-03-28
Source: user-provided benchmark table ingested from chat

This folder preserves a structured benchmark dataset for city and program comparisons relevant to StreetCart KC and the broader Kansas City food-access challenge.

## Files

- `programs.json`: normalized machine-readable version of the benchmark table

## Assumptions

- Source references are preserved exactly as provided in the chat input. They are source IDs, not full citations.
- Monetary values and counts are kept as strings unless they were already plain numeric fields in context.
- `Not in source` is kept explicitly instead of being inferred or backfilled.

## Open questions

- If this dataset should drive deck or product artifacts directly, the source ID list still needs to be mapped to full citations.
- If we want sorting/filtering or scripted reuse, we should add a small schema test for this file.
