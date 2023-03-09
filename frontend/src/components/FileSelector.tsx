import React, { useRef } from 'react';

function FileSelector({
  allowMultiple,
  mimeType,
  fileUploadHandler,
}: {
  allowMultiple: boolean;
  mimeType: string;
  fileUploadHandler: (fileList: FileList) => void;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const fileDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    fileUploadHandler(e.dataTransfer.files);
  };

  const fileSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) fileUploadHandler(e.target.files);
  };

  const clickHandler = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      className="file-selector"
      role="dialog"
      onDragEnter={preventDefaults}
      onDragOver={preventDefaults}
      onDragLeave={preventDefaults}
      onDrop={fileDropHandler}
      onClick={clickHandler}
      onKeyDown={clickHandler}
    >
      <div>Drag & drop file or click here to select</div>
      <input
        type="file"
        ref={inputFileRef}
        className="file-uploader-input"
        accept={mimeType}
        onChangeCapture={fileSelectHandler}
        multiple={allowMultiple}
      />
    </div>
  );
}

export default FileSelector;
