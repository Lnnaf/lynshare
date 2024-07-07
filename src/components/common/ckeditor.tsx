'use client'
import EditorConfig from '@/components/common/editor-toolbar.config'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  AutoImage,
  Autoformat,
  Bold,
  ClassicEditor,
  CodeBlock,
  Essentials,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Italic,
  LinkImage,
  List,
  Mention,
  Paragraph,
  Undo
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import prismComponents from 'prismjs/components'
import '/src/style/dark-theme.css'

const CKEditorComponent = (props: {
  data?: string
  setData: (val: string) => void
}) => {
  // Collect all languages from prismjs
  const languages = [
    'plane',
    ...Object.keys(prismComponents.languages)
      .filter((e) => !['meta', 'django'].includes(e))
      .sort()
  ]
  const editorConfig = EditorConfig({ ...props, languages: languages })

  return (
    <CKEditor
      onChange={(_, editor) => props.setData(editor.getData())}
      editor={ClassicEditor}
      config={editorConfig as any}
    />
  )
}

export default CKEditorComponent
