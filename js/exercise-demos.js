/* Original local GIF demonstrations; this module never reads or writes workout data. */
(function () {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
  const demos = {
    current: null,
    sequence: 0,
    assets(id) {
      const data = globalThis.ForgeDemoData;
      if (!data || !Object.hasOwn(data.exercises, id)) return [];
      return data.exercises[id].map(key => ({id:key, ...data.assets[key]}));
    },
    render(id) {
      const assets = this.assets(id);
      if (!assets.length) return '<section class="forge50-guide-section"><h3>EXERCISE DEMO</h3><p>No animation is available for this exercise. Use the Technique tab for its guide.</p></section>';
      const first = assets[0];
      return `<section class="exercise-demo" data-demo-state="idle" aria-label="Animated exercise demonstration">
        ${assets.length > 1 ? `<label class="exercise-demo-choice">Choose a demonstration<select data-demo-choice>${assets.map(asset => `<option value="${escape(asset.id)}">${escape(asset.name)}</option>`).join('')}</select></label>` : ''}
        <figure class="exercise-demo-stage"><img data-demo-image src="${escape(first.poster)}" alt="${escape(first.name)} — static starting position" width="600" height="600" loading="lazy" decoding="async"></figure>
        <button type="button" class="exercise-demo-retry" data-demo-retry hidden>Retry demo</button>
        <p class="exercise-demo-status" data-demo-status role="status" aria-live="polite">The animation starts when you open Demo.</p>
        <ul class="exercise-demo-legend" aria-label="Demonstration colour key"><li><i class="demo-primary" aria-hidden="true"></i>Primary muscles</li><li><i class="demo-secondary" aria-hidden="true"></i>Supporting muscles</li><li><i class="demo-focus" aria-hidden="true"></i>Focus outline &amp; movement arrows</li></ul>
        <p class="forge50-guide-note">Illustrated movement reference. Follow the setup and form cues in Technique. Play a demo online once to view it offline later.</p>
      </section>`;
    },
    mount(root, id) {
      this.dispose();
      const assets = this.assets(id);
      if (!root || !assets.length) return;
      this.current = {root, assets, asset:assets[0], image:root.querySelector('[data-demo-image]')};
      root.querySelector('[data-demo-retry]').addEventListener('click', () => {
        if (this.current?.root !== root) return;
        this.play();
      });
      root.querySelector('[data-demo-choice]')?.addEventListener('change', event => {
        if (this.current?.root !== root) return;
        const asset = assets.find(item => item.id === event.target.value);
        if (!asset) return;
        this.current.asset = asset;
        this.stop();
        this.play();
      });
    },
    state(mode, message) {
      const current = this.current;
      if (!current) return;
      current.root.dataset.demoState = mode;
      current.root.querySelector('[data-demo-retry]').hidden = mode !== 'error';
      current.root.querySelector('[data-demo-status]').textContent = message;
    },
    play() {
      const current = this.current;
      if (!current || !current.root.isConnected || current.root.closest('[hidden]') || document.hidden) return;
      if (['loading','playing'].includes(current.root.dataset.demoState)) return;
      const request = ++this.sequence;
      this.state('loading', 'Loading demonstration…');
      current.image.onload = () => {
        if (this.current === current && request === this.sequence) this.state('playing', 'Playing demonstration.');
      };
      current.image.onerror = () => {
        if (this.current === current && request === this.sequence) this.stop('The animation could not load. Try again when online, or use the illustration and Technique guide.');
      };
      current.image.alt = current.asset.name + ' — animated exercise demonstration';
      current.image.src = current.asset.gif;
    },
    stop(error) {
      ++this.sequence;
      const current = this.current;
      if (!current) return;
      current.image.onload = current.image.onerror = null;
      current.image.alt = current.asset.name + ' — static starting position';
      current.image.src = current.asset.poster;
      this.state(error ? 'error' : 'idle', error || 'The animation starts when you open Demo.');
    },
    dispose() {
      this.stop();
      this.current = null;
    }
  };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) demos.stop();
    else demos.play();
  });
  globalThis.ExerciseDemos = demos;
})();
