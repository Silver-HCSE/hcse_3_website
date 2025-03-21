/***********************************************
Copyright 2010 - 2012 Chris Winberry <chris@winberry.net>. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
***********************************************/
/* v2.0.0 */

!(function () {
  function t(t, e) {
    var a = function () {};
    (a.prototype = e.prototype),
      (t.super_ = e),
      (t.prototype = new a()),
      (t.prototype.constructor = t);
  }
  function e(t, e) {
    (this._options = e || {}), this._validateBuilder(t);
    (this._builder = t), this.reset();
  }
  function a(t, e) {
    this.reset(),
      (this._options = e || {}),
      void 0 === this._options.ignoreWhitespace &&
        (this._options.ignoreWhitespace = !1),
      void 0 === this._options.includeLocation &&
        (this._options.includeLocation = !1),
      void 0 === this._options.verbose && (this._options.verbose = !0),
      void 0 === this._options.enforceEmptyTags &&
        (this._options.enforceEmptyTags = !0),
      void 0 === this._options.caseSensitiveTags &&
        (this._options.caseSensitiveTags = !1),
      void 0 === this._options.caseSensitiveAttr &&
        (this._options.caseSensitiveAttr = !1),
      "function" == typeof t && (this._callback = t);
  }
  function n(t) {
    n.super_.call(this, t, {
      ignoreWhitespace: !0,
      verbose: !1,
      enforceEmptyTags: !1,
      caseSensitiveTags: !0,
    });
  }
  var i;
  if ("undefined" != typeof module && void 0 !== module.exports)
    i = module.exports;
  else {
    if (
      ((i = {}),
      this.Tautologistics || (this.Tautologistics = {}),
      this.Tautologistics.NodeHtmlParser)
    )
      return;
    this.Tautologistics.NodeHtmlParser = i;
  }
  var s = {
    Text: "text",
    Tag: "tag",
    Attr: "attr",
    CData: "cdata",
    Doctype: "doctype",
    Comment: "comment",
  };
  "undefined" != typeof module &&
    void 0 !== module.exports &&
    (t(e, require("stream")),
    (e.prototype.writable = !0),
    (e.prototype.write = function (t) {
      t instanceof Buffer && (t = t.toString()), this.parseChunk(t);
    }),
    (e.prototype.end = function (t) {
      arguments.length && this.write(t), (this.writable = !1), this.done();
    }),
    (e.prototype.destroy = function () {
      this.writable = !1;
    })),
    (e.prototype.reset = function () {
      (this._state = {
        mode: s.Text,
        pos: 0,
        data: null,
        pendingText: null,
        pendingWrite: null,
        lastTag: null,
        isScript: !1,
        needData: !1,
        output: [],
        done: !1,
      }),
        this._builder.reset();
    }),
    (e.prototype.parseChunk = function (t) {
      for (
        this._state.needData = !1,
          this._state.data =
            null !== this._state.data
              ? this._state.data.substr(this.pos) + t
              : t;
        this._state.pos < this._state.data.length && !this._state.needData;

      )
        this._parse(this._state);
    }),
    (e.prototype.parseComplete = function (t) {
      this.reset(), this.parseChunk(t), this.done();
    }),
    (e.prototype.done = function () {
      (this._state.done = !0),
        this._parse(this._state),
        this._flushWrite(),
        this._builder.done();
    }),
    (e.prototype._validateBuilder = function (t) {
      if ("object" != typeof t) throw new Error("Builder is not an object");
      if ("function" != typeof t.reset)
        throw new Error("Builder method 'reset' is invalid");
      if ("function" != typeof t.done)
        throw new Error("Builder method 'done' is invalid");
      if ("function" != typeof t.write)
        throw new Error("Builder method 'write' is invalid");
      if ("function" != typeof t.error)
        throw new Error("Builder method 'error' is invalid");
    }),
    (e.prototype._parse = function () {
      switch (this._state.mode) {
        case s.Text:
          return this._parseText(this._state);
        case s.Tag:
          return this._parseTag(this._state);
        case s.Attr:
          return this._parseAttr(this._state);
        case s.CData:
          return this._parseCData(this._state);
        case s.Doctype:
          return this._parseDoctype(this._state);
        case s.Comment:
          return this._parseComment(this._state);
      }
    }),
    (e.prototype._writePending = function (t) {
      this._state.pendingWrite || (this._state.pendingWrite = []),
        this._state.pendingWrite.push(t);
    }),
    (e.prototype._flushWrite = function () {
      if (this._state.pendingWrite) {
        for (var t = 0, e = this._state.pendingWrite.length; t < e; t++) {
          var a = this._state.pendingWrite[t];
          this._builder.write(a);
        }
        this._state.pendingWrite = null;
      }
    }),
    (e.prototype._write = function (t) {
      this._flushWrite(), this._builder.write(t);
    }),
    (e._re_parseText_scriptClose = /<\s*\/\s*script/gi),
    (e.prototype._parseText = function () {
      var t,
        a = this._state;
      a.isScript
        ? ((e._re_parseText_scriptClose.lastIndex = a.pos),
          (t = (t = e._re_parseText_scriptClose.exec(a.data)) ? t.index : -1))
        : (t = a.data.indexOf("<", a.pos));
      var n =
        -1 === t
          ? a.data.substring(a.pos, a.data.length)
          : a.data.substring(a.pos, t);
      if ((t < 0 && a.done && (t = a.data.length), t < 0)) {
        if (a.isScript) return void (a.needData = !0);
        a.pendingText || (a.pendingText = []),
          a.pendingText.push(a.data.substring(a.pos, a.data.length)),
          (a.pos = a.data.length);
      } else
        a.pendingText
          ? (a.pendingText.push(a.data.substring(a.pos, t)),
            (n = a.pendingText.join("")),
            (a.pendingText = null))
          : (n = a.data.substring(a.pos, t)),
          "" !== n && this._write({ type: s.Text, data: n }),
          (a.pos = t + 1),
          (a.mode = s.Tag);
    }),
    (e.re_parseTag = /\s*(\/?)\s*([^\s>\/]+)(\s*)\??(>?)/g),
    (e.prototype._parseTag = function () {
      var t = this._state;
      e.re_parseTag.lastIndex = t.pos;
      var a = e.re_parseTag.exec(t.data);
      if (a) {
        if (!a[1] && "!--" === a[2].substr(0, 3))
          return (t.mode = s.Comment), void (t.pos += 3);
        if (!a[1] && "![CDATA[" === a[2].substr(0, 8))
          return (t.mode = s.CData), void (t.pos += 8);
        if (!a[1] && "!DOCTYPE" === a[2].substr(0, 8))
          return (t.mode = s.Doctype), void (t.pos += 8);
        if (!t.done && t.pos + a[0].length === t.data.length)
          return void (t.needData = !0);
        var n;
        ">" === a[4]
          ? ((t.mode = s.Text), (n = a[0].substr(0, a[0].length - 1)))
          : ((t.mode = s.Attr), (n = a[0])),
          (t.pos += a[0].length);
        var i = { type: s.Tag, name: a[1] + a[2], raw: n };
        t.mode === s.Attr && (t.lastTag = i),
          "script" === i.name.toLowerCase()
            ? (t.isScript = !0)
            : "/script" === i.name.toLowerCase() && (t.isScript = !1),
          t.mode === s.Attr ? this._writePending(i) : this._write(i);
      } else t.needData = !0;
    }),
    (e.re_parseAttr_findName = /\s*([^=<>\s'"\/]+)\s*/g),
    (e.prototype._parseAttr_findName = function () {
      e.re_parseAttr_findName.lastIndex = this._state.pos;
      var t = e.re_parseAttr_findName.exec(this._state.data);
      return t
        ? this._state.pos + t[0].length !== e.re_parseAttr_findName.lastIndex
          ? null
          : { match: t[0], name: t[1] }
        : null;
    }),
    (e.re_parseAttr_findValue =
      /\s*=\s*(?:'([^']*)'|"([^"]*)"|([^'"\s\/>]+))\s*/g),
    (e.re_parseAttr_findValue_last = /\s*=\s*['"]?(.*)$/g),
    (e.prototype._parseAttr_findValue = function () {
      var t = this._state;
      e.re_parseAttr_findValue.lastIndex = t.pos;
      var a = e.re_parseAttr_findValue.exec(t.data);
      return a
        ? t.pos + a[0].length !== e.re_parseAttr_findValue.lastIndex
          ? null
          : { match: a[0], value: a[1] || a[2] || a[3] }
        : t.done
          ? ((e.re_parseAttr_findValue_last.lastIndex = t.pos),
            (a = e.re_parseAttr_findValue_last.exec(t.data)),
            a ? { match: a[0], value: "" !== a[1] ? a[1] : null } : null)
          : null;
    }),
    (e.re_parseAttr_splitValue = /\s*=\s*['"]?/g),
    (e.re_parseAttr_selfClose = /(\s*\/\s*)(>?)/g),
    (e.prototype._parseAttr = function () {
      var t = this._state,
        a = this._parseAttr_findName(t);
      if (a && "?" !== a.name) {
        if (!t.done && t.pos + a.match.length === t.data.length)
          return (t.needData = !0), null;
        t.pos += a.match.length;
        var n = this._parseAttr_findValue(t);
        t.data.indexOf(" ", t.pos);
        if (n) {
          if (!t.done && t.pos + n.match.length === t.data.length)
            return (t.needData = !0), void (t.pos -= a.match.length);
          t.pos += n.match.length;
        } else if (t.data.indexOf(" ", t.pos - 1))
          n = { match: "", value: a.name };
        else {
          if (
            ((e.re_parseAttr_splitValue.lastIndex = t.pos),
            e.re_parseAttr_splitValue.exec(t.data))
          )
            return (t.needData = !0), void (t.pos -= a.match.length);
          n = { match: "", value: null };
        }
        (t.lastTag.raw += a.match + n.match),
          this._writePending({ type: s.Attr, name: a.name, data: n.value });
      } else {
        e.re_parseAttr_selfClose.lastIndex = t.pos;
        var i = e.re_parseAttr_selfClose.exec(t.data);
        if (i && i.index === t.pos) {
          if (!t.done && !i[2] && t.pos + i[0].length === t.data.length)
            return void (t.needData = !0);
          (t.lastTag.raw += i[1]),
            this._write({ type: s.Tag, name: "/" + t.lastTag.name, raw: null }),
            (t.pos += i[1].length);
        }
        var r = t.data.indexOf(">", t.pos);
        if (r < 0) {
          if (t.done)
            return (
              (t.lastTag.raw += t.data.substr(t.pos)),
              void (t.pos = t.data.length)
            );
          t.needData = !0;
        } else (t.pos = r + 1), (t.mode = s.Text);
      }
    }),
    (e.re_parseCData_findEnding = /\]{1,2}$/),
    (e.prototype._parseCData = function () {
      var t = this._state,
        a = t.data.indexOf("]]>", t.pos);
      if ((a < 0 && t.done && (a = t.data.length), a < 0)) {
        if (
          ((e.re_parseCData_findEnding.lastIndex = t.pos),
          e.re_parseCData_findEnding.exec(t.data))
        )
          return void (t.needData = !0);
        t.pendingText || (t.pendingText = []),
          t.pendingText.push(t.data.substr(t.pos, t.data.length)),
          (t.pos = t.data.length),
          (t.needData = !0);
      } else {
        var n;
        t.pendingText
          ? (t.pendingText.push(t.data.substring(t.pos, a)),
            (n = t.pendingText.join("")),
            (t.pendingText = null))
          : (n = t.data.substring(t.pos, a)),
          this._write({ type: s.CData, data: n }),
          (t.mode = s.Text),
          (t.pos = a + 3);
      }
    }),
    (e.prototype._parseDoctype = function () {
      var t = this._state,
        a = t.data.indexOf(">", t.pos);
      if ((a < 0 && t.done && (a = t.data.length), a < 0))
        (e.re_parseCData_findEnding.lastIndex = t.pos),
          t.pendingText || (t.pendingText = []),
          t.pendingText.push(t.data.substr(t.pos, t.data.length)),
          (t.pos = t.data.length),
          (t.needData = !0);
      else {
        var n;
        t.pendingText
          ? (t.pendingText.push(t.data.substring(t.pos, a)),
            (n = t.pendingText.join("")),
            (t.pendingText = null))
          : (n = t.data.substring(t.pos, a)),
          this._write({ type: s.Doctype, data: n }),
          (t.mode = s.Text),
          (t.pos = a + 1);
      }
    }),
    (e.re_parseComment_findEnding = /\-{1,2}$/),
    (e.prototype._parseComment = function () {
      var t = this._state,
        a = t.data.indexOf("--\x3e", t.pos);
      if ((a < 0 && t.done && (a = t.data.length), a < 0)) {
        if (
          ((e.re_parseComment_findEnding.lastIndex = t.pos),
          e.re_parseComment_findEnding.exec(t.data))
        )
          return void (t.needData = !0);
        t.pendingText || (t.pendingText = []),
          t.pendingText.push(t.data.substr(t.pos, t.data.length)),
          (t.pos = t.data.length),
          (t.needData = !0);
      } else {
        var n;
        t.pendingText
          ? (t.pendingText.push(t.data.substring(t.pos, a)),
            (n = t.pendingText.join("")),
            (t.pendingText = null))
          : (n = t.data.substring(t.pos, a)),
          this._write({ type: s.Comment, data: n }),
          (t.mode = s.Text),
          (t.pos = a + 3);
      }
    }),
    (a._emptyTags = {
      area: 1,
      base: 1,
      basefont: 1,
      br: 1,
      col: 1,
      frame: 1,
      hr: 1,
      img: 1,
      input: 1,
      isindex: 1,
      link: 1,
      meta: 1,
      param: 1,
      embed: 1,
      "?xml": 1,
    }),
    (a.reWhitespace = /^\s*$/),
    (a.prototype.dom = null),
    (a.prototype.reset = function () {
      (this.dom = []),
        (this._done = !1),
        (this._tagStack = []),
        (this._lastTag = null),
        (this._tagStack.last = function () {
          return this.length ? this[this.length - 1] : null;
        }),
        (this._line = 1),
        (this._col = 1);
    }),
    (a.prototype.done = function () {
      (this._done = !0), this.handleCallback(null);
    }),
    (a.prototype.error = function (t) {
      this.handleCallback(t);
    }),
    (a.prototype.handleCallback = function (t) {
      if ("function" == typeof this._callback) this._callback(t, this.dom);
      else if (t) throw t;
    }),
    (a.prototype.isEmptyTag = function (t) {
      var e = t.name.toLowerCase();
      return (
        "?" == e.charAt(0) ||
        ("/" == e.charAt(0) && (e = e.substring(1)),
        this._options.enforceEmptyTags && !!a._emptyTags[e])
      );
    }),
    (a.prototype._getLocation = function () {
      return { line: this._line, col: this._col };
    }),
    (a.prototype._updateLocation = function (t) {
      var e = t.type === s.Tag ? t.raw : t.data;
      if (null !== e) {
        var a = e.split("\n");
        (this._line += a.length - 1),
          a.length > 1 && (this._col = 1),
          (this._col += a[a.length - 1].length),
          t.type === s.Tag
            ? (this._col += 2)
            : t.type === s.Comment
              ? (this._col += 7)
              : t.type === s.CData && (this._col += 12);
      }
    }),
    (a.prototype._copyElement = function (t) {
      var e = { type: t.type };
      if (
        (this._options.verbose && void 0 !== t.raw && (e.raw = t.raw),
        void 0 !== t.name)
      )
        switch (t.type) {
          case s.Tag:
            e.name = this._options.caseSensitiveTags
              ? t.name
              : t.name.toLowerCase();
            break;
          case s.Attr:
            e.name = this._options.caseSensitiveAttr
              ? t.name
              : t.name.toLowerCase();
            break;
          default:
            e.name = this._options.caseSensitiveTags
              ? t.name
              : t.name.toLowerCase();
        }
      return (
        void 0 !== t.data && (e.data = t.data),
        t.location &&
          (e.location = { line: t.location.line, col: t.location.col }),
        e
      );
    }),
    (a.prototype.write = function (t) {
      if (
        (this._done &&
          this.handleCallback(
            new Error(
              "Writing to the builder after done() called is not allowed without a reset()",
            ),
          ),
        this._options.includeLocation &&
          t.type !== s.Attr &&
          ((t.location = this._getLocation()), this._updateLocation(t)),
        t.type !== s.Text ||
          !this._options.ignoreWhitespace ||
          !a.reWhitespace.test(t.data))
      ) {
        var e, n;
        if (this._tagStack.last())
          if (t.type === s.Tag)
            if ("/" == t.name.charAt(0)) {
              var i = this._options.caseSensitiveTags
                ? t.name.substring(1)
                : t.name.substring(1).toLowerCase();
              if (!this.isEmptyTag(t)) {
                for (
                  var r = this._tagStack.length - 1;
                  r > -1 && this._tagStack[r--].name != i;

                );
                if (r > -1 || this._tagStack[0].name == i)
                  for (; r < this._tagStack.length - 1; ) this._tagStack.pop();
              }
            } else
              (e = this._tagStack.last()),
                t.type === s.Attr
                  ? (e.attributes || (e.attributes = {}),
                    (e.attributes[
                      this._options.caseSensitiveAttr
                        ? t.name
                        : t.name.toLowerCase()
                    ] = t.data))
                  : ((n = this._copyElement(t)),
                    e.children || (e.children = []),
                    e.children.push(n),
                    this.isEmptyTag(n) || this._tagStack.push(n),
                    t.type === s.Tag && (this._lastTag = n));
          else
            (e = this._tagStack.last()),
              t.type === s.Attr
                ? (e.attributes || (e.attributes = {}),
                  (e.attributes[
                    this._options.caseSensitiveAttr
                      ? t.name
                      : t.name.toLowerCase()
                  ] = t.data))
                : (e.children || (e.children = []),
                  e.children.push(this._copyElement(t)));
        else
          t.type === s.Tag
            ? "/" != t.name.charAt(0) &&
              ((n = this._copyElement(t)),
              this.dom.push(n),
              this.isEmptyTag(n) || this._tagStack.push(n),
              (this._lastTag = n))
            : t.type === s.Attr && this._lastTag
              ? (this._lastTag.attributes || (this._lastTag.attributes = {}),
                (this._lastTag.attributes[
                  this._options.caseSensitiveAttr
                    ? t.name
                    : t.name.toLowerCase()
                ] = t.data))
              : this.dom.push(this._copyElement(t));
      }
    }),
    (a.prototype._options = null),
    (a.prototype._callback = null),
    (a.prototype._done = !1),
    (a.prototype._tagStack = null),
    t(n, a),
    (n.prototype.done = function () {
      var t,
        e = {},
        a = r.getElementsByTagName(
          function (t) {
            return "rss" == t || "feed" == t;
          },
          this.dom,
          !1,
        );
      if ((a.length && (t = a[0]), t)) {
        if ("rss" == t.name) {
          (e.type = "rss"), (t = t.children[0]), (e.id = "");
          try {
            e.title = r.getElementsByTagName(
              "title",
              t.children,
              !1,
            )[0].children[0].data;
          } catch (t) {}
          try {
            e.link = r.getElementsByTagName(
              "link",
              t.children,
              !1,
            )[0].children[0].data;
          } catch (t) {}
          try {
            e.description = r.getElementsByTagName(
              "description",
              t.children,
              !1,
            )[0].children[0].data;
          } catch (t) {}
          try {
            e.updated = new Date(
              r.getElementsByTagName(
                "lastBuildDate",
                t.children,
                !1,
              )[0].children[0].data,
            );
          } catch (t) {}
          try {
            e.author = r.getElementsByTagName(
              "managingEditor",
              t.children,
              !1,
            )[0].children[0].data;
          } catch (t) {}
          (e.items = []),
            r
              .getElementsByTagName("item", t.children)
              .forEach(function (t, a, n) {
                var i = {};
                try {
                  i.id = r.getElementsByTagName(
                    "guid",
                    t.children,
                    !1,
                  )[0].children[0].data;
                } catch (t) {}
                try {
                  i.title = r.getElementsByTagName(
                    "title",
                    t.children,
                    !1,
                  )[0].children[0].data;
                } catch (t) {}
                try {
                  i.link = r.getElementsByTagName(
                    "link",
                    t.children,
                    !1,
                  )[0].children[0].data;
                } catch (t) {}
                try {
                  i.description = r.getElementsByTagName(
                    "description",
                    t.children,
                    !1,
                  )[0].children[0].data;
                } catch (t) {}
                try {
                  i.pubDate = new Date(
                    r.getElementsByTagName(
                      "pubDate",
                      t.children,
                      !1,
                    )[0].children[0].data,
                  );
                } catch (t) {}
                e.items.push(i);
              });
        } else {
          e.type = "atom";
          try {
            e.id = r.getElementsByTagName(
              "id",
              t.children,
              !1,
            )[0].children[0].data;
          } catch (t) {}
          try {
            e.title = r.getElementsByTagName(
              "title",
              t.children,
              !1,
            )[0].children[0].data;
          } catch (t) {}
          try {
            e.link = r.getElementsByTagName(
              "link",
              t.children,
              !1,
            )[0].attributes.href;
          } catch (t) {}
          try {
            e.description = r.getElementsByTagName(
              "subtitle",
              t.children,
              !1,
            )[0].children[0].data;
          } catch (t) {}
          try {
            e.updated = new Date(
              r.getElementsByTagName(
                "updated",
                t.children,
                !1,
              )[0].children[0].data,
            );
          } catch (t) {}
          try {
            e.author = r.getElementsByTagName(
              "email",
              t.children,
              !0,
            )[0].children[0].data;
          } catch (t) {}
          (e.items = []),
            r
              .getElementsByTagName("entry", t.children)
              .forEach(function (t, a, n) {
                var i = {};
                try {
                  i.id = r.getElementsByTagName(
                    "id",
                    t.children,
                    !1,
                  )[0].children[0].data;
                } catch (t) {}
                try {
                  i.title = r.getElementsByTagName(
                    "title",
                    t.children,
                    !1,
                  )[0].children[0].data;
                } catch (t) {}
                try {
                  i.link = r.getElementsByTagName(
                    "link",
                    t.children,
                    !1,
                  )[0].attributes.href;
                } catch (t) {}
                try {
                  i.description = r.getElementsByTagName(
                    "summary",
                    t.children,
                    !1,
                  )[0].children[0].data;
                } catch (t) {}
                try {
                  i.pubDate = new Date(
                    r.getElementsByTagName(
                      "updated",
                      t.children,
                      !1,
                    )[0].children[0].data,
                  );
                } catch (t) {}
                e.items.push(i);
              });
        }
        this.dom = e;
      }
      n.super_.prototype.done.call(this);
    });
  var r = {
    testElement: function (t, e) {
      if (!e) return !1;
      for (var a in t)
        if (t.hasOwnProperty(a))
          if ("tag_name" == a) {
            if (e.type !== s.Tag) return !1;
            if (!t.tag_name(e.name)) return !1;
          } else if ("tag_type" == a) {
            if (!t.tag_type(e.type)) return !1;
          } else if ("tag_contains" == a) {
            if (e.type !== s.Text && e.type !== s.Comment && e.type !== s.CData)
              return !1;
            if (!t.tag_contains(e.data)) return !1;
          } else if (!e.attributes || !t[a](e.attributes[a])) return !1;
      return !0;
    },
    getElements: function (t, e, a, n) {
      if (
        ((a = void 0 === a || null === a || !!a),
        (n = isNaN(parseInt(n)) ? -1 : parseInt(n)),
        !e)
      )
        return [];
      var i,
        s = [];
      for (var o in t)
        "function" != typeof t[o] &&
          (t[o] = (function (t) {
            return function (e) {
              return e == t;
            };
          })(t[o]));
      if ((r.testElement(t, e) && s.push(e), n >= 0 && s.length >= n)) return s;
      if (a && e.children) i = e.children;
      else {
        if (!(e instanceof Array)) return s;
        i = e;
      }
      for (
        var d = 0;
        d < i.length &&
        ((s = s.concat(r.getElements(t, i[d], a, n))),
        !(n >= 0 && s.length >= n));
        d++
      );
      return s;
    },
    getElementById: function (t, e, a) {
      var n = r.getElements({ id: t }, e, a, 1);
      return n.length ? n[0] : null;
    },
    getElementsByTagName: function (t, e, a, n) {
      return r.getElements({ tag_name: t }, e, a, n);
    },
    getElementsByTagType: function (t, e, a, n) {
      return r.getElements({ tag_type: t }, e, a, n);
    },
  };
  (i.Parser = e),
    (i.HtmlBuilder = a),
    (i.RssBuilder = n),
    (i.ElementType = s),
    (i.DomUtils = r);
})();
