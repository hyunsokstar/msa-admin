// ./extensions/MoveBlock.ts
import { Node, mergeAttributes } from "@tiptap/core";

const MoveBlock = Node.create({
  name: "moveBlock",
  
  addCommands() {
    return {
      moveBlockUp:
        () =>
        ({ chain }) => {
          return chain()
            .command(({ tr, state }) => {
              const { selection } = state;
              const { $from } = selection;
              const currentBlock = $from.node($from.depth);
              const currentBlockPos = $from.start($from.depth);

              const prevBlockPos = tr.doc.resolve(currentBlockPos - 1).start($from.depth);

              if (prevBlockPos >= 0) {
                tr.insert(prevBlockPos, currentBlock.copy());
                tr.delete(currentBlockPos, currentBlockPos + currentBlock.nodeSize);
              }

              return true;
            })
            .focus()
            .run();
        },
      moveBlockDown:
        () =>
        ({ chain }) => {
          return chain()
            .command(({ tr, state }) => {
              const { selection } = state;
              const { $from } = selection;
              const currentBlock = $from.node($from.depth);
              const currentBlockPos = $from.start($from.depth);

              const nextBlockPos = tr.doc.resolve(currentBlockPos + currentBlock.nodeSize).start($from.depth);

              if (nextBlockPos < tr.doc.content.size) {
                tr.insert(nextBlockPos + currentBlock.nodeSize, currentBlock.copy());
                tr.delete(currentBlockPos, currentBlockPos + currentBlock.nodeSize);
              }

              return true;
            })
            .focus()
            .run();
        },
    };
  },
});

export default MoveBlock;
