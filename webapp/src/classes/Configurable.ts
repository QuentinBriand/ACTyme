export class Configurable<C = Record<string, unknown>> {
    private _config: C | undefined;
    private _resolvedConfig: C | undefined;

    public setConfig(config: C): this {
        this._config = config;
        this._resolvedConfig = undefined;
        return this;
    }

    public getConfig(): C {
        if (this._resolvedConfig === undefined) {
            if (this._config === undefined) {
                throw new Error("call setConfig before");
            }
            const defaultConfig = this.getDefaultConfig();
            this._resolvedConfig =
                defaultConfig !== undefined ? { ...defaultConfig, ...this._config } : this._config;
        }
        return this._resolvedConfig;
    }

    /* Implementation. */

    protected getDefaultConfig(): Partial<C> | undefined {
        return undefined;
    }
}
