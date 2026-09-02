# Hearthline Knowledge Steward

A **prototype** for community-governed indigenous knowledge — not a scrapeable chatbot.

All seed records belong to a **fictional demonstration community**. They exist to show access tiers, protocol tags, and model refusal. They are not the knowledge of any real people.

## What it demonstrates

| Principle | In the prototype |
| --- | --- |
| **Collective benefit** | Records serve welcome, safety, and teaching — not a product dataset |
| **Authority to control** | Four roles; visitors cannot contribute or govern |
| **Responsibility** | Audit log of role changes, questions, publish/withdraw |
| **Ethics** | Closed knowledge is a pointer; Ask will not generate it |

Ask is **extractive**. It quotes allowed records. It does not invent. Records tagged *not for the model*, and all **closed** records, never enter Ask — even when an elder can open them in the library.

## Run

From this folder:

```bash
python -m http.server 5173
```

Then open http://localhost:5173

You can also open `index.html` directly in a browser.

## Try this

1. Stay as **Visitor**. Ask: *How do you prepare fever-leaf medicine?*
2. Switch to **Community member**. Ask about ice at the bend.
3. Open **Library** as a visitor, then as an elder — watch held cards become readable.
4. As a member, **Contribute** an offer (consent boxes required). As a keeper, **Publish** it.

## Not in this prototype

Identity proof, encryption at rest, official [Local Contexts](https://localcontexts.org/) TK Labels, or a hosted LLM. Those belong in a community-owned deployment after free, prior, and informed consent.
