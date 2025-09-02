import { EventEmitter } from "../EventEmitter";

/**
 * Uma classe que encapsula um valor, permitindo que ele seja "observável" e reativo.
 * Emite eventos quando seu valor é alterado, sendo a base para a reatividade nas animações.
 *
 * @template T O tipo do valor encapsulado.
 * @extends {EventEmitter<{ change: [T]; value: [T]; }>}
 *
 * @example
 * ```ts
 * const opacity = new SharedValue(0);
 *
 * opacity.on('change', (newValue) => {
 *   console.log(`A opacidade mudou para: ${newValue}`);
 * });
 *
 * // Define um novo valor, o que dispara o evento 'change'
 * opacity.value = 0.5; // Logs: "A opacidade mudou para: 0.5"
 *
 * // Acessa o valor atual
 * console.log(opacity.value); // Logs: 0.5
 *
 * // Reseta para o valor inicial
 * opacity.clear(); // Logs: "A opacidade mudou para: 0"
 * console.log(opacity.value); // Logs: 0
 * ```
 */
export class SharedValue<T = unknown> extends EventEmitter<{
    change: [T];
    value: [T];
}> {
    private _initialValue: T;
    private _value: T;
    /**
     * @param {T} value O valor inicial a ser encapsulado.
     */
    constructor(value: T) {
        super();
        this._initialValue = value;
        this._value = value;
    }

    /**
     * Obtém o valor atual.
     * @returns {T} O valor atual.
     */
    get value(): T {
        return this._value;
    }

    /**
     * Define um novo valor. Se o novo valor for diferente do atual,
     * emite os eventos 'value' e 'change'.
     * @param {T} value O novo valor.
     */
    set value(value: T) {
        if (String(value) === String(this._value)) return;
        this._value = value;
        this.emit("value", value);
        this.emit("change", value);
    }

    /**
     * Reseta o valor para o seu estado inicial.
     */
    clear() {
        this.value = this._initialValue;
    }
}

/**
 * Gerencia um grupo de instâncias de `SharedValue` como um único objeto de estado.
 *
 * Esta classe é um contêiner que pega um objeto de estado inicial e cria um `SharedValue`
 * para cada uma de suas propriedades. Ela observa mudanças em qualquer um dos valores
 * internos e emite eventos agregados, tornando mais fácil reagir a mudanças no estado
 * geral da animação.
 *
 * @template S O tipo (shape) do objeto de estado.
 * @extends {EventEmitter<{
 *   change: [S];
 *   value: [keyof S, S[keyof S]];
 *   destroy: [];
 * }>}
 *
 * @example
 * ```ts
 * const stateManager = new SharedValues({ x: 0, y: 100, opacity: 1 });
 *
 * // Ouve por mudanças em qualquer propriedade.
 * // O evento é otimizado com requestAnimationFrame.
 * stateManager.on('change', (newState) => {
 *   console.log('O estado completo mudou:', newState);
 *   // Exemplo de saída: { x: 50, y: 100, opacity: 1 }
 * });
 *
 * // Ouve por mudanças em uma propriedade específica.
 * stateManager.on('value', (key, value) => {
 *    console.log(`A propriedade '${key}' mudou para ${value}`);
 *    // Exemplo de saída: "A propriedade 'x' mudou para 50"
 * });
 *
 * // Modifica um valor individual, o que dispara os eventos.
 * stateManager.current.x.value = 50;
 *
 * // Obtém um snapshot dos valores atuais.
 * console.log(stateManager.values); // { x: 50, y: 100, opacity: 1 }
 *
 * // Reseta todos os valores para o estado inicial.
 * stateManager.clear();
 * console.log(stateManager.values); // { x: 0, y: 100, opacity: 1 }
 * ```
 */
export class SharedValues<S> extends EventEmitter<{
    change: [S];
    value: [key: keyof S, value: S[keyof S]];
    destroy: [];
}> {
    /** Um objeto contendo as instâncias individuais de `SharedValue` para cada propriedade do estado. */
    readonly current: {
        [K in keyof S]: SharedValue<S[K]>;
    };

    constructor(values: S) {
        super();
        this.current = {} as any;

        for (const key in values) {
            this.current[key] = new SharedValue(values[key]);
        }

        this.ready(() => {
            const events: Function[] = [];

            for (const key in values) {
                events.push(
                    this.current[key].on("value", () => {
                        this.emit("value", key, this.current[key].value);
                        this.emit("change", this.values);
                    }).stop
                );
            }

            this.once("destroy", () => {
                for (const stop of events) {
                    stop();
                }
                this.prepare(false);
            });
        });

        this.initialize();
    }

    /**
     * Retorna um snapshot do estado atual como um objeto JavaScript simples.
     * @returns {S} O objeto de estado atual.
     */
    get values(): S {
        const value: any = {};
        for (const key in this.current) {
            value[key] = this.current[key].value;
        }
        return value;
    }

    /**
     * (Uso interno) Prepara os listeners de eventos.
     */
    initialize() {
        this.prepare(true);
    }

    /**
     * Remove todos os listeners de eventos internos para prevenir vazamentos de memória.
     */
    destroy() {
        this.emit("destroy");
    }

    /** Reseta todos os `SharedValue`s internos para seus valores iniciais. */
    clear() {
        for (const key in this.current) {
            this.current[key].clear();
        }
    }
}

/**
 * Função de fábrica para criar e retornar uma nova instância de `SharedValues`.
 *
 * É um atalho conveniente para `new SharedValues(state)`.
 *
 * @template S O tipo (shape) do objeto de estado.
 * @param {S} state O objeto de estado inicial.
 * @returns {SharedValues<S>} Uma nova instância de `SharedValues`.
 *
 * @example
 * ```ts
 * const initialState = {
 *   x: 0,
 *   y: 0,
 * };
 *
 * const position = sharedValues(initialState);
 *
 * position.on('change', (newPosition) => {
 *   console.log('Nova posição:', newPosition);
 *   // => Nova posição: { x: 10, y: 0 }
 * });
 *
 * // Modifica um valor individual
 * position.current.x.value = 10;
 * ```
 */
export const sharedValues = <S>(state: S) => {
    return new SharedValues<S>(state);
};
