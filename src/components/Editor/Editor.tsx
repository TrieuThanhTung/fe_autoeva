import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

type CKEditorProps = {
  handleEditorChange: (newContent: string) => void
  initialContent?: string;
}

const CKEditor: React.FC<CKEditorProps> = ({handleEditorChange, initialContent}) => {

  return <SunEditor setOptions={{ buttonList: [['bold', 'italic', 'underline', 'fontColor', 'hiliteColor']] }}  
            setDefaultStyle='font-size: 16px; min-height: 160px; font-family: "Open Sans", sans-serif;'
            onChange={handleEditorChange}
            setContents={initialContent}
          />;
};

export default CKEditor;
