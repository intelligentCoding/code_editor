import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';
import Highlighter from 'monaco-jsx-highlighter';
import {parse} from '@babel/parser'
import traverse from '@babel/traverse';
import './syntax.css';
interface CodeEditorsProps {
    initialValue: string;
    onChange(value: string) : void;
}
const CodeEditor: React.FC<CodeEditorsProps> = ({onChange, initialValue}) => {
    const editorRef = useRef<any>();
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(()=> {
            onChange(getValue());
        })
        //adding tab size to 2 spaces
        monacoEditor.getModel()?.updateOptions({ tabSize: 2});
        

        const highlighter = new Highlighter(
            //@ts-ignore
            window.monaco,
            parse,
            traverse,
            monacoEditor
        );
        highlighter.highLightOnDidChangeModelContent();

    }

    const onFormatClick = () => {
        //get current value
        const unformatted = editorRef.current.getModel().getValue();
        //format the value
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '');
        //send the formatted value back in editor
        editorRef.current.setValue(formatted);
    }
    return (
    <div className="editor-wrapper">
        <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
        <MonacoEditor options={{
            wordWrap: "on",
            minimap: { enabled: false},
            showUnused: false,
            folding: false,
            lineNumbersMinChars:3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true
        }}
        editorDidMount={onEditorDidMount}
        value = {initialValue} 
        theme="dark" 
        language="javascript" 
        height="100%"
        />
    </div>
    )
}

export default CodeEditor;