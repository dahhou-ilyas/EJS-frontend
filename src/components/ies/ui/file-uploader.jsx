import { useState } from 'react';

export default function FileUploader({ setFile }) {
    const [fileName, setFileName] = useState('Aucun fichier sélectionné');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        setFileName(file ? file.name : 'Aucun fichier sélectionné');
    };

    return (
        <div className="settings-btn upload-files-avator" style={{ overflow: 'hidden' }}>
            <div className="file-input-wrapper">
                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="file"
                    className="hide-input"
                    onChange={handleFileChange}
                />
                <label htmlFor="file" className="upload">Choisir une image</label>
                <p
                    type="text"
                    id="fileNameDisplay"
                    className="file-name-display"
                    style={{ marginTop: '-32px' }}
                >
                    {fileName}
                </p>
            </div>
        </div>
    );
}
