/*! withcabin.com 0.5.8 */ !async function(e, t, n) { n = "{" === n[0] ? "ping.withcabin.com" : n; const o = e.navigator; if (o.userAgent.search(/(bot|spider|crawl)/gi) > -1) return; const a = "disableCabin",
        i = "addEventListener",
        r = "pushState",
        c = "sendBeacon",
        s = "timing",
        l = "localStorage",
        d = "Cabin is",
        h = ["unblocked", "blocked"],
        u = "data-cabin-event",
        p = console.log,
        v = t => { let n = parseFloat(e[l].getItem(h[1])); return n && t && p(d + " blocked on " + m.hostname + " - Use cabin.blockMe(0) to unblock"), n },
        b = (e, t) => { if (v(t)) return new Promise(e => e()); const n = new XMLHttpRequest; return new Promise((t, o) => { n.onreadystatechange = () => { 4 === n.readyState && t(parseFloat(n.response)) }, n.open("GET", e), n.send() }) },
        m = e.location,
        f = e.performance,
        g = e.screen,
        w = "https://" + n,
        y = () => Date.now(),
        E = () => $ += y() - L,
        k = e => Object.keys(e).map(t => `${t}=${encodeURIComponent(e[t])}`).join("&"),
        S = (e, t) => { if (!v()) return o[c] ? void o[c](e, JSON.stringify(t)) : b(`${e}?${k(t)}`) }; let C, L, $, A; const I = async() => { if (e[a]) return void delete e[a];
        delete e[a], C = y(), L = C, $ = 0; let n = f && f[s] ? f[s].domContentLoadedEventEnd - f[s].navigationStart : 0;
        A = { r: t.referrer, w: g.width, s: 0, t: n > 0 ? n : 0, p: m.href }; let o = m.hostname,
            i = m.pathname;
        await Promise.all([b(w + "/cache?" + o).then(e => { A.u = e }), b(w + "/cache?" + o + i).then(e => { A.up = e })]), b(w + "/hello?" + k(A), !0) };
    t[i]("visibilitychange", () => { t.hidden ? E() : L = y() }); const M = async() => { e[a] || (!t.hidden && E(), await S(w + "/duration", { d: $, n: C, p: m.href })) };
    e[i]("beforeunload", M);
    e.history[r] = function(t) { let n = history[t]; return function() { let o, a = n.apply(this, arguments); return "function" == typeof Event ? o = new Event(t) : (o = doc.createEvent("Event"), o.initEvent(t, !0, !0)), o.arguments = arguments, e.dispatchEvent(o), a } }(r), e[i](r, () => { M(), I() }), e[i]("popstate", () => { M(), I() }); let P = e => cabin.event(e.target.getAttribute(u));
    e.cabin = { async event(e, t) { E(); const n = { e: e, p: m.href, d: $, n: C };
            await S(w + "/event", n), t && t() }, initEvents() { t.querySelectorAll("[" + u + "]").forEach(e => { e.removeEventListener("click", P), e[i]("click", P) }) }, blockMe(t) { t = t ? 1 : 0, e[l].setItem(h[1], t), p(d + " now " + h[t] + " on " + m.hostname) } }, I(), cabin.initEvents() }(window, document, "stats.usetalk.io");