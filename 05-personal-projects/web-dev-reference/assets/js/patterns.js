/* =========================================================
   DIALOG DEMONSTRATION
   Opens and closes the accessible modal dialog example.
   ========================================================= */

function initializeDialogDemo() {
  const dialog = document.querySelector('[data-demo-dialog]');
  const openButton = document.querySelector('[data-demo-open-dialog]');
  const closeButtons = document.querySelectorAll('[data-demo-close-dialog]');

  if (!dialog || !openButton || !closeButtons.length) {
    return;
  }

  openButton.addEventListener('click', () => {
    dialog.showModal();
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      dialog.close(button.value);
    });
  });
}


/* =========================================================
   FILTER DEMONSTRATION
   Filters the example skill list as the user types.
   ========================================================= */

function initializeFilterDemo() {
  const filter = document.querySelector('[data-demo-filter]');
  const input = filter?.querySelector('[data-filter-input]');
  const status = filter?.querySelector('[data-filter-status]');
  const items = filter
    ? [...filter.querySelectorAll('[data-filter-list] li')]
    : [];

  if (!filter || !input || !status || !items.length) {
    return;
  }

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    let visibleItems = 0;

    items.forEach((item) => {
      const matches = item.textContent
        .toLowerCase()
        .includes(query);

      item.hidden = !matches;

      if (matches) {
        visibleItems += 1;
      }
    });

    status.textContent =
      `${visibleItems} item${visibleItems === 1 ? '' : 's'}`;
  });
}


/* =========================================================
   THEME PREVIEW DEMONSTRATION
   Switches the example card between light and dark themes.
   ========================================================= */

function initializeThemePreviewDemo() {
  const card = document.querySelector('[data-demo-theme-card]');
  const toggle = document.querySelector('[data-demo-theme-toggle]');
  const state = document.querySelector('[data-demo-theme-state]');

  if (!card || !toggle || !state) {
    return;
  }

  toggle.addEventListener('click', () => {
    const currentTheme = card.dataset.demoTheme;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    card.dataset.demoTheme = nextTheme;
    state.textContent =
      nextTheme === 'dark' ? 'Dark' : 'Light';

    toggle.textContent =
      nextTheme === 'dark'
        ? 'Switch sample to light'
        : 'Switch sample to dark';

    toggle.setAttribute(
      'aria-label',
      nextTheme === 'dark'
        ? 'Switch theme preview to light mode'
        : 'Switch theme preview to dark mode'
    );

    toggle.setAttribute(
      'aria-pressed',
      nextTheme === 'dark' ? 'true' : 'false'
    );
  });
}


/* =========================================================
   TOAST DEMONSTRATION
   Shows a short status message after the example action.
   ========================================================= */

function initializeToastDemo() {
  const button = document.querySelector('[data-demo-toast-button]');
  const toast = document.querySelector('[data-demo-toast]');

  if (!button || !toast) {
    return;
  }

  button.addEventListener('click', () => {
    toast.hidden = false;

    window.setTimeout(() => {
      toast.hidden = true;
    }, 3000);
  });
}


/* =========================================================
   LOADING DEMONSTRATION
   Switches the example between loading and loaded states.
   ========================================================= */

function initializeLoadingDemo() {
  const card = document.querySelector('[data-demo-loading-card]');
  const region = document.querySelector('[data-demo-loading-region]');
  const toggle = document.querySelector('[data-demo-loading-toggle]');

  if (!card || !region || !toggle) {
    return;
  }

  toggle.addEventListener('click', () => {
    const isLoading =
      card.dataset.demoLoadingState === 'loading';

    if (isLoading) {
      card.dataset.demoLoadingState = 'loaded';

      region.innerHTML = `
        <h3>Reference loaded</h3>
        <p>The finished content is now available.</p>
      `;

      toggle.textContent = 'Show loading state';
      return;
    }

    card.dataset.demoLoadingState = 'loading';

    region.innerHTML = `
      <div class="demo-skeleton demo-skeleton-title"></div>
      <div class="demo-skeleton"></div>
      <div class="demo-skeleton demo-skeleton-short"></div>
    `;

    toggle.textContent = 'Show loaded content';
  });
}


/* =========================================================
   FORM FEEDBACK DEMONSTRATION
   Shows validation feedback and a success message.
   ========================================================= */

function initializeFormFeedbackDemo() {
  const form = document.querySelector('[data-demo-form]');
  const email = form?.querySelector('#demo-email');
  const emailError = form?.querySelector('#demo-email-error');
  const status = form?.querySelector('[data-demo-form-status]');

  if (!form || !email || !emailError || !status) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!email.validity.valid) {
      emailError.textContent = 'Enter a valid email address.';
      status.textContent = '';
      email.focus();
      return;
    }

    emailError.textContent = '';
    status.textContent = 'Form submitted successfully.';
  });
}


/* =========================================================
   API DEMONSTRATION
   Previews success, empty, and error states for an API request.
   ========================================================= */

function initializeApiDemo() {
  const demo = document.querySelector('[data-demo-api]');
  const status = demo?.querySelector('[data-api-status]');
  const buttons = demo
    ? [...demo.querySelectorAll('[data-api-state]')]
    : [];

  if (!demo || !status || !buttons.length) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const state = button.dataset.apiState;

      if (state === 'success') {
        status.textContent =
          '3 projects loaded successfully.';
        return;
      }

      if (state === 'empty') {
        status.textContent =
          'No projects found.';
        return;
      }

      if (state === 'error') {
        status.textContent =
          'Projects could not be loaded.';
      }
    });
  });
}


/* =========================================================
   PERSISTENT STATE DEMONSTRATION
   Saves a small interface preference so it stays after a reload.
   ========================================================= */

function initializePersistentStateDemo() {
  const demo =
    document.querySelector(
      '[data-demo-persistent-setting]'
    );

  const state =
    demo?.querySelector(
      '[data-persistent-state]'
    );

  const toggle =
    demo?.querySelector(
      '[data-persistent-toggle]'
    );

  if (!demo || !state || !toggle) {
    return;
  }

  const storageKey =
    'pattern-compact-view';


  /* Update the demo to match the saved setting. */
  const updateDemo =
    compact => {
      demo.classList.toggle(
        'is-compact',
        compact
      );

      state.textContent =
        compact
          ? 'On'
          : 'Off';

      toggle.textContent =
        compact
          ? 'Turn compact view off'
          : 'Turn compact view on';

      toggle.setAttribute(
        'aria-pressed',
        String(compact)
      );
    };


  /* Restore the preference when the page loads. */
  const savedSetting =
    localStorage.getItem(
      storageKey
    );

  updateDemo(
    savedSetting === 'true'
  );


  /* Save the preference each time it changes. */
  toggle.addEventListener(
    'click',
    () => {
      const compact =
        !demo.classList.contains(
          'is-compact'
        );

      localStorage.setItem(
        storageKey,
        String(compact)
      );

      updateDemo(compact);
    }
  );
}


/* =========================================================
   EVENT DELEGATION DEMONSTRATION
   Uses one parent listener to handle remove buttons in the list.
   ========================================================= */

function initializeEventDelegationDemo() {
  const demo =
    document.querySelector(
      '[data-demo-delegation]'
    );

  const list =
    demo?.querySelector(
      '[data-delegation-list]'
    );

  const addButton =
    demo?.querySelector(
      '[data-delegation-add]'
    );

  const status =
    demo?.querySelector(
      '[data-delegation-status]'
    );

  if (!demo || !list || !addButton || !status) {
    return;
  }

  let itemNumber =
    list.children.length;


  /* Keep the visible item count updated after each change. */
  const updateStatus = () => {
    const itemCount =
      list.children.length;

    status.textContent =
      `${itemCount} item${itemCount === 1 ? '' : 's'}`;
  };


  /* The parent handles clicks from every current or future remove button. */
  list.addEventListener(
    'click',
    (event) => {
      const button =
        event.target.closest(
          '[data-remove-item]'
        );

      if (!button || !list.contains(button)) {
        return;
      }

      button.closest('li')?.remove();
      updateStatus();
    }
  );


  /* New items work without adding another remove listener. */
  addButton.addEventListener(
    'click',
    () => {
      itemNumber += 1;

      const item =
        document.createElement('li');

      const label =
        document.createElement('span');

      const removeButton =
        document.createElement('button');

      label.textContent =
        `New reference item ${itemNumber}`;

      removeButton.className =
        'demo-button demo-button-secondary';

      removeButton.type =
        'button';

      removeButton.dataset.removeItem =
        '';

      removeButton.textContent =
        'Remove';

      item.append(
        label,
        removeButton
      );

      list.append(item);
      updateStatus();
    }
  );
}


/* =========================================================
   INITIALIZATION
   Starts every interactive example used on the Patterns page.
   ========================================================= */

function initializePatternDemos() {
  initializeDialogDemo();
  initializeFilterDemo();
  initializeThemePreviewDemo();
  initializeToastDemo();
  initializeLoadingDemo();
  initializeFormFeedbackDemo();
  initializeApiDemo();
  initializePersistentStateDemo();
  initializeEventDelegationDemo();
}