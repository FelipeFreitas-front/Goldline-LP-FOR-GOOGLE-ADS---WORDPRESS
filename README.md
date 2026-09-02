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
    ├── 05-before-after.html
    ├── 06-benefits.html
    ├── 07-gallery.html
    ├── 08-why-goldline.html
    ├── 09-testimonials.html
    ├── 10-final-cta.html
    └── 11-footer.html
```

> **Preview local:** abra o `index.html` (ou rode `python -m http.server` na
> pasta). Ele já monta todas as seções juntas, com o CSS e o JS.

---

## 🚀 Como usar no WordPress + Elementor

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

| Placeholder                | Onde aparece            | Sugestão de tamanho |
|----------------------------|-------------------------|---------------------|
| `REPLACE_logo.png`         | Header + Footer         | ~180×48 (PNG transp.)|
| `REPLACE_hero-garage.jpg`  | Fundo do hero           | 1600×900            |
| `REPLACE_before.jpg`       | Antes/Depois — Before   | 800×600             |
| `REPLACE_after.jpg`        | Antes/Depois — After    | 800×600             |
| `REPLACE_gallery-1.jpg`    | Galeria                 | 600×450             |
| `REPLACE_gallery-2.jpg`    | Galeria                 | 600×450             |
| `REPLACE_gallery-3.jpg`    | Galeria                 | 600×450             |
| `REPLACE_gallery-4.jpg`    | Galeria                 | 600×450             |
| `REPLACE_truck.jpg`        | Seção "Why Goldline"    | 800×600             |

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
- Envio via **AJAX** (sem sair da página) com mensagem de "Thank you!".
- **Fallback**: se o JS não rodar, o form envia normalmente pela `action`.
- **Honeypot** anti-spam (`botcheck`) já incluído.
- Campos enviados: `project_type`, `garage_size`, `name`, `phone`,
  `zip_code`, `email` + `subject`/`from_name`.

Opcional: para redirecionar a uma página de obrigado do WP em vez da mensagem
inline, adicione um campo escondido:
```html
<input type="hidden" name="redirect" value="https://SEUSITE.com/obrigado">
```
(e pode remover o bloco `.glp-form__success` se preferir o redirect.)

---

## 📞 Dados de contato usados (confira!)

Peguei da referência — **valide com o cliente** e troque num lugar só se mudar:

- **Telefone:** (774) 526-1670  → nos links `tel:+17745261670`
- **E-mail:** info@goldlinehome.com  → no link `mailto:`
- **Local:** Cape Cod, MA

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
- [ ] Colar a Access Key do Web3Forms
- [ ] Substituir todas as imagens `REPLACE_...`
- [ ] Confirmar telefone e e-mail com o cliente
- [ ] Apontar Privacy Policy / Terms of Service (links `#` no footer)
- [ ] Preencher os links de Facebook/Instagram no footer
- [ ] Testar o envio do formulário (chega o e-mail?)
