import React, { useState } from 'react'
import upload from "../../utils/upload";

const Test = () => {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("file name: ", file.name);

        try {
            const url = await upload(file);
            console.log(url);

        } catch(err) {
            console.log(err);
        }
    }


  return (
    <div>
        <h1>Test File</h1>
        <input type="file" 
            style={{margin: "20px"}}
            onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleSubmit}>Send</button>
    </div>
  )
}

export default Test