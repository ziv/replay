export interface TagOptions {
  styles?: Partial<CSSStyleDeclaration>;
  attrs?: Record<string, string>;
  childs?: HTMLElement[];
}

export function tag<T = HTMLElement>(name: string, {styles, attrs}: TagOptions = {}): T {
  const el = document.createElement(name);
  if (styles) {
    for (const [k, v] of Object.entries(styles)) {
      // @ts-ignore
      el.style[k] = v;
    }
  }
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }
  }
  return el as T;
}

export function button(label: string, action: () => void, attrs?: Record<string, string>) {
  const el = tag<HTMLButtonElement>('button', {attrs});
  el.textContent = label;
  el.addEventListener('click', action);
  return el;
}
