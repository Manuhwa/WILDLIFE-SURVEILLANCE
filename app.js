(function () {
  "use strict";

  var KEY = "hearthline-steward-v1";
  var ROLES = ["visitor", "member", "keeper", "elder"];
  var PAGES = ["library", "ask", "graph", "contribute", "governance"];
  var ACCESS_ORDER = ["public", "community", "restricted", "closed"];

  var ROLE_LABEL = {
    visitor: "Visitor",
    member: "Community member",
    keeper: "Knowledge keeper",
    elder: "Elder council",
  };

  var ROLE_BLURB = {
    visitor:
      "Public records only. The archive will not answer from community, restricted, or closed knowledge.",
    member:
      "Public and community records. Restricted keeper instruction and closed ceremonial knowledge stay out of view.",
    keeper:
      "Public, community, and restricted records. Closed council knowledge remains a pointer, not a digital teaching.",
    elder:
      "All four tiers in the library. Closed records still never enter Ask — the model is not the archive.",
  };

  var ACCESS_LABEL = {
    public: "Public",
    community: "Community",
    restricted: "Restricted",
    closed: "Closed",
  };

  var PROTOCOL_LABEL = {
    attribution: "Attribution",
    "community-use": "Community use only",
    "non-commercial": "Non-commercial",
    outreach: "Outreach OK",
    seasonal: "Seasonal",
    "no-ai": "Not for the model",
    "sacred-closed": "Held / not circulated",
    verified: "Keeper verified",
  };

  var PROTOCOL_HINT = {
    attribution: "Name the holder when this is shared.",
    "community-use": "For community purposes, not external publication.",
    "non-commercial": "No sale, product, or training-data use.",
    outreach: "May be used in visitor welcome and public education.",
    seasonal: "Teaching happens in a named season, not on demand.",
    "no-ai": "Visible in the library; excluded from Ask.",
    "sacred-closed": "A pointer only. Transmission is in person.",
    verified: "Reviewed by a named keeper or the council.",
  };

  var TIER = {
    visitor: ["public"],
    member: ["public", "community"],
    keeper: ["public", "community", "restricted"],
    elder: ["public", "community", "restricted", "closed"],
  };

  var PROTOCOLS = Object.keys(PROTOCOL_LABEL);

  var CONSENT = [
    "I have standing to offer this, or I am offering only my own words.",
    "I understand this may be refused, returned, or later withdrawn.",
    "I have not included GPS, sacred names, or closed ceremonial detail.",
    "Collective benefit: this is for the community, not a product dataset.",
    "I do not consent to this record being used to train outside models.",
  ];

  var ASK_EXAMPLES = [
    "Where may visitors walk, and can I take photographs?",
    "How do you prepare fever-leaf medicine?",
    "When is it safe to cross the ice at the bend?",
    "Tell me the midwinter night cycle so I can write it down.",
    "What public names can be printed on a visitor map?",
  ];

  var POS = {
    welcome: { x: 160, y: 80 },
    "flood-landings": { x: 420, y: 70 },
    "place-names": { x: 680, y: 90 },
    "ice-read": { x: 300, y: 230 },
    "dye-plant": { x: 560, y: 240 },
    "held-names": { x: 780, y: 250 },
    "fever-leaf": { x: 480, y: 400 },
    "night-cycle": { x: 200, y: 400 },
  };

  var FILL = {
    public: "#3d4f66",
    community: "#3f5c4a",
    restricted: "#8a4b1f",
    closed: "#6b2e2e",
  };

  var SEED = [
    {
      id: "welcome",
      title: "Visitor welcome and walking protocol",
      kind: "protocol",
      access: "public",
      protocols: ["attribution", "outreach", "verified"],
      holder: "Welcome lodge",
      place: "River gate",
      summary:
        "How visitors are received, where they may walk, and when cameras stay in the bag.",
      body: "Visitors arrive at the river gate, not at dwellings. A named host walks the public path: the landing, the viewing terrace, and the craft shed porch. Photography is allowed of the river and of objects offered for display. Do not photograph people, doorways, or the uphill trail. If a host raises a hand, the group stops and waits. Questions about living practice are answered only from public records, or deferred to a keeper.",
      links: ["flood-landings", "place-names"],
      status: "published",
      createdAt: "2024-03-12",
      allowAsk: true,
    },
    {
      id: "flood-landings",
      title: "Spring water and public landing places",
      kind: "place",
      access: "public",
      protocols: ["attribution", "outreach", "seasonal", "verified"],
      holder: "Landing keepers",
      season: "High water (spring)",
      place: "Public landings",
      summary:
        "Which landings stay open when the river rises, for visitors and boats.",
      body: "In high water the lower gravel bar is closed. Public landing is the stone pier only. The old sand beach is not a path — it undercuts. Hosts post a painted board at the gate: green pier, red beach. This record is for safety and visitor routing. It does not describe community landings further upriver.",
      links: ["welcome", "ice-read"],
      status: "published",
      createdAt: "2024-04-02",
      allowAsk: true,
    },
    {
      id: "place-names",
      title: "Public names along the river",
      kind: "language",
      access: "public",
      protocols: ["attribution", "outreach", "verified"],
      holder: "Language circle",
      place: "River corridor",
      summary:
        "Names visitors may use. Held names are listed as withheld, not spelled.",
      body: "Public names: River Gate, Stone Pier, Viewing Terrace, Craft Shed, Lower Meadow (from the terrace only). Several older names for bends and springs are held by the language circle. They are not written here. If a visitor hears a held name, they do not repeat it in recordings or maps.",
      links: ["welcome", "held-names"],
      status: "published",
      createdAt: "2024-05-18",
      allowAsk: true,
    },
    {
      id: "ice-read",
      title: "Reading winter ice at the bend",
      kind: "practice",
      access: "community",
      protocols: ["community-use", "seasonal", "verified"],
      holder: "Winter walkers",
      season: "Hard freeze",
      place: "The bend",
      summary:
        "How members judge ice before crossing. Not a tourist instruction.",
      body: "Cross only in hard freeze after three still nights. Read the dark seams along the outside bend — they open first. Carry a pole. Children do not walk ahead. If the ice talks in long notes, turn back. This is community safety knowledge. It is not published on visitor maps and is not a dare for guests.",
      links: ["flood-landings"],
      status: "published",
      createdAt: "2024-01-09",
      allowAsk: true,
    },
    {
      id: "dye-plant",
      title: "Basket-dye plant of the lower meadow",
      kind: "practice",
      access: "community",
      protocols: ["community-use", "non-commercial", "seasonal", "verified"],
      holder: "Basket circle",
      season: "Late summer",
      place: "Lower meadow (general)",
      summary:
        "When and how members gather dye plant. Habitat is described without coordinates.",
      body: "Gather after seed-set, never the last stand in a patch, never from the terrace edge that visitors photograph. Cut, do not pull. Teach the colour on finished baskets, not by posting maps. Location stays general: lower meadow, away from the public path. Do not add GPS, What3Words, or trail screenshots to this record.",
      links: ["welcome"],
      status: "published",
      createdAt: "2024-08-21",
      allowAsk: true,
    },
    {
      id: "held-names",
      title: "Held place names (circle list)",
      kind: "language",
      access: "community",
      protocols: ["community-use", "no-ai", "verified"],
      holder: "Language circle",
      summary:
        "A register that these names exist and who may teach them. The names themselves are not in Ask.",
      body: "The circle maintains a spoken list of held names for two springs, one burial slope, and the inner bend. This written record confirms that the list exists, that teaching is person-to-person, and that the names are not for visitor maps, tourism copy, or the archive's Ask model. Members see that the list is held. They do not copy it into notes that leave the circle.",
      links: ["place-names"],
      status: "published",
      createdAt: "2024-05-19",
      allowAsk: false,
    },
    {
      id: "fever-leaf",
      title: "Fever-leaf preparation (keeper instruction)",
      kind: "practice",
      access: "restricted",
      protocols: ["community-use", "non-commercial", "no-ai", "verified"],
      holder: "Plant keepers",
      season: "After first frost",
      place: "Withheld",
      summary:
        "Keeper-only preparation notes. Harvest location is omitted. Excluded from Ask.",
      body: "This instruction is for named plant keepers. Harvest site is not written. Preparation: dry in shade, not in the craft shed; do not combine with the visitor tea blend; stop if the leaf shows rust. The last stand is never taken. Digital text is a reminder for keepers who already received in-person teaching. It is not a recipe for the public, researchers, or the Ask model.",
      links: ["dye-plant"],
      status: "published",
      createdAt: "2023-11-02",
      allowAsk: false,
    },
    {
      id: "night-cycle",
      title: "Midwinter night cycle",
      kind: "story",
      access: "closed",
      protocols: ["sacred-closed", "seasonal", "no-ai", "verified"],
      holder: "Elder council",
      season: "Midwinter, in person",
      place: "Not a tourist site",
      summary:
        "A pointer. The cycle is not a digital object. Ask will not quote it.",
      body: "This record is a stub so the archive can say the knowledge is held, by whom, and in which season — without becoming the teaching. The midwinter night cycle is transmitted in person, by named keepers, in season. It is not recorded, not summarised for visitors, and not available to the Ask model even when an elder is signed in. If someone asks the archive for the cycle, the correct answer is to stop and send them to the council, not to generate a story.",
      links: [],
      status: "published",
      createdAt: "2022-12-20",
      allowAsk: false,
    },
  ];

  var STOP = {
    the: 1, a: 1, an: 1, and: 1, or: 1, to: 1, of: 1, in: 1, on: 1, for: 1,
    is: 1, are: 1, how: 1, what: 1, where: 1, when: 1, who: 1, do: 1, does: 1,
    can: 1, i: 1, we: 1, you: 1, me: 1, my: 1, please: 1, tell: 1,
  };

  var state = {
    role: "visitor",
    page: "library",
    records: SEED.slice(),
    asks: [],
    audit: [],
    query: "",
    tier: "all",
    openId: null,
    lastAsk: null,
    contribNotice: null,
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function uid() {
    return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
  }

  function canSee(role, access) {
    return TIER[role].indexOf(access) !== -1;
  }

  function canContribute(role) {
    return role === "member" || role === "keeper" || role === "elder";
  }

  function canGovern(role) {
    return role === "keeper" || role === "elder";
  }

  function eligibleForAsk(record, role) {
    if (!canSee(role, record.access)) return false;
    if (record.status !== "published") return false;
    if (record.access === "closed") return false;
    if (!record.allowAsk) return false;
    if (record.protocols.indexOf("no-ai") !== -1) return false;
    if (record.protocols.indexOf("sacred-closed") !== -1) return false;
    return true;
  }

  function tokens(text) {
    return String(text)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter(function (w) {
        return w.length > 2 && !STOP[w];
      });
  }

  function score(query, record) {
    var q = tokens(query);
    var hay = tokens(
      record.title +
        " " +
        record.summary +
        " " +
        record.body +
        " " +
        (record.place || "") +
        " " +
        record.kind
    );
    if (!q.length) return 0;
    var hits = 0;
    q.forEach(function (t) {
      if (hay.indexOf(t) !== -1) hits += 1;
      else if (
        hay.some(function (h) {
          return h.indexOf(t) !== -1 || t.indexOf(h) !== -1;
        })
      )
        hits += 0.4;
    });
    return hits / q.length;
  }

  function wantsClosed(query) {
    var q = query.toLowerCase();
    return (
      q.indexOf("night cycle") !== -1 ||
      q.indexOf("midwinter") !== -1 ||
      q.indexOf("ceremony") !== -1 ||
      q.indexOf("ceremonial") !== -1 ||
      q.indexOf("sacred") !== -1 ||
      q.indexOf("secret") !== -1
    );
  }

  function wantsMedicine(query) {
    var q = query.toLowerCase();
    return (
      q.indexOf("fever") !== -1 ||
      q.indexOf("medicine") !== -1 ||
      q.indexOf("heal") !== -1 ||
      q.indexOf("preparation") !== -1 ||
      q.indexOf("recipe") !== -1
    );
  }

  function extractSentences(body, query, limit) {
    var parts = body.split(/(?<=[.!?])\s+/).map(function (s) {
      return s.trim();
    }).filter(Boolean);
    var q = tokens(query);
    var ranked = parts
      .map(function (s) {
        var hay = tokens(s);
        var sc = q.filter(function (t) {
          return hay.indexOf(t) !== -1;
        }).length;
        return { s: s, sc: sc };
      })
      .sort(function (a, b) {
        return b.sc - a.sc;
      });
    var picked = (ranked[0] && ranked[0].sc
      ? ranked.filter(function (r) {
          return r.sc > 0;
        })
      : ranked
    )
      .slice(0, limit)
      .map(function (r) {
        return r.s;
      });
    return picked.join(" ");
  }

  function askArchive(query, role, records) {
    var trimmed = query.trim();
    if (!trimmed) {
      return {
        query: query,
        role: role,
        answer:
          "Ask a question. The archive answers only from records you are allowed to see.",
        usedIds: [],
        withheld: "empty",
      };
    }
    if (wantsClosed(trimmed)) {
      return {
        query: query,
        role: role,
        answer:
          "That knowledge is held. It is not a digital object. The archive will not summarise, generate, or quote it. If you have standing, speak with the elder council in person and in season.",
        usedIds: [],
        withheld: "closed",
      };
    }
    var visible = records.filter(function (r) {
      return eligibleForAsk(r, role);
    });
    var ranked = visible
      .map(function (r) {
        return { r: r, sc: score(trimmed, r) };
      })
      .filter(function (x) {
        return x.sc >= 0.18;
      })
      .sort(function (a, b) {
        return b.sc - a.sc;
      })
      .slice(0, 3);

    var hiddenMatch =
      records.some(function (r) {
        return (
          !eligibleForAsk(r, role) &&
          r.status === "published" &&
          score(trimmed, r) >= 0.22
        );
      }) || wantsMedicine(trimmed);

    if (!ranked.length) {
      if (hiddenMatch || wantsMedicine(trimmed)) {
        return {
          query: query,
          role: role,
          answer:
            "The archive has no answer at your access level. That may mean the knowledge is community, restricted, closed, or tagged not-for-the-model. It does not mean the answer is 'unknown' — it means this system will not speak it.",
          usedIds: [],
          withheld: "tier",
        };
      }
      return {
        query: query,
        role: role,
        answer:
          "Nothing in the records you can use matches this question. The steward does not invent beyond the knowledge graph.",
        usedIds: [],
        withheld: "empty",
      };
    }

    var used = ranked.map(function (x) {
      return x.r;
    });
    var lines = used.map(function (r) {
      return (
        r.title +
        " (" +
        r.holder +
        "): " +
        extractSentences(r.body, trimmed, 2)
      );
    });
    var extra =
      hiddenMatch && role !== "elder"
        ? " Some related records exist above your access, or are excluded from the model. They are not used here."
        : "";
    return {
      query: query,
      role: role,
      answer:
        "From records you may use:\n\n" +
        lines.join("\n\n") +
        extra +
        "\n\nThis answer is extractive. It is not a generated teaching.",
      usedIds: used.map(function (r) {
        return r.id;
      }),
      withheld: hiddenMatch ? "tier" : "none",
    };
  }

  function persist() {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        records: state.records.filter(function (r) {
          return SEED.every(function (s) {
            return s.id !== r.id;
          });
        }),
        asks: state.asks,
        audit: state.audit,
      })
    );
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var parsed = JSON.parse(raw);
      var extras = parsed.records || [];
      state.records = SEED.concat(extras);
      state.asks = parsed.asks || [];
      state.audit = parsed.audit || [];
      state.lastAsk = state.asks[0] || null;
    } catch (e) {
      /* keep seed */
    }
  }

  function log(action, detail, asRole) {
    state.audit.unshift({
      id: uid(),
      at: new Date().toISOString(),
      role: asRole || state.role,
      action: action,
      detail: detail,
    });
    state.audit = state.audit.slice(0, 80);
    persist();
  }

  function setRole(role) {
    state.role = role;
    log("role", "Signed in as " + role, role);
    render();
  }

  function setPage(page) {
    state.page = page;
    render();
  }

  function tags(record, includeProtocols) {
    var html =
      '<span class="tag ' +
      record.access +
      '">' +
      esc(ACCESS_LABEL[record.access]) +
      "</span>" +
      '<span class="tag proto">' +
      esc(record.kind) +
      "</span>";
    if (record.status !== "published") {
      html += '<span class="tag proto">' + esc(record.status) + "</span>";
    }
    if (includeProtocols) {
      record.protocols.forEach(function (p) {
        html +=
          '<span class="tag proto" title="' +
          esc(PROTOCOL_HINT[p]) +
          '">' +
          esc(PROTOCOL_LABEL[p]) +
          "</span>";
      });
    }
    return html;
  }

  function renderShell() {
    document.getElementById("roles").innerHTML = ROLES.map(function (r) {
      return (
        '<button type="button" data-role="' +
        r +
        '" class="' +
        (state.role === r ? "active" : "") +
        '">' +
        esc(ROLE_LABEL[r]) +
        "</button>"
      );
    }).join("");

    document.getElementById("nav").innerHTML =
      PAGES.map(function (p) {
        return (
          '<button type="button" data-page="' +
          p +
          '" class="' +
          (state.page === p ? "active" : "") +
          '">' +
          esc(p.charAt(0).toUpperCase() + p.slice(1)) +
          "</button>"
        );
      }).join("") +
      "<p>" +
      esc(ROLE_BLURB[state.role]) +
      "</p>";
  }

  function renderLibrary() {
    var q = state.query.trim().toLowerCase();
    var list = state.records.filter(function (r) {
      if (state.tier !== "all" && r.access !== state.tier) return false;
      if (!q) return true;
      var hay = (r.title + " " + r.summary + " " + r.holder + " " + r.kind).toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    var chips =
      '<button type="button" data-tier="all" class="' +
      (state.tier === "all" ? "active" : "") +
      '">All tiers</button>' +
      ACCESS_ORDER.map(function (a) {
        return (
          '<button type="button" data-tier="' +
          a +
          '" class="' +
          (state.tier === a ? "active" : "") +
          '">' +
          esc(a) +
          "</button>"
        );
      }).join("");

    var cards = list
      .map(function (r) {
        var visible = canSee(state.role, r.access);
        return (
          '<button type="button" class="card ' +
          (visible ? "" : "veil") +
          '" data-open="' +
          esc(r.id) +
          '"><div class="meta">' +
          tags(r, false) +
          "</div><h3>" +
          esc(visible ? r.title : "Record held above your access") +
          '</h3><p class="muted">' +
          esc(
            visible
              ? r.summary
              : "The steward shows that knowledge exists without disclosing it. Switch role in the demo to see how tiers work."
          ) +
          '</p><span class="muted">' +
          esc(visible ? r.holder : "") +
          "</span></button>"
        );
      })
      .join("");

    var open = state.records.filter(function (r) {
      return r.id === state.openId;
    })[0];
    var detail = "";
    if (open) {
      var canRead = canSee(state.role, open.access);
      detail =
        '<article class="detail"><div class="meta">' +
        tags(open, canRead) +
        "</div><h2>" +
        esc(canRead ? open.title : "Held record") +
        "</h2>" +
        (canRead
          ? '<p class="muted">Holder: ' +
            esc(open.holder) +
            (open.place ? " · " + esc(open.place) : "") +
            (open.season ? " · " + esc(open.season) : "") +
            (open.allowAsk ? "" : " · Excluded from Ask") +
            '</p><p class="body">' +
            esc(open.body) +
            "</p>"
          : '<p class="body">Your current role cannot open this record. The title, body, and protocols stay with the community. Use the role switcher only because this is a demonstration — a live system would not let visitors impersonate keepers.</p>') +
        "</article>";
    }

    return (
      '<div class="page-head"><h1>Library</h1><p>Records you cannot open still appear as held cards. That is deliberate: the archive can admit that knowledge exists without putting it on the screen or into a model.</p></div>' +
      '<div class="toolbar"><input class="search" id="lib-search" value="' +
      esc(state.query) +
      '" placeholder="Search titles and summaries you are allowed to see" /><div class="chips">' +
      chips +
      "</div></div><div class=\"grid\">" +
      cards +
      "</div>" +
      detail
    );
  }

  function renderAsk() {
    var current = state.lastAsk;
    var examples = ASK_EXAMPLES.map(function (q) {
      return '<button type="button" data-example="' + esc(q) + '">' + esc(q) + "</button>";
    }).join("");

    var answer = "";
    if (current) {
      var label =
        current.withheld === "none"
          ? "Drawn from allowed records"
          : current.withheld === "closed"
            ? "Refused — held knowledge"
            : current.withheld === "tier"
              ? "Refused or partial — above access / not for the model"
              : "No matching allowed record";
      var cited = current.usedIds
        .map(function (id) {
          var rec = state.records.filter(function (r) {
            return r.id === id;
          })[0];
          return rec ? rec.title : id;
        })
        .join(" · ");
      answer =
        '<div class="answer ' +
        (current.withheld === "none" ? "" : "withheld") +
        '"><p class="muted">' +
        esc(label) +
        "</p>" +
        esc(current.answer) +
        (cited
          ? '<p class="muted" style="margin-top:12px">Cited: ' + esc(cited) + "</p>"
          : "") +
        "</div>";
    }

    return (
      '<div class="page-head"><h1>Ask the archive</h1><p>Answers are extractive: they quote records your role may use. Closed knowledge, and anything tagged “not for the model,” never enter the answer — even if you can read them in the library as an elder.</p></div>' +
      '<p class="muted" style="margin-top:16px">Signed in as ' +
      esc(ROLE_LABEL[state.role]) +
      ". Switch role in the top bar, then ask the same question again.</p>" +
      '<div class="ask-box"><textarea id="ask-q" placeholder="Ask only from this community’s graph. The steward will not invent."></textarea>' +
      '<div class="row"><button class="btn" type="button" id="ask-run">Ask</button></div>' +
      '<div class="examples">' +
      examples +
      "</div></div>" +
      answer
    );
  }

  function renderGraph() {
    var seed = state.records.filter(function (r) {
      return POS[r.id];
    });
    var visible = seed.filter(function (r) {
      return canSee(state.role, r.access);
    }).length;

    var lines = "";
    seed.forEach(function (r) {
      (r.links || []).forEach(function (b) {
        if (!POS[b]) return;
        var rb = seed.filter(function (x) {
          return x.id === b;
        })[0];
        var open =
          rb && canSee(state.role, r.access) && canSee(state.role, rb.access);
        var a = POS[r.id];
        var c = POS[b];
        lines +=
          '<line x1="' +
          a.x +
          '" y1="' +
          a.y +
          '" x2="' +
          c.x +
          '" y2="' +
          c.y +
          '" stroke="' +
          (open ? "#3d5344" : "#cbbda4") +
          '" stroke-width="' +
          (open ? "1.6" : "1") +
          '" ' +
          (open ? "" : 'stroke-dasharray="4 4"') +
          " />";
      });
    });

    var nodes = seed
      .map(function (r) {
        var p = POS[r.id];
        var open = canSee(state.role, r.access);
        var label = open ? r.title.split(" ").slice(0, 3).join(" ") : "Held";
        return (
          '<g transform="translate(' +
          p.x +
          ", " +
          p.y +
          ')"><circle r="' +
          (open ? 16 : 12) +
          '" fill="' +
          (open ? FILL[r.access] : "#cbbda4") +
          '" opacity="' +
          (open ? 1 : 0.75) +
          '" /><text y="36" text-anchor="middle" font-size="12" fill="#221b14">' +
          esc(label) +
          "</text></g>"
        );
      })
      .join("");

    return (
      '<div class="page-head"><h1>Knowledge graph</h1><p>Nodes you cannot access stay on the map as silhouettes. Ask only walks nodes that are both visible and eligible — closed and “not for the model” stay off that walk.</p></div>' +
      '<div class="stats"><div><b>' +
      seed.length +
      "</b><span>seed records</span></div><div><b>" +
      visible +
      "</b><span>open at this role</span></div><div><b>" +
      (seed.length - visible) +
      "</b><span>held / silhouetted</span></div></div>" +
      '<div class="graph-wrap"><svg viewBox="0 0 920 500" width="100%" height="500" role="img"><title>Hearthline knowledge graph</title>' +
      lines +
      nodes +
      "</svg></div>" +
      '<p class="muted">Colour: public (slate), community (moss), restricted (clay), closed (oxblood). Grey nodes are above your access.</p>'
    );
  }

  function renderContribute() {
    if (!canContribute(state.role)) {
      return '<div class="page-head"><h1>Contribute</h1><p>Visitors cannot add records. Switch to Community member, Knowledge keeper, or Elder council to offer knowledge. A live system would verify identity with the community — this demo only switches roles.</p></div>';
    }
    var notice = state.contribNotice
      ? '<div class="callout">Offer received as pending review (' +
        esc(state.contribNotice) +
        "). It will not appear in Ask until it is published — and never if it is closed or tagged not for the model.</div>"
      : "";
    var proto = PROTOCOLS.map(function (p) {
      return (
        '<button type="button" class="proto-toggle" data-proto="' +
        p +
        '" title="' +
        esc(PROTOCOL_HINT[p]) +
        '">' +
        esc(PROTOCOL_LABEL[p]) +
        "</button>"
      );
    }).join("");
    var checks = CONSENT.map(function (line, i) {
      return (
        '<label><input type="checkbox" data-consent="' +
        i +
        '" /><span>' +
        esc(line) +
        "</span></label>"
      );
    }).join("");
    return (
      '<div class="page-head"><h1>Contribute</h1><p>Offers sit as pending until a keeper or the council publishes them. Default tags exclude the model. Closed ceremonial knowledge should not be typed here at all — offer a pointer, or speak in person.</p></div>' +
      notice +
      '<form class="form" id="contrib-form">' +
      '<label>Title<input name="title" required /></label>' +
      '<label>Holder / circle<input name="holder" required /></label>' +
      '<label>Kind<select name="kind"><option value="story">Story</option><option value="place">Place</option><option value="practice">Practice</option><option value="protocol">Protocol</option><option value="language">Language</option></select></label>' +
      '<label>Access tier<select name="access"><option value="public">Public</option><option value="community" selected>Community</option><option value="restricted">Restricted</option><option value="closed">Closed (pointer only)</option></select></label>' +
      '<label>Short summary<input name="summary" /></label>' +
      '<label>Record<textarea name="body" rows="6" required></textarea></label>' +
      '<div><p class="muted">Protocol tags</p><div class="chips" id="proto-chips" style="margin-top:8px">' +
      proto +
      "</div></div>" +
      '<div class="checks">' +
      checks +
      "</div>" +
      '<button class="btn" type="submit">Submit for review</button></form>'
    );
  }

  function renderGovernance() {
    if (!canGovern(state.role)) {
      return '<div class="page-head"><h1>Governance</h1><p>Review, publish, return, and withdraw sit with knowledge keepers and the elder council. Switch role to open this desk. CARE: Authority to Control is a person, not a dashboard default.</p></div>';
    }
    var pending = state.records.filter(function (r) {
      return r.status === "pending";
    });
    var live = state.records.filter(function (r) {
      return r.status !== "pending";
    });
    var pendingRows = pending.length
      ? pending
          .map(function (r) {
            return (
              "<tr><td>" +
              esc(r.title) +
              "</td><td>" +
              esc(r.access) +
              "</td><td>" +
              esc(r.holder) +
              '</td><td><div class="row"><button class="btn" type="button" data-pub="' +
              esc(r.id) +
              '">Publish</button><button class="btn ghost" type="button" data-ret="' +
              esc(r.id) +
              '">Return</button></div></td></tr>'
            );
          })
          .join("")
      : '<tr><td colspan="4">No pending offers.</td></tr>';
    var liveRows = live
      .map(function (r) {
        var ask =
          r.allowAsk && r.access !== "closed" && r.status === "published"
            ? "eligible"
            : "excluded";
        var btn =
          r.status === "published"
            ? '<button class="btn ghost" type="button" data-wd="' +
              esc(r.id) +
              '">Withdraw</button>'
            : "";
        return (
          "<tr><td>" +
          esc(r.title) +
          "</td><td>" +
          esc(r.status) +
          "</td><td>" +
          ask +
          "</td><td>" +
          btn +
          "</td></tr>"
        );
      })
      .join("");
    var auditRows = state.audit
      .slice(0, 20)
      .map(function (e) {
        return (
          "<tr><td>" +
          esc(e.at.replace("T", " ").slice(0, 19)) +
          "</td><td>" +
          esc(e.role) +
          "</td><td>" +
          esc(e.action) +
          "</td><td>" +
          esc(e.detail) +
          "</td></tr>"
        );
      })
      .join("");
    return (
      '<div class="page-head"><h1>Governance</h1><p>Publish only what the community asked to hold digitally. Returning a record is a valid outcome. Withdrawing after publication is a right, not an error.</p></div>' +
      '<h2 class="section">Pending offers</h2><table class="table"><thead><tr><th>Title</th><th>Tier</th><th>Holder</th><th></th></tr></thead><tbody>' +
      pendingRows +
      "</tbody></table>" +
      '<h2 class="section">Held records</h2><table class="table"><thead><tr><th>Title</th><th>Status</th><th>Ask</th><th></th></tr></thead><tbody>' +
      liveRows +
      "</tbody></table>" +
      '<h2 class="section">Audit</h2><table class="table"><thead><tr><th>When</th><th>Role</th><th>Action</th><th>Detail</th></tr></thead><tbody>' +
      auditRows +
      "</tbody></table>"
    );
  }

  function renderMain() {
    var html = "";
    if (state.page === "library") html = renderLibrary();
    else if (state.page === "ask") html = renderAsk();
    else if (state.page === "graph") html = renderGraph();
    else if (state.page === "contribute") html = renderContribute();
    else html = renderGovernance();
    document.getElementById("main").innerHTML = html;
    bindPage();
  }

  function selectedProtos() {
    var on = [];
    document.querySelectorAll("#proto-chips button.active").forEach(function (b) {
      on.push(b.getAttribute("data-proto"));
    });
    return on;
  }

  function bindPage() {
    var search = document.getElementById("lib-search");
    if (search) {
      search.addEventListener("input", function (e) {
        state.query = e.target.value;
        var keep = document.activeElement === search;
        var pos = search.selectionStart;
        renderMain();
        if (keep) {
          var again = document.getElementById("lib-search");
          if (again) {
            again.focus();
            again.setSelectionRange(pos, pos);
          }
        }
      });
    }

    document.querySelectorAll("[data-tier]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.tier = b.getAttribute("data-tier");
        render();
      });
    });
    document.querySelectorAll("[data-open]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.openId = b.getAttribute("data-open");
        render();
      });
    });

    var run = document.getElementById("ask-run");
    if (run) {
      run.addEventListener("click", function () {
        var box = document.getElementById("ask-q");
        runAsk(box.value);
      });
    }
    document.querySelectorAll("[data-example]").forEach(function (b) {
      b.addEventListener("click", function () {
        runAsk(b.getAttribute("data-example"));
      });
    });

    document.querySelectorAll(".proto-toggle").forEach(function (b) {
      if (
        b.getAttribute("data-proto") === "community-use" ||
        b.getAttribute("data-proto") === "no-ai"
      ) {
        b.classList.add("active");
      }
      b.addEventListener("click", function () {
        b.classList.toggle("active");
      });
    });

    var form = document.getElementById("contrib-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(form);
        var boxes = form.querySelectorAll("[data-consent]");
        var all = true;
        boxes.forEach(function (c) {
          if (!c.checked) all = false;
        });
        if (!all) {
          alert("All consent statements must be checked.");
          return;
        }
        var access = fd.get("access");
        var protocols = selectedProtos();
        var rec = {
          id: "offer-" + uid(),
          title: String(fd.get("title") || "").trim(),
          kind: fd.get("kind"),
          access: access,
          protocols: protocols,
          holder: String(fd.get("holder") || "").trim(),
          summary:
            String(fd.get("summary") || "").trim() ||
            String(fd.get("title") || "").trim(),
          body: String(fd.get("body") || "").trim(),
          links: [],
          status: "pending",
          createdAt: new Date().toISOString().slice(0, 10),
          allowAsk:
            access !== "closed" && protocols.indexOf("no-ai") === -1,
        };
        if (!rec.title || !rec.body || !rec.holder) return;
        state.records.unshift(rec);
        state.contribNotice = rec.id;
        log("contribute", rec.title);
        persist();
        render();
      });
    }

    document.querySelectorAll("[data-pub]").forEach(function (b) {
      b.addEventListener("click", function () {
        setStatus(b.getAttribute("data-pub"), "published", "Council published");
      });
    });
    document.querySelectorAll("[data-ret]").forEach(function (b) {
      b.addEventListener("click", function () {
        setStatus(
          b.getAttribute("data-ret"),
          "returned",
          "Needs in-person review"
        );
      });
    });
    document.querySelectorAll("[data-wd]").forEach(function (b) {
      b.addEventListener("click", function () {
        setStatus(
          b.getAttribute("data-wd"),
          "withdrawn",
          "Withdrawn by council"
        );
      });
    });
  }

  function setStatus(id, status, note) {
    state.records = state.records.map(function (r) {
      if (r.id !== id) return r;
      return Object.assign({}, r, { status: status });
    });
    log("govern", id + " → " + status + ". " + note);
    persist();
    render();
  }

  function runAsk(query) {
    var result = askArchive(query, state.role, state.records);
    var turn = Object.assign({ id: uid(), at: new Date().toISOString() }, result);
    state.asks.unshift(turn);
    state.asks = state.asks.slice(0, 40);
    state.lastAsk = turn;
    log("ask", '"' + query.slice(0, 80) + '" → ' + turn.withheld);
    persist();
    render();
  }

  function render() {
    renderShell();
    renderMain();
  }

  document.getElementById("roles").addEventListener("click", function (e) {
    var b = e.target.closest("[data-role]");
    if (b) setRole(b.getAttribute("data-role"));
  });
  document.getElementById("nav").addEventListener("click", function (e) {
    var b = e.target.closest("[data-page]");
    if (b) setPage(b.getAttribute("data-page"));
  });

  load();
  render();
})();
