// Resume – top nav + single scroll layout

var HEADER_OFFSET = 120;

function updateActiveNav() {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;
  var links = nav.querySelectorAll('a[href^="#"]');
  var sections = [];
  links.forEach(function (a) {
    var id = (a.getAttribute('href') || '').slice(1);
    if (id && document.getElementById(id)) sections.push({ id: id, link: a });
  });
  var current = null;
  for (var i = 0; i < sections.length; i++) {
    var el = document.getElementById(sections[i].id);
    if (el && el.getBoundingClientRect().top <= HEADER_OFFSET) current = sections[i];
  }
  if (!current && sections.length) current = sections[0];
  sections.forEach(function (s) {
    s.link.setAttribute('aria-current', s === current ? 'true' : null);
  });
}

window.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open);
    });
    siteNav.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  // Scroll spy: highlight current section in nav
  updateActiveNav();
  window.addEventListener('scroll', function () {
    requestAnimationFrame(updateActiveNav);
  }, { passive: true });
  // Footer year
  var footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();
});

$(document).ready(function () {
  $.getJSON('labels.json', function (data) {
    try {
      Object.keys(data).forEach(function (key) {
        var el = $('#' + key);
        if (el.length) el.text(data[key]);
      });
    } catch (e) {
      console.error('Labels error:', e);
    }
  }).fail(function (_, status, err) {
    console.error('Labels request failed:', status, err);
  });
});

function mapToItem(data) {
  if (data.jobTitle !== undefined) {
    return {
      title: data.jobTitle,
      subtitle: data.company,
      duration: data.duration,
      details: Array.isArray(data.responsibilities) ? data.responsibilities : [data.responsibilities]
    };
  }
  if (data.degree !== undefined) {
    return {
      title: data.degree,
      subtitle: data.university,
      duration: data.duration,
      details: Array.isArray(data.details) ? data.details : (data.details ? [data.details] : [])
    };
  }
  return {};
}

function createGenericElement(item) {
  var div = document.createElement('div');
  div.className = 'd-flex flex-column flex-md-row justify-content-between mb-5';
  div.innerHTML =
    '<div class="flex-grow-1">' +
      '<h3 class="mb-0">' + item.title + '</h3>' +
      '<div class="subheading mb-3">' + item.subtitle + '</div>' +
      '<ul>' + (item.details || []).map(function (d) { return '<li>' + d + '</li>'; }).join('') + '</ul>' +
    '</div>' +
    '<div class="flex-shrink-0"><span class="text-primary">' + item.duration + '</span></div>';
  return div;
}

function addLoadingPlaceholder(container, liveId) {
  if (!container || container.querySelector('.loading-placeholder')) return;
  var p = document.createElement('p');
  p.className = 'loading-placeholder';
  p.setAttribute('aria-live', 'polite');
  if (liveId) p.id = liveId;
  p.textContent = 'Loading…';
  container.appendChild(p);
}
function removeLoadingPlaceholder(container) {
  if (!container) return;
  var el = container.querySelector('.loading-placeholder');
  if (el) el.remove();
}

function createObjectFromFile(file, elementId) {
  var container = document.getElementById(elementId);
  if (!container) return;
  addLoadingPlaceholder(container);
  fetch(file)
    .then(function (r) { return r.json(); })
    .then(function (items) {
      removeLoadingPlaceholder(container);
      (items || []).forEach(function (item) {
        var el = createGenericElement(mapToItem(item));
        container.appendChild(el);
      });
    })
    .catch(function (err) {
      removeLoadingPlaceholder(container);
      console.error('Fetch error:', err);
    });
}

createObjectFromFile('jobs.json', 'jobsList');
createObjectFromFile('education.json', 'educationList');

function loadTechskills() {
  var container = document.getElementById('techskillsList');
  if (!container) return;
  addLoadingPlaceholder(container);
  fetch('techskills.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      removeLoadingPlaceholder(container);
      var items = typeof data === 'object' && !Array.isArray(data) ? Object.values(data) : (data || []);
      items.forEach(function (text) {
        var li = document.createElement('li');
        li.innerHTML = '<span class="fa-li"><i class="fas fa-check"></i></span>' + text;
        container.appendChild(li);
      });
    })
    .catch(function (err) {
      removeLoadingPlaceholder(container);
      console.error('Tech skills error:', err);
    });
}

function loadCertifications() {
  var container = document.getElementById('certificationsList');
  if (!container) return;
  addLoadingPlaceholder(container);
  fetch('certifications.json')
    .then(function (r) { return r.json(); })
    .then(function (items) {
      removeLoadingPlaceholder(container);
      (items || []).forEach(function (item) {
        var li = document.createElement('li');
        li.innerHTML = '<span class="fa-li"><i class="fas fa-trophy"></i></span>' + item.name + (item.issuer ? ', ' + item.issuer : '');
        container.appendChild(li);
      });
    })
    .catch(function (err) {
      removeLoadingPlaceholder(container);
      console.error('Certifications error:', err);
    });
}

function loadRecommendations() {
  var container = document.getElementById('recommendationsList');
  if (!container) return;
  addLoadingPlaceholder(container);
  fetch('recommendations.json')
    .then(function (r) { return r.json(); })
    .then(function (items) {
      removeLoadingPlaceholder(container);
      if (!items || !items.length) return;
      items.forEach(function (item) {
        var roleCompany = [item.role, item.company].filter(Boolean).join(' · ');
        var card = document.createElement('div');
        card.className = 'rec-card';
        card.innerHTML =
          '<blockquote class="rec-quote">' + item.text + '</blockquote>' +
          '<footer class="rec-author">' +
            '<strong>' + (item.author || '') + '</strong>' +
            (roleCompany ? '<span class="rec-meta">' + roleCompany + '</span>' : '') +
          '</footer>';
        container.appendChild(card);
      });
    })
    .catch(function (err) {
      removeLoadingPlaceholder(container);
      console.error('Recommendations error:', err);
    });
}

loadTechskills();
loadCertifications();
loadRecommendations();
