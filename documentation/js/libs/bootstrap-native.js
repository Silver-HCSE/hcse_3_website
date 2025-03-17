var BSN = (function (H) {
  "use strict";
  var Vc = Object.defineProperty;
  var Kc = (H, it, ct) =>
    it in H
      ? Vc(H, it, { enumerable: !0, configurable: !0, writable: !0, value: ct })
      : (H[it] = ct);
  var d = (H, it, ct) => (Kc(H, typeof it != "symbol" ? it + "" : it, ct), ct);
  const it = "aria-describedby",
    ct = "aria-expanded",
    Se = "aria-hidden",
    He = "aria-modal",
    _s = "aria-pressed",
    Ue = "aria-selected",
    Bo = "DOMContentLoaded",
    qe = "focus",
    Qe = "focusin",
    Bs = "focusout",
    Pe = "keydown",
    Ro = "keyup",
    N = "click",
    Rs = "mousedown",
    Wo = "hover",
    De = "mouseenter",
    Ze = "mouseleave",
    Fo = "pointerdown",
    jo = "pointermove",
    zo = "pointerup",
    xe = "resize",
    Ae = "scroll",
    Ge = "touchstart",
    Vo = "dragstart",
    Je = "ArrowDown",
    ts = "ArrowUp",
    Ws = "ArrowLeft",
    Fs = "ArrowRight",
    es = "Escape",
    Ko = "transitionDuration",
    Xo = "transitionDelay",
    ss = "transitionend",
    js = "transitionProperty",
    Yo = navigator.userAgentData,
    Le = Yo,
    { userAgent: Uo } = navigator,
    Ie = Uo,
    zs = /iPhone|iPad|iPod|Android/i;
  Le ? Le.brands.some((t) => zs.test(t.brand)) : zs.test(Ie);
  const Vs = /(iPhone|iPod|iPad)/,
    qo = Le ? Le.brands.some((t) => Vs.test(t.brand)) : Vs.test(Ie);
  Ie && Ie.includes("Firefox");
  const { head: ke } = document;
  ["webkitPerspective", "perspective"].some((t) => t in ke.style);
  const Qo = (t, s, e, n) => {
      const o = n || !1;
      t.addEventListener(s, e, o);
    },
    Zo = (t, s, e, n) => {
      const o = n || !1;
      t.removeEventListener(s, e, o);
    },
    Go = (t, s, e, n) => {
      const o = (i) => {
        (i.target === t || i.currentTarget === t) &&
          (e.apply(t, [i]), Zo(t, s, o, n));
      };
      Qo(t, s, o, n);
    },
    le = () => {};
  (() => {
    let t = !1;
    try {
      const s = Object.defineProperty({}, "passive", {
        get: () => ((t = !0), t),
      });
      Go(document, Bo, le, s);
    } catch {}
    return t;
  })(),
    ["webkitTransform", "transform"].some((t) => t in ke.style),
    ["webkitAnimation", "animation"].some((t) => t in ke.style),
    ["webkitTransition", "transition"].some((t) => t in ke.style);
  const at = (t, s) => t.getAttribute(s),
    Ne = (t, s) => t.hasAttribute(s),
    O = (t, s, e) => t.setAttribute(s, e),
    At = (t, s) => t.removeAttribute(s),
    f = (t, ...s) => {
      t.classList.add(...s);
    },
    b = (t, ...s) => {
      t.classList.remove(...s);
    },
    h = (t, s) => t.classList.contains(s),
    de = (t) => (t != null && typeof t == "object") || !1,
    A = (t) =>
      (de(t) &&
        typeof t.nodeType == "number" &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((s) => t.nodeType === s)) ||
      !1,
    T = (t) => (A(t) && t.nodeType === 1) || !1,
    jt = new Map(),
    Lt = {
      data: jt,
      set: (t, s, e) => {
        T(t) && (jt.has(s) || jt.set(s, new Map()), jt.get(s).set(t, e));
      },
      getAllFor: (t) => jt.get(t) || null,
      get: (t, s) => {
        if (!T(t) || !s) return null;
        const e = Lt.getAllFor(s);
        return (t && e && e.get(t)) || null;
      },
      remove: (t, s) => {
        const e = Lt.getAllFor(s);
        !e || !T(t) || (e.delete(t), e.size === 0 && jt.delete(s));
      },
    },
    F = (t, s) => Lt.get(t, s),
    he = (t) => typeof t == "string" || !1,
    ns = (t) => (de(t) && t.constructor.name === "Window") || !1,
    Ks = (t) => (A(t) && t.nodeType === 9) || !1,
    E = (t) =>
      ns(t) ? t.document : Ks(t) ? t : A(t) ? t.ownerDocument : window.document,
    dt = (t, ...s) => Object.assign(t, ...s),
    vt = (t) => {
      if (!t) return;
      if (he(t)) return E().createElement(t);
      const { tagName: s } = t,
        e = vt(s);
      if (!e) return;
      const n = { ...t };
      return delete n.tagName, dt(e, n);
    },
    w = (t, s) => t.dispatchEvent(s),
    z = (t, s) => {
      const e = getComputedStyle(t),
        n = s
          .replace("webkit", "Webkit")
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase();
      return e.getPropertyValue(n);
    },
    Jo = (t) => {
      const s = z(t, js),
        e = z(t, Xo),
        n = e.includes("ms") ? 1 : 1e3,
        o = s && s !== "none" ? parseFloat(e) * n : 0;
      return Number.isNaN(o) ? 0 : o;
    },
    zt = (t) => {
      const s = z(t, js),
        e = z(t, Ko),
        n = e.includes("ms") ? 1 : 1e3,
        o = s && s !== "none" ? parseFloat(e) * n : 0;
      return Number.isNaN(o) ? 0 : o;
    },
    P = (t, s) => {
      let e = 0;
      const n = new Event(ss),
        o = zt(t),
        i = Jo(t);
      if (o) {
        const c = (a) => {
          a.target === t &&
            (s.apply(t, [a]), t.removeEventListener(ss, c), (e = 1));
        };
        t.addEventListener(ss, c),
          setTimeout(
            () => {
              e || w(t, n);
            },
            o + i + 17,
          );
      } else s.apply(t, [n]);
    },
    ht = (t, s) => t.focus(s),
    Xs = (t) =>
      ["true", !0].includes(t)
        ? !0
        : ["false", !1].includes(t)
          ? !1
          : ["null", "", null, void 0].includes(t)
            ? null
            : t !== "" && !Number.isNaN(+t)
              ? +t
              : t,
    Oe = (t) => Object.entries(t),
    Vt = (t) => t.toLowerCase(),
    ti = (t, s, e, n) => {
      const o = { ...e },
        i = { ...t.dataset },
        c = { ...s },
        a = {},
        l = "title";
      return (
        Oe(i).forEach(([r, g]) => {
          const p =
            n && typeof r == "string" && r.includes(n)
              ? r.replace(n, "").replace(/[A-Z]/g, (v) => Vt(v))
              : r;
          a[p] = Xs(g);
        }),
        Oe(o).forEach(([r, g]) => {
          o[r] = Xs(g);
        }),
        Oe(s).forEach(([r, g]) => {
          r in o
            ? (c[r] = o[r])
            : r in a
              ? (c[r] = a[r])
              : (c[r] = r === l ? at(t, l) : g);
        }),
        c
      );
    },
    Ys = (t) => Object.keys(t),
    $ = (t, s) => {
      const e = new CustomEvent(t, { cancelable: !0, bubbles: !0 });
      return de(s) && dt(e, s), e;
    },
    tt = { passive: !0 },
    It = (t) => t.offsetHeight,
    L = (t, s) => {
      Oe(s).forEach(([e, n]) => {
        if (n && he(e) && e.includes("--")) t.style.setProperty(e, n);
        else {
          const o = {};
          (o[e] = n), dt(t.style, o);
        }
      });
    },
    os = (t) => (de(t) && t.constructor.name === "Map") || !1,
    ei = (t) => typeof t == "number" || !1,
    bt = new Map(),
    u = {
      set: (t, s, e, n) => {
        T(t) &&
          (n && n.length
            ? (bt.has(t) || bt.set(t, new Map()),
              bt.get(t).set(n, setTimeout(s, e)))
            : bt.set(t, setTimeout(s, e)));
      },
      get: (t, s) => {
        if (!T(t)) return null;
        const e = bt.get(t);
        return s && e && os(e) ? e.get(s) || null : ei(e) ? e : null;
      },
      clear: (t, s) => {
        if (!T(t)) return;
        const e = bt.get(t);
        s && s.length && os(e)
          ? (clearTimeout(e.get(s)), e.delete(s), e.size === 0 && bt.delete(t))
          : (clearTimeout(e), bt.delete(t));
      },
    },
    fe = (t, s) => {
      const {
        width: e,
        height: n,
        top: o,
        right: i,
        bottom: c,
        left: a,
      } = t.getBoundingClientRect();
      let l = 1,
        r = 1;
      if (s && T(t)) {
        const { offsetWidth: g, offsetHeight: p } = t;
        (l = g > 0 ? Math.round(e) / g : 1),
          (r = p > 0 ? Math.round(n) / p : 1);
      }
      return {
        width: e / l,
        height: n / r,
        top: o / r,
        right: i / l,
        bottom: c / r,
        left: a / l,
        x: a / l,
        y: o / r,
      };
    },
    wt = (t) => E(t).body,
    ft = (t) => E(t).documentElement,
    Us = (t) => (A(t) && t.constructor.name === "ShadowRoot") || !1,
    si = (t) =>
      t.nodeName === "HTML"
        ? t
        : (T(t) && t.assignedSlot) ||
          (A(t) && t.parentNode) ||
          (Us(t) && t.host) ||
          ft(t);
  let qs = 0,
    Qs = 0;
  const Kt = new Map(),
    Zs = (t, s) => {
      let e = s ? qs : Qs;
      if (s) {
        const n = Zs(t),
          o = Kt.get(n) || new Map();
        Kt.has(n) || Kt.set(n, o),
          os(o) && !o.has(s) ? (o.set(s, e), (qs += 1)) : (e = o.get(s));
      } else {
        const n = t.id || t;
        Kt.has(n) ? (e = Kt.get(n)) : (Kt.set(n, e), (Qs += 1));
      }
      return e;
    },
    Xt = (t) => {
      var s;
      return t
        ? Ks(t)
          ? t.defaultView
          : A(t)
            ? (s = t == null ? void 0 : t.ownerDocument) == null
              ? void 0
              : s.defaultView
            : t
        : window;
    },
    ni = (t) => Array.isArray(t) || !1,
    Gs = (t) => {
      if (!A(t)) return !1;
      const { top: s, bottom: e } = fe(t),
        { clientHeight: n } = ft(t);
      return s <= n && e >= 0;
    },
    oi = (t) => typeof t == "function" || !1,
    ii = (t) => (de(t) && t.constructor.name === "NodeList") || !1,
    Et = (t) => ft(t).dir === "rtl",
    ci = (t) => (A(t) && ["TABLE", "TD", "TH"].includes(t.nodeName)) || !1,
    M = (t, s) => (t ? t.closest(s) || M(t.getRootNode().host, s) : null),
    D = (t, s) => (T(t) ? t : (A(s) ? s : E()).querySelector(t)),
    is = (t, s) => (A(s) ? s : E()).getElementsByTagName(t),
    et = (t, s) => (A(s) ? s : E()).querySelectorAll(t),
    gt = (t, s) => (s && A(s) ? s : E()).getElementsByClassName(t),
    Js = (t, s) => t.matches(s),
    Yt = {},
    tn = (t) => {
      const { type: s, currentTarget: e } = t;
      [...Yt[s]].forEach(([n, o]) => {
        e === n &&
          [...o].forEach(([i, c]) => {
            i.apply(n, [t]), typeof c == "object" && c.once && B(n, s, i, c);
          });
      });
    },
    _ = (t, s, e, n) => {
      Yt[s] || (Yt[s] = new Map());
      const o = Yt[s];
      o.has(t) || o.set(t, new Map());
      const i = o.get(t),
        { size: c } = i;
      i.set(e, n), c || t.addEventListener(s, tn, n);
    },
    B = (t, s, e, n) => {
      const o = Yt[s],
        i = o && o.get(t),
        c = i && i.get(e),
        a = c !== void 0 ? c : n;
      i && i.has(e) && i.delete(e),
        o && (!i || !i.size) && o.delete(t),
        (!o || !o.size) && delete Yt[s],
        (!i || !i.size) && t.removeEventListener(s, tn, a);
    },
    W = "fade",
    m = "show",
    Me = "data-bs-dismiss",
    _e = "alert",
    en = "Alert",
    ai = "5.0.12";
  class st {
    constructor(s, e) {
      d(this, "_toggleEventListeners", () => {});
      const n = D(s);
      if (!n)
        throw he(s)
          ? Error(`${this.name} Error: "${s}" is not a valid selector.`)
          : Error(
              `${this.name} Error: your target is not an instance of HTMLElement.`,
            );
      const o = Lt.get(n, this.name);
      o && o._toggleEventListeners(),
        (this.element = n),
        (this.options =
          this.defaults && Ys(this.defaults).length
            ? ti(n, this.defaults, e || {}, "bs")
            : {}),
        Lt.set(n, this.name, this);
    }
    get version() {
      return ai;
    }
    get name() {
      return "BaseComponent";
    }
    get defaults() {
      return {};
    }
    dispose() {
      Lt.remove(this.element, this.name),
        Ys(this).forEach((s) => {
          delete this[s];
        });
    }
  }
  const ri = `.${_e}`,
    li = `[${Me}="${_e}"]`,
    di = (t) => F(t, en),
    hi = (t) => new Ut(t),
    sn = $(`close.bs.${_e}`),
    fi = $(`closed.bs.${_e}`),
    nn = (t) => {
      const { element: s } = t;
      w(s, fi), t._toggleEventListeners(), t.dispose(), s.remove();
    };
  class Ut extends st {
    constructor(e) {
      super(e);
      d(this, "dismiss");
      d(this, "close", () => {
        const { element: e } = this;
        e &&
          h(e, m) &&
          (w(e, sn),
          sn.defaultPrevented ||
            (b(e, m), h(e, W) ? P(e, () => nn(this)) : nn(this)));
      });
      d(this, "_toggleEventListeners", (e) => {
        const n = e ? _ : B,
          { dismiss: o, close: i } = this;
        o && n(o, N, i);
      });
      (this.dismiss = D(li, this.element)), this._toggleEventListeners(!0);
    }
    get name() {
      return en;
    }
    dispose() {
      this._toggleEventListeners(), super.dispose();
    }
  }
  d(Ut, "selector", ri), d(Ut, "init", hi), d(Ut, "getInstance", di);
  const C = "active",
    rt = "data-bs-toggle",
    gi = "button",
    on = "Button",
    pi = `[${rt}="${gi}"]`,
    ui = (t) => F(t, on),
    mi = (t) => new qt(t);
  class qt extends st {
    constructor(e) {
      super(e);
      d(this, "isActive", !1);
      d(this, "toggle", (e) => {
        e && e.preventDefault();
        const { element: n, isActive: o } = this;
        !h(n, "disabled") &&
          !at(n, "disabled") &&
          ((o ? b : f)(n, C),
          O(n, _s, o ? "false" : "true"),
          (this.isActive = h(n, C)));
      });
      d(this, "_toggleEventListeners", (e) => {
        (e ? _ : B)(this.element, N, this.toggle);
      });
      const { element: n } = this;
      (this.isActive = h(n, C)),
        O(n, _s, String(!!this.isActive)),
        this._toggleEventListeners(!0);
    }
    get name() {
      return on;
    }
    dispose() {
      this._toggleEventListeners(), super.dispose();
    }
  }
  d(qt, "selector", pi), d(qt, "init", mi), d(qt, "getInstance", ui);
  const cs = "data-bs-target",
    kt = "carousel",
    cn = "Carousel",
    an = "data-bs-parent",
    vi = "data-bs-container",
    V = (t) => {
      const s = [cs, an, vi, "href"],
        e = E(t);
      return s
        .map((n) => {
          const o = at(t, n);
          return o ? (n === an ? M(t, o) : D(o, e)) : null;
        })
        .filter((n) => n)[0];
    },
    ge = `[data-bs-ride="${kt}"]`,
    Q = `${kt}-item`,
    as = "data-bs-slide-to",
    $t = "data-bs-slide",
    Tt = "paused",
    rn = { pause: "hover", keyboard: !1, touch: !0, interval: 5e3 },
    pt = (t) => F(t, cn),
    bi = (t) => new Qt(t);
  let pe = 0,
    Be = 0,
    rs = 0;
  const ls = $(`slide.bs.${kt}`),
    ds = $(`slid.bs.${kt}`),
    ln = (t) => {
      const { index: s, direction: e, element: n, slides: o, options: i } = t;
      if (t.isAnimating) {
        const c = fs(t),
          a = e === "left" ? "next" : "prev",
          l = e === "left" ? "start" : "end";
        f(o[s], C),
          b(o[s], `${Q}-${a}`),
          b(o[s], `${Q}-${l}`),
          b(o[c], C),
          b(o[c], `${Q}-${l}`),
          w(n, ds),
          u.clear(n, $t),
          t.cycle && !E(n).hidden && i.interval && !t.isPaused && t.cycle();
      }
    };
  function wi() {
    const t = pt(this);
    t && !t.isPaused && !u.get(this, Tt) && f(this, Tt);
  }
  function Ei() {
    const t = pt(this);
    t && t.isPaused && !u.get(this, Tt) && t.cycle();
  }
  function $i(t) {
    t.preventDefault();
    const s = M(this, ge) || V(this),
      e = pt(s);
    if (e && !e.isAnimating) {
      const n = +(at(this, as) || 0);
      this && !h(this, C) && !Number.isNaN(n) && e.to(n);
    }
  }
  function Ti(t) {
    t.preventDefault();
    const s = M(this, ge) || V(this),
      e = pt(s);
    if (e && !e.isAnimating) {
      const n = at(this, $t);
      n === "next" ? e.next() : n === "prev" && e.prev();
    }
  }
  const yi = ({ code: t, target: s }) => {
    const e = E(s),
      [n] = [...et(ge, e)].filter((i) => Gs(i)),
      o = pt(n);
    if (o && !o.isAnimating && !/textarea|input/i.test(s.nodeName)) {
      const i = Et(n);
      t === (i ? Fs : Ws) ? o.prev() : t === (i ? Ws : Fs) && o.next();
    }
  };
  function dn(t) {
    const { target: s } = t,
      e = pt(this);
    e &&
      e.isTouch &&
      ((e.indicator && !e.indicator.contains(s)) || !e.controls.includes(s)) &&
      (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
  }
  function Ci(t) {
    const { target: s } = t,
      e = pt(this);
    if (e && !e.isAnimating && !e.isTouch) {
      const { controls: n, indicators: o } = e;
      [...n, ...o].every((i) => i === s || i.contains(s)) ||
        ((pe = t.pageX), this.contains(s) && ((e.isTouch = !0), hn(e, !0)));
    }
  }
  const Si = (t) => {
      Be = t.pageX;
    },
    Hi = (t) => {
      var o;
      const { target: s } = t,
        e = E(s),
        n = [...et(ge, e)].map((i) => pt(i)).find((i) => i.isTouch);
      if (n) {
        const { element: i, index: c } = n,
          a = Et(i);
        (rs = t.pageX),
          (n.isTouch = !1),
          hn(n),
          !((o = e.getSelection()) != null && o.toString().length) &&
            i.contains(s) &&
            Math.abs(pe - rs) > 120 &&
            (Be < pe
              ? n.to(c + (a ? -1 : 1))
              : Be > pe && n.to(c + (a ? 1 : -1))),
          (pe = 0),
          (Be = 0),
          (rs = 0);
      }
    },
    hs = (t, s) => {
      const { indicators: e } = t;
      [...e].forEach((n) => b(n, C)), t.indicators[s] && f(e[s], C);
    },
    hn = (t, s) => {
      const { element: e } = t,
        n = s ? _ : B;
      n(E(e), jo, Si, tt), n(E(e), zo, Hi, tt);
    },
    fs = (t) => {
      const { slides: s, element: e } = t,
        n = D(`.${Q}.${C}`, e);
      return T(n) ? [...s].indexOf(n) : -1;
    };
  class Qt extends st {
    constructor(e, n) {
      super(e, n);
      d(this, "_toggleEventListeners", (e) => {
        const {
            element: n,
            options: o,
            slides: i,
            controls: c,
            indicators: a,
          } = this,
          { touch: l, pause: r, interval: g, keyboard: p } = o,
          v = e ? _ : B;
        r && g && (v(n, De, wi), v(n, Ze, Ei)),
          l &&
            i.length > 2 &&
            (v(n, Fo, Ci, tt),
            v(n, Ge, dn, { passive: !1 }),
            v(n, Vo, dn, { passive: !1 })),
          c.length &&
            c.forEach((k) => {
              k && v(k, N, Ti);
            }),
          a.length &&
            a.forEach((k) => {
              v(k, N, $i);
            }),
          p && v(E(n), Pe, yi);
      });
      const { element: o } = this;
      (this.direction = Et(o) ? "right" : "left"),
        (this.isTouch = !1),
        (this.slides = gt(Q, o));
      const { slides: i } = this;
      if (i.length >= 2) {
        const c = fs(this),
          a = [...i].find((g) => Js(g, `.${Q}-next,.${Q}-next`));
        this.index = c;
        const l = E(o);
        (this.controls = [
          ...et(`[${$t}]`, o),
          ...et(`[${$t}][${cs}="#${o.id}"]`, l),
        ].filter((g, p, v) => p === v.indexOf(g))),
          (this.indicator = D(`.${kt}-indicators`, o)),
          (this.indicators = [
            ...(this.indicator ? et(`[${as}]`, this.indicator) : []),
            ...et(`[${as}][${cs}="#${o.id}"]`, l),
          ].filter((g, p, v) => p === v.indexOf(g)));
        const { options: r } = this;
        (this.options.interval = r.interval === !0 ? rn.interval : r.interval),
          a
            ? (this.index = [...i].indexOf(a))
            : c < 0 &&
              ((this.index = 0),
              f(i[0], C),
              this.indicators.length && hs(this, 0)),
          this.indicators.length && hs(this, this.index),
          this._toggleEventListeners(!0),
          r.interval && this.cycle();
      }
    }
    get name() {
      return cn;
    }
    get defaults() {
      return rn;
    }
    get isPaused() {
      return h(this.element, Tt);
    }
    get isAnimating() {
      return D(`.${Q}-next,.${Q}-prev`, this.element) !== null;
    }
    cycle() {
      const { element: e, options: n, isPaused: o, index: i } = this;
      u.clear(e, kt),
        o && (u.clear(e, Tt), b(e, Tt)),
        u.set(
          e,
          () => {
            this.element &&
              !this.isPaused &&
              !this.isTouch &&
              Gs(e) &&
              this.to(i + 1);
          },
          n.interval,
          kt,
        );
    }
    pause() {
      const { element: e, options: n } = this;
      !this.isPaused && n.interval && (f(e, Tt), u.set(e, () => {}, 1, Tt));
    }
    next() {
      this.isAnimating || this.to(this.index + 1);
    }
    prev() {
      this.isAnimating || this.to(this.index - 1);
    }
    to(e) {
      const { element: n, slides: o, options: i } = this,
        c = fs(this),
        a = Et(n);
      let l = e;
      if (!this.isAnimating && c !== l && !u.get(n, $t)) {
        c < l || (c === 0 && l === o.length - 1)
          ? (this.direction = a ? "right" : "left")
          : (c > l || (c === o.length - 1 && l === 0)) &&
            (this.direction = a ? "left" : "right");
        const { direction: r } = this;
        l < 0 ? (l = o.length - 1) : l >= o.length && (l = 0);
        const g = r === "left" ? "next" : "prev",
          p = r === "left" ? "start" : "end",
          v = { relatedTarget: o[l], from: c, to: l, direction: r };
        dt(ls, v),
          dt(ds, v),
          w(n, ls),
          ls.defaultPrevented ||
            ((this.index = l),
            hs(this, l),
            zt(o[l]) && h(n, "slide")
              ? u.set(
                  n,
                  () => {
                    f(o[l], `${Q}-${g}`),
                      It(o[l]),
                      f(o[l], `${Q}-${p}`),
                      f(o[c], `${Q}-${p}`),
                      P(
                        o[l],
                        () => this.slides && this.slides.length && ln(this),
                      );
                  },
                  0,
                  $t,
                )
              : (f(o[l], C),
                b(o[c], C),
                u.set(
                  n,
                  () => {
                    u.clear(n, $t),
                      n && i.interval && !this.isPaused && this.cycle(),
                      w(n, ds);
                  },
                  0,
                  $t,
                )));
      }
    }
    dispose() {
      const { isAnimating: e } = this,
        n = { ...this, isAnimating: e };
      this._toggleEventListeners(),
        super.dispose(),
        n.isAnimating &&
          P(n.slides[n.index], () => {
            ln(n);
          });
    }
  }
  d(Qt, "selector", ge), d(Qt, "init", bi), d(Qt, "getInstance", pt);
  const Nt = "collapsing",
    K = "collapse",
    fn = "Collapse",
    Pi = `.${K}`,
    gn = `[${rt}="${K}"]`,
    Di = { parent: null },
    Re = (t) => F(t, fn),
    xi = (t) => new Zt(t),
    pn = $(`show.bs.${K}`),
    Ai = $(`shown.bs.${K}`),
    un = $(`hide.bs.${K}`),
    Li = $(`hidden.bs.${K}`),
    Ii = (t) => {
      const { element: s, parent: e, triggers: n } = t;
      w(s, pn),
        pn.defaultPrevented ||
          (u.set(s, le, 17),
          e && u.set(e, le, 17),
          f(s, Nt),
          b(s, K),
          L(s, { height: `${s.scrollHeight}px` }),
          P(s, () => {
            u.clear(s),
              e && u.clear(e),
              n.forEach((o) => O(o, ct, "true")),
              b(s, Nt),
              f(s, K),
              f(s, m),
              L(s, { height: "" }),
              w(s, Ai);
          }));
    },
    mn = (t) => {
      const { element: s, parent: e, triggers: n } = t;
      w(s, un),
        un.defaultPrevented ||
          (u.set(s, le, 17),
          e && u.set(e, le, 17),
          L(s, { height: `${s.scrollHeight}px` }),
          b(s, K),
          b(s, m),
          f(s, Nt),
          It(s),
          L(s, { height: "0px" }),
          P(s, () => {
            u.clear(s),
              e && u.clear(e),
              n.forEach((o) => O(o, ct, "false")),
              b(s, Nt),
              f(s, K),
              L(s, { height: "" }),
              w(s, Li);
          }));
    },
    ki = (t) => {
      const { target: s } = t,
        e = s && M(s, gn),
        n = e && V(e),
        o = n && Re(n);
      o && o.toggle(), e && e.tagName === "A" && t.preventDefault();
    };
  class Zt extends st {
    constructor(e, n) {
      super(e, n);
      d(this, "_toggleEventListeners", (e) => {
        const n = e ? _ : B,
          { triggers: o } = this;
        o.length && o.forEach((i) => n(i, N, ki));
      });
      const { element: o, options: i } = this,
        c = E(o);
      (this.triggers = [...et(gn, c)].filter((a) => V(a) === o)),
        (this.parent = T(i.parent)
          ? i.parent
          : he(i.parent)
            ? V(o) || D(i.parent, c)
            : null),
        this._toggleEventListeners(!0);
    }
    get name() {
      return fn;
    }
    get defaults() {
      return Di;
    }
    hide() {
      const { triggers: e, element: n } = this;
      u.get(n) || (mn(this), e.length && e.forEach((o) => f(o, `${K}d`)));
    }
    show() {
      const { element: e, parent: n, triggers: o } = this;
      let i, c;
      n &&
        ((i = [...et(`.${K}.${m}`, n)].find((a) => Re(a))), (c = i && Re(i))),
        (!n || !u.get(n)) &&
          !u.get(e) &&
          (c &&
            i !== e &&
            (mn(c),
            c.triggers.forEach((a) => {
              f(a, `${K}d`);
            })),
          Ii(this),
          o.length && o.forEach((a) => b(a, `${K}d`)));
    }
    toggle() {
      h(this.element, m) ? this.hide() : this.show();
    }
    dispose() {
      this._toggleEventListeners(), super.dispose();
    }
  }
  d(Zt, "selector", Pi), d(Zt, "init", xi), d(Zt, "getInstance", Re);
  const Ot = ["dropdown", "dropup", "dropstart", "dropend"],
    vn = "Dropdown",
    bn = "dropdown-menu",
    wn = (t) => {
      const s = M(t, "A");
      return (
        (t.tagName === "A" &&
          Ne(t, "href") &&
          at(t, "href").slice(-1) === "#") ||
        (s && Ne(s, "href") && at(s, "href").slice(-1) === "#")
      );
    },
    [nt, gs, ps, us] = Ot,
    En = `[${rt}="${nt}"]`,
    Gt = (t) => F(t, vn),
    Ni = (t) => new Jt(t),
    Oi = `${bn}-end`,
    $n = [nt, gs],
    Tn = [ps, us],
    yn = ["A", "BUTTON"],
    Mi = { offset: 5, display: "dynamic" },
    ms = $(`show.bs.${nt}`),
    Cn = $(`shown.bs.${nt}`),
    vs = $(`hide.bs.${nt}`),
    Sn = $(`hidden.bs.${nt}`),
    Hn = $(`updated.bs.${nt}`),
    Pn = (t) => {
      const { element: s, menu: e, parentElement: n, options: o } = t,
        { offset: i } = o;
      if (z(e, "position") !== "static") {
        const c = Et(s),
          a = h(e, Oi);
        ["margin", "top", "bottom", "left", "right"].forEach((R) => {
          const Pt = {};
          (Pt[R] = ""), L(e, Pt);
        });
        let r = Ot.find((R) => h(n, R)) || nt;
        const g = {
            dropdown: [i, 0, 0],
            dropup: [0, 0, i],
            dropstart: c ? [-1, 0, 0, i] : [-1, i, 0],
            dropend: c ? [-1, i, 0] : [-1, 0, 0, i],
          },
          p = {
            dropdown: { top: "100%" },
            dropup: { top: "auto", bottom: "100%" },
            dropstart: c
              ? { left: "100%", right: "auto" }
              : { left: "auto", right: "100%" },
            dropend: c
              ? { left: "auto", right: "100%" }
              : { left: "100%", right: "auto" },
            menuStart: c
              ? { right: "0", left: "auto" }
              : { right: "auto", left: "0" },
            menuEnd: c
              ? { right: "auto", left: "0" }
              : { right: "0", left: "auto" },
          },
          { offsetWidth: v, offsetHeight: k } = e,
          { clientWidth: J, clientHeight: y } = ft(s),
          { left: X, top: q, width: ce, height: mt } = fe(s),
          S = X - v - i < 0,
          ot = X + v + ce + i >= J,
          lt = q + k + i >= y,
          j = q + k + mt + i >= y,
          Y = q - k - i < 0,
          x = ((!c && a) || (c && !a)) && X + ce - v < 0,
          ae = ((c && a) || (!c && !a)) && X + v >= J;
        if (
          (Tn.includes(r) && S && ot && (r = nt),
          r === ps && (c ? ot : S) && (r = us),
          r === us && (c ? S : ot) && (r = ps),
          r === gs && Y && !j && (r = nt),
          r === nt && j && !Y && (r = gs),
          Tn.includes(r) && lt && dt(p[r], { top: "auto", bottom: 0 }),
          $n.includes(r) && (x || ae))
        ) {
          let R = { left: "auto", right: "auto" };
          !x && ae && !c && (R = { left: "auto", right: 0 }),
            x && !ae && c && (R = { left: 0, right: "auto" }),
            R && dt(p[r], R);
        }
        const Ht = g[r];
        L(e, { ...p[r], margin: `${Ht.map((R) => R && `${R}px`).join(" ")}` }),
          $n.includes(r) &&
            a &&
            a &&
            L(e, p[(!c && x) || (c && ae) ? "menuStart" : "menuEnd"]),
          w(n, Hn);
      }
    },
    _i = (t) =>
      [...t.children]
        .map((s) => {
          if (s && yn.includes(s.tagName)) return s;
          const { firstElementChild: e } = s;
          return e && yn.includes(e.tagName) ? e : null;
        })
        .filter((s) => s),
    Dn = (t) => {
      const { element: s, options: e } = t,
        n = t.open ? _ : B,
        o = E(s);
      n(o, N, xn),
        n(o, qe, xn),
        n(o, Pe, Ri),
        n(o, Ro, Wi),
        e.display === "dynamic" &&
          [Ae, xe].forEach((i) => {
            n(Xt(s), i, Fi, tt);
          });
    },
    We = (t) => {
      const s = [...Ot, "btn-group", "input-group"]
        .map((e) => gt(`${e} ${m}`, E(t)))
        .find((e) => e.length);
      if (s && s.length)
        return [...s[0].children].find((e) => Ot.some((n) => n === at(e, rt)));
    },
    xn = (t) => {
      const { target: s, type: e } = t;
      if (s && T(s)) {
        const n = We(s),
          o = n && Gt(n);
        if (o) {
          const { parentElement: i, menu: c } = o,
            a =
              i &&
              i.contains(s) &&
              (s.tagName === "form" || M(s, "form") !== null);
          [N, Rs].includes(e) && wn(s) && t.preventDefault(),
            !a && e !== qe && s !== n && s !== c && o.hide();
        }
      }
    },
    Bi = (t) => {
      const { target: s } = t,
        e = s && M(s, En),
        n = e && Gt(e);
      n && (t.stopPropagation(), n.toggle(), e && wn(e) && t.preventDefault());
    },
    Ri = (t) => {
      [Je, ts].includes(t.code) && t.preventDefault();
    };
  function Wi(t) {
    const { code: s } = t,
      e = We(this),
      n = e && Gt(e),
      { activeElement: o } = e && E(e);
    if (n && o) {
      const { menu: i, open: c } = n,
        a = _i(i);
      if (a && a.length && [Je, ts].includes(s)) {
        let l = a.indexOf(o);
        o === e
          ? (l = 0)
          : s === ts
            ? (l = l > 1 ? l - 1 : 0)
            : s === Je && (l = l < a.length - 1 ? l + 1 : l),
          a[l] && ht(a[l]);
      }
      es === s && c && (n.toggle(), ht(e));
    }
  }
  function Fi() {
    const t = We(this),
      s = t && Gt(t);
    s && s.open && Pn(s);
  }
  class Jt extends st {
    constructor(e, n) {
      super(e, n);
      d(this, "_toggleEventListeners", (e) => {
        (e ? _ : B)(this.element, N, Bi);
      });
      const { parentElement: o } = this.element,
        [i] = gt(bn, o);
      i &&
        ((this.parentElement = o),
        (this.menu = i),
        this._toggleEventListeners(!0));
    }
    get name() {
      return vn;
    }
    get defaults() {
      return Mi;
    }
    toggle() {
      this.open ? this.hide() : this.show();
    }
    show() {
      const { element: e, open: n, menu: o, parentElement: i } = this;
      if (!n) {
        const c = We(e),
          a = c && Gt(c);
        a && a.hide(),
          [ms, Cn, Hn].forEach((l) => {
            l.relatedTarget = e;
          }),
          w(i, ms),
          ms.defaultPrevented ||
            (f(o, m),
            f(i, m),
            O(e, ct, "true"),
            Pn(this),
            (this.open = !n),
            ht(e),
            Dn(this),
            w(i, Cn));
      }
    }
    hide() {
      const { element: e, open: n, menu: o, parentElement: i } = this;
      n &&
        ([vs, Sn].forEach((c) => {
          c.relatedTarget = e;
        }),
        w(i, vs),
        vs.defaultPrevented ||
          (b(o, m),
          b(i, m),
          O(e, ct, "false"),
          (this.open = !n),
          Dn(this),
          w(i, Sn)));
    }
    dispose() {
      this.open && this.hide(), this._toggleEventListeners(), super.dispose();
    }
  }
  d(Jt, "selector", En), d(Jt, "init", Ni), d(Jt, "getInstance", Gt);
  const U = "modal",
    bs = "Modal",
    ws = "Offcanvas",
    ji = "fixed-top",
    zi = "fixed-bottom",
    An = "sticky-top",
    Ln = "position-sticky",
    In = (t) => [
      ...gt(ji, t),
      ...gt(zi, t),
      ...gt(An, t),
      ...gt(Ln, t),
      ...gt("is-fixed", t),
    ],
    Vi = (t) => {
      const s = wt(t);
      L(s, { paddingRight: "", overflow: "" });
      const e = In(s);
      e.length &&
        e.forEach((n) => {
          L(n, { paddingRight: "", marginRight: "" });
        });
    },
    kn = (t) => {
      const { clientWidth: s } = ft(t),
        { innerWidth: e } = Xt(t);
      return Math.abs(e - s);
    },
    Nn = (t, s) => {
      const e = wt(t),
        n = parseInt(z(e, "paddingRight"), 10),
        i = z(e, "overflow") === "hidden" && n ? 0 : kn(t),
        c = In(e);
      s &&
        (L(e, { overflow: "hidden", paddingRight: `${n + i}px` }),
        c.length &&
          c.forEach((a) => {
            const l = z(a, "paddingRight");
            if (
              ((a.style.paddingRight = `${parseInt(l, 10) + i}px`),
              [An, Ln].some((r) => h(a, r)))
            ) {
              const r = z(a, "marginRight");
              a.style.marginRight = `${parseInt(r, 10) - i}px`;
            }
          }));
    },
    Z = "offcanvas",
    yt = vt({ tagName: "div", className: "popup-container" }),
    On = (t, s) => {
      const e = A(s) && s.nodeName === "BODY",
        n = A(s) && !e ? s : yt,
        o = e ? s : wt(t);
      A(t) && (n === yt && o.append(yt), n.append(t));
    },
    Mn = (t, s) => {
      const e = A(s) && s.nodeName === "BODY",
        n = A(s) && !e ? s : yt;
      A(t) && (t.remove(), n === yt && !yt.children.length && yt.remove());
    },
    Es = (t, s) => {
      const e = A(s) && s.nodeName !== "BODY" ? s : yt;
      return A(t) && e.contains(t);
    },
    _n = "backdrop",
    Bn = `${U}-${_n}`,
    Rn = `${Z}-${_n}`,
    Wn = `.${U}.${m}`,
    $s = `.${Z}.${m}`,
    I = vt("div"),
    Mt = (t) => D(`${Wn},${$s}`, E(t)),
    Ts = (t) => {
      const s = t ? Bn : Rn;
      [Bn, Rn].forEach((e) => {
        b(I, e);
      }),
        f(I, s);
    },
    Fn = (t, s, e) => {
      Ts(e), On(I, wt(t)), s && f(I, W);
    },
    jn = () => {
      h(I, m) || (f(I, m), It(I));
    },
    Fe = () => {
      b(I, m);
    },
    zn = (t) => {
      Mt(t) || (b(I, W), Mn(I, wt(t)), Vi(t));
    },
    Vn = (t) =>
      T(t) && z(t, "visibility") !== "hidden" && t.offsetParent !== null,
    Ki = `.${U}`,
    Kn = `[${rt}="${U}"]`,
    Xi = `[${Me}="${U}"]`,
    Xn = `${U}-static`,
    Yi = { backdrop: !0, keyboard: !0 },
    ue = (t) => F(t, bs),
    Ui = (t) => new te(t),
    je = $(`show.bs.${U}`),
    Yn = $(`shown.bs.${U}`),
    ys = $(`hide.bs.${U}`),
    Un = $(`hidden.bs.${U}`),
    qn = (t) => {
      const { element: s } = t,
        e = kn(s),
        { clientHeight: n, scrollHeight: o } = ft(s),
        { clientHeight: i, scrollHeight: c } = s,
        a = i !== c;
      if (!a && e) {
        const l = Et(s) ? "paddingLeft" : "paddingRight",
          r = {};
        (r[l] = `${e}px`), L(s, r);
      }
      Nn(s, a || n !== o);
    },
    Qn = (t, s) => {
      const e = s ? _ : B,
        { element: n, update: o } = t;
      e(n, N, Zi), e(Xt(n), xe, o, tt), e(E(n), Pe, Qi);
    },
    Zn = (t) => {
      const { triggers: s, element: e, relatedTarget: n } = t;
      zn(e), L(e, { paddingRight: "", display: "" }), Qn(t);
      const o = je.relatedTarget || s.find(Vn);
      o && ht(o), (Un.relatedTarget = n), w(e, Un);
    },
    Gn = (t) => {
      const { element: s, relatedTarget: e } = t;
      ht(s), Qn(t, !0), (Yn.relatedTarget = e), w(s, Yn);
    },
    Jn = (t) => {
      const { element: s, hasFade: e } = t;
      L(s, { display: "block" }),
        qn(t),
        Mt(s) || L(wt(s), { overflow: "hidden" }),
        f(s, m),
        At(s, Se),
        O(s, He, "true"),
        e ? P(s, () => Gn(t)) : Gn(t);
    },
    to = (t) => {
      const { element: s, options: e, hasFade: n } = t;
      e.backdrop && n && h(I, m) && !Mt(s) ? (Fe(), P(I, () => Zn(t))) : Zn(t);
    },
    qi = (t) => {
      const { target: s } = t,
        e = s && M(s, Kn),
        n = e && V(e),
        o = n && ue(n);
      o &&
        (e && e.tagName === "A" && t.preventDefault(),
        (o.relatedTarget = e),
        o.toggle());
    },
    Qi = ({ code: t, target: s }) => {
      const e = D(Wn, E(s)),
        n = e && ue(e);
      if (n) {
        const { options: o } = n;
        o.keyboard &&
          t === es &&
          h(e, m) &&
          ((n.relatedTarget = null), n.hide());
      }
    },
    Zi = (t) => {
      var n, o;
      const { currentTarget: s } = t,
        e = s ? ue(s) : null;
      if (e && s && !u.get(s)) {
        const { options: i, isStatic: c, modalDialog: a } = e,
          { backdrop: l } = i,
          { target: r } = t,
          g =
            (o = (n = E(s)) == null ? void 0 : n.getSelection()) == null
              ? void 0
              : o.toString().length,
          p = a.contains(r),
          v = r && M(r, Xi);
        c && !p
          ? u.set(
              s,
              () => {
                f(s, Xn), P(a, () => Gi(e));
              },
              17,
            )
          : (v || (!g && !c && !p && l)) &&
            ((e.relatedTarget = v || null), e.hide(), t.preventDefault());
      }
    },
    Gi = (t) => {
      const { element: s, modalDialog: e } = t,
        n = (zt(e) || 0) + 17;
      b(s, Xn), u.set(s, () => u.clear(s), n);
    };
  class te extends st {
    constructor(e, n) {
      super(e, n);
      d(this, "update", () => {
        h(this.element, m) && qn(this);
      });
      d(this, "_toggleEventListeners", (e) => {
        const n = e ? _ : B,
          { triggers: o } = this;
        o.length && o.forEach((i) => n(i, N, qi));
      });
      const { element: o } = this,
        i = D(`.${U}-dialog`, o);
      i &&
        ((this.modalDialog = i),
        (this.triggers = [...et(Kn, E(o))].filter((c) => V(c) === o)),
        (this.isStatic = this.options.backdrop === "static"),
        (this.hasFade = h(o, W)),
        (this.relatedTarget = null),
        this._toggleEventListeners(!0));
    }
    get name() {
      return bs;
    }
    get defaults() {
      return Yi;
    }
    toggle() {
      h(this.element, m) ? this.hide() : this.show();
    }
    show() {
      const { element: e, options: n, hasFade: o, relatedTarget: i } = this,
        { backdrop: c } = n;
      let a = 0;
      if (
        !h(e, m) &&
        ((je.relatedTarget = i || void 0), w(e, je), !je.defaultPrevented)
      ) {
        const l = Mt(e);
        if (l && l !== e) {
          const r = ue(l) || F(l, ws);
          r && r.hide();
        }
        c
          ? (Es(I) ? Ts(!0) : Fn(e, o, !0),
            (a = zt(I)),
            jn(),
            setTimeout(() => Jn(this), a))
          : (Jn(this), l && h(I, m) && Fe());
      }
    }
    hide() {
      const { element: e, hasFade: n, relatedTarget: o } = this;
      h(e, m) &&
        ((ys.relatedTarget = o || void 0),
        w(e, ys),
        ys.defaultPrevented ||
          (b(e, m),
          O(e, Se, "true"),
          At(e, He),
          n ? P(e, () => to(this)) : to(this)));
    }
    dispose() {
      const e = { ...this },
        { element: n, modalDialog: o } = e,
        i = () => super.dispose();
      this._toggleEventListeners(), this.hide(), h(n, "fade") ? P(o, i) : i();
    }
  }
  d(te, "selector", Ki), d(te, "init", Ui), d(te, "getInstance", ue);
  const Ji = `.${Z}`,
    Cs = `[${rt}="${Z}"]`,
    tc = `[${Me}="${Z}"]`,
    ze = `${Z}-toggling`,
    ec = { backdrop: !0, keyboard: !0, scroll: !1 },
    me = (t) => F(t, ws),
    sc = (t) => new ee(t),
    Ve = $(`show.bs.${Z}`),
    eo = $(`shown.bs.${Z}`),
    Ss = $(`hide.bs.${Z}`),
    so = $(`hidden.bs.${Z}`),
    nc = (t) => {
      const { element: s } = t,
        { clientHeight: e, scrollHeight: n } = ft(s);
      Nn(s, e !== n);
    },
    no = (t, s) => {
      const e = s ? _ : B,
        n = E(t.element);
      e(n, Pe, ac), e(n, N, cc);
    },
    oo = (t) => {
      const { element: s, options: e } = t;
      e.scroll || (nc(t), L(wt(s), { overflow: "hidden" })),
        f(s, ze),
        f(s, m),
        L(s, { visibility: "visible" }),
        P(s, () => rc(t));
    },
    oc = (t) => {
      const { element: s, options: e } = t,
        n = Mt(s);
      s.blur(), !n && e.backdrop && h(I, m) && Fe(), P(s, () => lc(t));
    },
    ic = (t) => {
      const s = M(t.target, Cs),
        e = s && V(s),
        n = e && me(e);
      n &&
        ((n.relatedTarget = s),
        n.toggle(),
        s && s.tagName === "A" && t.preventDefault());
    },
    cc = (t) => {
      const { target: s } = t,
        e = D($s, E(s)),
        n = D(tc, e),
        o = e && me(e);
      if (o) {
        const { options: i, triggers: c } = o,
          { backdrop: a } = i,
          l = M(s, Cs),
          r = E(e).getSelection();
        (!I.contains(s) || a !== "static") &&
          (!(r && r.toString().length) &&
            ((!e.contains(s) && a && (!l || c.includes(s))) ||
              (n && n.contains(s))) &&
            ((o.relatedTarget = n && n.contains(s) ? n : null), o.hide()),
          l && l.tagName === "A" && t.preventDefault());
      }
    },
    ac = ({ code: t, target: s }) => {
      const e = D($s, E(s)),
        n = e && me(e);
      n &&
        n.options.keyboard &&
        t === es &&
        ((n.relatedTarget = null), n.hide());
    },
    rc = (t) => {
      const { element: s } = t;
      b(s, ze),
        At(s, Se),
        O(s, He, "true"),
        O(s, "role", "dialog"),
        w(s, eo),
        no(t, !0),
        ht(s);
    },
    lc = (t) => {
      const { element: s, triggers: e } = t;
      O(s, Se, "true"), At(s, He), At(s, "role"), L(s, { visibility: "" });
      const n = Ve.relatedTarget || e.find(Vn);
      n && ht(n), zn(s), w(s, so), b(s, ze), Mt(s) || no(t);
    };
  class ee extends st {
    constructor(e, n) {
      super(e, n);
      d(this, "_toggleEventListeners", (e) => {
        const n = e ? _ : B;
        this.triggers.forEach((o) => n(o, N, ic));
      });
      const { element: o } = this;
      (this.triggers = [...et(Cs, E(o))].filter((i) => V(i) === o)),
        (this.relatedTarget = null),
        this._toggleEventListeners(!0);
    }
    get name() {
      return ws;
    }
    get defaults() {
      return ec;
    }
    toggle() {
      h(this.element, m) ? this.hide() : this.show();
    }
    show() {
      const { element: e, options: n, relatedTarget: o } = this;
      let i = 0;
      if (
        !h(e, m) &&
        ((Ve.relatedTarget = o || void 0),
        (eo.relatedTarget = o || void 0),
        w(e, Ve),
        !Ve.defaultPrevented)
      ) {
        const c = Mt(e);
        if (c && c !== e) {
          const a = me(c) || F(c, bs);
          a && a.hide();
        }
        n.backdrop
          ? (Es(I) ? Ts() : Fn(e, !0),
            (i = zt(I)),
            jn(),
            setTimeout(() => oo(this), i))
          : (oo(this), c && h(I, m) && Fe());
      }
    }
    hide() {
      const { element: e, relatedTarget: n } = this;
      h(e, m) &&
        ((Ss.relatedTarget = n || void 0),
        (so.relatedTarget = n || void 0),
        w(e, Ss),
        Ss.defaultPrevented || (f(e, ze), b(e, m), oc(this)));
    }
    dispose() {
      const e = { ...this },
        { element: n, options: o } = e,
        i = o.backdrop ? zt(I) : 0,
        c = () => setTimeout(() => super.dispose(), i + 17);
      this._toggleEventListeners(), this.hide(), h(n, m) ? P(n, c) : c();
    }
  }
  d(ee, "selector", Ji), d(ee, "init", sc), d(ee, "getInstance", me);
  const _t = "popover",
    Ke = "Popover",
    ut = "tooltip",
    io = (t) => {
      const s = t === ut,
        e = s ? `${t}-inner` : `${t}-body`,
        n = s ? "" : `<h3 class="${t}-header"></h3>`,
        o = `<div class="${t}-arrow"></div>`,
        i = `<div class="${e}"></div>`;
      return `<div class="${t}" role="${ut}">${n + o + i}</div>`;
    },
    co = { top: "top", bottom: "bottom", left: "start", right: "end" },
    Hs = (t) => {
      const s = /\b(top|bottom|start|end)+/,
        { element: e, tooltip: n, container: o, options: i, arrow: c } = t;
      if (n) {
        const a = { ...co },
          l = Et(e);
        L(n, { top: "", left: "", right: "", bottom: "" });
        const r = t.name === Ke,
          { offsetWidth: g, offsetHeight: p } = n,
          { clientWidth: v, clientHeight: k, offsetWidth: J } = ft(e);
        let { placement: y } = i;
        const { clientWidth: X, offsetWidth: q } = o,
          mt = z(o, "position") === "fixed",
          S = Math.abs(mt ? X - q : v - J),
          ot = l && mt ? S : 0,
          lt = v - (l ? 0 : S) - 1,
          { width: j, height: Y, left: x, right: ae, top: Ht } = fe(e, !0),
          { x: R, y: Pt } = { x, y: Ht };
        L(c, { top: "", left: "", right: "", bottom: "" });
        let Wt = 0,
          Ee = "",
          Dt = 0,
          ks = "",
          re = "",
          Xe = "",
          Ns = "";
        const Ft = c.offsetWidth || 0,
          xt = c.offsetHeight || 0,
          Os = Ft / 2;
        let $e = Ht - p - xt < 0,
          Te = Ht + p + Y + xt >= k,
          ye = x - g - Ft < ot,
          Ce = x + g + j + Ft >= lt;
        const Ye = ["left", "right"],
          Ms = ["top", "bottom"];
        ($e = Ye.includes(y) ? Ht + Y / 2 - p / 2 - xt < 0 : $e),
          (Te = Ye.includes(y) ? Ht + p / 2 + Y / 2 + xt >= k : Te),
          (ye = Ms.includes(y) ? x + j / 2 - g / 2 < ot : ye),
          (Ce = Ms.includes(y) ? x + g / 2 + j / 2 >= lt : Ce),
          (y = Ye.includes(y) && ye && Ce ? "top" : y),
          (y = y === "top" && $e ? "bottom" : y),
          (y = y === "bottom" && Te ? "top" : y),
          (y = y === "left" && ye ? "right" : y),
          (y = y === "right" && Ce ? "left" : y),
          n.className.includes(y) ||
            (n.className = n.className.replace(s, a[y])),
          Ye.includes(y)
            ? (y === "left"
                ? (Dt = R - g - (r ? Ft : 0))
                : (Dt = R + j + (r ? Ft : 0)),
              $e && Te
                ? ((Wt = 0), (Ee = 0), (re = Ht + Y / 2 - xt / 2))
                : $e
                  ? ((Wt = Pt), (Ee = ""), (re = Y / 2 - Ft))
                  : Te
                    ? ((Wt = Pt - p + Y), (Ee = ""), (re = p - Y / 2 - Ft))
                    : ((Wt = Pt - p / 2 + Y / 2), (re = p / 2 - xt / 2)))
            : Ms.includes(y) &&
              (y === "top"
                ? (Wt = Pt - p - (r ? xt : 0))
                : (Wt = Pt + Y + (r ? xt : 0)),
              ye
                ? ((Dt = 0), (Xe = R + j / 2 - Os))
                : Ce
                  ? ((Dt = "auto"), (ks = 0), (Ns = j / 2 + lt - ae - Os))
                  : ((Dt = R - g / 2 + j / 2), (Xe = g / 2 - Os))),
          L(n, {
            top: `${Wt}px`,
            bottom: Ee === "" ? "" : `${Ee}px`,
            left: Dt === "auto" ? Dt : `${Dt}px`,
            right: ks !== "" ? `${ks}px` : "",
          }),
          T(c) &&
            (re !== "" && (c.style.top = `${re}px`),
            Xe !== ""
              ? (c.style.left = `${Xe}px`)
              : Ns !== "" && (c.style.right = `${Ns}px`));
        const zc = $(`updated.bs.${Vt(t.name)}`);
        w(e, zc);
      }
    },
    Ps = {
      template: io(ut),
      title: "",
      customClass: "",
      trigger: "hover focus",
      placement: "top",
      sanitizeFn: void 0,
      animation: !0,
      delay: 200,
      container: document.body,
      content: "",
      dismissible: !1,
      btnClose: "",
    },
    ao = "data-original-title",
    Bt = "Tooltip",
    Ct = (t, s, e) => {
      if (he(s) && s.length) {
        let n = s.trim();
        oi(e) && (n = e(n));
        const i = new DOMParser().parseFromString(n, "text/html");
        t.append(...i.body.childNodes);
      } else
        T(s) ? t.append(s) : (ii(s) || (ni(s) && s.every(A))) && t.append(...s);
    },
    dc = (t) => {
      const s = t.name === Bt,
        { id: e, element: n, options: o } = t,
        {
          title: i,
          placement: c,
          template: a,
          animation: l,
          customClass: r,
          sanitizeFn: g,
          dismissible: p,
          content: v,
          btnClose: k,
        } = o,
        J = s ? ut : _t,
        y = { ...co };
      let X = [],
        q = [];
      Et(n) && ((y.left = "end"), (y.right = "start"));
      const ce = `bs-${J}-${y[c]}`;
      let mt;
      if (T(a)) mt = a;
      else {
        const ot = vt("div");
        Ct(ot, a, g), (mt = ot.firstChild);
      }
      t.tooltip = T(mt) ? mt.cloneNode(!0) : void 0;
      const { tooltip: S } = t;
      if (S) {
        O(S, "id", e), O(S, "role", ut);
        const ot = s ? `${ut}-inner` : `${_t}-body`,
          lt = s ? null : D(`.${_t}-header`, S),
          j = D(`.${ot}`, S);
        t.arrow = D(`.${J}-arrow`, S);
        const { arrow: Y } = t;
        if (T(i)) X = [i.cloneNode(!0)];
        else {
          const x = vt("div");
          Ct(x, i, g), (X = [...x.childNodes]);
        }
        if (T(v)) q = [v.cloneNode(!0)];
        else {
          const x = vt("div");
          Ct(x, v, g), (q = [...x.childNodes]);
        }
        if (p)
          if (i)
            if (T(k)) X = [...X, k.cloneNode(!0)];
            else {
              const x = vt("div");
              Ct(x, k, g), (X = [...X, x.firstChild]);
            }
          else if ((lt && lt.remove(), T(k))) q = [...q, k.cloneNode(!0)];
          else {
            const x = vt("div");
            Ct(x, k, g), (q = [...q, x.firstChild]);
          }
        s
          ? i && j && Ct(j, i, g)
          : (i && lt && Ct(lt, X, g),
            v && j && Ct(j, q, g),
            (t.btn = D(".btn-close", S) || void 0)),
          f(S, "position-fixed"),
          f(Y, "position-absolute"),
          h(S, J) || f(S, J),
          l && !h(S, W) && f(S, W),
          r && !h(S, r) && f(S, r),
          h(S, ce) || f(S, ce);
      }
    },
    hc = (t) => {
      const s = ["HTML", "BODY"],
        e = [];
      let { parentNode: n } = t;
      for (; n && !s.includes(n.nodeName); )
        (n = si(n)), Us(n) || ci(n) || e.push(n);
      return (
        e.find((o, i) =>
          z(o, "position") !== "relative" &&
          e.slice(i + 1).every((c) => z(c, "position") === "static")
            ? o
            : null,
        ) || E(t).body
      );
    },
    fc = `[${rt}="${ut}"],[data-tip="${ut}"]`,
    ro = "title";
  let lo = (t) => F(t, Bt);
  const gc = (t) => new St(t),
    pc = (t) => {
      const { element: s, tooltip: e, container: n, offsetParent: o } = t;
      At(s, it), Mn(e, n === o ? n : o);
    },
    ve = (t) => {
      const { tooltip: s, container: e, offsetParent: n } = t;
      return s && Es(s, e === n ? e : n);
    },
    uc = (t, s) => {
      const { element: e } = t;
      t._toggleEventListeners(), Ne(e, ao) && t.name === Bt && uo(t), s && s();
    },
    ho = (t, s) => {
      const e = s ? _ : B,
        { element: n } = t;
      e(E(n), Ge, t.handleTouch, tt),
        [Ae, xe].forEach((o) => {
          e(Xt(n), o, t.update, tt);
        });
    },
    fo = (t) => {
      const { element: s } = t,
        e = $(`shown.bs.${Vt(t.name)}`);
      ho(t, !0), w(s, e), u.clear(s, "in");
    },
    go = (t) => {
      const { element: s } = t,
        e = $(`hidden.bs.${Vt(t.name)}`);
      ho(t), pc(t), w(s, e), u.clear(s, "out");
    },
    po = (t, s) => {
      const e = s ? _ : B,
        { element: n, container: o, offsetParent: i } = t,
        { offsetHeight: c, scrollHeight: a } = o,
        l = M(n, `.${U}`),
        r = M(n, `.${Z}`),
        g = Xt(n),
        v = o === i && c !== a ? o : g;
      e(v, xe, t.update, tt),
        e(v, Ae, t.update, tt),
        l && e(l, `hide.bs.${U}`, t.handleHide),
        r && e(r, `hide.bs.${Z}`, t.handleHide);
    },
    uo = (t, s) => {
      const e = [ao, ro],
        { element: n } = t;
      O(n, e[s ? 0 : 1], s || at(n, e[0]) || ""), At(n, e[s ? 1 : 0]);
    };
  class St extends st {
    constructor(e, n) {
      super(e, n);
      d(this, "handleFocus", () => ht(this.element));
      d(this, "handleShow", () => this.show());
      d(this, "handleHide", () => this.hide());
      d(this, "update", () => {
        Hs(this);
      });
      d(this, "toggle", () => {
        const { tooltip: e } = this;
        e && !ve(this) ? this.show() : this.hide();
      });
      d(this, "handleTouch", ({ target: e }) => {
        const { tooltip: n, element: o } = this;
        (n && n.contains(e)) || e === o || (e && o.contains(e)) || this.hide();
      });
      d(this, "_toggleEventListeners", (e) => {
        const n = e ? _ : B,
          { element: o, options: i, btn: c } = this,
          { trigger: a } = i,
          r = !!(this.name !== Bt && i.dismissible);
        a.includes("manual") ||
          ((this.enabled = !!e),
          a.split(" ").forEach((p) => {
            p === Wo
              ? (n(o, Rs, this.handleShow),
                n(o, De, this.handleShow),
                r ||
                  (n(o, Ze, this.handleHide),
                  n(E(o), Ge, this.handleTouch, tt)))
              : p === N
                ? n(o, p, r ? this.handleShow : this.toggle)
                : p === qe &&
                  (n(o, Qe, this.handleShow),
                  r || n(o, Bs, this.handleHide),
                  qo && n(o, N, this.handleFocus)),
              r && c && n(c, N, this.handleHide);
          }));
      });
      const { element: o } = this,
        i = this.name === Bt,
        c = i ? ut : _t,
        a = i ? Bt : Ke;
      (lo = (r) => F(r, a)),
        (this.enabled = !0),
        (this.id = `${c}-${Zs(o, c)}`);
      const { options: l } = this;
      (!l.title && i) ||
        (!i && !l.content) ||
        (dt(Ps, { titleAttr: "" }),
        Ne(o, ro) && i && typeof l.title == "string" && uo(this, l.title),
        (this.container = hc(o)),
        (this.offsetParent = ["sticky", "fixed"].some(
          (r) => z(this.container, "position") === r,
        )
          ? this.container
          : E(this.element).body),
        dc(this),
        this._toggleEventListeners(!0));
    }
    get name() {
      return Bt;
    }
    get defaults() {
      return Ps;
    }
    show() {
      const {
          options: e,
          tooltip: n,
          element: o,
          container: i,
          offsetParent: c,
          id: a,
        } = this,
        { animation: l } = e,
        r = u.get(o, "out"),
        g = i === c ? i : c;
      u.clear(o, "out"),
        n &&
          !r &&
          !ve(this) &&
          u.set(
            o,
            () => {
              const p = $(`show.bs.${Vt(this.name)}`);
              w(o, p),
                p.defaultPrevented ||
                  (On(n, g),
                  O(o, it, `#${a}`),
                  this.update(),
                  po(this, !0),
                  h(n, m) || f(n, m),
                  l ? P(n, () => fo(this)) : fo(this));
            },
            17,
            "in",
          );
    }
    hide() {
      const { options: e, tooltip: n, element: o } = this,
        { animation: i, delay: c } = e;
      u.clear(o, "in"),
        n &&
          ve(this) &&
          u.set(
            o,
            () => {
              const a = $(`hide.bs.${Vt(this.name)}`);
              w(o, a),
                a.defaultPrevented ||
                  (this.update(),
                  b(n, m),
                  po(this),
                  i ? P(n, () => go(this)) : go(this));
            },
            c + 17,
            "out",
          );
    }
    enable() {
      const { enabled: e } = this;
      e || (this._toggleEventListeners(!0), (this.enabled = !e));
    }
    disable() {
      const { tooltip: e, options: n, enabled: o } = this,
        { animation: i } = n;
      o &&
        (e && ve(this) && i
          ? (this.hide(), P(e, () => this._toggleEventListeners()))
          : this._toggleEventListeners(),
        (this.enabled = !o));
    }
    toggleEnabled() {
      this.enabled ? this.disable() : this.enable();
    }
    dispose() {
      const { tooltip: e, options: n } = this,
        o = { ...this, name: this.name },
        i = () => setTimeout(() => uc(o, () => super.dispose()), 17);
      n.animation && ve(o)
        ? ((this.options.delay = 0), this.hide(), P(e, i))
        : i();
    }
  }
  d(St, "selector", fc),
    d(St, "init", gc),
    d(St, "getInstance", lo),
    d(St, "styleTip", Hs);
  const mc = `[${rt}="${_t}"],[data-tip="${_t}"]`,
    vc = dt({}, Ps, {
      template: io(_t),
      content: "",
      dismissible: !1,
      btnClose: '<button class="btn-close" aria-label="Close"></button>',
    }),
    bc = (t) => F(t, Ke),
    wc = (t) => new Rt(t);
  class Rt extends St {
    constructor(e, n) {
      super(e, n);
      d(this, "show", () => {
        super.show();
        const { options: e, btn: n } = this;
        e.dismissible && n && setTimeout(() => ht(n), 17);
      });
    }
    get name() {
      return Ke;
    }
    get defaults() {
      return vc;
    }
  }
  d(Rt, "selector", mc),
    d(Rt, "init", wc),
    d(Rt, "getInstance", bc),
    d(Rt, "styleTip", Hs);
  const Ec = "scrollspy",
    mo = "ScrollSpy",
    $c = '[data-bs-spy="scroll"]',
    Tc = { offset: 10, target: null },
    yc = (t) => F(t, mo),
    Cc = (t) => new se(t),
    vo = $(`activate.bs.${Ec}`),
    Sc = (t) => {
      const {
          target: s,
          scrollTarget: e,
          options: n,
          itemsLength: o,
          scrollHeight: i,
          element: c,
        } = t,
        { offset: a } = n,
        l = ns(e),
        r = s && is("A", s),
        g = e ? bo(e) : i;
      if (
        ((t.scrollTop = l ? e.scrollY : e.scrollTop),
        r && (g !== i || o !== r.length))
      ) {
        let p, v, k;
        (t.items = []),
          (t.offsets = []),
          (t.scrollHeight = g),
          (t.maxScroll = t.scrollHeight - Hc(t)),
          [...r].forEach((J) => {
            (p = at(J, "href")),
              (v =
                p && p.charAt(0) === "#" && p.slice(-1) !== "#" && D(p, E(c))),
              v &&
                (t.items.push(J),
                (k = fe(v)),
                t.offsets.push((l ? k.top + t.scrollTop : v.offsetTop) - a));
          }),
          (t.itemsLength = t.items.length);
      }
    },
    bo = (t) => (T(t) ? t.scrollHeight : ft(t).scrollHeight),
    Hc = ({ element: t, scrollTarget: s }) =>
      ns(s) ? s.innerHeight : fe(t).height,
    wo = (t) => {
      [...is("A", t)].forEach((s) => {
        h(s, C) && b(s, C);
      });
    },
    Eo = (t, s) => {
      const { target: e, element: n } = t;
      T(e) && wo(e), (t.activeItem = s), f(s, C);
      const o = [];
      let i = s;
      for (; i !== wt(n); )
        (i = i.parentElement),
          (h(i, "nav") || h(i, "dropdown-menu")) && o.push(i);
      o.forEach((c) => {
        const a = c.previousElementSibling;
        a && !h(a, C) && f(a, C);
      }),
        (vo.relatedTarget = s),
        w(n, vo);
    };
  class se extends st {
    constructor(e, n) {
      super(e, n);
      d(this, "refresh", () => {
        const { target: e } = this;
        if (T(e) && e.offsetHeight > 0) {
          Sc(this);
          const {
            scrollTop: n,
            maxScroll: o,
            itemsLength: i,
            items: c,
            activeItem: a,
          } = this;
          if (n >= o) {
            const r = c[i - 1];
            a !== r && Eo(this, r);
            return;
          }
          const { offsets: l } = this;
          if (a && n < l[0] && l[0] > 0) {
            (this.activeItem = null), e && wo(e);
            return;
          }
          c.forEach((r, g) => {
            a !== r &&
              n >= l[g] &&
              (typeof l[g + 1] > "u" || n < l[g + 1]) &&
              Eo(this, r);
          });
        }
      });
      d(this, "_toggleEventListeners", (e) => {
        (e ? _ : B)(this.scrollTarget, Ae, this.refresh, tt);
      });
      const { element: o, options: i } = this;
      (this.target = D(i.target, E(o))),
        this.target &&
          ((this.scrollTarget = o.clientHeight < o.scrollHeight ? o : Xt(o)),
          (this.scrollHeight = bo(this.scrollTarget)),
          this._toggleEventListeners(!0),
          this.refresh());
    }
    get name() {
      return mo;
    }
    get defaults() {
      return Tc;
    }
    dispose() {
      this._toggleEventListeners(), super.dispose();
    }
  }
  d(se, "selector", $c), d(se, "init", Cc), d(se, "getInstance", yc);
  const be = "tab",
    $o = "Tab",
    To = `[${rt}="${be}"]`,
    yo = (t) => F(t, $o),
    Pc = (t) => new ne(t),
    Ds = $(`show.bs.${be}`),
    Co = $(`shown.bs.${be}`),
    xs = $(`hide.bs.${be}`),
    So = $(`hidden.bs.${be}`),
    we = new Map(),
    Ho = (t) => {
      const { tabContent: s, nav: e } = t;
      s && h(s, Nt) && ((s.style.height = ""), b(s, Nt)), e && u.clear(e);
    },
    Po = (t) => {
      const { element: s, tabContent: e, content: n, nav: o } = t,
        { tab: i } = (T(o) && we.get(o)) || { tab: null };
      if (e && n && h(n, W)) {
        const { currentHeight: c, nextHeight: a } = we.get(s) || {
          currentHeight: 0,
          nextHeight: 0,
        };
        c === a
          ? Ho(t)
          : setTimeout(() => {
              (e.style.height = `${a}px`), It(e), P(e, () => Ho(t));
            }, 50);
      } else o && u.clear(o);
      (Co.relatedTarget = i), w(s, Co);
    },
    Do = (t) => {
      const { element: s, content: e, tabContent: n, nav: o } = t,
        { tab: i, content: c } = (o && we.get(o)) || {
          tab: null,
          content: null,
        };
      let a = 0;
      if (
        (n &&
          e &&
          h(e, W) &&
          ([c, e].forEach((l) => {
            T(l) && f(l, "overflow-hidden");
          }),
          (a = T(c) ? c.scrollHeight : 0)),
        (Ds.relatedTarget = i),
        (So.relatedTarget = s),
        w(s, Ds),
        !Ds.defaultPrevented)
      ) {
        if ((e && f(e, C), c && b(c, C), n && e && h(e, W))) {
          const l = e.scrollHeight;
          we.set(s, {
            currentHeight: a,
            nextHeight: l,
            tab: null,
            content: null,
          }),
            f(n, Nt),
            (n.style.height = `${a}px`),
            It(n),
            [c, e].forEach((r) => {
              r && b(r, "overflow-hidden");
            });
        }
        e && e && h(e, W)
          ? setTimeout(() => {
              f(e, m),
                P(e, () => {
                  Po(t);
                });
            }, 1)
          : (e && f(e, m), Po(t)),
          i && w(i, So);
      }
    },
    xo = (t) => {
      const { nav: s } = t;
      if (!T(s)) return { tab: null, content: null };
      const e = gt(C, s);
      let n = null;
      e.length === 1 && !Ot.some((i) => h(e[0].parentElement, i))
        ? ([n] = e)
        : e.length > 1 && (n = e[e.length - 1]);
      const o = T(n) ? V(n) : null;
      return { tab: n, content: o };
    },
    Ao = (t) => {
      if (!T(t)) return null;
      const s = M(t, `.${Ot.join(",.")}`);
      return s ? D(`.${Ot[0]}-toggle`, s) : null;
    },
    Dc = (t) => {
      const s = yo(t.target);
      s && (t.preventDefault(), s.show());
    };
  class ne extends st {
    constructor(e) {
      super(e);
      d(this, "_toggleEventListeners", (e) => {
        (e ? _ : B)(this.element, N, Dc);
      });
      const { element: n } = this,
        o = V(n);
      if (o) {
        const i = M(n, ".nav"),
          c = M(o, ".tab-content");
        (this.nav = i),
          (this.content = o),
          (this.tabContent = c),
          (this.dropdown = Ao(n));
        const { tab: a } = xo(this);
        if (i && !a) {
          const l = D(To, i),
            r = l && V(l);
          r && (f(l, C), f(r, m), f(r, C), O(n, Ue, "true"));
        }
        this._toggleEventListeners(!0);
      }
    }
    get name() {
      return $o;
    }
    show() {
      const { element: e, content: n, nav: o, dropdown: i } = this;
      if (!(o && u.get(o)) && !h(e, C)) {
        const { tab: c, content: a } = xo(this);
        if (
          (o &&
            we.set(o, { tab: c, content: a, currentHeight: 0, nextHeight: 0 }),
          (xs.relatedTarget = e),
          T(c) && (w(c, xs), !xs.defaultPrevented))
        ) {
          f(e, C), O(e, Ue, "true");
          const l = T(c) && Ao(c);
          if ((l && h(l, C) && b(l, C), o)) {
            const r = () => {
              c && (b(c, C), O(c, Ue, "false")), i && !h(i, C) && f(i, C);
            };
            a && (h(a, W) || (n && h(n, W))) ? u.set(o, r, 1) : r();
          }
          a && (b(a, m), h(a, W) ? P(a, () => Do(this)) : Do(this));
        }
      }
    }
    dispose() {
      this._toggleEventListeners(), super.dispose();
    }
  }
  d(ne, "selector", To), d(ne, "init", Pc), d(ne, "getInstance", yo);
  const G = "toast",
    Lo = "Toast",
    xc = `.${G}`,
    Ac = `[${Me}="${G}"]`,
    Io = `[${rt}="${G}"]`,
    oe = "showing",
    ko = "hide",
    Lc = { animation: !0, autohide: !0, delay: 5e3 },
    As = (t) => F(t, Lo),
    Ic = (t) => new ie(t),
    No = $(`show.bs.${G}`),
    kc = $(`shown.bs.${G}`),
    Oo = $(`hide.bs.${G}`),
    Nc = $(`hidden.bs.${G}`),
    Mo = (t) => {
      const { element: s, options: e } = t;
      b(s, oe),
        u.clear(s, oe),
        w(s, kc),
        e.autohide && u.set(s, () => t.hide(), e.delay, G);
    },
    _o = (t) => {
      const { element: s } = t;
      b(s, oe), b(s, m), f(s, ko), u.clear(s, G), w(s, Nc);
    },
    Oc = (t) => {
      const { element: s, options: e } = t;
      f(s, oe), e.animation ? (It(s), P(s, () => _o(t))) : _o(t);
    },
    Mc = (t) => {
      const { element: s, options: e } = t;
      u.set(
        s,
        () => {
          b(s, ko),
            It(s),
            f(s, m),
            f(s, oe),
            e.animation ? P(s, () => Mo(t)) : Mo(t);
        },
        17,
        oe,
      );
    },
    _c = (t) => {
      u.clear(t.element, G), t._toggleEventListeners();
    },
    Bc = (t) => {
      const { target: s } = t,
        e = s && M(s, Io),
        n = e && V(e),
        o = n && As(n);
      o &&
        (e && e.tagName === "A" && t.preventDefault(),
        (o.relatedTarget = e),
        o.show());
    },
    Rc = (t) => {
      const s = t.target,
        e = As(s),
        { type: n, relatedTarget: o } = t;
      e &&
        s !== o &&
        !s.contains(o) &&
        ([De, Qe].includes(n)
          ? u.clear(s, G)
          : u.set(s, () => e.hide(), e.options.delay, G));
    };
  class ie extends st {
    constructor(e, n) {
      super(e, n);
      d(this, "show", () => {
        const { element: e, isShown: n } = this;
        e && !n && (w(e, No), No.defaultPrevented || Mc(this));
      });
      d(this, "hide", () => {
        const { element: e, isShown: n } = this;
        e && n && (w(e, Oo), Oo.defaultPrevented || Oc(this));
      });
      d(this, "_toggleEventListeners", (e) => {
        const n = e ? _ : B,
          { element: o, triggers: i, dismiss: c, options: a, hide: l } = this;
        c && n(c, N, l),
          a.autohide && [Qe, Bs, De, Ze].forEach((r) => n(o, r, Rc)),
          i.length && i.forEach((r) => n(r, N, Bc));
      });
      const { element: o, options: i } = this;
      i.animation && !h(o, W) ? f(o, W) : !i.animation && h(o, W) && b(o, W),
        (this.dismiss = D(Ac, o)),
        (this.triggers = [...et(Io, E(o))].filter((c) => V(c) === o)),
        this._toggleEventListeners(!0);
    }
    get name() {
      return Lo;
    }
    get defaults() {
      return Lc;
    }
    get isShown() {
      return h(this.element, m);
    }
    dispose() {
      const { element: e, isShown: n } = this;
      n && b(e, m), _c(this), super.dispose();
    }
  }
  d(ie, "selector", xc), d(ie, "init", Ic), d(ie, "getInstance", As);
  const Ls = new Map();
  [Ut, qt, Qt, Zt, Jt, te, ee, Rt, se, ne, ie, St].forEach((t) =>
    Ls.set(t.prototype.name, t),
  );
  const Wc = (t, s) => {
      [...s].forEach((e) => t(e));
    },
    Fc = (t, s) => {
      const e = Lt.getAllFor(t);
      e &&
        [...e].forEach(([n, o]) => {
          s.contains(n) && o.dispose();
        });
    },
    Is = (t) => {
      const s = t && t.nodeName ? t : document,
        e = [...is("*", s)];
      Ls.forEach((n) => {
        const { init: o, selector: i } = n;
        Wc(
          o,
          e.filter((c) => Js(c, i)),
        );
      });
    },
    jc = (t) => {
      const s = t && t.nodeName ? t : document;
      Ls.forEach((e) => {
        Fc(e.prototype.name, s);
      });
    };
  return (
    document.body
      ? Is()
      : _(document, "DOMContentLoaded", () => Is(), { once: !0 }),
    (H.Alert = Ut),
    (H.Button = qt),
    (H.Carousel = Qt),
    (H.Collapse = Zt),
    (H.Dropdown = Jt),
    (H.Modal = te),
    (H.Offcanvas = ee),
    (H.Popover = Rt),
    (H.ScrollSpy = se),
    (H.Tab = ne),
    (H.Toast = ie),
    (H.Tooltip = St),
    (H.initCallback = Is),
    (H.removeDataAPI = jc),
    Object.defineProperty(H, Symbol.toStringTag, { value: "Module" }),
    H
  );
})({});
//# sourceMappingURL=bootstrap-native.js.map
