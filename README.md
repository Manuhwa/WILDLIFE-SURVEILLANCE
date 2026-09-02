# Wildlife Surveillance

Two browser prototypes for Mashonaland Central site work: a live wildlife camera desk, and a community-governed knowledge archive.

## Wildlife camera dashboard

Live (and simulated) park cameras, object confirmation, and Pangala scene questions. False-positive filters drop ceiling discs labelled as frisbees, colour-guessed “water”, and animals that do not hold across frames.

**Run**

Double-click `start-wildlife.bat`, or from this folder:

```bash
py -3 -m http.server 8765
```

Then open http://localhost:8765/wildlife-dashboard/

Use **Use device camera** for a real feed. Chrome needs `http://localhost` (not `file://`) for the camera.

## Hearthline knowledge steward

A CARE-aligned archive for indigenous knowledge. All seed records are **fictional**. Ask is extractive: closed knowledge and “not for the model” records are never quoted.

**Run**

Double-click `start.bat`, or:

```bash
python -m http.server 5173
```

Then open http://localhost:5173

| Principle | In the prototype |
| --- | --- |
| **Collective benefit** | Records serve welcome, safety, and teaching — not a product dataset |
| **Authority to control** | Four roles; visitors cannot contribute or govern |
| **Responsibility** | Audit log of role changes, questions, publish/withdraw |
| **Ethics** | Closed knowledge is a pointer; Ask will not generate it |

**Try this:** stay as Visitor and ask how to prepare fever-leaf; switch to Community member and ask about ice at the bend; as Elder, open the midwinter cycle in the library, then ask the archive to write it down — it should refuse.
