'use client';
import { useEffect, useRef } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

export default function Editor({ content, setContent }: EditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mySchema = new Schema({
      nodes: addListNodes(
        schema.spec.nodes.remove('image'),
        'paragraph block*',
        'block'
      ),
      marks: schema.spec.marks,
    });

    const createDocumentFromHTML = (htmlString: string) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlString;
      return DOMParser.fromSchema(mySchema).parse(tempDiv);
    };

    const initialDoc = createDocumentFromHTML(content || '<p>Escribe tu contenido aquí...</p>');

    const view = new EditorView(editorRef.current, {
      state: EditorState.create({
        doc: initialDoc,
        plugins: exampleSetup({ schema: mySchema }),
      }),
      dispatchTransaction(transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
        setContent(newState.doc.textContent);
      },
    });

    return () => {
      view.destroy();
    };
  }, [content, setContent]);

  return <div ref={editorRef} className="ProseMirror editor"></div>;
}
