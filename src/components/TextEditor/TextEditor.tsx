import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IconBold, IconItalic, IconH1, IconList } from "@tabler/icons-react";
import "./TextEditor.css";

export const CoverLetterEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing your cover letter...</p>",
  });

  if (!editor) return null;

  return (
    <div className="cover_editor">
      <div className="editor_toolbar">
        <button
          className={`toolbar_btn ${editor.isActive("bold") ? "is_active" : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <IconBold size={16} />
        </button>
        <button
          className={`toolbar_btn ${editor.isActive("italic") ? "is_active" : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <IconItalic size={16} />
        </button>
        <button
          className={`toolbar_btn ${
            editor.isActive("heading", { level: 1 }) ? "is_active" : ""
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <IconH1 size={16} />
        </button>
        <button
          className={`toolbar_btn ${
            editor.isActive("bulletList") ? "is_active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <IconList size={16} />
        </button>
      </div>
      <div className="editor_content_wrapper">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
