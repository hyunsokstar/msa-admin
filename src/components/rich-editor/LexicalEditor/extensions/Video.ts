// extensions/Video.ts
import { mergeAttributes, Node } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: { src: string }) => ReturnType;
    };
  }
}

const getVideoId = (url: string) => {
  const youtubeRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return { type: 'youtube', id: youtubeMatch[1] };
  }
  return null;
};

const Video = Node.create({
  name: 'video',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-video-player]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src } = HTMLAttributes;
    const videoInfo = getVideoId(src);
    
    let embedHtml = '';
    if (videoInfo?.type === 'youtube') {
      embedHtml = `
        <div class="aspect-w-16 aspect-h-9">
          <iframe 
            src="https://www.youtube.com/embed/${videoInfo.id}"
            class="w-full"
            style="aspect-ratio: 16/9;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `;
    }

    return ['div', mergeAttributes(HTMLAttributes, {
      'data-video-player': '',
    }), embedHtml];
  },

  addCommands() {
    return {
      setVideo: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        });
      },
    };
  },
});

export default Video;