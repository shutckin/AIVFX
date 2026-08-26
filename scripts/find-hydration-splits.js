// Точный поиск разрывов текста в JSX через парсер Babel.
// Ищем элементы, у которых среди детей есть непустой JSXText рядом с
// выражением {..}: React отрендерит их двумя текстовыми узлами, а снимок
// предзарендеренной страницы склеит в один → гидратация не сходится.
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const fs = require('fs');
const path = require('path');

const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.js') && !/blog-posts|_en_part|all-projects/.test(p)) out.push(p);
  }
  return out;
};

const hits = [];
for (const file of walk('src')) {
  const code = fs.readFileSync(file, 'utf8');
  let ast;
  try {
    ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
  } catch (e) { continue; }

  traverse(ast, {
    JSXElement(p) {
      const kids = p.node.children.filter((c) =>
        !(c.type === 'JSXText' && !c.value.trim()) &&
        !(c.type === 'JSXExpressionContainer' && c.expression.type === 'JSXEmptyExpression'));

      for (let i = 0; i < kids.length - 1; i++) {
        const a = kids[i], b = kids[i + 1];
        const isText = (n) => n.type === 'JSXText' && n.value.trim();
        const isExpr = (n) => n.type === 'JSXExpressionContainer';
        if ((isText(a) && isExpr(b)) || (isExpr(a) && isText(b))) {
          const name = p.node.openingElement.name.name || '?';
          hits.push(`${file}:${a.loc.start.line}  <${name}> — ${code.split('\n')[a.loc.start.line - 1].trim().slice(0, 90)}`);
          break;
        }
      }
    },
  });
}
if (hits.length) {
  console.error('\nНайдены разрывы текста в JSX — гидратация предзарендеренной страницы сломается:\n');
  hits.forEach((h) => console.error('  ' + h));
  console.error(`\nВсего мест: ${hits.length}`);
  console.error('Как чинить: собрать текст и выражение в ОДНО выражение,');
  console.error('например {`${имя} `}<span>…</span> вместо {имя} <span>…</span>\n');
  process.exit(1);
}
console.log('Разрывов текста в JSX нет — гидратация не сломается');
