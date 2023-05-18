import { ReplayAction, ReplayApi } from './replay-api.provider';
import { ReplayMode } from './replay.service';

type CSS = Partial<CSSStyleDeclaration>;
const Styles = {
  Root: {
    position: 'absolute',
    top: '0',
    right: '0'
  },
  Replay: {
    position: 'absolute',
    display: 'flex',
    background: 'red',
    border: '1px solid green',
    top: '0',
    right: '0'
  },
  Section: {
    padding: '2px',
    background: 'yellow',
    display: 'flex',
  }
};

const button = (label: string, alt: string, action: ReplayAction) => {
  const el = document.createElement('button');
  el.textContent = label;
  el.title = alt;
  el.addEventListener('click', action);
  return el;
}

const container = (type: string, styles: CSS, ...childs: HTMLElement[]) => {
  const el = document.createElement(type);
  for (const c of childs) {
    el.appendChild(c);
  }
  for (const [k, v] of Object.entries(styles)) {
    // @ts-ignore
    el.style[k] = v;
  }
  return el;
}

export default function replayUi({stop, record, replay, save, load, status, clear}: ReplayApi) {
  const stp = button('⏹', 'stop', stop);
  const rec = button('⏺', 'record', record);
  const rep = button('⏵', 'replay', replay);
  const sav = button('↓', 'save', save);
  const lod = button('↑', 'load', load);
  const clr = button('c', 'clear', clear);

  const render = () => {
    const mode = status();
    stp.disabled = mode === ReplayMode.Noop;
    rec.disabled = mode === ReplayMode.Recording;
    rep.disabled = mode === ReplayMode.Replaying;
  };


  const ui = container('div', Styles.Root,
    container('main', Styles.Replay,
      container('section', Styles.Section, stp, rec, rep),
      container('section', Styles.Section, sav, lod),
      container('section', Styles.Section, clr),
    ),
  );
  ui.addEventListener('click', render);
  document.body.appendChild(ui);
  render();
}
