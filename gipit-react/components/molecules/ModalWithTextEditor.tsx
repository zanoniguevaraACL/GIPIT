import FormBlock from "../atoms/FormBlock";
import { FormBlockProps } from "@/app/lib/types";
import "./modalWithTextEditor.css";
import { useRef, useEffect, useState } from "react";
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import {Schema, DOMParser, DOMSerializer, Node } from 'prosemirror-model';
import '@/components/molecules/textEditor.css';

type ModalWithTextEditorProps = FormBlockProps & {
  cvCandidato: string; // Nuevo prop content
};

function ModalWithTextEditor({ rows, onSubmit, title, message, cvCandidato }: ModalWithTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState(cvCandidato || 'Escribe tu contenido aquí...');
	const editorViewRef = useRef<EditorView | null>(null); // Ref para guardar el EditorView


  useEffect(() => {
    if (editorRef.current) {
			console.log("Editor ref:", editorRef.current); // Verifica si el ref está correctamente referenciado

      const mySchema = new Schema({
        nodes: addListNodes(
          schema.spec.nodes.remove('image'),
          'paragraph block*',
          'block'
        ),
        marks: schema.spec.marks,
      });

			// string pero estructurado como html
			function serializeToHTML(doc: Node) {
				const fragment = DOMSerializer.fromSchema(mySchema).serializeFragment(doc.content);
				const div = document.createElement('div');
				div.appendChild(fragment);
				return div.innerHTML;
			}

      const createDocumentFromHTML = (htmlString: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        return DOMParser.fromSchema(mySchema).parse(tempDiv);
      };

      const initialDoc = createDocumentFromHTML(content);

      const view = new EditorView(editorRef.current, {
        state: EditorState.create({
          doc: initialDoc,
          plugins: exampleSetup({ schema: mySchema }),
        }),
        dispatchTransaction(transaction) {
          const newState = view.state.apply(transaction);
          view.updateState(newState);
					const htmlContent = serializeToHTML(newState.doc);
					setContent(htmlContent);
        },
      });

			editorViewRef.current = view;

      return () => {
        view.destroy();
				editorViewRef.current = null;	
      };
    }
  }, [editorRef.current]);

	  // Para que el editor sea reactivo cuando el `cvCandidato` cambie:
		useEffect(() => {
			setContent(cvCandidato || 'Escribe tu contenido aquí...');
		}, [cvCandidato]);

		
		const handleSubmit = async (formData: FormData, actualRoute: string) => {
			// Agregar el contenido actualizado del editor al formData antes de enviar
			formData.set('sumary', content);
		
			// Ejecutar el onSubmit original pasando el formData actualizado
			const response = await onSubmit(formData, actualRoute);
		
			// Asegurarse de devolver el mismo tipo de valor que espera `FormBlock`
			return response;
		};

  return (
    <div className="modal-overlay">
      <div className="form-container">
        {title && <h4>{title}</h4>}
        {message && <h3>{message}</h3>}
        <div className="modal-content">
          <div className="form-fields">
            <FormBlock rows={rows} onSubmit={handleSubmit} />
          </div>
          <div className="form-editor">
						<label htmlFor="editor">CV estandarizado:</label>
            <div id="editor" className="ProseMirror" ref={editorRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalWithTextEditor;