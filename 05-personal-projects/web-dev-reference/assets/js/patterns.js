/* Live examples used only on the Patterns page. */

/* Modal dialog demo */
function initializeDialogDemo() {
  const openButton = document.getElementById('demo-open-dialog');
  const dialog = document.getElementById('demo-confirm-dialog');

  if (!openButton || !dialog) {
    return;
  }

  // I save the focused element so keyboard focus can return when the dialog closes.
  let returnFocusTo = openButton;

  openButton.addEventListener('click', () => {
    returnFocusTo = document.activeElement || openButton;
    dialog.showModal();

    dialog.querySelector('[data-demo-close-dialog]')?.focus();
  });

  dialog.querySelectorAll('[data-demo-close-dialog]').forEach(button => {
    button.addEventListener('click', () => {
      dialog.close(button.value || '');
    });
  });

  dialog.addEventListener('click', event => {
    if (event.target !== dialog) {
      return;
    }

    const bounds = dialog.getBoundingClientRect();
    const clickedInside =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;

    if (!clickedInside) {
      dialog.close('backdrop');
    }
  });

  dialog.addEventListener('close', () => {
    returnFocusTo?.focus();
  });
}

/* Filter demo */
function initializeFilterDemo() {
  document.querySelectorAll('[data-demo-filter]').forEach(demo => {
    const input = demo.querySelector('[data-filter-input]');
    const status = demo.querySelector('[data-filter-status]');
    const items = [...demo.querySelectorAll('[data-filter-list] li')];

    if (!input || !status || !items.length) {
      return;
    }

    const updateResults = () => {
      const query = input.value.trim().toLowerCase();
      let visibleCount = 0;

      items.forEach(item => {
        const matches = !query || item.textContent.toLowerCase().includes(query);

        item.hidden = !matches;

        if (matches) {
          visibleCount += 1;
        }
      });

      status.textContent = `${visibleCount} item${visibleCount === 1 ? '' : 's'}`;
    };

    input.addEventListener('input', updateResults);
    updateResults();
  });
}

/* Theme preview demo */
function initializeThemePreviewDemo() {
  const card = document.querySelector('[data-demo-theme-card]');
  const button = card?.querySelector('[data-demo-theme-toggle]');
  const state = card?.querySelector('[data-demo-theme-state]');

  if (!card || !button) {
    return;
  }

  const updatePreview = theme => {
    const isDark = theme === 'dark';

    card.dataset.demoTheme = theme;
    button.setAttribute('aria-pressed', String(isDark));

    button.textContent = isDark ? 'Switch sample to light' : 'Switch sample to dark';

    if (state) {
      state.textContent = isDark ? 'Dark' : 'Light';
    }
  };

  updatePreview(card.dataset.demoTheme || 'light');

  button.addEventListener('click', () => {
    const nextTheme = card.dataset.demoTheme === 'dark' ? 'light' : 'dark';

    updatePreview(nextTheme);
  });
}

/* Toast demo */
function initializeToastDemo() {
  document.querySelectorAll('[data-demo-toast-button]').forEach(button => {
    const section = button.closest('.pattern-section');
    const toast = section?.querySelector('[data-demo-toast]');

    if (!toast) {
      return;
    }

    let timeoutId;

    button.addEventListener('click', () => {
      window.clearTimeout(timeoutId);
      toast.hidden = false;

      timeoutId = window.setTimeout(() => {
        toast.hidden = true;
      }, 3000);
    });
  });
}

/* Loading state demo */
function initializeLoadingDemo() {
  document.querySelectorAll('[data-demo-loading-card]').forEach(card => {
    const button = card.querySelector('[data-demo-loading-toggle]');
    const region = card.querySelector('[data-demo-loading-region]');

    if (!button || !region) {
      return;
    }

    // I keep the loading and loaded content in the same spot so the example does not jump around.
    const loadingMarkup = `
        <div class="demo-skeleton demo-skeleton-title"></div>
        <div class="demo-skeleton"></div>
        <div class="demo-skeleton demo-skeleton-short"></div>
      `;

    const loadedMarkup = `
        <div class="demo-loading-content" data-demo-loaded-content>
          <h3>Web Development Reference</h3>
          <p>
            Content loaded successfully with the final layout preserved.
          </p>
        </div>
      `;

    const renderState = state => {
      const isLoaded = state === 'loaded';

      card.dataset.demoLoadingState = state;
      region.innerHTML = isLoaded ? loadedMarkup : loadingMarkup;

      button.textContent = isLoaded ? 'Show loading state' : 'Show loaded content';

      button.setAttribute('aria-pressed', String(isLoaded));
    };

    renderState(card.dataset.demoLoadingState || 'loading');

    button.addEventListener('click', () => {
      const nextState = card.dataset.demoLoadingState === 'loaded' ? 'loading' : 'loaded';

      renderState(nextState);
    });
  });
}

/* Form feedback demo */
function initializeFormFeedbackDemo() {
  document.querySelectorAll('[data-demo-form]').forEach(form => {
    const email = form.querySelector('input[type="email"]');
    const error = form.querySelector('.demo-field-message');
    const status = form.querySelector('[data-demo-form-status]');

    if (!email || !error || !status) {
      return;
    }

    form.addEventListener('submit', event => {
      event.preventDefault();

      if (!email.validity.valid) {
        error.textContent = 'Enter a valid email address.';
        status.textContent = 'The form has an error.';
        email.focus();
        return;
      }

      error.textContent = '';
      status.textContent = 'Form submitted successfully.';
    });

    email.addEventListener('input', () => {
      if (email.validity.valid) {
        error.textContent = '';
      }
    });
  });
}

/* API state demo */
function initializeApiDemo() {
  document.querySelectorAll('[data-demo-api]').forEach(demo => {
    const status = demo.querySelector('[data-api-status]');
    const buttons = demo.querySelectorAll('[data-api-state]');

    if (!status || !buttons.length) {
      return;
    }

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const state = button.dataset.apiState;

        // This is a demo, so a short timeout lets me show the same states without a real API.
        status.textContent = 'Loading…';

        window.setTimeout(() => {
          if (state === 'success') {
            status.innerHTML = `
              <ul class="demo-api-result-list">
                <li>Semantic HTML Guide</li>
                <li>CSS Grid Pattern</li>
                <li>Accessible Form Pattern</li>
              </ul>
            `;
            return;
          }

          status.textContent =
            state === 'empty'
              ? 'No matching projects were returned.'
              : 'Projects could not be loaded. Try again.';
        }, 350);
      });
    });
  });
}

/* Start pattern demos */
function initializePatternDemos() {
  initializeDialogDemo();
  initializeFilterDemo();
  initializeThemePreviewDemo();
  initializeToastDemo();
  initializeLoadingDemo();
  initializeFormFeedbackDemo();
  initializeApiDemo();
}
