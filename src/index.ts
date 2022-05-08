import crypto from "crypto";

interface BlockShape {
    hash: string;
    prevHash: string;
    height: number;
    data: string;
}

class Block implements BlockShape {

    public hash: string;

    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }

    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }

}

class BlockChain {

    private blocks: Block[];

    constructor() {
        this.blocks = [];
    }

    private getPrevHash() {
        if(this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length - 1].hash;
    }

    public addBlock(data: string) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length+1, data);
        this.blocks.push(newBlock);
    }

    public getBlocks() {
        // 복제된 새로운 배열 리턴
        return [...this.blocks];
    }
}

const blockChain = new BlockChain;
blockChain.addBlock("박보성");
blockChain.addBlock("김형준");
//복제된 새로운 배열에 푸쉬되서 영향을 미치지 않습니다.
blockChain.getBlocks().push(new Block("xxxx", 1111, "hack!!"));
blockChain.addBlock("이상규");
blockChain.addBlock("박승진");

console.log(blockChain.getBlocks());
