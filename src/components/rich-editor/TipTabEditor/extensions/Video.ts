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
  // YouTube
  const youtubeRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return { type: 'youtube', id: youtubeMatch[1] };
  }

  // Vimeo
  const vimeoRegex = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return { type: 'vimeo', id: vimeoMatch[1] };
  }

  // 일반 동영상 URL의 경우
  try {
    const videoUrl = new URL(url);
    return { type: 'video', id: url };
  } catch (e) {
    return null;
  }
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
      'data-type': {
        default: null,
      },
      'data-video-id': {
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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `;
    } else if (videoInfo?.type === 'vimeo') {
      embedHtml = `
        <div class="aspect-w-16 aspect-h-9">
          <iframe 
            src="https://player.vimeo.com/video/${videoInfo.id}"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `;
    } else if (videoInfo?.type === 'video') {
      embedHtml = `
        <div class="aspect-w-16 aspect-h-9">
          <video 
            controls
            src="${videoInfo.id}"
            class="w-full h-full"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      `;
    }

    return ['div', mergeAttributes(HTMLAttributes, {
      'data-video-player': '',
      'data-type': videoInfo?.type,
      'data-video-id': videoInfo?.id,
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