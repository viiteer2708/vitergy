import { Marked } from "marked";

/*
 * Pieza compartida: Markdown → HTML para contenido escrito en el propio repo (el blog y lo
 * que venga después). Es contenido de confianza, así que no se sanea: NUNCA usarlo con texto
 * que llegue de usuarios. Los estilos de lectura son la clase `.prosa` de globals.css.
 * Doc: docs/blog.md
 */

const escaparAtributo = (valor: string) =>
  valor.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const marked = new Marked({
  gfm: true,
  renderer: {
    // Los enlaces a otras webs se abren en pestaña nueva para que el lector no pierda la
    // nuestra; los internos (relativos o a vitergy.es) se quedan en la misma pestaña.
    link({ href, title, tokens }) {
      const texto = this.parser.parseInline(tokens);
      const externo =
        /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?vitergy\.es/i.test(href);
      const titulo = title ? ` title="${escaparAtributo(title)}"` : "";
      const destino = externo ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escaparAtributo(href)}"${titulo}${destino}>${texto}</a>`;
    },
  },
});

export function renderMarkdown(texto: string): string {
  return marked.parse(texto, { async: false }) as string;
}
