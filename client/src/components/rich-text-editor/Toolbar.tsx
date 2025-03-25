import React, { useState, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat('bold'));
          setIsItalic(selection.hasFormat('italic'));
          setIsUnderline(selection.hasFormat('underline'));
          setIsStrikethrough(selection.hasFormat('strikethrough'));
        } else {
          setIsBold(false);
          setIsItalic(false);
          setIsUnderline(false);
          setIsStrikethrough(false);
        }
      });
    });
  }, [editor]);

  const toggleFormat = (formatType: TextFormatType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
      }
    });
  };

  const toggleList = (listType: 'ordered' | 'unordered') => {
    editor.update(() => {
      if (listType === 'ordered') {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      }
    });
  };

  return (
    <div className="toolbar">
      <button className={isBold ? 'active' : ''} onClick={() => toggleFormat('bold')} title="Bold">
        <i className="fas fa-bold medieval-icon"></i>
      </button>
      <button className={isItalic ? 'active' : ''} onClick={() => toggleFormat('italic')} title="Italic">
        <i className="fas fa-italic medieval-icon"></i>
      </button>
      <button className={isUnderline ? 'active' : ''} onClick={() => toggleFormat('underline')} title="Underline">
        <i className="fas fa-underline medieval-icon"></i>
      </button>
      <button className={isStrikethrough ? 'active' : ''} onClick={() => toggleFormat('strikethrough')} title="Strikethrough">
        <i className="fas fa-strikethrough medieval-icon"></i>
      </button>
      <button onClick={() => toggleList('ordered')} title="Ordered List">
        <i className="fas fa-list-ol medieval-icon"></i>
      </button>
      <button onClick={() => toggleList('unordered')} title="Unordered List">
        <i className="fas fa-list-ul medieval-icon"></i>
      </button>
    </div>
  );
};

export default ToolbarPlugin;