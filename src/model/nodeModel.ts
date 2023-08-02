export class NodeModel {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getNodeName(): string {
        return this.name;
    }
}
