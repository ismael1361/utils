# @ismael/utils

Uma coleção de funções e classes utilitárias, fortemente tipadas, construídas com TypeScript para acelerar o desenvolvimento de projetos em JavaScript/TypeScript.

## Instalação

```bash
npm install @ismael/utils
# ou
yarn add @ismael/utils
```

---

## Indice

- [@ismael/utils](#ismaelutils)
  - [Instalação](#instalação)
  - [Indice](#indice)
  - [Array](#array)
    - [`chunk<T>(array: T[], size: number): T[][]`](#chunktarray-t-size-number-t)
    - [`shuffle<T>(array: T[]): T[]`](#shuffletarray-t-t)
  - [Function](#function)
    - [`debounce<T>(func: T, wait: number): (...args) => void`](#debouncetfunc-t-wait-number-args--void)
    - [`throttle<T>(func: T, limit: number): (...args) => void`](#throttletfunc-t-limit-number-args--void)
  - [Object](#object)
    - [`deepClone<T>(obj: T): T`](#deepclonetobj-t-t)
    - [`merge<T, U>(target: T, source: U): T & U`](#merget-utarget-t-source-u-t--u)
  - [String](#string)
    - [`capitalize(str: string): string`](#capitalizestr-string-string)
    - [`slugify(str: string): string`](#slugifystr-string-string)
  - [`EventEmitter<T>`](#eventemittert)
    - [Propriedades da Instância](#propriedades-da-instância)
      - [`.prepared: boolean`](#prepared-boolean)
    - [Métodos da Instância](#métodos-da-instância)
      - [`.prepare(value?: boolean): void`](#preparevalue-boolean-void)
      - [`.ready<R = never>(callback?: () => R | Promise<R>): Promise<R>`](#readyr--nevercallback---r--promiser-promiser)
      - [`.clearEvents(): void`](#clearevents-void)
      - [`.on<K>(event: K, callback: SubscriptionCallback<T[K]>): EventHandler`](#onkevent-k-callback-subscriptioncallbacktk-eventhandler)
      - [`.once<K, R>(event: K, callback?: (...args: T[K]) => R): Promise<R | undefined>`](#oncek-revent-k-callback-args-tk--r-promiser--undefined)
      - [`.emit<K>(event: K, ...args: T[K]): EventEmitter<T>`](#emitkevent-k-args-tk-eventemittert)
      - [`.emitOnce<K>(event: K, ...args: T[K]): EventEmitter<T>`](#emitoncekevent-k-args-tk-eventemittert)
      - [`.off<K>(event: K, callback?: SubscriptionCallback<T[K]>): void`](#offkevent-k-callback-subscriptioncallbacktk-void)
      - [`.offOnce<K>(event: K, callback?: (...args: T[K]) => any): void`](#offoncekevent-k-callback-args-tk--any-void)
      - [`.pipe<K>(event: K, eventEmitter: EventEmitter<T>): EventHandler`](#pipekevent-k-eventemitter-eventemittert-eventhandler)
      - [`.pipeOnce<K>(event: K, eventEmitter: EventEmitter<T>): EventHandler`](#pipeoncekevent-k-eventemitter-eventemittert-eventhandler)
  - [Color](#color)
    - [`class Color(value: ColorValue)`](#class-colorvalue-colorvalue)
    - [Propriedades da Instância](#propriedades-da-instância-1)
      - [`.rgba: RGBA`](#rgba-rgba)
      - [`.rgb: RGB`](#rgb-rgb)
      - [`.hex: HEX`](#hex-hex)
      - [`.hsl: HSL`](#hsl-hsl)
      - [`.alpha: number`](#alpha-number)
      - [`.luminance: number`](#luminance-number)
      - [`.negative: Color`](#negative-color)
      - [`.grayScale: Color`](#grayscale-color)
    - [Métodos da Instância](#métodos-da-instância-1)
      - [`.blend(color: ColorValue, ratio: number): Color`](#blendcolor-colorvalue-ratio-number-color)
      - [`.lighten(ratio: number): Color`](#lightenratio-number-color)
      - [`.darken(ratio: number): Color`](#darkenratio-number-color)
    - [Métodos Estáticos](#métodos-estáticos)
      - [`Color.random(): Color`](#colorrandom-color)
      - [`Color.textToColor(text: string): Color`](#colortexttocolortext-string-color)

## Array

### `chunk<T>(array: T[], size: number): T[][]`

Cria um array de elementos divididos em grupos com o tamanho (`size`) especificado. Se o array não puder ser dividido igualmente, o último grupo conterá os elementos restantes.

**Exemplo:**
```typescript
import { chunk } from '@ismael/utils';

const letters = ['a', 'b', 'c', 'd', 'e'];
const chunks = chunk(letters, 2);

console.log(chunks);
// Saída: [['a', 'b'], ['c', 'd'], ['e']]
```

### `shuffle<T>(array: T[]): T[]`

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

## Function

### `debounce<T>(func: T, wait: number): (...args) => void`

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

### `throttle<T>(func: T, limit: number): (...args) => void`

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

## Object

### `deepClone<T>(obj: T): T`

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

### `merge<T, U>(target: T, source: U): T & U`

Mescla recursivamente as propriedades de dois objetos em um novo objeto, sem modificar os originais.

**Exemplo:**
```typescript
import { merge } from '@ismael/utils';

const target = { a: 1, b: { c: 2, d: 3 } };
const source = { b: { c: 4, e: 5 }, f: 6 };

const result = merge(target, source);
// result é { a: 1, b: { c: 4, d: 3, e: 5 }, f: 6 }
```

## String

### `capitalize(str: string): string`

Converte o primeiro caractere de uma string para maiúsculo e o restante para minúsculo.

**Exemplo:**
```typescript
import { capitalize } from '@ismael/utils';

capitalize('olá mundo'); // => 'Olá mundo'
capitalize('JÁ EM MAIÚSCULO'); // => 'Já em maiúsculo'
```

### `slugify(str: string): string`

Converte uma string em um "slug" amigável para URLs.

**Exemplo:**
```typescript
import { slugify } from '@ismael/utils';

const title = '  Exemplo de Título com Acentuação & Símbolos!  ';
const slug = slugify(title);

console.log(slug);
// => 'exemplo-de-ttulo-com-acentuao-smbolos'
```

## `EventEmitter<T>`

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

---

### Propriedades da Instância

#### `.prepared: boolean`

Indica se a instância foi preparada.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter();

console.log(emitter.prepared); // false

emitter.prepare();

console.log(emitter.prepared); // true
```

---

### Métodos da Instância

#### `.prepare(value?: boolean): void`

Prepara a instância para receber ou emitir eventos.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter();

emitter.ready(() => {
  console.log("O emissor está pronto!");
});

emitter.prepare();
// Saída: O emissor está pronto!
```

#### `.ready<R = never>(callback?: () => R | Promise<R>): Promise<R>`

Registra uma função para ser executada quando a instância estiver pronta.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter();

emitter.ready(() => {
    console.log("O emissor está pronto!");
});

emitter.prepared = true;
// Saída: O emissor está pronto!
```

#### `.clearEvents(): void`

Limpa todos os eventos armazenados na instância.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter();
emitter.clearEvents();
// Todos os eventos foram removidos.
```

#### `.on<K>(event: K, callback: SubscriptionCallback<T[K]>): EventHandler`

Adiciona um ouvinte para um evento.

**Exemplo:**

```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter<{
  saudacao: [nome: string];
  despedida: [nome: string];
}>();

emitter.on("saudacao", (nome) => {
  console.log(`Olá, ${nome}!`);
});

emitter.emit("saudacao", "Alice");
// Saída: Olá, Alice!
```

#### `.once<K, R>(event: K, callback?: (...args: T[K]) => R): Promise<R | undefined>`

Adiciona um ouvinte que executa uma vez para um evento.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter<{
  greet: [name: string];
  farewell: [name: string];
}>();

emitter.once("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit("greet", "Alice");
// Saída: Hello, Alice!

emitter.emit("greet", "Bob");
// Nenhuma saída
```

#### `.emit<K>(event: K, ...args: T[K]): EventEmitter<T>`

Emite um evento.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter<{
  saudacao: [nome: string];
}>();

emitter.on("saudacao", (nome) => {
  console.log(`Olá, ${nome}!`);
});

emitter.emit("saudacao", "Alice");
// Saída: Olá, Alice!
```

#### `.emitOnce<K>(event: K, ...args: T[K]): EventEmitter<T>`

Emite um evento uma vez.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter<{
  configuracao: [config: object];
}>();

emitter.emitOnce("configuracao", { tema: "dark" });

// Este ouvinte será chamado imediatamente porque 'configuracao' já foi emitido.
emitter.on("configuracao", (config) => {
  console.log(`Configuração recebida:`, config);
});
// Saída: Configuração recebida: { tema: 'dark' }
```

#### `.off<K>(event: K, callback?: SubscriptionCallback<T[K]>): void`

Remove um ouvinte de um evento.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter<{
  saudacao: [nome: string];
}>();

const ouvinte = (nome) => {
  console.log(`Olá, ${nome}!`);
}

emitter.on("saudacao", ouvinte);
emitter.off("saudacao", ouvinte);

emitter.emit("saudacao", "Alice");
// Nenhuma saída
```

#### `.offOnce<K>(event: K, callback?: (...args: T[K]) => any): void`

Remove um ouvinte que executou uma vez de um evento.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter<{
  greet: [name: string];
  farewell: [name: string];
}>();

const ouvinte = (nome) => {
  console.log(`Olá, ${nome}!`);
}

emitter.once("greet", ouvinte);
emitter.offOnce("greet", ouvinte);

emitter.emit("greet", "Alice");
// Nenhuma saída
```

#### `.pipe<K>(event: K, eventEmitter: EventEmitter<T>): EventHandler`

Redireciona eventos de um emissor para outro.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter<{
  mensagem: [texto: string];
}>();

const anotherEmitter = new EventEmitter<{
  mensagem: [texto: string];
}>();

emitter.pipe("mensagem", anotherEmitter);

anotherEmitter.on("mensagem", (texto) => {
  console.log(`Outro emissor recebeu: ${texto}`);
});

emitter.emit("mensagem", "Olá mundo!");
// Saída: Outro emissor recebeu: Olá mundo!
```

#### `.pipeOnce<K>(event: K, eventEmitter: EventEmitter<T>): EventHandler`

Redireciona eventos de um emissor para outro uma vez.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael/utils';

const emitter = new EventEmitter<{
  login: [usuario: string];
}>();

const anotherEmitter = new EventEmitter<{
  login: [usuario: string];
}>();

emitter.pipeOnce("login", anotherEmitter);

anotherEmitter.on("login", (usuario) => {
  console.log(`${usuario} logado no outro emissor.`);
});

emitter.emit("login", "Alice");
// Saída: Alice logado no outro emissor.

emitter.emit("login", "Bob");
// Nenhuma saída
```

## Color

### `class Color(value: ColorValue)`

Uma classe robusta para manipulação e conversão de cores. Permite criar, modificar e converter cores entre diferentes formatos como HEX, RGB, e HSL.

**Exemplo de Criação:**
```typescript

import { Color } from '@ismael/utils';

// Criando cores de diferentes formas
const red = new Color('#ff0000');
const blue = Color.fromRgb(0, 0, 255);
const randomColor = Color.random();

// Convertendo e acessando valores
console.log(red.rgb.value); // "rgb(255, 0, 0)"
console.log(blue.hsl.value); // "hsl(240, 100%, 50%)"

// Manipulando cores
const pink = red.lighten(0.5);
console.log(pink.hex.value); // "#ff8080"

const darkBlue = blue.darken(0.25);
console.log(darkBlue.hex.value); // "#0000bf"

// Misturando cores
const purple = red.blend(blue, 0.5);
console.log(purple.hex.value); // "#800080"

// Gerando cor a partir de texto
const userColor = Color.textToColor('Ismael');
console.log(userColor.hex.value); // "#00ff44" (sempre o mesmo para o mesmo texto)
```

---

### Propriedades da Instância

#### `.rgba: RGBA`
Obtém a representação da cor como um objeto `RGBA` (vermelho, verde, azul, alfa).

**Exemplo:**
```typescript
const color = new Color('tomato');
console.log(color.rgba.value); // "rgba(255, 99, 71, 1)"
console.log(color.rgba.r);     // 255
```

#### `.rgb: RGB`
Obtém a representação da cor como um objeto `RGB`, descartando a transparência.

**Exemplo:**
```typescript
const color = new Color('rgba(0, 0, 255, 0.5)');
console.log(color.rgb.value); // "rgb(0, 0, 255)"
```

#### `.hex: HEX`
Obtém a representação da cor como um objeto `HEX`.

**Exemplo:**
```typescript
const color = new Color('rgb(0, 255, 0)');
console.log(color.hex.value); // "#00ff00"
```

#### `.hsl: HSL`
Obtém a representação da cor como um objeto `HSL` (matiz, saturação, luminosidade).

**Exemplo:**
```typescript
const color = new Color('blue');
console.log(color.hsl.value); // "hsl(240, 100%, 50%)"
console.log(color.hsl.h);     // 240
```

#### `.alpha: number`
Obtém ou define o valor do canal alfa (transparência) da cor, variando de 0 (transparente) a 1 (opaco).

**Exemplo:**
```typescript
const color = new Color('red');
console.log(color.alpha); // 1

color.alpha = 0.5;
console.log(color.rgba.value); // "rgba(255, 0, 0, 0.5)"
```

#### `.luminance: number`
Calcula o brilho percebido (luminância) da cor, de 0 (preto) a 255 (branco).

**Exemplo:**
```typescript
console.log(new Color('white').luminance); // 255
console.log(new Color('black').luminance); // 0
console.log(new Color('red').luminance);   // 54
```

#### `.negative: Color`
Obtém a cor negativa (inversa).

**Exemplo:**
```typescript
const color = new Color('rgb(50, 100, 150)');
console.log(color.negative.rgb.value); // "rgb(205, 155, 105)"
```

#### `.grayScale: Color`
Converte a cor para sua equivalente em escala de cinza.

**Exemplo:**
```typescript
const color = new Color('#ff8800'); // Laranja
console.log(color.grayScale.hex.value); // "#828282"
```

---

### Métodos da Instância

#### `.blend(color: ColorValue, ratio: number): Color`
Mistura a cor atual com outra cor em uma determinada proporção.

**Exemplo:**
```typescript
const red = new Color('red');
const blue = new Color('blue');
const purple = red.blend(blue, 0.5);
console.log(purple.hex.value); // "#800080"
```

#### `.lighten(ratio: number): Color`
Clareia a cor misturando-a com branco.

**Exemplo:**
```typescript
const red = new Color('red');
const pink = red.lighten(0.5);
console.log(pink.hex.value); // "#ff8080"
```

#### `.darken(ratio: number): Color`
Escurece a cor misturando-a com preto.

**Exemplo:**
```typescript
const blue = new Color('blue');
const darkBlue = blue.darken(0.5);
console.log(darkBlue.hex.value); // "#000080"
```

---

### Métodos Estáticos

#### `Color.random(): Color`
Gera uma cor aleatória.

**Exemplo:**
```typescript
const randomColor = Color.random();
console.log(randomColor.hex.value); // ex: "#A4F2B9"
```

#### `Color.textToColor(text: string): Color`
Gera uma cor determinística a partir de uma string de texto.

**Exemplo:**
```typescript
const userColor = Color.textToColor('Ismael');
// Sempre retornará a mesma cor para o mesmo texto
console.log(userColor.hex.value); // "#00ff44"
```
