# LP Goldline — Garage Floor Coating (Cape Cod, MA)

Landing page replicada em HTML/CSS/JS puro, pronta para colar num site
**WordPress + Elementor**. Todas as classes usam o prefixo **`glp-`** e o CSS
está escopado dentro de `.glp-lp`, então **não conflita** com o tema nem com
os estilos do Elementor.

---

## 📁 Estrutura dos arquivos

```
Goldline Painting/
├── index.html                  ← página completa (preview local / referência)
├── css/
│   └── glp-styles.css          ← CSS GLOBAL (único arquivo de estilo)
├── js/
│   └── glp-scripts.js          ← JS mínimo (envio do form + scroll suave)
└── sections/                   ← HTML fracionado, 1 arquivo por seção
    ├── 01-topbar-header.html
    ├── 02-hero.html            ← contém o FORMULÁRIO (Web3Forms)
    ├── 03-trust-strip.html
    ├── 04-pricing.html
    ├── 06-benefits.html            (05 Before/After foi removida — sem foto de "antes")
    ├── 07-gallery.html
    ├── 08-why-goldline.html
    ├── 09-testimonials.html
    ├── 10-final-cta.html
    └── 11-footer.html
```

> **Preview local:** abra o `index.html` (ou rode `python -m http.server` na
> pasta). Ele já monta todas as seções juntas, com o CSS e o JS.

---

## ⚡ Jeito mais rápido: arquivo único (`goldline-lp-elementor.html`)

Já existe um arquivo **`goldline-lp-elementor.html`** com **tudo embutido**
(fonte + CSS em `<style>` + markup + JS em `<script>`). É só:
1. No Elementor, adicionar **um widget HTML** (de preferência numa página
   com template **Elementor Full Width / Canvas**).
2. Abrir o `goldline-lp-elementor.html`, copiar **todo o conteúdo** e colar
   no widget.
3. Pronto — não precisa carregar CSS/JS separado.

> Falta só configurar `/thanks/` no WordPress e os links de Privacy/Terms.
> Para editar depois, mexa nos arquivos-fonte (`css/`, `sections/`) e gere o
> arquivo único de novo, **ou** edite direto o `goldline-lp-elementor.html`.

Se preferir manter CSS/JS separados (mais fácil de manter a longo prazo), use
uma das opções abaixo.

## 🚀 Como usar no WordPress + Elementor (CSS/JS separados)

Você tem duas opções. **A opção B é a recomendada** (mais fácil de manter).

### Pré-requisito comum: carregar o CSS e o JS uma única vez
1. Suba `css/glp-styles.css` e `js/glp-scripts.js` para o servidor
   (via FTP, ou pela Biblioteca de Mídia usando um plugin como *WP File Manager*),
   **ou** cole o conteúdo deles em:
   - **CSS** → Elementor: `Configurações da Página → CSS Personalizado`
     (ou tema: `Aparência → Personalizar → CSS Adicional`).
   - **JS** → um plugin tipo *WPCode / Insert Headers and Footers*, no rodapé.

### Opção A — Fracionado (1 widget HTML por seção)
- Para cada arquivo em `/sections`, arraste um widget **HTML** no Elementor e
  **cole o conteúdo** do arquivo.
- Ordem: 01 → 11.
- O CSS global (carregado acima) estiliza todas as seções.
- Vantagem: você edita/reordena seção por seção dentro do Elementor.

### Opção B — Página inteira num container (recomendada)
- Crie a página, adicione **um único widget HTML**, e cole tudo que está
  **dentro de `<div class="glp-lp"> ... </div>`** do `index.html`
  (ou o `index.html` inteiro, se usar um template de página em branco / *Canvas*).
- O CSS e o JV ficam nos campos globais (pré-requisito acima).

> ⚠️ **Importante:** o wrapper `<div class="glp-lp">` precisa envolver as seções —
> é ele que escopa o CSS. Se colar seções soltas (Opção A), tudo bem: cada classe
> já tem o prefixo `glp-`, mas mantenha o CSS global carregado no site todo.

---

## 🖼️ Imagens — substituir os placeholders

Faça upload das imagens na **Biblioteca de Mídia** do WordPress e troque cada
`src="REPLACE_..."` pela URL gerada. Lista do que precisa:

> **Logo:** já está usando a oficial do site
> (`.../uploads/2025/05/logo-black-gold.webp`). Como a arte é preta+dourada,
> ela fica num "chip" branco (`.glp-logo__img`) para ficar legível sobre o
> header/footer escuros. Se tiver uma versão **branca** da logo, troque o
> `src` e remova o `background`/`padding` do `.glp-logo__img` no CSS.

**Todas as imagens já estão aplicadas** com URLs reais do site
(goldlinehomeservices.com) — não há mais placeholders:
- **Hero** → `2026/08/Residential_garage_interior_phot…_202608121717.jpeg`
- **Galeria 1–4** → `2026/04/port-goldline-epoxy-01..04.webp`
- **Why Goldline (caminhão)** → `2026/09/ChatGPT-Image-Sep-2-2026-05_55_10-PM-7.png`

> Obs.: os nomes dos JPEGs contêm um caractere "…" (reticências, U+2026) de
> verdade — no HTML ele vai codificado como `%E2%80%A6`.

A seção **Before/After foi removida** (não havia foto de "antes"); as
transformações ficam na galeria.

**Dica de performance:** exporte em **WebP** quando possível e mantenha os
atributos `width`/`height` e `loading="lazy"` que já estão no código (evitam
"pulos" de layout e melhoram o Core Web Vitals).

---

## 📨 Formulário — configurar o Web3Forms

No arquivo do hero (`sections/02-hero.html`) e no `index.html`, troque:

```html
<input type="hidden" name="access_key" value="COLE_SUA_ACCESS_KEY_AQUI">
```

pela sua **Access Key** do Web3Forms (https://web3forms.com).

O que já vem pronto:
- **ID do formulário:** `form01`.
- Envio via **AJAX** (sem sair da página) e, no sucesso, **redireciona para**
  `https://goldlinehomeservices.com/thanks/`.
- **Fallback sem JS:** o form envia pela `action` e o campo escondido
  `redirect` leva para a mesma página de obrigado.
- **Honeypot** anti-spam (`botcheck`) já incluído.
- Campos enviados: `project_type`, `garage_size`, `name`, `phone`,
  `zip_code`, `email` + `subject`/`from_name`.

Para trocar a página de obrigado, altere o `THANKS_URL` em `js/glp-scripts.js`
**e** o `value` do `<input name="redirect">` no HTML.

---

## 📞 Dados de contato usados (confira!)

Confirmados no site oficial (goldlinehomeservices.com):

- **Telefone:** (774) 526-1670  → nos links `tel:+17745261670`
- **E-mail:** contact@goldlinehomeservices.com  → no link `mailto:`
- **Local:** Cape Cod, MA (sede em Centerville, MA)
- **Facebook:** https://www.facebook.com/goldlinepaintingma/
- **Instagram:** https://www.instagram.com/goldlinehomeservices/

Para trocar o telefone, busque por `7745261670` e `(774) 526-1670`.

---

## 🎨 Ajustes rápidos (cores, espaçamento)

Tudo fica no topo do `glp-styles.css`, no bloco `:root`:

```css
--glp-gold:  #f6b913;   /* dourado da marca */
--glp-green: #2ead46;   /* verde dos botões de CTA */
--glp-dark:  #0e0e0e;   /* preto das seções escuras */
--glp-container: 1180px;/* largura máxima do conteúdo */
```

Mudou lá → reflete na LP inteira.

---

## ✅ Checklist antes de publicar
- [x] Access Key do Web3Forms aplicada
- [x] Todas as imagens aplicadas (hero, galeria e caminhão)
- [x] Logo oficial já aplicada (header + footer)
- [x] Telefone, e-mail e redes sociais confirmados no site oficial
- [ ] Apontar Privacy Policy / Terms of Service (links `#` no footer)
- [ ] Testar o envio do formulário (chega o e-mail?)
