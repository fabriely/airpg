// ── React and Third-Party Imports ─────────────────────────────
import React, { useEffect, useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// ── Application-Specific Imports ─────────────────────────────
import ToolbarPlugin from './Toolbar';
import api from 'services/api';
import '../../styles/RichTextEditor.css';
import { ListNode, ListItemNode } from '@lexical/list';

// ── Helper Function to Save Content ───────────────────────────
const saveContentToDatabase = async (email: string, content: any) => {
  try {
    const response = await api.post('/notebook/', { email, content });
    if (response.status === 200) {
      console.log('Notebook saved successfully', response.data);
    } else {
      console.error('Notebook save failed', response.data);
    }
  } catch (error) {
    console.error('Error saving notebook:', error);
  }
};

// ── Lexical Editor Configuration ──────────────────────────────
const theme = {
  text: {
    bold: 'text-bold',
    italic: 'text-italic',
    underline: 'text-underline',
    strikethrough: 'text-strikethrough',
  },
};

const editorConfig = {
  theme,
  namespace: 'MyEditor',
  onError(error: Error) {
    throw error;
  },
  nodes: [ ListNode, ListItemNode ],
};

// ── Component to Load Initial Content into Lexical ──────────────
const InitialContentLoader: React.FC<{ content: any }> = ({ content }) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (content) {
      editor.update(() => {
        // Rehydrate the editor's state from the saved JSON.
        const editorState = editor.parseEditorState(content);
        editor.setEditorState(editorState);
      });
    }
  }, [editor, content]);
  return null;
};

// ── Main RichTextEditor Component ──────────────────────────────
const RichTextEditor: React.FC = () => {
  const { data: session } = useSession();
  const [initialContent, setInitialContent] = useState<any>(null);

  // Auto-save on every change of the editor state.
  const onChangeHandler = useCallback(
    (editorState: any) => {
      editorState.read(() => {
        const content = editorState.toJSON();
        if (session?.user?.email) {
          saveContentToDatabase(session.user.email, content);
        }
      });
    },
    [session]
  );

  // Fetch previously-saved notebook content on mount.
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get('/notebook/', {
          params: { email: session?.user?.email },
        });
        if (response.status === 200) {
          setInitialContent(response.data.content);
        } else {
          console.error('Failed to fetch notebook', response.data);
        }
      } catch (error) {
        console.error('Error fetching notebook:', error);
      }
    };
    if (session?.user?.email) {
      fetchContent();
    }
  }, [session]);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <ListPlugin />
        {initialContent && <InitialContentLoader content={initialContent} />}
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChangeHandler} />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
};

export default RichTextEditor;