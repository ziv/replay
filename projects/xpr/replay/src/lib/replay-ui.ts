import { ReplayAction, ReplayApi } from './replay-api.provider';
import { ReplayMode } from './replay.interceptor';

type CSS = Partial<CSSStyleDeclaration>;

const rootStyle: CSS = {
  position: 'absolute',
  top: '0',
  right: '0'
};

const widgetStyle: CSS = {
  position: 'absolute',
  display: 'flex',
  background: 'red',
  border: '1px solid green',
  top: '0',
  right: '0'
};

const sectionStyle: CSS = {
  padding: '2px',
  background: 'yellow',
  display: 'flex',
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

export default function replayUi({stop, record, replay, save, load, status}: ReplayApi) {
  const stp = button('⏹', 'stop', stop);
  const rec = button('⏺', 'record', record);
  const rep = button('⏵', 'replay', replay);
  const sav = button('↓', 'save', save);
  const lod = button('↑', 'load', load);

  const render = () => {
    const mode = status();
    stp.disabled = mode === ReplayMode.Noop;
    rec.disabled = mode === ReplayMode.Recording;
    rep.disabled = mode === ReplayMode.Replaying;
  };

  const ui = container('div', rootStyle,
    container('main', widgetStyle,
      container('section', sectionStyle, stp, rec, rep),
      container('section', sectionStyle, sav, lod),
    ),
  );
  ui.addEventListener('click', render);
  document.body.appendChild(ui);
  render();
}
