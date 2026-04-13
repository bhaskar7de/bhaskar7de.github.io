/* ============================================================
   about.js  —  Academic timeline for about.html
   ============================================================ */

(function () {
  'use strict';

  // Guard: skip entirely on pages without the timeline
  if (!document.getElementById('tlTrack')) return;

  var DOT_D   = 12;
  var DOT_R   = DOT_D / 2;
  var DOT_GAP = 4;

  var STOPS = [
    {
      year: 2015, anchor: 'left',
      cards: [
        {
          bgClass: 'tl-bg-school', badge: 'tl-badge-edu',
          years: '2013 \u2013 2015', degree: 'High School', institution: 'Hooghly Collegiate School',
          city: 'Chinsurah', country: 'India',
          desc: 'Ten years of foundational schooling. Where curiosity about the natural world first took hold and Physics became a language.',
        },
        {
          bgClass: 'tl-bg-rkmrc', badge: 'tl-badge-edu',
          years: '2015 \u2013 2018', degree: 'B. Sc. in Physics', institution: 'RKMRC Narendrapur',
          city: 'Kolkata', country: 'India',
          desc: 'B.Sc. in Physics. First deep exposure to optics, quantum mechanics, and wave phenomena.',
        },
        {
          bgClass: 'tl-bg-inspire', badge: 'tl-badge-award', badgeText: 'Award',
          years: '2015 \u2013 2020', institution: 'INSPIRE Scholarship',
          city: 'Department of Science & Technology', country: 'Govt. of India',
          desc: 'Awarded the DST INSPIRE Scholarship for Higher Education, supporting undergraduate and postgraduate studies in science.',
        },
      ],
    },
    {
      year: 2018, anchor: 'mid',
      cards: [
        {
          bgClass: 'tl-bg-iitm', badge: 'tl-badge-edu',
          years: '2018 \u2013 2020', degree: 'M. Sc. in Physics', institution: 'Indian Institute of Technology (IIT) Madras',
          city: 'Chennai', country: 'India',
          desc: 'M.Sc. in Physics. Specialised in condensed matter physics and optical properties of nanostructures.',
        },
      ],
    },
    {
      year: 2019, anchor: 'mid',
      cards: [
        {
          bgClass: 'tl-bg-csir', badge: 'tl-badge-award', badgeText: 'Award',
          years: '2019', institution: 'CSIR National Eligibility Test',
          city: 'Council of Scientific and Industrial Research', country: 'India',
          desc: 'Joined IISER Bhopal as a CSIR Junior Research Fellow to begin doctoral research in ultrafast spectroscopy at the ULCOS Lab.',
        },
      ],
    },
    {
      year: 2020, anchor: 'mid',
      cards: [
        {
          bgClass: 'tl-bg-iiser', badge: 'tl-badge-edu',
          years: '2020 \u2013 2021', degree: 'PhD in Physics, CSIR Junior Research Fellow', institution: 'Indian Institute of Science Education and Research (IISER) Bhopal',
          city: 'Bhopal', country: 'India',
          desc: 'M.Sc. in Physics. Specialised in condensed matter physics and optical properties of nanostructures.',
        },
      ],
    },
    {
      year: 2021, anchor: 'mid',
      cards: [
        {
          bgClass: 'tl-bg-pmrf', badge: 'tl-badge-award', badgeText: 'Fellowship',
          years: '2021', institution: 'Prime Minister\u2019s Research Fellowship',
          city: 'Ministry of Education', country: 'Govt. of India',
          desc: "Awarded the Prime Minister\u2019s Research Fellowship \u2014 India\u2019s most prestigious PhD fellowship. Research in two-dimensional coherent spectroscopy. Published in Optics Letters & Physical Review B. PhD completed 2026.",
        },
        {
          bgClass: 'tl-bg-iiserpmrf', badge: 'tl-badge-edu',
          years: '2021 \u2013 2026', degree: 'PhD in Physics, PMRF Fellow', institution: 'Indian Institute of Science Education and Research (IISER) Bhopal',
          city: 'Bhopal', country: 'India',
          desc: 'M.Sc. in Physics. Specialised in condensed matter physics and optical properties of nanostructures.',
        },
      ],
    },
    {
      year: 2026, anchor: 'right',
      cards: [
        {
          bgClass: 'tl-bg-postdoc', badge: 'tl-badge-soon', badgeText: 'Coming Soon',
          years: '', institution: 'Postdoctoral Researcher',
          city: null, country: '',
          desc: 'A new chapter begins.',
          muted: true,
        },
      ],
    },
  ];

  var firstYear = STOPS.reduce(function (m, s) { return Math.min(m, s.year); }, Infinity);
  var lastYear  = STOPS.reduce(function (m, s) { return Math.max(m, s.year); }, -Infinity);
  var yearSpan  = lastYear - firstYear;

  function yearToPct(year) {
    if (yearSpan === 0) return 0;
    return (year - firstYear) / yearSpan * 99;
  }

  function pctToX(pct, trackWidth) {
    var usable = trackWidth - DOT_D;
    return DOT_R + (pct / 100) * usable;
  }

  var CARDS = [];
  STOPS.forEach(function (stop, si) {
    stop.cards.forEach(function (card, ci) {
      CARDS.push(Object.assign({}, card, {
        stopIdx: si,
        cardInStop: ci,
        totalInStop: stop.cards.length,
      }));
    });
  });

  var current    = 7;
  var animating  = false;
  var dotCentreX = [];

  var elTrack    = document.getElementById('tlTrack');
  var elFill     = document.getElementById('tlFill');
  var elDotLayer = document.getElementById('tlDotLayer');
  var elBgs      = document.getElementById('tlBgs');
  var elContent  = document.getElementById('tlContent');
  var elPrev     = document.getElementById('tlPrev');
  var elNext     = document.getElementById('tlNext');

  function computeLayout() {
    var trackWidth = elTrack.getBoundingClientRect().width;
    if (trackWidth === 0) return false;
    dotCentreX = STOPS.map(function (stop) {
      return pctToX(yearToPct(stop.year), trackWidth);
    });
    return true;
  }

  function buildBgs() {
    CARDS.forEach(function (card, i) {
      var div = document.createElement('div');
      div.className = 'tl-bg ' + card.bgClass;
      div.id = 'tlbg' + i;
      if (i === 7) div.classList.add('tl-bg-visible');
      elBgs.appendChild(div);
    });
  }

  function buildDots() {
    elDotLayer.innerHTML = '';
    STOPS.forEach(function (stop, si) {
      var n          = stop.cards.length;
      var anchor     = stop.anchor;
      var clusterW   = n * DOT_D + (n - 1) * DOT_GAP;
      var cx         = dotCentreX[si];
      var clusterLeft;
      if      (anchor === 'left')  clusterLeft = cx;
      else if (anchor === 'right') clusterLeft = cx - clusterW + DOT_D;
      else                         clusterLeft = cx - clusterW / 2;

      var anchorCxInCluster;
      if      (anchor === 'left')  anchorCxInCluster = clusterW / 2;
      else if (anchor === 'right') anchorCxInCluster = clusterW - DOT_R;
      else                         anchorCxInCluster = clusterW / 2;

      var group = document.createElement('div');
      group.className  = 'tl-stop-group';
      group.id         = 'tlgroup' + si;
      group.style.left = clusterLeft + 'px';
      group.style.top  = '0px';

      var cluster = document.createElement('div');
      cluster.className = 'tl-dot-cluster';

      var indices = [];
      for (var k = 0; k < n; k++) indices.push(k);
      if (anchor === 'right') indices.reverse();

      indices.forEach(function (ci) {
        var cardIdx = CARDS.findIndex(function (c) {
          return c.stopIdx === si && c.cardInStop === ci;
        });
        var dot = document.createElement('div');
        dot.className = 'tl-dot';
        dot.id = 'tldot' + si + '_' + ci;
        if (si === 0 && ci === 0) dot.classList.add('tl-dot-active');
        ;(function (idx) {
          dot.addEventListener('click', function () { goTo(idx); });
        })(cardIdx);
        cluster.appendChild(dot);
      });

      var label = document.createElement('div');
      label.className = 'tl-stop-year';
      label.textContent = stop.year;
      label.dataset.anchorCx = anchorCxInCluster;

      group.appendChild(cluster);
      group.appendChild(label);
      elDotLayer.appendChild(group);
    });

    requestAnimationFrame(function () {
      elDotLayer.querySelectorAll('.tl-stop-year').forEach(function (label) {
        var anchorCx  = parseFloat(label.dataset.anchorCx);
        var labelHalf = label.offsetWidth / 2;
        label.style.marginLeft = (anchorCx - labelHalf) + 'px';
      });
    });
  }

  function pinSVG() {
    return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"' +
      ' stroke="currentColor" stroke-width="2.5"' +
      ' stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>' +
      '<circle cx="12" cy="10" r="3"></circle></svg>';
  }

  function renderCard(idx) {
    var card = CARDS[idx];
    var loc  = card.city ? card.city + ', ' + card.country : card.country;

    elContent.innerHTML =
      (card.badgeText ? '<div class="tl-badge ' + card.badge + '">' + card.badgeText + '</div>' : '') +
      '<div class="tl-card-years">'       + card.years       + '</div>' +
      '<div class="tl-card-institution">' + card.institution + '</div>' +
      '<div class="tl-card-degree">'      + (card.degree || '') + '</div>' +
      '<div class="tl-card-location">'    + pinSVG() + ' ' + loc + '</div>';

    elFill.style.width = dotCentreX[card.stopIdx] + 'px';

    elDotLayer.querySelectorAll('.tl-stop-group').forEach(function (g, si) {
      g.classList.toggle('tl-stop-active', si === card.stopIdx);
    });

    elDotLayer.querySelectorAll('.tl-dot').forEach(function (d) {
      d.classList.remove('tl-dot-active');
    });

    var ad = document.getElementById('tldot' + card.stopIdx + '_' + card.cardInStop);
    if (ad) ad.classList.add('tl-dot-active');

    elPrev.classList.toggle('tl-disabled', idx === 0);
    elNext.classList.toggle('tl-disabled', idx === CARDS.length - 1);
  }

  function goTo(idx, dir) {
    if (animating || idx === current) return;
    animating = true;

    var fwd   = dir !== undefined ? (dir > 0) : (idx > current);
    var oldBg = document.getElementById('tlbg' + current);
    var newBg = document.getElementById('tlbg' + idx);

    oldBg.classList.remove('tl-bg-visible');
    oldBg.classList.add(fwd ? 'tl-bg-exit-fwd' : 'tl-bg-exit-bwd');

    newBg.style.opacity   = '0';
    newBg.style.transform = fwd ? 'translateX(2%) scale(1.04)' : 'translateX(-2%) scale(1.04)';
    newBg.classList.add('tl-bg-visible');

    requestAnimationFrame(function () {
      newBg.style.opacity   = '';
      newBg.style.transform = '';
    });

    current = idx;
    renderCard(current);

    setTimeout(function () {
      oldBg.classList.remove('tl-bg-exit-fwd', 'tl-bg-exit-bwd');
      animating = false;
    }, 580);
  }

  // Public navigation for HTML buttons
  window.tlNav = function (dir) {
    var next = current + dir;
    if (next < 0 || next >= CARDS.length) return;
    goTo(next, dir);
  };

  // Keyboard navigation — ArrowLeft/Right for timeline,
  // no conflict with Tab handler from Section 1
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  window.tlNav(-1);
    if (e.key === 'ArrowRight') window.tlNav(1);
  });

  // Rebuild on resize
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (computeLayout()) {
        buildDots();
        renderCard(current);
      }
    }, 120);
  });

  // Init
  buildBgs();
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      if (computeLayout()) {
        buildDots();
        renderCard(7);
      } else {
        setTimeout(function () {
          if (computeLayout()) { buildDots(); renderCard(0); }
        }, 60);
      }
    });
  });

})();
