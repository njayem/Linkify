// Edit Avatar component
// Author: Jonathan Haddad
// Date created: Apr 1, 2023
// Description: allows user to crop and adjust the avatar before posting 



import React, { useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

const EditAvatar = ({ image, onSave, onCancel }) => {
  const editorRef = useRef(null);

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      onSave(canvas);
    }
  };

  return (
    <div className="edit-avatar">
      {image && (
        <>
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={50}
            borderRadius={125}
            color={[255, 255, 255, 0.6]}
            scale={1}
            rotate={0}
          />
          <div className="actions">
            <button onClick={handleSave}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditAvatar;
