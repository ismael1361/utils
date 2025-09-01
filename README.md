# @ismael/utils

Uma coleção de funções e classes utilitárias, fortemente tipadas, construídas com TypeScript para acelerar o desenvolvimento de projetos em JavaScript/TypeScript.

## Instalação

```bash
npm install @ismael/utils
# ou
yarn add @ismael/utils
```

---

## API

### Array

#### `chunk<T>(array: T[], size: number): T[][]`

Cria um array de elementos divididos em grupos com o tamanho (`size`) especificado. Se o array não puder ser dividido igualmente, o último grupo conterá os elementos restantes.

**Exemplo:**
```typescript
import { chunk } from '@ismael/utils';

const letters = ['a', 'b', 'c', 'd', 'e'];
const chunks = chunk(letters, 2);

console.log(chunks);
// Saída: [['a', 'b'], ['c', 'd'], ['e']]
```

#### `shuffle<T>(array: T[]): T[]`

Cria uma cópia embaralhada de um array usando o algoritmo Fisher-Yates. A função não modifica o array original.

**Exemplo:**
```typescript
import { shuffle } from '@ismael/utils';

const numbers = [1, 2, 3, 4, 5];
const shuffledNumbers = shuffle(numbers);

console.log(shuffledNumbers);
// Saída possível: [4, 1, 5, 3, 2]

console.log(numbers);
// Saída: [1, 2, 3, 4, 5] (o array original permanece intacto)
```

### Function

#### `debounce<T>(func: T, wait: number): (...args) => void`

Cria uma função "debounced" que atrasa a invocação de `func` até que `wait` milissegundos tenham se passado desde a última vez que a função foi invocada.

**Exemplo:**
```typescript
import { debounce } from '@ismael/utils';

// Evita cálculos custosos enquanto a janela está sendo redimensionada.
const handleResize = () => {
  console.log('Janela redimensionada');
};

const debouncedResize = debounce(handleResize, 200);

window.addEventListener('resize', debouncedResize);
```

#### `throttle<T>(func: T, limit: number): (...args) => void`

Cria uma função "throttled" que invoca `func` no máximo uma vez a cada `limit` milissegundos.

**Exemplo:**
```typescript
import { throttle } from '@ismael/utils';

// Limita o número de vezes que a função de rolagem é chamada.
const handleScroll = () => {
  console.log('Rolagem detectada!');
};

const throttledScroll = throttle(handleScroll, 1000); // Executa no máximo uma vez por segundo

window.addEventListener('scroll', throttledScroll);
```

### Object

#### `deepClone<T>(obj: T): T`

Cria uma cópia profunda (deep clone) de um objeto ou valor, garantindo que objetos e arrays aninhados também sejam clonados.

**Exemplo:**
```typescript
import { deepClone } from '@ismael/utils';

const original = { a: 1, d: { e: [10, 20] } };
const clone = deepClone(original);

// Modificar o clone não afeta o original
clone.d.e[0] = 99;

console.log(original.d.e[0]); // Saída: 10
```

#### `merge<T, U>(target: T, source: U): T & U`

Mescla recursivamente as propriedades de dois objetos em um novo objeto, sem modificar os originais.

**Exemplo:**
```typescript
import { merge } from '@ismael/utils';

const target = { a: 1, b: { c: 2, d: 3 } };
const source = { b: { c: 4, e: 5 }, f: 6 };

const result = merge(target, source);
// result é { a: 1, b: { c: 4, d: 3, e: 5 }, f: 6 }
```

### String

#### `capitalize(str: string): string`

Converte o primeiro caractere de uma string para maiúsculo e o restante para minúsculo.

**Exemplo:**
```typescript
import { capitalize } from '@ismael/utils';

capitalize('olá mundo'); // => 'Olá mundo'
capitalize('JÁ EM MAIÚSCULO'); // => 'Já em maiúsculo'
```

#### `slugify(str: string): string`

Converte uma string em um "slug" amigável para URLs.

**Exemplo:**
```typescript
import { slugify } from '@ismael/utils';

const title = '  Exemplo de Título com Acentuação & Símbolos!  ';
const slug = slugify(title);

console.log(slug);
// => 'exemplo-de-ttulo-com-acentuao-smbolos'
```

### Class

#### `EventEmitter<T>`

Uma classe para gerenciar e emitir eventos personalizados de forma tipada.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

// Define a interface de eventos
interface MyEvents {
  saudacao: [nome: string];
  despedida: [nome: string, motivo: string];
}

const emitter = new EventEmitter<MyEvents>();

// Adiciona um ouvinte
const handler = emitter.on("saudacao", (nome) => {
  console.log(`Olá, ${nome}!`);
});

// Emite o evento
emitter.emit("saudacao", "Mundo"); // Saída: Olá, Mundo!

// Remove o ouvinte
handler.remove();

// Adiciona um ouvinte que só executa uma vez
emitter.once("despedida", (nome, motivo) => {
  console.log(`Adeus, ${nome}! Motivo: ${motivo}`);
});

emitter.emit("despedida", "Mundo", "fim do exemplo");
// Saída: Adeus, Mundo! Motivo: fim do exemplo

emitter.emit("despedida", "Mundo", "não será exibido");
// Nenhuma saída
```