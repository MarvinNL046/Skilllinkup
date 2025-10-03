'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:underline',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start met typen...',
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Voer de afbeelding URL in:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL:', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-background-gray rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-background-light border-b border-background-gray p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            editor.isActive('bold')
              ? 'bg-primary text-white'
              : 'bg-white text-text-secondary hover:bg-background-gray'
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            editor.isActive('italic')
              ? 'bg-primary text-white'
              : 'bg-white text-text-secondary hover:bg-background-gray'
          }`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            editor.isActive('strike')
              ? 'bg-primary text-white'
              : 'bg-white text-text-secondary hover:bg-background-gray'
          }`}
        >
          <s>S</s>
        </button>

        <div className="w-px h-8 bg-background-gray mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-primary text-white'
              : 'bg-white text-text-secondary hover:bg-background-gray'
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-primary text-white'
              : 'bg-white text-text-secondary hover:bg-background-gray'
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-primary text-white'
              : 'bg-white text-text-secondary hover:bg-background-gray'
          }`}
        >
          H3
        </button>

        <div className="w-px h-8 bg-background-gray mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-primary text-white'
              : 'bg-white text-text-secondary hover:bg-background-gray'
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-primary text-white'
              : 'bg-white text-text-secondary hover:bg-background-gray'
          }`}
        >
          1. List
        </button>

        <div className="w-px h-8 bg-background-gray mx-1" />

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            editor.isActive('blockquote')
              ? 'bg-primary text-white'
              : 'bg-white text-text-secondary hover:bg-background-gray'
          }`}
        >
          " Quote
        </button>

        <div className="w-px h-8 bg-background-gray mx-1" />

        {/* Code */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            editor.isActive('codeBlock')
              ? 'bg-primary text-white'
              : 'bg-white text-text-secondary hover:bg-background-gray'
          }`}
        >
          {'</>'}
        </button>

        <div className="w-px h-8 bg-background-gray mx-1" />

        {/* Link */}
        <button
          type="button"
          onClick={setLink}
          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
            editor.isActive('link')
              ? 'bg-primary text-white'
              : 'bg-white text-text-secondary hover:bg-background-gray'
          }`}
        >
          🔗 Link
        </button>

        {/* Image */}
        <button
          type="button"
          onClick={addImage}
          className="px-3 py-1.5 rounded text-sm font-semibold bg-white text-text-secondary hover:bg-background-gray transition-colors"
        >
          🖼️ Afbeelding
        </button>

        <div className="w-px h-8 bg-background-gray mx-1" />

        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1.5 rounded text-sm font-semibold bg-white text-text-secondary hover:bg-background-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1.5 rounded text-sm font-semibold bg-white text-text-secondary hover:bg-background-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ↷
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}
