/* Quote form: client validation + mailto MVP */
(function () {
  const form = document.getElementById('quote-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  const categorySelect = form.querySelector('#category');
  const fleetBlock = document.getElementById('fleet-fields');

  function isFleet(cat) {
    return cat === 'Fleet & Equipment Parts';
  }

  function toggleFleet() {
    if (!fleetBlock || !categorySelect) return;
    const show = isFleet(categorySelect.value);
    fleetBlock.classList.toggle('visible', show);
    fleetBlock.querySelectorAll('[data-fleet-required]').forEach(function (el) {
      if (show) el.setAttribute('required', '');
      else el.removeAttribute('required');
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', toggleFleet);
    toggleFleet();
  }

  function showError(id, msg) {
    const input = form.querySelector('#' + id);
    const err = form.querySelector('[data-error-for="' + id + '"]');
    if (input) input.classList.add('error');
    if (err) {
      err.textContent = msg;
      err.classList.add('show');
    }
  }

  function clearErrors() {
    form.querySelectorAll('.error').forEach(function (el) {
      el.classList.remove('error');
    });
    form.querySelectorAll('.field-error').forEach(function (el) {
      el.classList.remove('show');
      el.textContent = '';
    });
  }

  function val(id) {
    const el = form.querySelector('#' + id);
    return el ? String(el.value || '').trim() : '';
  }

  function radioVal(name) {
    const checked = form.querySelector('input[name="' + name + '"]:checked');
    return checked ? checked.value : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    let ok = true;
    const required = [
      ['company', 'Company name is required.'],
      ['country-site', 'Country & project site is required.'],
      ['category', 'Please select a category.'],
      ['items', 'Item list / specs is required.'],
      ['quantity', 'Quantity is required.'],
      ['needed-by', 'Needed-by date is required.'],
      ['incoterm', 'Incoterm preference is required.']
    ];

    required.forEach(function (pair) {
      if (!val(pair[0])) {
        showError(pair[0], pair[1]);
        ok = false;
      }
    });

    if (!radioVal('certificates')) {
      showError('certificates-yes', 'Please indicate if certificates are required.');
      ok = false;
    }

    if (isFleet(val('category'))) {
      if (!val('equip-make-model')) {
        showError('equip-make-model', 'Equipment make/model is required for fleet RFQs.');
        ok = false;
      }
      if (!radioVal('fleet-use')) {
        showError('fleet-use-fleet', 'Please select fleet or site use.');
        ok = false;
      }
      if (!radioVal('oem-alt')) {
        showError('oem-alt-oem', 'Please select OEM or alternative preference.');
        ok = false;
      }
    }

    if (!ok) {
      const first = form.querySelector('.error');
      if (first) first.focus();
      return;
    }

    const lines = [
      'Quote request — Oceania MineBuild Supply',
      '',
      'Company: ' + val('company'),
      'Country & project site: ' + val('country-site'),
      'Category: ' + val('category'),
      'Item list / specs:',
      val('items'),
      '',
      'Quantity: ' + val('quantity'),
      'Needed-by: ' + val('needed-by'),
      'Incoterm preference: ' + val('incoterm'),
      'Certificates required: ' + radioVal('certificates')
    ];

    if (isFleet(val('category'))) {
      lines.push(
        '',
        '— Fleet / equipment details —',
        'Make / model: ' + val('equip-make-model'),
        'Use: ' + radioVal('fleet-use'),
        'OEM or alternative: ' + radioVal('oem-alt')
      );
    }

    if (val('notes')) {
      lines.push('', 'Additional notes:', val('notes'));
    }

    const subject = encodeURIComponent(
      'RFQ — ' + val('category') + ' — ' + val('company')
    );
    const body = encodeURIComponent(lines.join('\n'));
    const mailto = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;

    window.location.href = mailto;

    form.classList.add('hidden');
    if (success) success.classList.add('visible');
  });
})();
