'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useRef, useState, useEffect } from 'react';
import { marked } from 'marked';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingImage, setPendingImage] = useState<{ url: string } | null>(null);
  const [imageAlt, setImageAlt] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [floatingMenuPosition, setFloatingMenuPosition] = useState({ top: 0, left: 0 });
  const [showHTMLEditor, setShowHTMLEditor] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-6 shadow-md',
          style: 'max-width: 100%; height: auto; display: block; margin: 1.5rem 0;',
        },
        allowBase64: false, // Prevent broken images from base64/invalid URLs
        inline: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:underline cursor-text',
          target: '_blank',
          rel: 'noopener noreferrer nofollow',
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
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find(item => item.type.indexOf('image') !== -1);

        if (imageItem) {
          event.preventDefault();
          const file = imageItem.getAsFile();
          if (file) {
            // Don't insert anything yet, just upload
            handleImageUpload(file);
          }
          return true;
        }
        return false;
      },
      handleClick: (view, pos, event) => {
        const target = event.target as HTMLElement;

        // Handle link clicks
        if (target.tagName === 'A') {
          event.preventDefault();
          const linkAttrs = editor?.getAttributes('link');
          if (linkAttrs?.href) {
            setLinkUrl(linkAttrs.href);
            setLinkText(target.textContent || '');
            setShowLinkModal(true);
          }
          return true;
        }

        // Handle image clicks
        if (target.tagName === 'IMG') {
          // Don't prevent default - let TipTap select the image first
          // Then show the modal
          setTimeout(() => {
            const imgElement = target as HTMLImageElement;
            setPendingImage({ url: imgElement.src });
            setImageAlt(imgElement.alt || '');
            setImageTitle(imgElement.title || '');
          }, 100);
          return false; // Let TipTap handle the selection
        }

        return false;
      },
    },
  });

  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return;

    setIsUploading(true);

    try {
      // Valideer bestand
      if (!file.type.startsWith('image/')) {
        alert('Selecteer een geldig afbeeldingsbestand');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Afbeelding is te groot. Maximum 5MB');
        return;
      }

      // Upload afbeelding
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload mislukt');
      }

      const data = await response.json();

      // Toon modal voor alt tekst en titel
      setPendingImage({ url: data.url });
      setImageAlt('');
      setImageTitle('');

    } catch (error) {
      console.error('Upload error:', error);
      alert('Fout bij uploaden van afbeelding');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [editor]);

  const insertImageWithMetadata = useCallback(() => {
    if (!editor || !pendingImage) return;

    console.log('Inserting image:', {
      src: pendingImage.url,
      alt: imageAlt,
      title: imageTitle,
    });

    editor.chain().focus().setImage({
      src: pendingImage.url,
      alt: imageAlt,
      title: imageTitle || undefined,
    }).run();

    // Reset
    setPendingImage(null);
    setImageAlt('');
    setImageTitle('');
  }, [editor, pendingImage, imageAlt, imageTitle]);

  const addImage = useCallback(() => {
    // Trigger file input
    fileInputRef.current?.click();
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      await handleImageUpload(imageFile);
    }
  }, [handleImageUpload]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, ' ');

    // If text is selected, show modal to add link
    if (selectedText) {
      setLinkUrl(previousUrl || 'https://');
      setLinkText(selectedText);
      setShowLinkModal(true);
    } else {
      // No selection, ask user to select text first
      alert('Selecteer eerst tekst om een link toe te voegen');
    }
  }, [editor]);

  const updateLink = useCallback(() => {
    if (!editor) return;

    if (!linkUrl.trim() || linkUrl === 'https://') {
      // Remove link if URL is empty
      editor.chain().focus().unsetLink().run();
    } else {
      // Add/update link to selected text
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }

    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
  }, [editor, linkUrl]);

  const removeLink = useCallback(() => {
    if (!editor) return;

    editor.chain().focus().unsetLink().run();
    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
  }, [editor]);

  const pasteMarkdown = useCallback(async () => {
    const markdown = window.prompt('Plak je Markdown hier:');
    if (markdown && editor) {
      try {
        const html = await marked(markdown);
        editor.commands.setContent(html);
      } catch (error) {
        alert('Fout bij converteren van Markdown. Controleer de syntax.');
      }
    }
  }, [editor]);

  const openHTMLEditor = useCallback(() => {
    if (!editor) return;
    setHtmlContent(editor.getHTML());
    setShowHTMLEditor(true);
  }, [editor]);

  const saveHTMLContent = useCallback(() => {
    if (!editor) return;
    try {
      editor.commands.setContent(htmlContent);
      setShowHTMLEditor(false);
    } catch (error) {
      alert('Ongeldige HTML. Controleer de syntax.');
    }
  }, [editor, htmlContent]);

  // Update editor content when prop changes (for edit page)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  // Show floating menu on text selection
  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to, ' ');

      if (text && text.length > 0) {
        // Get selection position
        const { view } = editor;
        const start = view.coordsAtPos(from);
        const end = view.coordsAtPos(to);

        // Calculate position for floating menu (centered above selection)
        const left = (start.left + end.left) / 2;
        const top = start.top - 50; // 50px above selection

        setFloatingMenuPosition({ top, left });
        setShowFloatingMenu(true);
      } else {
        setShowFloatingMenu(false);
      }
    };

    editor.on('selectionUpdate', handleSelectionUpdate);
    return () => {
      editor.off('selectionUpdate', handleSelectionUpdate);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-background-gray rounded-lg overflow-hidden">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }}
        className="hidden"
      />

      {/* Custom CSS for image visibility, links, and delete */}
      <style jsx global>{`
        .ProseMirror img {
          max-width: 100% !important;
          height: auto !important;
          display: block !important;
          margin: 1.5rem 0 !important;
          border-radius: 0.5rem !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          cursor: pointer !important;
          visibility: visible !important;
          opacity: 1 !important;
          object-fit: cover !important;
        }

        /* Hide broken image icons */
        .ProseMirror img[src=""],
        .ProseMirror img:not([src]),
        .ProseMirror img[src^="data:"] {
          display: none !important;
        }

        .ProseMirror img:hover {
          outline: 2px solid #ef2b70;
          outline-offset: 2px;
        }

        .ProseMirror img.ProseMirror-selectednode {
          outline: 3px solid #ef2b70;
          outline-offset: 2px;
        }

        .prose img {
          max-width: 100% !important;
          height: auto !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        .ProseMirror a {
          color: #ef2b70 !important;
          text-decoration: underline !important;
          cursor: pointer !important;
          pointer-events: all !important;
        }

        .ProseMirror a:hover {
          color: #d91a5f !important;
          background-color: rgba(239, 43, 112, 0.1) !important;
        }

        /* Prevent default link behavior */
        .ProseMirror a[href] {
          text-decoration: underline !important;
        }
      `}</style>

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
          disabled={isUploading}
          className="px-3 py-1.5 rounded text-sm font-semibold bg-white text-text-secondary hover:bg-background-gray transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Afbeelding toevoegen - Klik op afbeelding en druk Delete/Backspace om te verwijderen"
        >
          {isUploading ? '⏳ Uploaden...' : '🖼️ Afbeelding'}
        </button>

        {/* Paste Markdown */}
        <button
          type="button"
          onClick={pasteMarkdown}
          className="px-3 py-1.5 rounded text-sm font-semibold bg-accent text-white hover:bg-accent-dark transition-colors"
          title="Plak Markdown van ChatGPT"
        >
          📝 MD
        </button>

        {/* HTML Source Editor */}
        <button
          type="button"
          onClick={openHTMLEditor}
          className="px-3 py-1.5 rounded text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          title="HTML broncode bewerken (voor links uit ChatGPT)"
        >
          &lt;/&gt; HTML
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
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative bg-white"
      >
        {/* Floating Menu for Text Selection */}
        {showFloatingMenu && (
          <div
            className="fixed bg-white rounded-lg shadow-xl border border-background-gray p-2 flex gap-1 z-50"
            style={{
              top: `${floatingMenuPosition.top}px`,
              left: `${floatingMenuPosition.left}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-2 py-1 rounded text-sm font-semibold transition-colors ${
                editor.isActive('bold')
                  ? 'bg-primary text-white'
                  : 'bg-background-light text-text-secondary hover:bg-background-gray'
              }`}
              title="Bold (Ctrl+B)"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-2 py-1 rounded text-sm font-semibold transition-colors ${
                editor.isActive('italic')
                  ? 'bg-primary text-white'
                  : 'bg-background-light text-text-secondary hover:bg-background-gray'
              }`}
              title="Italic (Ctrl+I)"
            >
              <em>I</em>
            </button>
            <div className="w-px h-8 bg-background-gray mx-1" />
            <button
              type="button"
              onClick={setLink}
              className="px-3 py-1 rounded text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
              title="Add Link (Ctrl+K)"
            >
              🔗
            </button>
          </div>
        )}

        <EditorContent editor={editor} />

        {/* Drag & Drop Indicator */}
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-text-secondary font-heading font-semibold">Afbeelding uploaden...</p>
            </div>
          </div>
        )}

        {/* Image Metadata Modal */}
        {pendingImage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                Afbeelding details toevoegen
              </h3>

              {/* Preview */}
              <div className="mb-4">
                <img
                  src={pendingImage.url}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-background-gray"
                />
              </div>

              {/* Alt text */}
              <div className="mb-4">
                <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                  Alt tekst (verplicht voor SEO) *
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Beschrijf de afbeelding..."
                  className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  autoFocus
                />
                <p className="text-xs text-text-muted mt-1">
                  Voor toegankelijkheid en SEO
                </p>
              </div>

              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                  Titel (optioneel)
                </label>
                <input
                  type="text"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  placeholder="Hover tekst..."
                  className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-xs text-text-muted mt-1">
                  Verschijnt bij hover over afbeelding
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={insertImageWithMetadata}
                  disabled={!imageAlt.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-heading font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Opslaan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor?.commands.deleteSelection();
                    setPendingImage(null);
                    setImageAlt('');
                    setImageTitle('');
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-heading font-semibold"
                >
                  Verwijderen
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPendingImage(null);
                    setImageAlt('');
                    setImageTitle('');
                  }}
                  className="px-4 py-2 rounded-lg bg-background-gray hover:bg-background-gray/80 text-text-primary font-heading font-semibold transition-colors"
                >
                  Annuleren
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Link Edit Modal */}
        {showLinkModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                Link bewerken
              </h3>

              {/* Link text (readonly) */}
              <div className="mb-4">
                <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                  Link tekst
                </label>
                <input
                  type="text"
                  value={linkText}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border border-background-gray bg-background-light text-text-secondary cursor-not-allowed"
                />
              </div>

              {/* URL */}
              <div className="mb-6">
                <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                  URL *
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  autoFocus
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={updateLink}
                  disabled={!linkUrl.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-heading font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Link bijwerken
                </button>
                <button
                  type="button"
                  onClick={removeLink}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-heading font-semibold"
                >
                  Verwijderen
                </button>
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 rounded-lg bg-background-gray hover:bg-background-gray/80 text-text-primary font-heading font-semibold transition-colors"
                >
                  Annuleren
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HTML Source Editor Modal */}
        {showHTMLEditor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
              <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                HTML Broncode Editor
              </h3>

              <p className="text-sm text-text-muted mb-4">
                💡 Tip: Kopieer HTML direct uit ChatGPT (inclusief links) en plak het hier. Perfect voor content met veel links!
              </p>

              {/* HTML Textarea */}
              <div className="mb-6">
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className="w-full h-96 px-4 py-3 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
                  placeholder="<p>Plak hier je HTML code...</p>"
                  spellCheck={false}
                  autoFocus
                />
                <p className="text-xs text-text-muted mt-2">
                  ⚠️ Let op: Zorg dat je HTML geldig is. Ongeldige HTML kan de editor breken.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={saveHTMLContent}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-heading font-semibold"
                >
                  💾 HTML toepassen
                </button>
                <button
                  type="button"
                  onClick={() => setShowHTMLEditor(false)}
                  className="px-4 py-2 rounded-lg bg-background-gray hover:bg-background-gray/80 text-text-primary font-heading font-semibold transition-colors"
                >
                  Annuleren
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
